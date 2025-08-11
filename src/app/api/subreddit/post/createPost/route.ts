import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const { title, content, subredditId } = await req.json()

   

    const session = await getAuthSession()

    if (!session?.user) {
        
      return new Response('Unauthorized', { status: 401 })
    }
const subreddit = await db.subreddit.findFirst({
      where: {
        id: subredditId,
      },
    });

    if (!subreddit) {
      return new Response('Subreddit not found', { status: 404 });
    }

   const isOwner = subreddit.creatorId === session.user.id;


    if (!isOwner) {
      const subscription = await db.subscription.findFirst({
        where: {
          subredditId,
          userId: session.user.id,
        },
      });

      if (!subscription) {
        return new Response('Subscribe to post', { status: 403 });
      }
    }

    await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        subredditId,
      },
    })

    return new Response('OK')
  } catch (error) {
    console.log('Error creating post:', error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not post to subreddit at this time. Please try later',
      { status: 500 }
    )
  }
}