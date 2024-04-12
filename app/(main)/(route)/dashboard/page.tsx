'use client'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import PostCard from './_components/PostCard'
import NewPost from './_components/NewPost'

export default function Home() {
  const posts = useQuery(
    api.posts.getPosts,
    {
      parent: undefined,
    }
  )
  let Posts
  if (posts === undefined) {
    Posts = (
      <>
        <PostCard.Skeleton />
        <PostCard.Skeleton />
        <PostCard.Skeleton />
      </>
    )
  } else if (posts.length === 0) {
    Posts = (
      <p className="mt-14">
        Posts Not found
      </p>
    )
  } else {
    Posts = posts?.map((post) => {
      if (post) {
        return (
          <PostCard
            key={post._id}
            post={post}
          />
        )
      }
    })
  }
  return (
    <div className="relative z-10 flex h-auto w-full max-w-4xl flex-col items-center gap-7 py-4 pb-4">
      <NewPost />
      {Posts}
    </div>
  )
}
