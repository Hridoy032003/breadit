import { db } from '@/lib/db'

export interface CreateCommentInput {
  text: string
  postId: string
  authorId: string
  replyToId?: string
}

export async function createComment({
  text,
  postId,
  authorId,
  replyToId,
}: CreateCommentInput) {
  return db.comment.create({
    data: {
      text,
      postId,
      authorId,
      replyToId,
    },
  })
}