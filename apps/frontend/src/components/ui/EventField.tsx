"use client"

import React from 'react'
import SubHeader from '../atoms/SubHeader'
import { Event } from '@/app/interfaces/Event'
import { formatEventDateTime } from '@/utils/formatDate'
import { imageSeeds } from '@/app/seeds/EventSeeds'
import Image from 'next/image'

type Props = {
    event: Event
}

const EventField = ({event}: Props) => {
    const image = imageSeeds.find(img => img.id === event.imageId);
    return (
        <div className='bg-white h-screen mt-3 flex flex-col'>
            <div className='bg-[#00D957] text-center text-white p-3 flex'>
                <button
                    onClick={() => history.back()}
                    className='text-left pl-2'
                >＜</button>
                <h3 className='flex-2'>{event.title}</h3>
            </div>
            <div className='flex p-10'>
                {image ? (
                        <Image
                            src={image.filePath}
                            alt={event.title}
                            width={600}
                            height={450}
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            No Image
                        </div>
                    )
                }
                <div className='text-left pl-8 flex-1 flex-col'>
                    <h2 className='text-left font-bold text-2xl'>{event.title}</h2>
                    <p className='pt-4 text-[#0047DF] text-xl'>{formatEventDateTime(new Date(event.startData), new Date(event.endData))}</p>

                    <div className='pt-4'>
                        <button className='px-10 py-1 text-xl rounded-full border-2 border-[#F8574A] text-[#F8574A] hover:bg-[#F8574A]/10 transition'>気になる</button>
                        <button className='px-10 py-1 text-xl rounded-full bg-[#F8574A] text-white hover:bg-[#e04840] transition ml-4'>参加する</button>
                    </div>
                    <div className='pt-4 flex-1'>
                        <h3 className='font-bold pb-2'>イベント詳細</h3>
                        <p className='h-[270px] overflow-y-auto'>
                            {event.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventField