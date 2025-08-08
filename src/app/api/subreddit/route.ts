import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { subredditName } = z.object({ subredditName: z.string().min(3).max(21) }).parse(body);

    const existingSubreddit = await db.subreddit.findFirst({
      where: { name: subredditName },
    });

    if (existingSubreddit) {
      return new NextResponse("Subreddit already exists", { status: 409 });
    }

    const subreddit = await db.subreddit.create({
      data: {
        name: subredditName,
        creatorId: session.user.id,
      },
    });

    return NextResponse.json(subreddit);

  } catch (error) {
    console.error("Error creating subreddit:", error);
    
   
    return new NextResponse("Could not create subreddit", { status: 500 });
  }
}