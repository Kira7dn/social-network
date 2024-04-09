'use client'
import React, {
  useEffect,
  useRef,
  useState,
} from 'react'
import { Send, X } from 'lucide-react'
import { useChatbox } from '@/hooks/use-chatbox'
import {
  useMutation,
  useQuery,
} from 'convex/react'
import { api } from '@/convex/_generated/api'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { User } from '@/lib/type'

type Props = {
  user: User
  friend: User
}
function Chatbox({
  user,
  friend,
}: Props) {
  const { onClose } = useChatbox()
  const handleClose = () => {
    onClose(friend._id)
  }
  const messageSound = useRef(
    new Audio('/assets/messengers.mp3')
  )
  const messages = useQuery(
    api.messages.list,
    {
      userId: user._id,
      friendId: friend._id,
    }
  )
  const sendMessage = useMutation(
    api.messages.send
  )
  const [
    newMessageText,
    setNewMessageText,
  ] = useState('')
  const chatboxRef =
    useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop =
        chatboxRef.current.scrollHeight
    }
  }
  const inputRef =
    useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
    scrollToBottom()
  }, [])
  useEffect(() => {
    scrollToBottom()
    if (
      messages &&
      user &&
      messages[messages.length - 1] &&
      messages[messages.length - 1]
        .from !== user._id
    ) {
      messageSound.current.play()
    }
    scrollToBottom()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  if (!user) return null
  return (
    <div className="flex w-72 flex-col rounded-t-lg border-[1px] border-b-0 bg-card from-gray-900 to-gray-950 dark:bg-gradient-to-b">
      <div className="flex items-center justify-between border-b-[1px] p-2 shadow-sm">
        <div className="flex items-center gap-2 ">
          <div className="relative">
            <Avatar className="border- border-2 border-secondary">
              <AvatarImage
                src={friend.imageUrl}
              />
              <AvatarFallback>
                {friend.fullname}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-[-1px] right-[1px] h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-base-regular capitalize">
              {friend.fullname}
            </span>
            <span className="text-small-regular text-secondary">
              Online
            </span>
          </div>
        </div>
        <button
          className="rounded-full p-1 transition-colors duration-200 ease-in-out hover:bg-secondary hover:text-secondary-foreground"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={chatboxRef}
        className="chatbox flex h-80 flex-col gap-1 overflow-auto px-2 py-2"
      >
        {messages?.map((message) => (
          <article
            key={message._id}
            className={`flex px-2 ${
              message.from === user._id
                ? 'justify-end'
                : ''
            }`}
          >
            <div
              className={`${
                message.from ===
                user._id
                  ? 'bg-green rounded-md rounded-tr-none text-white'
                  : 'rounded-md rounded-tl-none text-secondary'
              } max-w-[80%] px-3 py-1 text-small-regular shadow-md`}
            >
              <p>{message.body}</p>
            </div>
          </article>
        ))}
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await sendMessage({
            body: newMessageText,
            from: user._id,
            to: friend._id,
          })
          setNewMessageText('')
        }}
        className="text-subtle-medium border-primary/10 flex h-12 border-t-[1px] shadow-lg backdrop-blur-md"
      >
        <input
          ref={inputRef}
          value={newMessageText}
          onChange={async (e) => {
            const text = e.target.value
            setNewMessageText(text)
          }}
          className="pr-18 placeholder:text-subtle-medium w-full bg-transparent pl-5 focus:outline-none"
          placeholder="Write a message…"
        />
        <button
          type="submit"
          disabled={!newMessageText}
          className="min-h-[1em] min-w-[2em] border-0 p-1 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}

export default Chatbox
