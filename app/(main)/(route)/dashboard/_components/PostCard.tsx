import {
  Avatar,
  AvatarImage,
} from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Id } from '@/convex/_generated/dataModel'
import { createdTime } from '@/lib/utils'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { Post } from '@/lib/type'

type Props = {
  post: Post
}

function PostCard({ post }: Props) {
  let timeStamp = createdTime(
    post._creationTime
  )
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="glass-container flex w-full flex-col rounded-md bg-card from-gray-900 to-gray-950 pt-2 dark:bg-gradient-to-b"
    >
      <div className="flex-start flex items-center gap-4 px-4 py-2">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={post.user.imageUrl}
          />
        </Avatar>
        <div>
          <p className="text-base-semibold">
            {post.user.fullname}
          </p>
          <p className="text-subtle-medium">
            {timeStamp}
          </p>
        </div>
      </div>
      <p className="px-6 pb-2">
        {post.content}
      </p>
      {post.image && (
        <Image
          src={post.image}
          width={200}
          height={160}
          sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
          className="h-full w-full pt-2"
          alt="image"
          priority
        />
      )}
    </motion.div>
  )
}

export default PostCard
PostCard.Skeleton =
  function CoverSkeleton() {
    return (
      <div className="flex w-full flex-col gap-2 rounded-md bg-card pt-2">
        <div className="flex-start flex items-center gap-4 px-4 py-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />

        <Skeleton className="h-72 w-full" />
      </div>
    )
  }
