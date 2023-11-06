"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const NewPost = (props: Props) => {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="w-full rounded-md flex flex-col bg-card px-4 py-6">
      <div className="">
        <div className="flex justify-center items-center gap-2">
          <div className="h-11 w-11 relative">
            <Image
              src={user?.imageUrl}
              alt="user"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-full"
            />
          </div>
          <div className="grow h-full">
            <div className="flex gap-2 items-center justify-between ">
              <Link
                className="rounded-3xl border-[1px] border-secondary hover:bg-secondary grow"
                href="/workspaces"
              >
                <p className="flex items-center cursor-pointer ml-2 h-10 flex-1 w-full p-1 rounded-lg shadow-xs text-base text-secondary-foreground">
                  What is on your mind?
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;