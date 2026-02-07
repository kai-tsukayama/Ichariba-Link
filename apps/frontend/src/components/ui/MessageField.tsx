"use client"

import React, { useEffect, useState } from 'react'
import SubHeader from '../atoms/SubHeader'
import MessageInput from '../atoms/MessageInput'
import MessageList from '../atoms/MessageList'
import { Message } from '@/app/interfaces/Message'
import { useAuth } from '@/store/useAuth'
import { chatApi } from '@/utils/api'

type Props = { roomId: string }

const MessageField = ({ roomId }: Props) => {
  const  { userId, token, hydrate, loading: authLoading } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    hydrate();
  }, [hydrate])
  
  useEffect(() => {
    if(authLoading || !userId || !token || !roomId) return
    setLoading(true)
    chatApi.history(token, roomId)
    .then((res) => {
        const mapped = res.map((m: any) => ({
          id: m.id,
          userId: m.senderId,
          message: m.content,
          postedAt: new Date(m.createdAt),
      })).sort((a, b) => a.postedAt.getTime() - b.postedAt.getTime())
      setMessages(mapped)
    })
    .catch(console.error)
    .finally(() => setLoading(false))
  }, [userId, token, roomId, authLoading])

  const addMessage = async (text: string) => {
    if (!text.trim() || !userId || !token || !roomId) return
    const created = await chatApi.sendMessage(token, roomId, text)
    setMessages((prev) => [...prev, {
      id: created.id,
      userId: created.senderId,
      message: created.content,
      postedAt: new Date(created.createdAt),
    }].sort((a, b) => a.postedAt.getTime() - b.postedAt.getTime()))
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="shrink-0">
        <SubHeader />
      </div>

      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} currentUser={userId ?? ''} />
      </div>

      <div className="shrink-0">
        <MessageInput onSend={addMessage} />
      </div>
    </div>
  )
}

export default MessageField
