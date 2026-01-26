"use client"

import Header from '@/components/organisms/Header'
import Navigation from '@/components/organisms/Navigation'
import MessageField from '@/components/ui/MessageField'
import { useAuth } from '@/store/useAuth'
import React, { useEffect } from 'react'

const FIXED_ROOM_ID = "ee141286-8835-4b78-9fc0-c556016e0e1b"
const FIXED_USER_ID = "1193b50e-885d-4f75-9df6-dab8f8c88daf";

const MessageDetails = () => {
  const { setUserId } = useAuth();

  useEffect(() => {
    setUserId(FIXED_USER_ID);
  }, [setUserId]);

  return (
    <div className="bg-[#F0F4FF]">
      <div className="flex h-screen">
        <Navigation />
        <div className="flex-1 flex flex-col px-1">
          <div className="shrink-0">
            <Header title="メッセージ" />
          </div>
          <div className='flex-1 overflow-y-auto'>
            <MessageField roomId={FIXED_ROOM_ID} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageDetails