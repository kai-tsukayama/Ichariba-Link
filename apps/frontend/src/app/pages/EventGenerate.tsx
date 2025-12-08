import Header from '@/components/organisms/Header'
import Navigation from '@/components/organisms/Navigation'
import EventGenerateField from '@/components/ui/EventGenerateField'
import React from 'react'

const EventGenerate = () => {
  return (
    <div className="bg-[#F0F4FF]">
      <div className="flex h-full">
        <Navigation />
        <div className="flex-1 flex flex-col px-1">
          <div className='shrink-0'>
            <Header />
          </div>
          <div className='flex-1 overflow-y-auto'>
            <EventGenerateField />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventGenerate