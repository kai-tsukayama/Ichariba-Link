"use client"

import React from 'react'
import MessageRight from './MessageRight'
import Messageleft from './Messageleft'
import { Message } from '@/app/interfaces/Message'

type Props = {
  messages: Message[]
  currentUser: string
}

const MessageList = ({ messages, currentUser }: Props) => {
  return (
    <div className="px-4 py-2 space-y-2">
      {messages.map(msg =>
        msg.userId === currentUser ? (
          <MessageRight key={msg.id} msg={msg} />
        ) : (
          <Messageleft key={msg.id} msg={msg} />
        )
      )}
    </div>
  )
}

export default MessageList
