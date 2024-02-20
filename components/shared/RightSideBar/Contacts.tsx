"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../ui/avatar";
import { useChatbox } from "@/hooks/use-chatbox";
import { getUsers } from "@/components/action/action";
import { User } from "@/lib/type";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

function Contacts() {
  const { user: currentUser } = useUser();
  let [data, setData] = useState<User[]>([]);
  useEffect(() => {
    getUsers().then((res) =>
      setData(
        res.filter((user) => user.id !== currentUser?.id)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { onOpen } = useChatbox();
  if (data.length === 0) {
    return null;
  }
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
        {data.map((friend) => {
          const { id, name, imageUrl } = friend;
          return (
            <div
              className="flex justify-between items-center gap-2 cursor-pointer hover:bg-lightGray rounded-xl px-2"
              key={id}
              onClick={() => onOpen(id, name, imageUrl)}
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Avatar className="border-2 border-lightGray">
                    <AvatarImage src={imageUrl} />
                    <AvatarFallback>{name}</AvatarFallback>
                  </Avatar>
                  <div className="w-3 h-3 absolute right-[1px] bottom-[-1px] rounded-full bg-green border-2 border-white"></div>
                </div>
                <p className="text-body-normal capitalize text-ellipsis">
                  {name}
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
