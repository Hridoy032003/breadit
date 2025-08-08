
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { getAuthSession } from '@/lib/auth';
import UserDropDown from './UserDropDown';

const Navbar = async () => {
  const session = await getAuthSession();
  console.log('Session is:', session);
 
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-3">
      <div className=" flex items-center justify-between w-full max-w-7xl mx-auto px-4">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/logo.png"
            alt="Breadit Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <p className=" text-zinc-700 text-sm font-medium md:block">Breadit</p>
        </Link>
        {session && (
          <>
    
            <UserDropDown  />
          </>
        )}
        {!session && (
          <Link href="/sign-in">
            <Button variant="default">Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar
