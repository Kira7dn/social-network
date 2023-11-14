"use client";
import { useChatbox } from "@/hooks/use-chatbox";
import React from "react";
import Chatbox from "./ChatBox";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type Props = {
  users: {
    id: string;
    username: string | null;
    name: string;
    imageUrl: string;
  }[];
};

const ChatContainer = ({ users }: Props) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div>{isAuthenticated && !isLoading && <ChatboxList users={users} />}</div>
  );
};

export default ChatContainer;

const ChatboxList = ({ users }: Props) => {
  const { store, onOpen } = useChatbox();
  const messages = useQuery(api.messages.getUnseen);
  const updateSeen = useMutation(api.messages.updateSeen);
  if (messages) {
    messages.forEach((message) => {
      const name = users.filter((user) => user.id === message.fromId)[0].name;
      const imageUrl = users.filter((user) => user.id === message.fromId)[0]
        .imageUrl;
      onOpen(message.fromId, name, imageUrl);
      updateSeen({ id: message._id });
    });
  }
  return (
    <div className="fixed bottom-0 right-8 flex gap-2 flex-row">
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
