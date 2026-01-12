"use client"

import React, { useState } from 'react'
import SubHeader from '../atoms/SubHeader'
import MessageInput from '../atoms/MessageInput'
import MessageList from '../atoms/MessageList'
import { seedMessages } from '@/app/seeds/MessageSeeds'
import { Message } from '@/app/interfaces/Message'

const MessageField = () => {
  const currentUser = "11"

  const [messages, setMessages] = useState<Message[]>(seedMessages)

  const addMessage = (text: string) => {
    if (!text.trim()) return

    const newMessage: Message = {
      id: crypto.randomUUID(),
      userId: currentUser,
      message: text,
      postedAt: new Date(),
    }

    setMessages(prev => [...prev, newMessage])
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="shrink-0">
        <SubHeader />
      </div>

      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} currentUser={currentUser} />
      </div>

      <div className="shrink-0">
        <MessageInput onSend={addMessage} />
      </div>
    </div>
  )
}

export default MessageField
