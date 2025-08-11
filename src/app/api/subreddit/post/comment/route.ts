import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

import { z } from 'zod'

export async function PATCH(req: Request) {
  try {
    const  { postId, text, replyToId } = await req.json()

 

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    await db.comment.create({
      data: {
        text,
        postId,
        authorId: session.user.id,
        replyToId,
      },
    })

    return new Response('OK')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not post to subreddit at this time. Please try later',
      { status: 500 }
    )
  }
}