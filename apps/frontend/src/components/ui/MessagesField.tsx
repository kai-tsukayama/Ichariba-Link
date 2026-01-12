"use client";
import Link from 'next/link';
import React, { useState } from 'react'

import { messageUsersData } from '@/app/seeds/MessageSeeds';

const MessagesField = () => {
    const [activeNew, setActiveNew] = useState(false);
    const [activeWatch, setActiveWatch] = useState(false);

    const filteredMessages = messageUsersData.filter(msg => {
        if (!activeNew && !activeWatch) return true;
        if (activeNew && msg.type === 'new') return true;
        if (activeWatch && msg.type === 'viewed') return true;
        return false;
    });

    return (
        <div className='pl-4 pt-4 pr-4'>
            <div>
                <button onClick={() => setActiveNew(!activeNew)}
                    className={`w-30 py-1 rounded-full text-white m-5 cursor-pointer ${activeNew ? 'bg-[#3BB1FF]' : 'bg-[#D9D9D9]'}`}
                >
                    新着
                </button>
                <button onClick={() => setActiveWatch(!activeWatch)}
                    className={`w-30 py-1 rounded-full text-white cursor-pointer ${activeWatch ? 'bg-[#3BB1FF]' : 'bg-[#D9D9D9]'}`}
                >
                    閲覧済み
                </button>
            </div>
            <div>
                {filteredMessages.map((msg) => (
                    <Link href="chat/" key={msg.id}>
                        <div className='flex mb-4 w-full'>
                            <div className={`${msg.color} h-30 w-3 mr-2`}></div>
                            <div className='bg-white flex flex-1 items-center px-8'>
                                <div className='rounded-full h-15 w-15 bg-[#D9D9D9] overflow-hidden'>
                                    <img src="/icons/chari-love.jpg" alt={msg.name} className="w-full h-full object-cover" />
                                </div>
                                <div className='pl-10'>
                                    <h2 className='text-xl font-bold'>{msg.name}</h2>
                                    <p className='text-[#7B7B7B]'>{msg.profile}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MessagesField