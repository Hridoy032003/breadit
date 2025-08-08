import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'




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

    if (!subscriptionExists) {
      return new Response(
        "You've not been subscribed to this subreddit, yet.",
        {
          status: 400,
        }
      )
    }


    await db.subscription.delete({
      where: {
        userId_subredditId: {
          subredditId,
          userId: session.user.id,
        },
      },
    })

    return new Response(subredditId)
  } catch (error) {
 console.log(error)
    return new Response(
      'Could not unsubscribe from subreddit at this time. Please try later',
      { status: 500 }
    )
  }
}