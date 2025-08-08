"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Separator } from "@/components/ui/separator";


interface CreateSubredditPayload {
  subredditName: string;
  title?: string; 
}

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();


  const { mutate: createCommunity, isPending } = useMutation({
    mutationFn: async () => {
      
      const payload: CreateSubredditPayload = {
        subredditName: inputValue,
      };

      const { data } = await axios.post("/api/subreddit", payload);
      return data; 
    },
onError: (error: AxiosError) => {
    toast.error(
      error.response?.status === 409
        ? "Community already exists"
        : "Something went wrong"
    );
},
    onSuccess: (data) => {
      
    toast.success("Community created successfully!");
      router.push(`/r/${data.name}`);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <div className="bg-white p-10 rounded-md gap-10 -mt-20">
        <h1 className="text-2xl font-semibold">Create Community</h1>
        <Separator className="my-5" />
        <div className="flex flex-col">
          <h1 className="text-lg">Name</h1>
          <p className="text-sm text-zinc-600">
            Name of your community, must be unique.
          </p>
          <div className="relative mt-2">
            <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">
              r/
            </p>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="pl-6" // Add padding to not overlap with "r/"
            />
          </div>
          <div className="flex justify-between pt-4 gap-2 ">
            <Button variant="ghost" onClick={() => router.back()} className="flex-1/2">
              Cancel
            </Button>
            <Button
             
              onClick={() => createCommunity()}
            >
             {isPending ? "Creating..." : "Create Community"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
