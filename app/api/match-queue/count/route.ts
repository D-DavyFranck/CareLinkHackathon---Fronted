import { NextResponse } from 'next/server';
import { Database } from '@/lib/backend/db';

export async function GET() {
  try {
    const queue = Database.getMatchQueue();
    const pendingCount = queue.filter(q => q.status === 'PENDING').length;
    return NextResponse.json({ count: pendingCount });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch match queue count' }, { status: 500 });
  }
}
