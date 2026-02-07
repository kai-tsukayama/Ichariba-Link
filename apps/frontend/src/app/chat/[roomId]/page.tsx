"use client"

import Header from '@/components/organisms/Header'
import Navigation from '@/components/organisms/Navigation'
import MessageField from '@/components/ui/MessageField'
import { AuthGuard } from '@/components/auth/AuthGuard'
import React from 'react'
import { useParams, useRouter } from 'next/navigation'

const MessageDetails = () => {
  const params = useParams();
  const router = useRouter();
  const roomIdParam = params?.roomId;
  const roomId = Array.isArray(roomIdParam) ? roomIdParam[0] : roomIdParam;

  if (!roomId) {
    router.replace('/messages');
    return null;
  }

  return (
    <AuthGuard>
      <div className="bg-[#F0F4FF]">
        <div className="flex h-screen">
          <Navigation />
          <div className="flex-1 flex flex-col px-1">
            <div className="shrink-0">
              <Header title="繝｡繝・そ繝ｼ繧ｸ" />
            </div>
            <div className='flex-1 overflow-y-auto'>
              <MessageField roomId={roomId as string} />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

export default MessageDetails
