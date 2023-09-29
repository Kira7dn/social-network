import Pagination from "@/components/shared/Pagination";
import { fetchPosts } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;
  const pageNumber = Number(searchParams.page ? searchParams.page : 1);
  const threads = await fetchPosts(pageNumber, 30);
  console.log(threads);
  return (
    <div>
      <Pagination pageNumber={pageNumber} iSNext={true} path="/" />
    </div>
  );
}
