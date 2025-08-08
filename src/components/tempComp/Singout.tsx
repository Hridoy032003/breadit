import React from 'react'
import {  DropdownMenuItem} from '@/components/ui/dropdown-menu'
import { signOut as SignOut } from 'next-auth/react';
const Singout = () => {
  return (
    <div>
      {" "}
      <DropdownMenuItem onClick={() => SignOut({ callbackUrl: "/" })}>
        Sign Out
      </DropdownMenuItem>
    </div>
  );
}

export default Singout