import React from "react";
import Messenger from "../sections/Messenger";
import { Edit } from "lucide-react";
import { clerkClient } from "@clerk/nextjs";
import ChatboxList from "./ChatContainer";
import ChatContainer from "./ChatContainer";

const RightSideBar = async () => {
  const users = await clerkClient.users.getUserList();
  // make function to convert users to plain object
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
      <section className="flex flex-col gap-4 py-6 px-2 rounded-xl fixed">
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
            {users.map((friend) => {
              const { id, username, firstName, lastName, imageUrl } = friend;
              const name =
                firstName && lastName
                  ? firstName + " " + lastName
                  : username || "";
              return (
                <Messenger
                  key={id}
                  id={id}
                  username={username}
                  name={name}
                  imageUrl={imageUrl}
                />
              );
            })}
          </div>
          <div className="text-subtle-medium cursor-pointer">View all</div>
        </div>
      </section>
      <ChatContainer users={plainUsers} />
    </aside>
  );
};

export default RightSideBar;
