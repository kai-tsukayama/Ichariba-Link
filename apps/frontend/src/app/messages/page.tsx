import Header from '@/components/organisms/Header'
import Navigation from '@/components/organisms/Navigation'
import MessageField from '@/components/ui/MessageField'
import MessagesField from '@/components/ui/MessagesField'
import React from 'react'

const Messages = () => {
  return (
    <div className="bg-[#F0F4FF]">
      <div className="flex h-screen">
        <Navigation />
        <div className="flex-1 flex flex-col px-1">
          <div className='shrink-0'>
            <Header title="メッセージ一覧" />
          </div>
          <div className='flex-1 overflow-y-auto'>
            <MessagesField />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages