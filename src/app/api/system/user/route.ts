import { NextResponse } from 'next/server';
import apiCredentials from '@/app/lib/apicredentials';
import { auth } from '../../../../auth';

export async function GET(request) {
  const authcheck = await apiCredentials(request);
  if (authcheck instanceof Response) {
    return authcheck;
  }
  const session = await auth();
  return NextResponse.json(session.user, { status: 200 });
}
