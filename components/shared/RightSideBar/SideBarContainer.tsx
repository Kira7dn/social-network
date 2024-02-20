"use client";
import React from "react";
import Contacts from "./Contacts";
import Conversation from "./Conversation/Conversation";
import ChatContainer from "./Messenger/ChatContainer";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

function SideBarContainer() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="w-full h-full flex flex-col justify-start">
      <div className="sticky top-[72px] w-full h-[90vh] flex flex-col gap-5">
        {!isAuthenticated && isLoading && (
          <div className="flex flex-col gap-2 justify-start">
            <section className="w-full">
              <Contacts.Skeleton />
            </section>
            <section className="w-full">
              <Conversation.Skeleton />
            </section>
          </div>
        )}
        {!isAuthenticated && !isLoading && (
          <p>
            Click{" "}
            <Link
              href="/sign-in"
              className="text-indigo-500"
            >
              here
            </Link>{" "}
            to sign-in
          </p>
        )}
        {isAuthenticated && !isLoading && (
          <div className="flex flex-col gap-2 justify-start">
            <section className="w-full">
              <Contacts />
            </section>
            <section className="w-full">
              <Conversation />
            </section>
            <ChatContainer />
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBarContainer;
