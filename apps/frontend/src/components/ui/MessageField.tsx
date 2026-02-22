"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SubHeader from '../atoms/SubHeader'
import MessageInput from '../atoms/MessageInput'
import MessageList from '../atoms/MessageList'
import { Message } from '@/app/interfaces/Message'
import { useAuth } from '@/store/useAuth'
import { chatApi } from '@/utils/api'
import { io, Socket } from 'socket.io-client'

type Props = { roomId: string }

const MessageField = ({ roomId }: Props) => {
  const  { userId, token, hydrate, loading: authLoading } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [partnerAvatar, setPartnerAvatar] = useState<string | null>(null)
  const [partnerName, setPartnerName] = useState<string>("")
  const socketRef = useRef<Socket | null>(null)

  const socketUrl = useMemo(
    () => process.env.NEXT_PUBLIC_SOCKET_URL ?? process.env.NEXT_PUBLIC_API_BASE ?? '',
    [],
  )

  useEffect(() => {
    hydrate();
  }, [hydrate])

  const upsertMessage = useCallback((incoming: Message) => {
    setMessages((prev) => {
      const exists = prev.find((m) => m.id === incoming.id);
      const next = exists
        ? prev.map((m) => (m.id === incoming.id ? incoming : m))
        : [...prev, incoming];
      return next.sort((a, b) => a.postedAt.getTime() - b.postedAt.getTime());
    });
  }, []);

  useEffect(() => {
    if(authLoading || !userId || !token || !roomId) return
    setLoading(true)
    Promise.all([
      chatApi.history(token, roomId),
      chatApi.listRooms(token)
    ])
    .then(([history, rooms]) => {
      const mapped = history.map((m: any) => ({
        id: m.id,
        userId: m.senderId,
        message: m.content,
        postedAt: new Date(m.createdAt),
      })).sort((a:any, b: any) => a.postedAt.getTime() - b.postedAt.getTime())
      setMessages(mapped)

      const room = rooms.find((r: any) => r.roomId === roomId);
      if (room?.partner) {
        if (room.partner.profileImage) setPartnerAvatar(room.partner.profileImage);
        if (room.partner.name) setPartnerName(room.partner.name);
      }
    })
    .catch(console.error)
    .finally(() => setLoading(false))
  }, [userId, token, roomId, authLoading])

  useEffect(() => {
    if (authLoading || !token || !roomId || !socketUrl) return;

    const socket = io(socketUrl, {
      transports: ['websocket'],
      auth: { token },
    });
    socketRef.current = socket;

    const handleIncoming = (payload: {
      id: string;
      roomId: string;
      content: string;
      senderId: string;
      createdAt: string | Date;
    }) => {
      if (payload.roomId !== roomId) return;
      upsertMessage({
        id: payload.id,
        userId: payload.senderId,
        message: payload.content,
        postedAt: new Date(payload.createdAt),
      });
    };

    socket.on('connect', () => {
      socket.emit('join', { roomId });
    });
    socket.on('message', handleIncoming);

    return () => {
      socket.off('message', handleIncoming);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [authLoading, roomId, socketUrl, token, upsertMessage])

  const addMessage = async (text: string) => {
    if (!text.trim() || !userId || !token || !roomId) return
    const created = await chatApi.sendMessage(token, roomId, text)
    upsertMessage({
      id: created.id,
      userId: created.senderId,
      message: created.content,
      postedAt: new Date(created.createdAt),
    })
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="shrink-0">
        <SubHeader title={partnerName} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} currentUser={userId ?? ''} partnerAvatar={partnerAvatar} />
      </div>

      <div className="shrink-0">
        <MessageInput onSend={addMessage} />
      </div>
    </div>
  )
}

export default MessageField
