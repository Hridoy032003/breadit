"use client";


import { Image as ImageIcon, Link2 } from "lucide-react";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import type { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <li className="overflow-hidden rounded-md bg-white shadow">
      <div className="h-full px-6 py-4 flex justify-between gap-6">
        <div className="relative">
          <Avatar>
            <AvatarImage
              src={
                typeof session?.user?.image === "string" && session.user.image
                  ? session.user.image
                  : "/default-avatar.png"
              }
              alt={session?.user?.name ?? "User avatar"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500  outline-2 outline-white" />
        </div>
        <Input
          onClick={() => router.push(pathname + "/submit")}
          readOnly
          placeholder="Create post"
        />
        <Button
          onClick={() => router.push(pathname + "/submit")}
          variant="ghost"
        >
          <ImageIcon className="text-zinc-600" />
        </Button>
        <Button
          onClick={() => router.push(pathname + "/submit")}
          variant="ghost"
        >
          <Link2 className="text-zinc-600" />
        </Button>
      </div>
    </li>
  );
};

export default MiniCreatePost;
