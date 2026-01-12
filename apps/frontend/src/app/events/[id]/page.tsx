"use client";

import { eventsData } from '@/app/seeds/EventSeeds'
import Header from '@/components/organisms/Header'
import Navigation from '@/components/organisms/Navigation'
import EventField from '@/components/ui/EventField'
import { useParams } from 'next/navigation'
import React from 'react'

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const event = eventsData.find(e => e.id === id)
  if (!event) {
    return <div className='p-10'>イベントが見つかりませんでした</div>
  }
  return (
    <div className="bg-[#F0F4FF]">
      <div className="flex h-screen">
        <Navigation />
        <div className="flex-1 flex flex-col px-1">
          <div className='shrink-0'>
            <Header title="イベント詳細" />
          </div>
          <div className='flex-1 overflow-hidden'>
            <EventField event={event} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails