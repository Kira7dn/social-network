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
import { ScrollArea } from '@/components/ui/scroll-area'
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
function Conversation() {
  const { onOpen } = useChatbox()
  const currentUser = useFetchUser()
  const conversations = useQuery(
    api.messages.getConversations
  )
  if (!currentUser || !conversations)
    return Conversation.Skeleton()
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

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-2 rounded-lg p-3 shadow-sm"
    >
      <div className="flex items-center gap-2 text-large-bold">
        <MessagesSquareIcon />
        <p className="">
          Conversations
        </p>
      </div>
      <SearchBar />
      <ScrollArea className="h-40 w-full py-2">
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
      </ScrollArea>
    </motion.div>
  )
}

export default Conversation
Conversation.Skeleton =
  function ConversationSkeleton() {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="flex h-fit flex-col gap-2 rounded-lg p-3 shadow-sm"
      >
        <div className="flex items-center gap-2 text-large-bold">
          <MessagesSquareIcon />
          <p className="">
            Conversations
          </p>
        </div>
        <SearchBar />
        <ScrollArea className="h-40 w-full py-2">
          {[...Array(5)].map(
            (_, index) => (
              <div
                key={index}
                className="flex w-full gap-2 rounded-xl px-2 py-1"
              >
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex w-full flex-col gap-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            )
          )}
        </ScrollArea>
      </motion.div>
    )
  }
