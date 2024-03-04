"use client";
import React from "react";
import Contacts from "./Contacts";
import Conversation from "./Conversation/Conversation";
import ChatContainer from "./Messenger/ChatContainer";
import { useConvexAuth } from "convex/react";

function SideBarContainer() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="w-full h-full flex flex-col justify-start">
      <div className="sticky top-[72px] w-full h-[90vh] flex flex-col gap-5">
        {!isAuthenticated && isLoading && (
          <div className="flex flex-col gap-2 justify-start">
            <section className="w-full h-[300px]">
              <Contacts.Skeleton />
            </section>
            <section className="w-full h-[300px]">
              <Conversation.Skeleton />
            </section>
          </div>
        )}
        {isAuthenticated && !isLoading && (
          <div className="flex flex-col gap-2 justify-start">
            <section className="w-full min-h-[300px]">
              <Contacts />
            </section>
            <section className="w-full min-h-[300px]">
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
