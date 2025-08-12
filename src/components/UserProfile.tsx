
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Logout from './Logout';
import { db } from '@/lib/db';
interface PersonalPostProps {
  session: {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  } | null;
}

const UserProfile = async ({ session }: PersonalPostProps) => {
  if (!session?.user) {
    return (
      <div className="text-center text-gray-500 mt-12">
        <p>Please log in to see your posts.</p>
      </div>
    );
  }

  const userPosts = await db.post.findMany({
    where: {
      authorId: session.user.id,
    },
    include: {
      author: true,
      subreddit: true,
    },
    orderBy: {
      createdAt: "desc", // Show the newest posts first
    },
  });
console.log(userPosts)
  if (userPosts.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-12">
        <p>You haven&apos;t created any posts yet.</p>
      </div>
    );
  }

  return (
    <div className="flex gap-10 items-center  px-5">
      <div className="">
        <Avatar>
          <AvatarImage src={session?.user?.image || "/logo.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-5">
        {" "}
        <div>
          {" "}
          <div>{session?.user?.email}</div>
          <p className="text-gray-500 text-sm">{session?.user?.name}</p>
        </div>
        <Logout />
      </div>
    </div>
  );
};

export default UserProfile