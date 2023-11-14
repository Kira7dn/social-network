"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useChatbox } from "@/hooks/use-chatbox";
import ChatboxList from "../shared/ChatContainer";

type Props = {
  id: string;
  username: string | null;
  name: string;
  imageUrl: string;
};

function Messenger({ id, username, name, imageUrl }: Props) {
  const { onOpen } = useChatbox();

  return (
    <div
      className="flex justify-between items-center gap-2 cursor-pointer hover:bg-primary/10 rounded-xl p-2"
      key={id}
      onClick={() => onOpen(id, name, imageUrl)}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <div
            className={`w-2.5 h-2.5 absolute right-0.5 bottom-0.5 rounded-full bg-sky-500`}
          ></div>
        </div>

        <div className="flex flex-col">
          <p className="text-small-semibold capitalize text-ellipsis">{name}</p>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
