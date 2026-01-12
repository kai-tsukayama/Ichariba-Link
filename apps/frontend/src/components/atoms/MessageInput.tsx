"use client"

import React, { useState } from 'react'

type Props = {
  onSend: (text: string) => void
}

const MessageInput = ({ onSend }: Props) => {
  const [text, setText] = useState('')

  const handleSend = () => {
    onSend(text)
    setText('')
  }

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-t from-[#00D957]/50 via-[#00D957]/15 to-transparent">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={1}
        placeholder="メッセージを入力"
        className="bg-white w-[70%] border-2 border-[#3BB1FF] rounded-full py-2 px-4 focus:outline-none shadow-sm"
      />
      <button
        onClick={handleSend}
        className="w-8 h-8 ml-2 bg-[#3BB1FF] rounded-full border-white border-2 shadow-sm active:scale-95 transition text-white"
      >
        ▶
      </button>
    </div>
  )
}

export default MessageInput
