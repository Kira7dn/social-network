import ThreadCard from "@/components/cards/ThreadCard";
import NewPost from "@/components/forms/NewPost";
import Pagination from "@/components/shared/Pagination";
import { fetchPosts } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const pageNumber = Number(searchParams.page ? searchParams.page : 1);
  const threads = await fetchPosts(pageNumber, 30);
  return (
    <div className="min-h-full flex flex-col gap-7 ">
      <NewPost />
      <section className="flex flex-col gap-10">
        {threads.posts.length === 0 ? (
          <p>No threads found</p>
        ) : (
          <>
            {threads.posts.map((thread) => (
              <ThreadCard
                key={thread._id}
                id={thread._id}
                currentUserId={user.id}
                parentId={thread.parentId}
                content={thread.content}
                author={thread.author}
                community={thread.community}
                createdAt={thread.createdAt}
                comments={thread.children}
              />
            ))}
          </>
        )}
      </section>
      <Pagination pageNumber={pageNumber} iSNext={true} path="/" />
    </div>
  );
}
