"use client";
import React, { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { useChatbox } from "@/hooks/use-chatbox";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

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
  const messageSound = useRef(new Audio("/assets/messengers.mp3"));
  const messages = useQuery(api.messages.list, { toId: id });
  const sendMessage = useMutation(api.messages.send);
  const { user } = useUser();
  const [newMessageText, setNewMessageText] = useState("");
  useEffect(() => {
    const chatbox = document.querySelector(".chatbox");
    if (chatbox) {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
    if (
      messages &&
      user &&
      messages[messages.length - 1] &&
      messages[messages.length - 1].fromId !== user.id
    ) {
      messageSound.current.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  if (!user) return null;
  return (
    <div className="h-80 w-60 bg-card rounded-t-lg flex flex-col border-[1px] border-b-0">
      <div className="flex justify-between items-center p-2 border-b-[1px] shadow-sm">
        <div className="flex gap-2 items-center ">
          <Avatar className="h-6 w-6">
            <AvatarImage src={imageUrl} />
          </Avatar>
          <span className="text-small-regular capitalize">{name}</span>
        </div>
        <button
          className="hover:bg-primary/10 rounded-full p-1"
          onClick={handleClose}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="h-64 overflow-auto chatbox px-2">
        {messages?.map((message) => (
          <article
            key={message._id}
            className={`flex ${
              message.fromId === user.id ? "justify-end" : ""
            }`}
          >
            <div
              className={`gap-2 ${
                message.fromId === user.id
                  ? "text-right justify-self-end col-start-1 col-end-3"
                  : ""
              }`}
            >
              {message.fromId === id && (
                <Avatar className="w-6 h-6">
                  <AvatarImage src={imageUrl} />
                </Avatar>
              )}
            </div>

            <p
              className={`text-subtle-medium font-light w mb-1 p-2 mx-2 text-ellipsis ${
                message.fromId === user.id
                  ? "bg-primary/80 text-primary-foreground rounded-sm"
                  : ""
              }`}
            >
              {message.body}
            </p>
          </article>
        ))}
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await sendMessage({ body: newMessageText, toId: id });
          setNewMessageText("");
        }}
        className="text-subtle-medium h-12 shadow-lg backdrop-blur-md flex border-t-[1px] border-primary/10"
      >
        <input
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
