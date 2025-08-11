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
          post={post} 
          subredditName={subredditName}
    
        />
      ))}
    </div>
  );
};

export default PostFeed;
