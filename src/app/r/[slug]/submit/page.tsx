import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

// We no longer need this interface
// interface pageProps {
//   params: {
//     slug: string
//   }
// }

// 👇 CHANGE #1: Define the props inline, destructure 'params', and type it as a Promise.
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  // 👇 CHANGE #2: Correctly await the params Promise to get the slug.
  const { slug } = await params;

  const subreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
  });

  if (!subreddit) return notFound();

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="border-b border-gray-200 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
            Create Post
          </h3>
          {/* 👇 CHANGE #3: Use the resolved 'slug' variable, not 'params.slug'. */}
          <p className="ml-2 mt-1 truncate text-sm text-gray-500">
            in r/{slug}
          </p>
        </div>
      </div>

      <Editor subredditId={subreddit.id} />

      <div className="w-full flex justify-end">
        <Button type="submit" className="w-full" form="subreddit-post-form">
          Post
        </Button>
      </div>
    </div>
  );
};

export default page;
