"use client";
import Image from "next/image";
import React from "react";

type Props = {};

function Messenger({}: Props) {
  // give me some fake user
  const friends = [
    {
      id: 1,
      name: "John Doe",
      avatar: "/assets/user.png",
      status: "online",
    },
    {
      id: 2,
      name: "Paul Doe",
      avatar: "/assets/user.png",
      status: "offline",
    },
    {
      id: 3,
      name: "Patrick Doe",
      avatar: "/assets/user.png",
      status: "offline",
    },
    {
      id: 4,
      name: "James Eric",
      avatar: "/assets/user.png",
      status: "online",
    },
    {
      id: 5,
      name: "Park Jimin",
      avatar: "/assets/user.png",
      status: "online",
    },
    {
      id: 6,
      name: "John Doe",
      avatar: "/assets/user.png",
      status: "online",
    },
    {
      id: 7,
      name: "John Doe",
      avatar: "/assets/user.png",
      status: "offline",
    },
  ];
  return (
    <section className="flex flex-col gap-4 p-6 rounded-xl">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-base-semibold text-dark-1">Messages</p>
          <Image
            src="/assets/edit-gray.svg"
            alt=" edit message"
            width={20}
            height={20}
          />
        </div>
        <div>
          <form
            action=""
            className="px-4 rounded-3xl flex justify-between bg-[#ECE6EB]"
          >
            <input
              type="text"
              placeholder="Search"
              className="h-10 bg-transparent flex-1 w-full p-1 rounded-lg shadow-xs text-base text-dark-1 placeholder-dark-2 focus:outline-none"
            />
            <button type="submit">
              <Image
                src="/assets/search-message.svg"
                alt="search"
                width={20}
                height={20}
              />
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="flex justify-between border-b-[1px] pb-2 border-dark-2">
          <p className="text-small-semibold text-dark-1">Friends</p>
          <p className="text-small-semibold text-primary-500">Request(4)</p>
        </div>
        <div className="flex flex-col gap-2">
          {friends.map((friend) => (
            <div
              className="flex justify-between items-center gap-2"
              key={friend.id}
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Image
                    src={friend.avatar}
                    alt={friend.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div
                    className={`w-2.5 h-2.5 absolute right-0.5 bottom-0.5 rounded-full bg-primary-500`}
                  ></div>
                </div>

                <div className="flex flex-col">
                  <p className="text-small-semibold text-dark-1">
                    {friend.name}
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
