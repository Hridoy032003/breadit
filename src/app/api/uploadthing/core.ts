import { getAuthSession } from '@/lib/auth'

import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async () => {
      const session = await getAuthSession()

      if (!session) throw new Error('Unauthorized')

      return { userId:session?.user.id }
    })
    .onUploadComplete(async ({ }) => {}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter