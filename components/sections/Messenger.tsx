import { Edit, Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import { clerkClient } from "@clerk/nextjs";

async function Messenger() {
  const users = await clerkClient.users.getUserList();

  return (
    <section className="flex flex-col gap-4 p-6 rounded-xl">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-base-semibold text-dark-1 dark:text-light-1">
            Messages
          </p>
          <Edit size={16} />
        </div>
        <div>
          <form
            action=""
            className="px-4 rounded-3xl flex justify-between bg-sky-50 hover:bg-sky-200 grow dark:hover:bg-neutral-100 dark:bg-neutral-300"
          >
            <input
              type="text"
              placeholder="Search"
              className="cursor-pointer h-8 bg-transparent flex-1 w-full p-1 rounded-md shadow-xs text-base  text-dark-1 placeholder-dark-2 focus:outline-none"
            />
            <button type="submit" className="text-dark-1">
              <Search size={16} />
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between border-b-[1px] pb-2 border-dark-2">
          <p className="text-small-semibold text-dark-1 dark:text-light-1">
            Friends
          </p>
          <p className="text-small-semibold text-primary-500 dark:text-light-1">
            Request(4)
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {users.map((friend) => (
            <div
              className="flex justify-between items-center gap-2"
              key={friend.id}
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Image
                    src={friend.imageUrl}
                    alt={friend?.username || ""}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div
                    className={`w-2.5 h-2.5 absolute right-0.5 bottom-0.5 rounded-full bg-sky-500 dark:bg-light-1`}
                  ></div>
                </div>

                <div className="flex flex-col">
                  <p className="text-small-semibold text-dark-1 dark:text-light-1">
                    {friend.firstName && friend.lastName
                      ? friend.firstName + " " + friend.lastName
                      : friend.username}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-subtle-medium text-dark-2">View all</div>
      </div>
    </section>
  );
}

export default Messenger;
