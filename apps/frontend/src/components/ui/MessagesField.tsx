"use client";
import React, { useState } from 'react'

const MessagesField = () => {
    const [activeNew, setActiveNew] = useState(false);
    const [activeWatch, setActiveWatch] = useState(false);

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
        <div className='flex mb-4'>
            <div className='bg-[#00D957] h-30 w-3 mr-2'></div>
            <div className='bg-white flex flex-1 items-center px-8'>
                <div className='rounded-full h-15 w-15 bg-[#D9D9D9]'></div>
                <div className='pl-10'>
                    <h2 className='text-xl font-bold'>Name1</h2>
                    <p className='text-[#7B7B7B]'>Profile</p>
                </div>
            </div>
        </div>
        <div className='flex mb-4'>
            <div className='bg-[#FF9E9E] h-30 w-3 mr-2'></div>
            <div className='bg-white flex flex-1 items-center px-8'>
                <div className='rounded-full h-15 w-15 bg-[#D9D9D9]'></div>
                <div className='pl-10'>
                    <h2 className='text-xl font-bold'>Name1</h2>
                    <p className='text-[#7B7B7B]'>Profile</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MessagesField