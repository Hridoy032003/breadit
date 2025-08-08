import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'


import { z } from 'zod'
 
export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const {subredditId} = await req.json()
   
   
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    })

    if (subscriptionExists) {
      return new Response("You've already subscribed to this subreddit", {
        status: 400,
      })
    }

   
    await db.subscription.create({
      data: {
        subredditId,
        userId: session.user.id,
      },
    })

    return new Response(subredditId)
  } catch (error) {
    console.log(error)
   
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not subscribe to subreddit at this time. Please try later',
      { status: 500 }
    )
  }
}