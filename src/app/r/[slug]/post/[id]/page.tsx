import CommentsSection from "@/components/CommentsSection";
import EditorOutput from "@/components/EditorOutput";
 // Assuming this component exists
import { db } from "@/lib/db";
import { formatTimeToNow } from "@/lib/fromateTimeDate";

import { ArrowBigDown, ArrowBigUp, Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const SubRedditPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string,id:string }>;
}) => {
  
  const {id} =await params;
  const postId = id;
  console.log("data id of post", postId);
  const post = await db.post.findFirst({
    where: {
      id: postId,
    },
    include: {
      votes: true,
      author: true,
    },
  });

  
  if (!post) {
    return notFound();
  }

  return (
    <div>
      <div className="h-full flex flex-col sm:flex-row items-center sm:items-start justify-between">
        <Suspense fallback={<PostVoteShell />}>
          {/* This component can now fetch its own data or receive initial data */}
          {/* {/* <PostVoteServer
            postId={post.id}
            initialVotesAmt={post.votes.reduce((acc, vote) => {
              if (vote.type === "UP") return acc + 1;
              if (vote.type === "DOWN") return acc - 1;
              return acc;
            }, 0)} */}
          
        </Suspense>

        <div className="sm:w-0 w-full flex-1 bg-white p-4 rounded-sm">
          <p className="max-h-40 mt-1 truncate text-xs text-gray-500">
            Posted by {post.author.name}{" "}
            {formatTimeToNow(new Date(post.createdAt))}
          </p>
          <h1 className="text-xl font-semibold py-2 leading-6 text-gray-900">
            {post.title}
          </h1>

         
          <EditorOutput content={post.content} />

      
          <Suspense
            fallback={
              <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
            }
          >
           
            <CommentsSection postId={post.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

function PostVoteShell() {
  return (
    <div className="flex items-center flex-col pr-6 w-20">
     
      <div>
        <ArrowBigUp className="h-5 w-5 text-zinc-700" />
      </div>

      <div className="text-center py-2 font-medium text-sm text-zinc-900">
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>

      <div>
        <ArrowBigDown className="h-5 w-5 text-zinc-700" />
      </div>
    </div>
  );
}

export default SubRedditPostPage;
