"use client";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../ui/avatar";
import { useChatbox } from "@/hooks/use-chatbox";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function Contacts() {
  const { user } = useUser();
  const { onOpen } = useChatbox();
  const users = useQuery(api.users.list);
  if (!user || !users) return null;
  const friends = users.filter(
    (friend) => friend.convexId !== user.id
  );
  const currentUser = users.find(
    (friend) => friend.convexId === user.id
  );
  if (!currentUser) return null;
  const currentUserInfo = {
    _id: currentUser._id,
    fullname: currentUser.fullname,
    imageUrl: currentUser.imageUrl,
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-2 p-3 bg-card rounded-lg shadow-sm h-full"
    >
      <p className="text-large-bold ">Contacts</p>
      <div className="flex flex-col gap-2 py-2 overflow-y-auto scrollbar-style-1">
        {friends.map((friend) => {
          const friendInfo = {
            _id: friend._id,
            fullname: friend.fullname,
            imageUrl: friend.imageUrl,
          };
          return (
            <div
              className="flex justify-between items-center gap-2 cursor-pointer hover:bg-lightGray rounded-xl px-2"
              key={friend._id}
              onClick={() =>
                onOpen(currentUserInfo, friendInfo)
              }
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Avatar className="border-2 border-lightGray">
                    <AvatarImage src={friend.imageUrl} />
                    <AvatarFallback>
                      {friend.fullname}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-3 h-3 absolute right-[1px] bottom-[-1px] rounded-full bg-green border-2 border-white"></div>
                </div>
                <p className="text-body-normal capitalize text-ellipsis">
                  {friend.fullname}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Contacts;
Contacts.Skeleton = function ConversationSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-3 bg-card rounded-lg shadow-sm h-full">
      <p className="text-large-bold ">Contacts</p>

      <div className="flex flex-col gap-2 py-2 overflow-y-auto scrollbar-style-1">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center gap-2 cursor-pointer hover:bg-lightGray rounded-xl px-2"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
