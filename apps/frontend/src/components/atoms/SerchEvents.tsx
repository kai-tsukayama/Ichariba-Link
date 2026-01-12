"use client";
import { Event } from '@/app/interfaces/Event';
import { eventsData, imageSeeds } from '@/app/seeds/EventSeeds';
import { useEventStore } from '@/store/eventStore';
import { formatEventDateTime } from '@/utils/formatDate';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const SerchEvents = () => {
    const [active, setActive] = useState(false);
    const events = useEventStore((state) => state.events);
  return (
    <div>
        <div className='flex items-center gap-4 p-8 bg-[#EEF3FF] rounded-x justify-center'>
            <select name="" id="" className='appearance-none text-center px-6 py-2 rounded-full border border-gray-300 bg-white text-sm'>
                <option value="" className='text-center'>選択</option>
                <option value="" className='text-center'>北海道</option>
                <option value="" className='text-center'>東京</option>
                <option value="" className='text-center'>沖縄</option>
            </select>

            <select name="" id="" className='appearance-none text-center px-6 py-2 rounded-full border border-gray-300 bg-white text-sm'>
                <option>選択</option>
                <option>那覇市</option>
                <option>浦添市</option>
                <option>宜野湾市</option>
            </select>

            <input type="date" className='px-4 py-2 rounded-md border border-gray-300 bg-white text-sm' />
            <span className='font-medium ml-2'>のイベント</span>

            <button onClick={() => setActive(!active)} className={`px-5 py-2 text-white rounded-full text-sm hover:bg-red-400 ml-3 transition-colors ${active ? "bg-red-400 text-[#F8574A]" : "bg-gray-300 text-white"}`}>
                気になるを表示
            </button>
        </div>
        
        <hr className="border-gray-300 mt-2" />

        {events.map((r) => {
            const image = imageSeeds.find(img => img.id === r.imageId)
            return (
                <React.Fragment key={r.id}>
                    <Link href={`/events/${r.id}`}>
                        <div className="w-full flex justify-center">
                            <div className="w-[1000px] py-10 flex gap-10">
                                <div className="w-[480px] h-[280px] bg-gray-300 overflow-hidden">
                                    {image && (
                                        <Image
                                            src={image.filePath}
                                            alt={image.id}
                                            width={480}
                                            height={280}
                                            className="object-cover"
                                        />
                                    )}
                                </div>
                                <div className='w-[400px] shrink-0'>
                                    <h3 className="text-2xl font-bold text-gray-800">
                                        {r.title}
                                    </h3>
                                    <p className="text-xl text-gray-600 mt-3">
                                        {formatEventDateTime(r.startData, r.endData)}
                                    </p>

                                    <div className="flex gap-8 mt-3">
                                        <button className="px-8 py-1 text-xl rounded-full border-2 border-[#F8574A] text-[#F8574A] hover:bg-[#F8574A]/10 transition">
                                        気になる
                                        </button>

                                        <button className="px-8 py-1 text-xl rounded-full bg-[#F8574A] text-white hover:bg-[#e04840] transition">
                                        参加する
                                        </button>
                                    </div>

                                    <div className='mt-6'>
                                        {r.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <hr className="border-gray-300 mt-2" />
                </React.Fragment>
            )
        })}
    </div>
  )
}

export default SerchEvents