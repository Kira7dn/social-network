"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import PostCard from "./_components/PostCard";

export default function Home() {
  const published = useQuery(api.documents.getPublish);
  let Posts;
  if (published === undefined) {
    Posts = (
      <>
        <PostCard.Skeleton />
        <PostCard.Skeleton />
        <PostCard.Skeleton />
      </>
    );
  } else if (published === null) {
    Posts = <div>Not found</div>;
  } else {
    Posts = published?.map((post) => (
      <PostCard key={post._id} post={post} />
    ));
  }
  return (
    <div className="h-auto relative flex flex-col gap-7 py-4 w-full items-center max-w-4xl pb-4">
      {Posts}
    </div>
  );
}
