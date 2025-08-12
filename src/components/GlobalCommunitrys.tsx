"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

// Define the type for a single community
interface Community {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string | null;
}

const GlobalCommunitrys = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const fetchCommunities = async () => {
   
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await fetch(`/api/communities?page=${page}`);
    const newCommunities: Community[] = await response.json();

    if (newCommunities.length > 0) {
      setCommunities((prev) => [...prev, ...newCommunities]);
      setPage((prev) => prev + 1);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      fetchCommunities();
    }
  }, [inView, hasMore]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        Global Communities
      </h1>
      {communities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {communities.map((community) => (
            <Card key={community.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{community.name}</CardTitle>
                <CardDescription>
                  Creator ID: {community.creatorId}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Created on:{" "}
                  {new Date(community.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/r/${community.name}`} passHref>
                  <Button className="w-full">Visit Community</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-12">
          <p>No communities found.</p>
        </div>
      )}
      {hasMore && (
        <div
          ref={ref}
          className="flex justify-center items-center p-4 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4"
        >
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default GlobalCommunitrys;
