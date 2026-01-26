"use client"

import React, { useEffect, useState } from 'react'
import SubHeader from '../atoms/SubHeader'
import MessageInput from '../atoms/MessageInput'
import MessageList from '../atoms/MessageList'
import { seedMessages } from '@/app/seeds/MessageSeeds'
import { Message } from '@/app/interfaces/Message'
import { useAuth } from '@/store/useAuth'
import { chatApi } from '@/utils/api'
import Messages from '@/app/messages/page'

type Props = { roomId: string }

const MessageField = ({ roomId }: Props) => {
  const  { userId } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    if(!userId || !roomId) return
    setLoading(true)
    chatApi.history(userId, roomId)
    .then((res) => {
        const mapped = res.map((m: any) => ({
          id: m.id,
          userId: m.senderId,
          message: m.content,
          postedAt: new Date(m.createdAt),
      }))
      setMessages(mapped)
    })
    .finally(() => setLoading(false))
    .catch(console.error)
  }, [userId, roomId])

  const addMessage = async (text: string) => {
    if (!text.trim() || !userId || !roomId) return
    const created = await chatApi.sendMessage(userId, roomId, text)
    setMessages((prev) => [...prev, {
      id: created.id,
      userId: created.senderId,
      message: created.content,
      postedAt: new Date(created.createdAt),
    }])
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="shrink-0">
        <SubHeader />
      </div>

      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} currentUser={userId} />
      </div>

      <div className="shrink-0">
        <MessageInput onSend={addMessage} />
      </div>
    </div>
  )
}

export default MessageField
