
"use client";

import React from "react";
import { ExtendedPost } from "@/types/db";
import Post from "./Post";


interface PostFeedProps {

  initialPosts: ExtendedPost[];
  subredditName: string;
  post:{
 
       id: string;
       title: string;
   content:{
     blocks: {
       type: string;
       data: {
         text?: string;
         level?: number;
         items?: string[];
         style?: string;
       };
       id: string;
       version: string;
     }[];
     version: string;
     time: number;
    
   };
       createdAt: Date;
       updatedAt: Date;
       
     };
     votesAmt: number;
  
     createdAt: Date;
  
     commentAmt: number;
  }



const PostFeed = ({ initialPosts, subredditName }: PostFeedProps) => {

  return (
    <div className="flex flex-col gap-6">
     
      {initialPosts.map((post) => (
        <Post
        
          key={post.id}
         
          post={post}
       
          votesAmt={post.votes.reduce((acc, vote) => {
            if (vote.type === "UP") return acc + 1;
            if (vote.type === "DOWN") return acc - 1;
            return acc;
          }, 0)}
          subredditName={subredditName} 
          commentAmt={post.comments.length}
        />
      ))}
    </div>
  );
};

export default PostFeed;
