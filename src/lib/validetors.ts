import z from 'zod'

export const SubredditSubscriptionValidator = z.object({
      subredditId: z.string(),
      name: z.string().min(3).max(21),
    })