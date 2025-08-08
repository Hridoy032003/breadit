"use client";

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { toast } from "react-toastify";
import { Button } from "./ui/button";

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean;
  subredditId: string;
  subredditName: string;
}
interface SubscribeToSubredditPayload {
  subredditId: string;
}

const SubscribeLeaveToggle = ({
  isSubscribed,
  subredditId,
  subredditName,
}: SubscribeLeaveToggleProps) => {
  const router = useRouter();

  const { mutate: subscribe } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post("/api/subreddit/subscribe", payload);

      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast.error(
            "You must be logged in to subscribe to a subreddit."
          );
        }
      }

      return toast.error(
        "There was an error subscribing to the subreddit. Please try again later."
      );
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      toast.success(
        `You are now subscribed to ${subredditName}. You can now post and comment!`
      );
    },
  });

  const { mutate: unsubscribe } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post("/api/subreddit/unsubscribe", payload);

      return data as string;
    },
    onError: (err: AxiosError) => {
      console.log(err);
      toast.error(
        "There was an error unsubscribing from the subreddit. Please try again later."
      );
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      toast.success(
        `You have left ${subredditName}. You can no longer post or comment!`
      );
    },
  });

  return isSubscribed ? (
    <Button className="w-full mt-1 mb-4" onClick={() => unsubscribe()}>
      {/* {loding ? "Leaving..." : "Leave Community"} */}
      Leave Community
    </Button>
  ) : (
    <Button className="w-full mt-1 mb-4" onClick={() => subscribe()}>
      {/* { loding ? "Subscribing..." : "Join Community" } */}
      Join Community
    </Button>
  );
};

export default SubscribeLeaveToggle;
