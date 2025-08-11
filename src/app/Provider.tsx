
"use client";

import QueryProvider from "@/context/providers";

import { SessionProvider } from "next-auth/react";

type session = {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
};
export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: session | null;
}) {
  return (
    <QueryProvider>
      <SessionProvider session={session}>{children}</SessionProvider>;
    </QueryProvider>
  );
  
}
