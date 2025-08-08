import React, { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
// If you use signOut, make sure it's imported
// import { signOut } from "next-auth/react";


const UserDropDown: FC= async () => {
  const session = await getAuthSession();

  // If there's no session, it's often better to render nothing or a login button.
  if (!session?.user) {
    return (
      <Link href="/sign-in">
        <button>Sign In</button>
      </Link>
    );
  }

  return (
    <div className="relative z-10">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={session.user.image ?? undefined}
              alt={session.user.name ?? "User avatar"}
            />
            <AvatarFallback>
              CN
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <p className="text-md font-medium">{session.user.name}</p>
            {session.user.email && (
              <p className="text-xs text-zinc-600">{session.user.email}</p>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/feed">Feed</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/r/create">Create Community</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              // signOut({ callbackUrl: '/' });
            }}
            className="cursor-pointer"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDown;
