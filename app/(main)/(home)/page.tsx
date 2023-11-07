"use client";
import NewPost from "@/app/(main)/(home)/_components/NewPost";
import Pagination from "@/app/(main)/(home)/_components/Pagination";
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
  let Posts;
  if (published === undefined) {
    Posts = (
      <>
        <Post.Skeleton />
        <Post.Skeleton />
        <Post.Skeleton />
      </>
    );
  } else if (published === null) {
    Posts = <div>Not found</div>;
  } else {
    Posts = published?.map((post) => <Post key={post._id} post={post} />);
  }

  return (
    <div className="h-auto relative flex flex-col gap-7 px-6 py-4 grow items-center max-w-3xl pb-4">
      <NewPost />
      {Posts}
      <Pagination pageNumber={pageNumber} iSNext={true} path="/" />
    </div>
  );
}
