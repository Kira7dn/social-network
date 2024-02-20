"use client";
import { useQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import { useUsers } from "@/hooks/use-users";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { MessagesSquareIcon } from "lucide-react";
import SearchBar from "./SearchBar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useChatbox } from "@/hooks/use-chatbox";
import { User } from "@/lib/type";
import { getUsers } from "@/components/action/action";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

function Conversation() {
  const { onOpen } = useChatbox();
  const { user: currentUser } = useUser();
  let [store, setData] = useState<User[]>([]);
  useEffect(() => {
    getUsers().then((res) =>
      setData(
        res.filter((user) => user.id !== currentUser?.id)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const conversation = useQuery(
    api.messages.getConversations
  );
  if (!currentUser || !conversation) return null;
  let conversationList = conversation.map((conv) => {
    let friendId: string;
    if (conv.fromId !== currentUser.id) {
      friendId = conv.fromId;
    } else {
      friendId = conv.toId;
    }
    const user = store.find((user) => user.id === friendId);
    if (user)
      return {
        lastMessage: conv.body,
        id: friendId,
        name: user.name,
        imageUrl: user.imageUrl,
      };
  });
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-2 p-3 bg-card rounded-lg shadow-sm pt-2 h-full"
    >
      <div className="flex gap-2 items-center text-large-bold">
        <MessagesSquareIcon />
        <p className="">Conversations</p>
      </div>
      <SearchBar />
      <div className="w-full overflow-y-auto">
        {conversationList.map((conversation) => {
          if (!conversation) return null;
          return (
            <div
              key={conversation.id}
              className="w-full py-1 px-2 flex gap-2 hover:bg-lightGray rounded-xl cursor-pointer"
              onClick={() =>
                onOpen(
                  conversation.id,
                  conversation.name,
                  conversation.imageUrl
                )
              }
            >
              <div className="relative h-fit">
                <Avatar className="border-2 border-lightGray ">
                  <AvatarImage
                    src={conversation.imageUrl}
                  />
                  <AvatarFallback>
                    {conversation.name}
                  </AvatarFallback>
                </Avatar>
                <div className="w-3 h-3 absolute right-[1px] bottom-[-1px] rounded-full bg-green border-2 border-white"></div>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="text-small-semibold">
                  {conversation.name}
                </div>
                <p className="text-tiny-medium text-secondary text-ellipsis overflow-hidden line-clamp-1">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Conversation;
Conversation.Skeleton = function ConversationSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-3 bg-card rounded-lg shadow-sm pt-2 h-full">
      <div className="flex gap-2 items-center text-large-bold">
        <MessagesSquareIcon />
        <p className="">Conversations</p>
      </div>
      <SearchBar />
      <div className="w-full overflow-y-auto">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="w-full py-1 px-2 flex gap-2 rounded-xl"
          >
            <div className="relative h-fit">
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
