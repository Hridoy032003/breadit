import React, { FC } from "react";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import GlobalCommunitrys from "@/components/GlobalCommunitrys";

const Page: FC =async () => {
  const [session] = await Promise.all([getAuthSession()]);

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">Your feed</h1>
      {session ? (
        <GlobalCommunitrys />
      ) : (
        <h1>you need to singin to see this page</h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-emerald-100 px-6 py-4">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <HomeIcon aria-label="home" className="h-4 w-4" />
              Home
            </p>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6 ">
            <div className="flex justify-between gap-x-4 py-3 flex-col gap-y-4">
              <p className="text-zinc-500">
                Your personal Breadit frontpage. Come here to check in with your
                favorite communities.
              </p>
              <Link href={`/r/create`}>
                <Button> Create Community</Button>
              </Link>
            </div>
          </dl>
        </div>
        {/* The second info box is redundant, so it can be removed for clarity */}
      </div>
    </>
  );
};

export default Page;
