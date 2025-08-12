import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = 5; 

  try {
    const communities = await db.subreddit.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(communities);
  } catch (error) {
    console.log(error)
    return new NextResponse('Could not fetch communities', { status: 500 });
  }
}