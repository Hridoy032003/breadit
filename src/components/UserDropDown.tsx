
import React, { FC } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { getAuthSession } from '@/lib/auth'

import Link from 'next/link'

import Logout from './Logout'


const UserDropDown: FC= async ({  }) => {
  const session = await getAuthSession();
  return (
    <div className="relative z-10">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={
                typeof session?.user?.image === "string" && session.user.image
                  ? session.user.image
                  : "/default-avatar.png"
              }
              alt={session?.user?.name ?? "User avatar"}
            />
            <AvatarFallback> CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <p className="text-md ">{session?.user?.email}</p>
            <p className="text-xs text-zinc-600">{session?.user?.name}</p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/feed">Feed</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/r/create">Comunity</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href='/dashboard/${session?.user?.id}'>Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
          
          >
          <Logout/>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDown