'use client'
import { useChatbox } from '@/hooks/use-chatbox'
import React from 'react'
import {
  useMutation,
  useQuery,
} from 'convex/react'
import { api } from '@/convex/_generated/api'
import Chatbox from './ChatBox'
import { useCurrentUser } from '@/hooks/use-currrent-user'
import { User } from '@/lib/type'

const ChatContainer = () => {
  const { user } = useCurrentUser()
  return (
    <div>
      {user && (
        <ChatboxList user={user} />
      )}
    </div>
  )
}

export default ChatContainer
type Props = {
  user: User
}
const ChatboxList = ({
  user,
}: Props) => {
  const { store: chatBoxList, onOpen } =
    useChatbox()
  const messages = useQuery(
    api.messages.getUnseen
  )
  const updateSeen = useMutation(
    api.messages.updateSeen
  )
  if (messages) {
    messages.forEach((message) => {
      if (!message.from) return
      onOpen(user, message.from)
      updateSeen({ id: message._id })
    })
  }
  return (
    <div className="fixed bottom-0 right-8 z-50 flex flex-row gap-2">
      {chatBoxList.map((chatbox) => (
        <Chatbox
          key={chatbox.friend._id}
          user={user}
          friend={chatbox.friend}
        />
      ))}
    </div>
  )
}
