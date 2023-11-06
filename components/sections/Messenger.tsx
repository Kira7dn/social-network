import { Edit, Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import { clerkClient } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

async function Messenger() {
  const users = await clerkClient.users.getUserList();

  return (
    <section className="flex flex-col gap-4 p-6 rounded-xl">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-base-semibold ">Messages</p>
          <Edit size={16} className="text-primary cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between border-b-[1px] pb-2 border-primary/20">
          <p className="text-small-semibold ">Friends</p>
          <p className="text-small-semibold ">Request(4)</p>
        </div>
        <div className="flex flex-col gap-2">
          {users.map((friend) => (
            <div
              className="flex justify-between items-center gap-2"
              key={friend.id}
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={friend.imageUrl} />
                    <AvatarFallback>
                      {friend.firstName && friend.lastName
                        ? friend.firstName + " " + friend.lastName
                        : friend.username}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`w-2.5 h-2.5 absolute right-0.5 bottom-0.5 rounded-full bg-sky-500 `}
                  ></div>
                </div>

                <div className="flex flex-col">
                  <p className="text-small-semibold ">
                    {friend.firstName && friend.lastName
                      ? friend.firstName + " " + friend.lastName
                      : friend.username}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-subtle-medium cursor-pointer">View all</div>
      </div>
    </section>
  );
}

export default Messenger;
