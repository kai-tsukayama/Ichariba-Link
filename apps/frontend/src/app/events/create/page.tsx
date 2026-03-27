"use client"

import { Event } from '@/app/interfaces/Event'
import { eventsData } from '@/app/seeds/EventSeeds'
import Header from '@/components/organisms/Header'
import Navigation from '@/components/organisms/Navigation'
import EventGenerateField from '@/components/ui/EventGenerateField'
import { AuthGuard } from '@/components/auth/AuthGuard'
import React from 'react'

const EventGenerate = () => {
  return (
    <AuthGuard>
      <div className="bg-[#F0F4FF]">
        <div className="flex h-full">
          <Navigation />
          <div className="flex-1 flex flex-col px-1">
            <div className='shrink-0'>
              <div className='shrink-0'>
                <Header title="イベントを作成する" />
              </div>
            </div>
            <div className='flex-1 overflow-hidden'>
              <EventGenerateField />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

export default EventGenerate
