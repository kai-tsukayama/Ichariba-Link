import React from 'react'

const SettingProfile = () => {
    return (
        <div className='bg-white mx-20 my-10 pb-10 rounded-2xl text-center'>
            <div className='flex p-20'>
                <div className='flex-1 flex flex-col items-center'>
                    <div className='bg-gray-200 p-5 rounded-full h-50 w-50'></div>
                    <button className="w-50 p-2 bg-[#F8574A] text-white rounded-full mt-6 cursor-pointer">画像をアップロード</button>
                </div>
                <div className='flex-1 text-start'>
                    <h2 className='text-gray-600 font-bold text-2xl'>お名前</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full border-b border-gray-300 p-2 mb-8 mt-4 outline-none"
                    />
                    <h2 className='text-gray-600 font-bold text-2xl'>連絡先情報</h2>
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-full border-b border-gray-300 p-2 mb-8 mt-4 outline-none"
                    />
                </div>
            </div>
            <button className='px-6 py-2 bg-[#3BB1FF] text-white rounded-full w-50'>保存する</button>
        </div>
    )
}

export default SettingProfile
