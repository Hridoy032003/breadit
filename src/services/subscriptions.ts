import { db } from '@/lib/db'

export interface ToggleSubscriptionInput {
  subredditId: string
  userId: string
  subscribe: boolean
}

export async function toggleSubscription({
  subredditId,
  userId,
  subscribe,
}: ToggleSubscriptionInput) {
  const subscriptionExists = await db.subscription.findFirst({
    where: {
      subredditId,
      userId,
    },
  })

  if (subscribe) {
    if (subscriptionExists) {
      throw new Error('ALREADY_SUBSCRIBED')
    }

    await db.subscription.create({
      data: {
        subredditId,
        userId,
      },
    })
    return { subscribed: true }
  }

  if (!subscriptionExists) {
    throw new Error('NOT_SUBSCRIBED')
  }

  await db.subscription.delete({
    where: {
      userId_subredditId: {
        subredditId,
        userId,
      },
    },
  })

  return { subscribed: false }
}
