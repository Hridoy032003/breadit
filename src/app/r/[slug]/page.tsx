import MiniCreatePost from "@/components/MiniCreatePost";
import PostFeed from "@/components/PostFeed";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";


interface post{
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
    
    

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {

  const { slug } = await params;
  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      
        take: 3,
      },
    },
  });

  if (!subreddit) return notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{subreddit.name}
      </h1>
      <MiniCreatePost session={session} />
      <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} />
    </>
  );
};

export default page;
