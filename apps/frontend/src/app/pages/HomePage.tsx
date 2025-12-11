import SerchEvents from '@/components/atoms/SerchEvents'
import Header from '@/components/organisms/Header'
import Navigation from '@/components/organisms/Navigation'
import React from 'react'

const HomePage = () => {
  return (
    <div className="bg-[#F0F4FF]">
      <div className="flex h-screen">
        <Navigation />
        <div className="flex-1 flex flex-col px-1">
          <div className='shrink-0'>
            <Header />
          </div>
          <div className='flex-1 overflow-y-auto'>
            <SerchEvents />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage