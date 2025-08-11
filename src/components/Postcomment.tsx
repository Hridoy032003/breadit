"use client";


import { Comment, CommentVote, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";

import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { formatTimeToNow } from "@/lib/fromateTimeDate";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};

interface PostCommentProps {
  comment: ExtendedComment;
  votesAmt: number;
  currentVote: CommentVote | undefined;
  postId: string;
}
interface CreateCommentProps {
  postId: string;
  text: string;
  replyToId?: string;
}

const PostComment: FC<PostCommentProps> = ({
  comment,
  postId,
}) => {
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>(`@${comment.author.username} `);
  const router = useRouter();
 

  const { mutate: postComment } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CreateCommentProps) => {
      const payload = { postId, text, replyToId };

      const { data } = await axios.patch(
        `/api/subreddit/post/comment/`,
        payload
      );
      return data;
    },

    onError: (err) => {
     toast.error("There was an error creating your comment. Please try again.")
     console.log("error",err)
    },
    onSuccess: () => {
      router.refresh();
      setIsReplying(false);
    },
  });
console.log(comment)
  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <Avatar>
          <AvatarImage src={comment?.author.image ?? "/default-avatar.png"} />
          <AvatarFallback>{
            comment?.author?.name}</AvatarFallback>
        </Avatar>

        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900">
            u/{comment.author.name}
          </p>

          <p className="max-h-40 truncate text-xs text-zinc-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className="text-sm text-zinc-900 mt-2">{comment.text}</p>

      <div className="flex gap-2 items-center">
      

        <Button
          onClick={() => {
            if (!session) return router.push("/sign-in");
            setIsReplying(true);
          }}
          variant="ghost"
        >
          <MessageSquare className="h-4 w-4 mr-1.5" />
          Reply
        </Button>
      </div>

      {isReplying ? (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="comment">Your comment</Label>
          <div className="mt-2">
            <Textarea
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              autoFocus
              id="comment"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={1}
              placeholder="What are your thoughts?"
            />

            <div className="mt-2 flex justify-end gap-2">
              <Button tabIndex={-1} onClick={() => setIsReplying(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (!input) return;
                  postComment({
                    postId,
                    text: input,
                    replyToId: comment.replyToId ?? comment.id, 
                  });
                }}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PostComment;
