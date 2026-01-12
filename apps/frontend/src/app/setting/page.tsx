import Header from '@/components/organisms/Header'
import Navigation from '@/components/organisms/Navigation'
import SettingProfile from '@/components/ui/SettingProfile'
import React from 'react'

const Setting = () => {
  return (
    <div className="bg-[#F0F4FF]">
      <div className="flex h-screen">
        <Navigation />
        <div className="flex-1 flex flex-col px-1">
          <div className='shrink-0'>
            <Header title="設定" />
          </div>
          <div className='flex-1 overflow-y-auto'>
            <SettingProfile />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting