import { promises as fs } from 'fs';

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const datePart = date
    .toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/')
    .reverse()
    .join('-'); // Convert to YYYY-MM-DD
  const timePart = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return `${datePart} ${timePart}`;
}

export default async function logEntry(level, message) {
  const logFilePath = '/usr/src/app.log';
  const log = {
    timestamp: formatTimestamp(Date.now()),
    level: level,
    message: message,
  };
  try {
    // Read the current content of the log file
    const logFileContent = await fs.readFile(logFilePath, 'utf-8');
    // check if logFileContent has aleady content, if not create an empty object logs
    const logs = logFileContent ? JSON.parse(logFileContent) : [];


    //check if the log has more than 10 entries, if so remove the first entry
    if (logs.length >= 1000) {
      logs.shift();
    }

    // Append the new log entry
    logs.push(log);

    // Write the updated content back to the log file
    await fs.writeFile(logFilePath, JSON.stringify(logs, null, 2));

   
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
}
