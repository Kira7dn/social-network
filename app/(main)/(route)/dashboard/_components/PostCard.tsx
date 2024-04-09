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

type Props = {
  post: {
    _id: Id<'documents'>
    _creationTime: number
    content?: string | undefined
    parentDocument?:
      | Id<'documents'>
      | undefined
    coverImage?: string | undefined
    icon?: string | undefined
    title: string
    userId: string
    userPicture: string
    userFullname: string
    isArchived: boolean
    isPublished: boolean
  }
}

function PostCard({ post }: Props) {
  let data = JSON.parse(
    post?.content || ''
  )
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
            src={post?.userPicture}
          />
        </Avatar>
        <div>
          <p className="text-base-semibold">
            {post.userFullname}
          </p>
          <p className="text-subtle-medium">
            {timeStamp}
          </p>
        </div>
      </div>
      <p className="text-heading4-medium px-2">{`${post.icon} ${post.title}`}</p>
      {data.map(
        (item: {
          title: string
          content: any
          type: string
          id:
            | React.Key
            | null
            | undefined
          props: {
            url: string | StaticImport
            width: number
          }
        }) => {
          if (item.type === 'image') {
            return (
              <Image
                key={item.id}
                src={item.props.url}
                width={200}
                height={160}
                sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                className="h-full w-full pt-2"
                alt="image"
                // objectFit="contain"
                priority
              />
            )
          }
          if (
            item.type === 'paragraph'
          ) {
            if (!item.content[0])
              return null
            let text =
              item.content.reduce(
                (
                  acc: string,
                  curr: { text: string }
                ) => acc + curr.text,
                ''
              )
            return (
              <p
                key={item.id}
                className="px-6 pb-2"
              >
                {text}
              </p>
            )
          }
        }
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
