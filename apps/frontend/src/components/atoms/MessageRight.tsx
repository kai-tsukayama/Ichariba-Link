import { Message } from '@/app/interfaces/Message'
import React from 'react'

const MessageRight = (props: {msg: Message}) => {
  return (
    <div className="flex items-end mb-6 mt-6 justify-end">
      <div className="max-w-xs inline-block p-4 bg-[#00D957] text-white rounded-2xl rounded-br-none text-sm leading-relaxed whitespace-pre-wrap break-words">
        <p>{props.msg.message}</p>

        <span className="block mt-2 text-xs opacity-80 text-right">
          {props.msg.postedAt.toLocaleString()}
        </span>
      </div>

      <div className="w-10 h-10 rounded-full bg-gray-300 ml-3 mr-6 flex-shrink-0" />
    </div>
  )
}

export default MessageRight