"use client";

import React from "react";
import { ExtendedPost } from "@/types/db";
import Post from "./Post";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  subredditName: string;
}

const PostFeed = ({ initialPosts, subredditName }: PostFeedProps) => {
  return (
    <div className="flex flex-col gap-6">
      {initialPosts.map((post) => (
        <Post
          key={post.id}
          post={post} // This 'post' object is of type ExtendedPost
          subredditName={subredditName}
          // Calculating votes here and passing it down
          votesAmt={post.votes.reduce((acc, vote) => {
            if (vote.type === "UP") return acc + 1;
            if (vote.type === "DOWN") return acc - 1;
            return acc;
          }, 0)}
          // We no longer need to pass commentAmt, as Post.tsx can get it from post.comments.length
        />
      ))}
    </div>
  );
};

export default PostFeed;
