"use client";
import NewPost from "@/app/(main)/(home)/_components/NewPost";
import Pagination from "@/components/shared/Pagination";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Post from "./_components/Post";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const pageNumber = Number(searchParams.page ? searchParams.page : 1);
  const published = useQuery(api.documents.getPublish);
  console.log(published);

  return (
    <div className="relative flex flex-col gap-7 px-6 py-4 grow items-center max-w-3xl">
      <NewPost />
      {published?.map((post) => <Post key={post._id} post={post} />)}

      <Pagination pageNumber={pageNumber} iSNext={true} path="/" />
    </div>
  );
}
