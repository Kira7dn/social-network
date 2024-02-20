"use client";
import { useChatbox } from "@/hooks/use-chatbox";
import React from "react";
import {
  useConvexAuth,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import Chatbox from "./ChatBox";
import { useUsers } from "@/hooks/use-users";

const ChatContainer = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div>
      {isAuthenticated && !isLoading && <ChatboxList />}
    </div>
  );
};

export default ChatContainer;

const ChatboxList = () => {
  const { store: users } = useUsers();
  const { store, onOpen } = useChatbox();
  const messages = useQuery(api.messages.getUnseen);
  const updateSeen = useMutation(api.messages.updateSeen);
  if (messages) {
    messages.forEach((message) => {
      const name = users.filter(
        (user) => user.id === message.fromId
      )[0].name;
      const imageUrl = users.filter(
        (user) => user.id === message.fromId
      )[0].imageUrl;
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
