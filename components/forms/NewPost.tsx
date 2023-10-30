"use client";
import Image from "next/image";
import React from "react";

type Props = {};

const NewPost = (props: Props) => {
  return (
    <div className="bg-light-1 rounded-lg flex flex-col ">
      <div className="border-b-[2px] border-neutral-200 pb-2">
        <div className="flex justify-center items-center gap-2">
          <div className="h-11 w-11 relative">
            <Image
              src="/assets/user.png"
              alt="user"
              fill
              className="rounded-full"
            />
          </div>
          <div className="grow h-full ">
            <div className="flex gap-2 items-center justify-between ">
              <div className="rounded-xl bg-[#ECE6EB] grow hover:bg-light-2">
                <p
                  onClick={() => console.log("clicked")}
                  className="flex items-center cursor-pointer ml-2 h-10 bg-transparent flex-1 w-full p-1 rounded-lg shadow-xs text-base text-dark-2 focus:outline-none"
                >
                  What is on your mind?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
