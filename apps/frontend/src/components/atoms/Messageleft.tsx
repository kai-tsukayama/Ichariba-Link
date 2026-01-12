import { Message } from '@/app/interfaces/Message'
import React from 'react'

const Messageleft = (props: { msg: Message }) => {
  return (
    <div className="flex items-end mb-6 justify-start">
      <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex-shrink-0 ml-6 overflow-hidden">
        <img src="/icons/chari-love.jpg" alt="Partner" className="w-full h-full object-cover" />
      </div>
      <div className="inline-block max-w-xs p-4 bg-[#C8FFE3] text-black rounded-2xl rounded-bl-none text-sm leading-relaxed whitespace-pre-wrap break-words">
        <p>{props.msg.message}</p>

        <span className="block mt-2 text-xs opacity-70 text-left">
          {props.msg.postedAt.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

export default Messageleft