"use client";
import React, { useState } from "react";
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

// 1. Define an interface for the Community object
interface Community {
  id: string; // or number, depending on your data
  name: string;
  creatorId: string;
  createdAt: string | Date; // Use string or Date, consistent with your data
}

const UserComunity = () => {
  // 2. Apply the type to the useState hook
  const [communities] = useState<Community[]>([]);

  return (
    <div>
      {" "}
      {communities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {/* 3. TypeScript now correctly infers the type of 'community' */}
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
    </div>
  );
};

export default UserComunity;
