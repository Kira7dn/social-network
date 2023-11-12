"use client";
import { useQuery, useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

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
    <main className="chat h-auto w-full relative flex flex-col gap-7 px-6 py-4 grow items-center max-w-4xl pb-4">
      <header>
        <h1>Convex Chat</h1>
        <p>
          Connected as <strong>{user.fullName}</strong>
        </p>
      </header>
      {messages?.map((message) => (
        <article
          key={message._id}
          className={message.fromId === user.id ? "message-mine" : ""}
        >
          <div>{message.fromId}</div>

          <p>{message.body}</p>
        </article>
      ))}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await sendMessage({ body: newMessageText, toId: "1" });
          setNewMessageText("");
        }}
      >
        <input
          value={newMessageText}
          onChange={async (e) => {
            const text = e.target.value;
            setNewMessageText(text);
          }}
          placeholder="Write a message…"
        />
        <button type="submit" disabled={!newMessageText}>
          Send
        </button>
      </form>
    </main>
  );
}
