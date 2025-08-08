
import { db } from "@/lib/db";
import { formatTimeToNow } from "@/lib/fromateTimeDate";

import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const SubRedditPostPage = async ({
  params,
}: {
  params: Promise<{ postId: string }>;
}) => {
  const { postId } = await params;


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
        <div className="sm:w-0 w-full flex-1 bg-white p-4 rounded-sm">
          <p className="max-h-40 mt-1 truncate text-xs text-gray-500">
            Posted by u/{post.author.username}{" "}
            {formatTimeToNow(new Date(post.createdAt))}
          </p>
          <h1 className="text-xl font-semibold py-2 leading-6 text-gray-900">
            {post.title}
          </h1>

          {/* 👇 THE FIX: Conditionally render EditorOutput only if post.content exists */}
          {/* {post.content ? <EditorOutput content={post.content} /> : null} */}

          <Suspense
            fallback={
              <Loader2 className="h-5 w-5 animate-spin text-zinc-500" />
            }
          >
            {/* Comments or other suspended components would go here */}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default SubRedditPostPage;
