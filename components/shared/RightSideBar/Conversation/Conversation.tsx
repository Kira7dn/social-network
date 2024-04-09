'use client'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { MessagesSquareIcon } from 'lucide-react'
import SearchBar from './SearchBar'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { useChatbox } from '@/hooks/use-chatbox'
import { User } from '@/lib/type'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'
import useFetchUser from '@/hooks/use-fetch-user'

function Conversation() {
  const { onOpen } = useChatbox()
  const currentUser = useFetchUser()
  const conversations = useQuery(
    api.messages.getConversations
  )
  if (!currentUser || !conversations)
    return null
  let conversationList =
    conversations.map((conv) => {
      let friend: User | undefined
      if (
        conv.from?._id !==
        currentUser._id
      ) {
        friend = conv.from
      } else {
        friend = conv.to
      }
      return {
        body: conv.body,
        friend: friend,
      }
    })
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className=" flex h-full flex-col gap-2 rounded-lg p-3 pt-2 shadow-sm"
    >
      <div className="flex items-center gap-2 text-large-bold">
        <MessagesSquareIcon />
        <p className="">
          Conversations
        </p>
      </div>
      <SearchBar />
      <div className="w-full overflow-y-auto">
        {conversationList.map(
          (conversation) => {
            if (
              !conversation ||
              !conversation.friend
            )
              return null
            return (
              <div
                key={
                  conversation.friend
                    ._id
                }
                className="flex w-full cursor-pointer gap-2 rounded-xl px-2 py-1 hover:bg-hover dark:hover:bg-slate-800/50"
                onClick={() =>
                  conversation.friend &&
                  onOpen(
                    currentUser,
                    conversation.friend
                  )
                }
              >
                <div className="relative h-fit">
                  <Avatar className="border-2 border-lightGray ">
                    <AvatarImage
                      src={
                        conversation
                          .friend
                          .imageUrl
                      }
                    />
                    <AvatarFallback>
                      {
                        conversation
                          .friend
                          .fullname
                      }
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-[-1px] right-[1px] h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="text-small-semibold">
                    {
                      conversation
                        .friend.fullname
                    }
                  </div>
                  <p className="line-clamp-1 overflow-hidden text-ellipsis text-tiny-medium font-light">
                    {conversation.body}
                  </p>
                </div>
              </div>
            )
          }
        )}
      </div>
    </motion.div>
  )
}

export default Conversation
Conversation.Skeleton =
  function ConversationSkeleton() {
    return (
      <div className="flex h-full flex-col gap-2 rounded-lg bg-card p-3 pt-2 shadow-sm">
        <div className="flex items-center gap-2 text-large-bold">
          <MessagesSquareIcon />
          <p className="">
            Conversations
          </p>
        </div>
        <SearchBar />
        <div className="w-full overflow-y-auto">
          {[...Array(5)].map(
            (_, index) => (
              <div
                key={index}
                className="flex w-full gap-2 rounded-xl px-2 py-1"
              >
                <div className="relative h-fit">
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[250px]" />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    )
  }
