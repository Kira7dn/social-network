'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import { PostDialog } from './PostDialog'

type Props = {}

const NewPost = (props: Props) => {
  const { user } = useUser()
  const [open, setOpen] =
    React.useState(false)
  let UserComponent: React.ReactNode = (
    <div className="relative h-11 w-11">
      <Skeleton className="h-full w-full rounded-full" />
    </div>
  )
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  if (user) {
    UserComponent = (
      <div className="relative h-11 w-11">
        <Image
          src={user.imageUrl}
          alt="user"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-full"
        />
      </div>
    )
  }
  const postBtn = [
    {
      title: 'Video',
      icon: '/assets/video.png',
    },
    {
      title: 'Image',
      icon: '/assets/image.png',
    },
    {
      title: 'Emoji',
      icon: '/assets/emoji.png',
    },
  ]

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="glass-container flex w-full flex-col rounded-md bg-card from-gray-900 to-gray-950 pt-2 dark:bg-gradient-to-b"
    >
      <div className="flex flex-col items-center justify-center gap-2 px-4">
        <div className="flex w-full items-center justify-between gap-2 ">
          {UserComponent}
          <div
            className="grow rounded-3xl border-[1px] border-secondary hover:bg-lightGray dark:hover:bg-slate-800/50"
            onClick={() =>
              setOpen(true)
            }
          >
            <p className="ml-2 flex h-10 w-full flex-1 cursor-pointer items-center rounded-lg p-1 text-base-medium shadow-sm">
              Share your idea?
            </p>
          </div>
        </div>
        <Separator className="my-1" />
        <div className="flex w-3/5 flex-row items-center justify-between pb-2">
          {postBtn.map((btn) => (
            <div
              key={btn.title}
              className="flex cursor-pointer gap-2"
            >
              <div className="relative h-6 w-6 ">
                <Image
                  src={btn.icon}
                  alt={btn.title}
                  fill
                  sizes="(max-width: 200px) 100vw"
                />
              </div>
              <div>
                <p className="text-center text-base-medium">
                  {btn.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PostDialog
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </motion.div>
  )
}

export default NewPost
