import Header from '@/components/organisms/Header'
import Navigation from '@/components/organisms/Navigation'
import EventField from '@/components/ui/EventField'
import React from 'react'

const EventDetails = () => {
  return (
    <div className="bg-[#F0F4FF]">
      <div className="flex h-screen">
        <Navigation />
        <div className="flex-1 flex flex-col px-1">
          <div className='shrink-0'>
            <Header />
          </div>
          <div className='flex-1 overflow-hidden'>
            <EventField />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails