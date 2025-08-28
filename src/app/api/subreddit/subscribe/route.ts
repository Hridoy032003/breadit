import { getAuthSession } from '@/lib/auth'
import { toggleSubscription } from '@/services/subscriptions'

import { z } from 'zod'
 
export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { subredditId } = await req.json()

    await toggleSubscription({
      subredditId,
      userId: session.user.id,
      subscribe: true,
    })

    return new Response(subredditId)
  } catch (error) {
    console.log(error)

    if (error instanceof Error) {
      if (error.message === 'ALREADY_SUBSCRIBED') {
        return new Response("You've already subscribed to this subreddit", {
          status: 400,
        })
      }
    }

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not subscribe to subreddit at this time. Please try later',
      { status: 500 }
    )
  }
}
