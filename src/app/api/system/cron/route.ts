import { NextResponse } from 'next/server';
import apiCredentials from '@/app/lib/apicredentials';
import logEntry from '@/app/lib/logentry';
import fs from 'fs/promises';
import path from 'path';

const LOCK_DIR = '/tmp/cdfox-locks';

const JOBS = {
  dataimport: {
    name: 'Data Import',
    endpoint: '/api/system/jobs/dataimport',
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    minutes: [0]
  },
  datatransform: {
    name: 'Data Transform', 
    endpoint: '/api/system/jobs/datatransform',
    hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
    minutes: [5]
  },
  beamsync: {
    name: 'BEAM Sync',
    endpoint: '/api/system/jobs/beamsync', 
    hours: [2],
    minutes: [30]
  }
};

async function isLocked(job: string): Promise<boolean> {
  try {
    await fs.access(path.join(LOCK_DIR, `${job}.lock`));
    return true;
  } catch {
    return false;
  }
}

async function lock(job: string): Promise<void> {
  await fs.mkdir(LOCK_DIR, { recursive: true });
  await fs.writeFile(path.join(LOCK_DIR, `${job}.lock`), Date.now().toString());
}

async function unlock(job: string): Promise<void> {
  try {
    await fs.unlink(path.join(LOCK_DIR, `${job}.lock`));
  } catch {}
}

async function getLastRun(job: string): Promise<number> {
  try {
    const content = await fs.readFile(path.join(LOCK_DIR, `${job}.last`), 'utf8');
    return parseInt(content) || 0;
  } catch {
    return 0;
  }
}

async function setLastRun(job: string): Promise<void> {
  await fs.mkdir(LOCK_DIR, { recursive: true });
  await fs.writeFile(path.join(LOCK_DIR, `${job}.last`), Date.now().toString());
}

function shouldRun(job: string, lastRun: number, force: boolean = false): { should: boolean, reason: string } {
  if (force) {
    return { should: true, reason: 'forced execution' };
  }

  const now = new Date();
  const config = JOBS[job];
  
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  if (!config.hours.includes(currentHour)) {
    return { 
      should: false, 
      reason: `not scheduled hour (current: ${currentHour}, scheduled: ${config.hours.join(',')})` 
    };
  }
  
  if (!config.minutes.includes(currentMinute)) {
    return { 
      should: false, 
      reason: `not scheduled minute (current: ${currentMinute}, scheduled: ${config.minutes.join(',')})` 
    };
  }
  
  const timeDiff = now.getTime() - lastRun;
  const fiftyMinutes = 50 * 60 * 1000;
  
  if (timeDiff <= fiftyMinutes) {
    const lastRunDate = new Date(lastRun);
    return { 
      should: false, 
      reason: `ran recently (last run: ${lastRunDate.toISOString()}, ${Math.round(timeDiff / 60000)} minutes ago)` 
    };
  }
  
  return { should: true, reason: 'scheduled to run now' };
}

async function runJob(job: string, request: Request, force: boolean = false): Promise<any> {
  if (await isLocked(job)) {
    return { job, status: 'running', message: `${JOBS[job].name} already running` };
  }

  const lastRun = await getLastRun(job);
  const shouldRunResult = shouldRun(job, lastRun, force);
  
  if (!shouldRunResult.should) {
    return { 
      job, 
      status: 'skipped', 
      message: `${JOBS[job].name} not scheduled`,
      reason: shouldRunResult.reason,
      lastRun: lastRun ? new Date(lastRun).toISOString() : 'never'
    };
  }

  try {
    await lock(job);
    logEntry('info', `Starting ${JOBS[job].name}`);
    
    const baseUrl = new URL(request.url).origin;
    const response = await fetch(`${baseUrl}${JOBS[job].endpoint}`, {
      headers: {
        'authorization': request.headers.get('authorization') || '',
        'x-api-key': request.headers.get('x-api-key') || ''
      }
    });

    const result = await response.json();
    
    if (response.ok) {
      await setLastRun(job);
      logEntry('success', `${JOBS[job].name} completed`);
      return { job, status: 'completed', result };
    } else {
      logEntry('error', `${JOBS[job].name} failed`);
      return { job, status: 'failed', error: result.message };
    }
  } catch (error: any) {
    logEntry('error', `${JOBS[job].name} error: ${error.message}`);
    return { job, status: 'failed', error: error.message };
  } finally {
    await unlock(job);
  }
}

export async function GET(request: Request) {
  const auth = await apiCredentials(request);
  if (auth instanceof Response) return auth;

  const url = new URL(request.url);
  const action = url.searchParams.get('action') || 'check';
  const job = url.searchParams.get('job');
  const force = url.searchParams.get('force') === 'true';

  // Show current time for debugging
  const now = new Date();
  const currentTime = {
    hour: now.getHours(),
    minute: now.getMinutes(),
    timestamp: now.toISOString()
  };

  if (action === 'run' && job && JOBS[job]) {
    const result = await runJob(job, request, true); // Force run
    return NextResponse.json({ ...result, currentTime });
  }

  if (action === 'check') {
    const results = [];
    for (const jobName of Object.keys(JOBS)) {
      const result = await runJob(jobName, request, force);
      results.push(result);
    }
    return NextResponse.json({ results, currentTime });
  }

  if (action === 'status') {
    const status = {};
    for (const [jobName, config] of Object.entries(JOBS)) {
      const lastRun = await getLastRun(jobName);
      const isRunning = await isLocked(jobName);
      status[jobName] = {
        name: config.name,
        endpoint: config.endpoint,
        schedule: { hours: config.hours, minutes: config.minutes },
        lastRun: lastRun ? new Date(lastRun).toISOString() : 'never',
        running: isRunning
      };
    }
    return NextResponse.json({ status, currentTime });
  }

  return NextResponse.json({
    message: 'CDFox Cron Service',
    currentTime,
    jobs: Object.keys(JOBS),
    usage: {
      check: '?action=check (run scheduled jobs)',
      'check-force': '?action=check&force=true (force run all jobs)',
      run: '?action=run&job=dataimport (force run specific job)',
      status: '?action=status (show job status and schedules)'
    }
  });
}