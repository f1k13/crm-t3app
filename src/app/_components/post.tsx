"use client";

import { Button } from "@heroui/react";
import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestPost() {
  // const [latestPost] = api.post.getLatest.useSuspenseQuery();

  // const utils = api.useUtils();
  // const [name, setName] = useState("");
  // const createPost = api.post.create.useMutation({
  //   onSuccess: async () => {
  //     await utils.post.invalidate();
  //     setName("");
  //   },
  // });

  return (
    <div className="w-full max-w-xs">
      <p className="text-sky-400">The quick brown fox...</p>
      {/* {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 text-white rounded-full bg-white/10"
        />
        <button
          type="submit"
          className="px-10 py-3 font-semibold transition rounded-full bg-white/10 hover:bg-white/20"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button> */}
      <Button variant={"faded"}>лох</Button>
    </div>
  );
}
