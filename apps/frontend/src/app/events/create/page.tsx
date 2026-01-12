import { Event } from '@/app/interfaces/Event'
import { eventsData } from '@/app/seeds/EventSeeds'
import Header from '@/components/organisms/Header'
import Navigation from '@/components/organisms/Navigation'
import EventGenerateField from '@/components/ui/EventGenerateField'


const EventGenerate = () => {

  return (
    <div className="bg-[#F0F4FF]">
      <div className="flex h-full">
        <Navigation />
        <div className="flex-1 flex flex-col px-1">
          <div className='shrink-0'>
            <div className='shrink-0'>
              <Header title="イベント作成" />
            </div>
          </div>
          <div className='flex-1 overflow-hidden'>
            <EventGenerateField />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventGenerate