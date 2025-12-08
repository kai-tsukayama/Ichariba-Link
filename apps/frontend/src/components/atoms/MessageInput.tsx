import React from 'react'
import MessageRight from './MessageRight'
import Messageleft from './Messageleft'
import { seedMessages } from '@/app/seeds/MessageSeeds'
import { Message } from '@/app/interfaces/Message'

const MessageInput = () => {
  const currentUser = "11";

  const sortedMessages: Message[] = [...seedMessages].sort((a, b) => a.postedAt.getTime() - b.postedAt.getTime());

  return (
    <div className='h-screen flex flex-col bg-white'>
      {sortedMessages.map((r)=>
        r.userId === currentUser ? (<MessageRight key={r.id} msg={r}/>) : (<Messageleft key={r.id} msg={r}/>))
      }
      <div className='mt-auto flex items-center justify-center p-3 pb-10 pt-10 bg-gradient-to-t from-[#00D957]/50 via-[#00D957]/15 to-transparent'>
        <input type="text" className='bg-white w-[70%] border-2 border-[#3BB1FF] rounded-full py-2 px-4 focus:outline-none shadow-sm' />
        <button className='w-8 h-8 ml-2 bg-[#3BB1FF] rounded-full border-white border-2 shadow-sm active:scale-95 transition'></button>
      </div>
    </div>
  )
}

export default MessageInput