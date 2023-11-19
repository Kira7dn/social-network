import React from "react";
import Messenger from "./Messenger";
import { Edit } from "lucide-react";
import { clerkClient } from "@clerk/nextjs";
import ChatContainer from "./ChatContainer";

const RightSideBar = async () => {
  let users = await clerkClient.users.getUserList();
  const plainUsers = users.map((user) => {
    return {
      id: user.id,
      username: user.username,
      name:
        user.firstName && user.lastName
          ? user.firstName + " " + user.lastName
          : user.username || "",
      imageUrl: user.imageUrl,
    };
  });
  return (
    <aside className="border-l-2 border-secondary overflow-y-auto w-60">
      <section className="w-full flex flex-col gap-4 py-6 px-4 rounded-xl fixed">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-base-semibold ">Messages</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <Messenger users={plainUsers} />
        </div>
      </section>
      <ChatContainer users={plainUsers} />
    </aside>
  );
};

export default RightSideBar;
