"use client";
import { useChatbox } from "@/hooks/use-chatbox";
import React from "react";
import Chatbox from "./ChatBox";

type Props = {};

const ChatboxList = (props: Props) => {
  const { store } = useChatbox();
  return (
    <div className="fixed bottom-0 right-0 flex gap-2 flex-row">
      {store.map((friend) => (
        <Chatbox
          id={friend.id}
          key={friend.id}
          name={friend.name}
          imageUrl={friend.imageUrl}
        />
      ))}
    </div>
  );
};

export default ChatboxList;
