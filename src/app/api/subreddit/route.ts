import { getAuthSession } from '@/lib/auth'
import { toggleSubscription } from '@/services/subscriptions'

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
      subscribe: false,
    })

    return new Response(subredditId)
  } catch (error) {
    console.log(error)

    if (error instanceof Error) {
      if (error.message === 'NOT_SUBSCRIBED') {
        return new Response("You've not been subscribed to this subreddit, yet.", {
          status: 400,
        })
      }
    }
  }
}