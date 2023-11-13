"use client";
import { useQuery, useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Send } from "lucide-react";

export default function App() {
  const messages = useQuery(api.messages.list, { toId: "1" });
  const sendMessage = useMutation(api.messages.send);
  const { user } = useUser();
  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    // Make sure scrollTo works on button click in Chrome
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 0);
  }, [messages]);
  if (!user) return null;

  return (
    <main className="chat h-auto w-full relative flex flex-col gap-7 px-6 py-4 grow items-center max-w-4xl pb-4 chat">
      <header>
        <h1>Convex Chat</h1>
        <p>
          Connected as <strong>{user.fullName}</strong>
        </p>
      </header>
      {messages?.map((message) => (
        <article
          key={message._id}
          className={message.fromId === user.id ? "pl-4 pr-4" : ""}
        >
          <div
            className={`text-small-medium ${
              message.fromId === user.id
                ? "text-right justify-self-end col-start-1 col-end-3"
                : ""
            }`}
          >
            {message.fromId}
          </div>

          <p
            className={`mb-1 p-2 mx-2 rounded-sm rounded-bl-none shadow-sm text-ellipsis col-start-1 col-end-3 justify-self-start whitespace-pre-line relative ${
              message.fromId === user.id
                ? "rounded-lg rounded-br-none bg-secondary text-white justify-self-end"
                : ""
            }`}
          >
            {message.body}
          </p>
        </article>
      ))}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await sendMessage({ body: newMessageText, toId: "1" });
          setNewMessageText("");
        }}
        className="fixed bottom-2 left-2 w-[calc(100%-16px)] h-18 shadow-lg bg-white bg-opacity-80 backdrop-blur-md rounded-lg flex z-10"
      >
        <input
          value={newMessageText}
          onChange={async (e) => {
            const text = e.target.value;
            setNewMessageText(text);
          }}
          className="text-gray-900 w-full border-0 bg-transparent text-lg pl-5 pr-18 font-inherit border-transparent rounded-xl focus:outline-none"
          placeholder="Write a message…"
        />
        <button
          type="submit"
          disabled={!newMessageText}
          className="absolute bottom[-0.5em] right[-0.5em] border-0 rounded-lg p-1 z-10 min-w-[2em] min-h-[1em] "
        >
          <Send className="w-4 h-4 disabled:opacity-50" />
        </button>
      </form>
    </main>
  );
}
