"use client";
import React, { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { useChatbox } from "@/hooks/use-chatbox";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

type Props = {
  id: string;
  name: string;
  imageUrl: string;
};
function Chatbox({ id, name, imageUrl }: Props) {
  const { onClose } = useChatbox();
  const handleClose = () => {
    onClose(id);
  };
  const messageSound = useRef(
    new Audio("/assets/messengers.mp3")
  );
  const messages = useQuery(api.messages.list, {
    toId: id,
  });
  const sendMessage = useMutation(api.messages.send);
  const { user } = useUser();
  const [newMessageText, setNewMessageText] = useState("");
  const chatboxRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop =
        chatboxRef.current.scrollHeight;
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
    scrollToBottom();
  }, []);
  useEffect(() => {
    scrollToBottom();
    if (
      messages &&
      user &&
      messages[messages.length - 1] &&
      messages[messages.length - 1].fromId !== user.id
    ) {
      messageSound.current.play();
    }
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  if (!user) return null;
  return (
    <div className="w-72 bg-card rounded-t-lg flex flex-col border-[1px] border-b-0">
      <div className="flex justify-between items-center p-2 border-b-[1px] shadow-sm">
        <div className="flex gap-2 items-center ">
          <div className="relative">
            <Avatar className="border-2 border-secondary border-">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
            <div className="w-3 h-3 absolute right-[1px] bottom-[-1px] rounded-full bg-green border-2 border-white"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-base-regular capitalize">
              {name}
            </span>
            <span className="text-small-regular text-secondary">
              Online
            </span>
          </div>
        </div>
        <button
          className="hover:bg-lightGray rounded-full p-1"
          onClick={handleClose}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div
        ref={chatboxRef}
        className="h-80 overflow-auto px-2 py-2 flex flex-col gap-1 chatbox"
      >
        {messages?.map((message) => (
          <article
            key={message._id}
            className={`flex px-2 ${
              message.fromId === user.id
                ? "justify-end"
                : ""
            }`}
          >
            <div
              className={`${
                message.fromId === user.id
                  ? "bg-green text-white rounded-md rounded-tr-none"
                  : "text-secondary rounded-md rounded-tl-none"
              } text-small-regular py-1 px-3 max-w-[80%] shadow-md`}
            >
              <p>{message.body}</p>
            </div>
          </article>
        ))}
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await sendMessage({
            body: newMessageText,
            toId: id,
          });
          setNewMessageText("");
        }}
        className="text-subtle-medium h-12 shadow-lg backdrop-blur-md flex border-t-[1px] border-primary/10"
      >
        <input
          ref={inputRef}
          value={newMessageText}
          onChange={async (e) => {
            const text = e.target.value;
            setNewMessageText(text);
          }}
          className="w-full bg-transparent pl-5 pr-18 focus:outline-none placeholder:text-subtle-medium"
          placeholder="Write a message…"
        />
        <button
          type="submit"
          disabled={!newMessageText}
          className="border-0 p-1 min-w-[2em] min-h-[1em] disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default Chatbox;
