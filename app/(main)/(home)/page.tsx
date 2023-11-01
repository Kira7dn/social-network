"use client";
import Editor from "@/components/editor";
import NewPost from "@/components/forms/NewPost";
import Pagination from "@/components/shared/Pagination";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const pageNumber = Number(searchParams.page ? searchParams.page : 1);
  const published = useQuery(api.documents.getPublish);
  console.log(published);

  return (
    <div className="min-h-full flex flex-col gap-7 px-6 py-4 grow">
      <NewPost />
      {published && (
        <Editor
          editable={false}
          onChange={(content: string) => {
            console.log(content);
          }}
          initialContent={published[0].content}
        />
      )}
      <Pagination pageNumber={pageNumber} iSNext={true} path="/" />
    </div>
  );
}
