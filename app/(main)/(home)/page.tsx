import NewPost from "@/components/forms/NewPost";
import Pagination from "@/components/shared/Pagination";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const pageNumber = Number(searchParams.page ? searchParams.page : 1);
  return (
    <div className="min-h-full flex flex-col gap-7 px-6 py-4 ">
      <NewPost />
      <Pagination pageNumber={pageNumber} iSNext={true} path="/" />
    </div>
  );
}
