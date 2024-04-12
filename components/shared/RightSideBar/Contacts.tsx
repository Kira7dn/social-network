'use client'
import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../ui/avatar'
import { useChatbox } from '@/hooks/use-chatbox'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { ScrollArea } from '@/components/ui/scroll-area'
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
function Contacts() {
  const { onOpen } = useChatbox()
  const { user } = useUser()
  const users = useQuery(api.users.list)
  if (!user || !users)
    return Contacts.Skeleton()
  const friends = users.filter(
    (friend) =>
      friend.convexId !== user.id
  )
  const currentUser = users.find(
    (friend) =>
      friend.convexId === user.id
  )
  if (!currentUser) return null
  const currentUserInfo = {
    _id: currentUser._id,
    fullname: currentUser.fullname,
    imageUrl: currentUser.imageUrl,
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="flex h-full flex-col gap-2 rounded-lg p-3"
    >
      <p className="text-large-bold ">
        Contacts
      </p>
      <ScrollArea className="h-72 w-full py-2">
        {friends.map((friend) => {
          const friendInfo = {
            _id: friend._id,
            fullname: friend.fullname,
            imageUrl: friend.imageUrl,
          }
          return (
            <div
              className="my-2 flex cursor-pointer items-center justify-between gap-2 rounded-l-xl px-2 hover:bg-lightGray dark:hover:bg-slate-800/50"
              key={friend._id}
              onClick={() =>
                onOpen(
                  currentUserInfo,
                  friendInfo
                )
              }
            >
              <div className="flex w-full items-center gap-2">
                <div className="relative">
                  <Avatar className="border-2 border-lightGray">
                    <AvatarImage
                      src={
                        friend.imageUrl
                      }
                    />
                    <AvatarFallback>
                      {friend.fullname}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-[-1px] right-[1px] h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                </div>
                <p className="truncate text-body-normal capitalize">
                  {friend.fullname}
                </p>
              </div>
            </div>
          )
        })}
      </ScrollArea>
    </motion.div>
  )
}

export default Contacts
Contacts.Skeleton =
  function ConversationSkeleton() {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="flex h-full flex-col gap-2 rounded-lg p-3 shadow-sm"
      >
        <p className="text-large-bold ">
          Contacts
        </p>

        <ScrollArea className="h-72 w-full py-2">
          {[...Array(3)].map(
            (_, index) => (
              <div
                key={index}
                className="my-2 flex cursor-pointer items-center justify-between gap-2 rounded-l-xl px-2"
              >
                <div className="flex w-full items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full border-2 border-lightGray" />
                  <Skeleton className="h-6 w-3/4" />
                </div>
              </div>
            )
          )}
        </ScrollArea>
      </motion.div>
    )
  }
