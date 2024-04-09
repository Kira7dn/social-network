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

function Contacts() {
  const { user } = useUser()
  const { onOpen } = useChatbox()
  const users = useQuery(api.users.list)
  if (!user || !users) return null
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

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
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
      <div className="scrollbar-style-1 flex flex-col gap-2 overflow-y-auto py-2">
        {friends.map((friend) => {
          const friendInfo = {
            _id: friend._id,
            fullname: friend.fullname,
            imageUrl: friend.imageUrl,
          }
          return (
            <div
              className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-2 hover:bg-lightGray dark:hover:bg-slate-800/50"
              key={friend._id}
              onClick={() =>
                onOpen(
                  currentUserInfo,
                  friendInfo
                )
              }
            >
              <div className="flex items-center gap-2">
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
                <p className="text-ellipsis text-body-normal capitalize">
                  {friend.fullname}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default Contacts
Contacts.Skeleton =
  function ConversationSkeleton() {
    return (
      <div className="flex h-full flex-col gap-2 rounded-lg bg-card p-3 shadow-sm">
        <p className="text-large-bold ">
          Contacts
        </p>

        <div className="scrollbar-style-1 flex flex-col gap-2 overflow-y-auto py-2">
          {[...Array(5)].map(
            (_, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-2 hover:bg-lightGray"
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-[250px]" />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    )
  }
