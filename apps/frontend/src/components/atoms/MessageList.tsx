"use client"

import React from 'react'
import MessageRight from './MessageRight'
import Messageleft from './Messageleft'
import { Message } from '@/app/interfaces/Message'

type Props = {
  messages: Message[]
  currentUser: string
  partnerAvatar?: string | null
}

const MessageList = ({ messages, currentUser, partnerAvatar }: Props) => {
  return (
    <div className="px-4 py-2 space-y-2">
      {messages.map(msg =>
        msg.userId === currentUser ? (
          <MessageRight key={msg.id} msg={msg} />
        ) : (
          <Messageleft key={msg.id} msg={msg} avatar={partnerAvatar} />
        )
      )}
    </div>
  )
}

export default MessageList
