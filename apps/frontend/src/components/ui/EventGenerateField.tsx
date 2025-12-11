'use client';

import React, { useState } from 'react'
import EventGenerateModal from '../organisms/EventGenerateModal'

const EventGenerateField = () => {
    const [post, setPost] = useState(false);
  return (
    <div className='bg-white h-full mt-2 px-20 py-10 flex overflow-hidden'>
        <div>
            {post && <EventGenerateModal onClose={()=> setPost(false)} />}
        </div>
        <div className='flex flex-col'>
            <div className='mb-5'>
                <h1 className='text-2xl font-bold mb-5'>イベント名</h1>
                <textarea className='border border-[#3BB1FF] w-180 mr-20' />
            </div>
            <div className='mb-5 w-180'>
                <h2 className='text-xl mb-2'>日時</h2>
                <div className='flex'>
                    <input type="datetime-local" name="" id="" className='border border-[#3BB1FF] w-full flex-1' />
                    <span className='flex-1 text-center'>～</span>
                    <input type="datetime-local" name="" id="" className='border border-[#3BB1FF] w-full flex-1' />
                </div>
            </div>
            <div>
                <h2 className='text-xl mb-2'>詳細</h2>
                <textarea name="" id="" className='border border-[#3BB1FF] h-60 w-180' />
            </div>
        </div>
        <div>
            <h2 className='text-xl  mb-2'>場所</h2>
            <input type="text" className='border border-[#3BB1FF] mb-4' />
            <input type="text" className='border border-[#3BB1FF] mb-4' />
            <p className='text-xl'>のイベント</p>
            <button className='bg-[#00D957] rounded-full w-50 py-2 my-4 text-white font-bold'>画像のアップロード</button>
            <button className='w-50 py-2 rounded-full bg-[#3BB1FF] text-white font-bold'
            onClick={()=> setPost(!post)}
            >
                作成する
            </button>
        </div>
    </div>
  )
}

export default EventGenerateField