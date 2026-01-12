"use client"
import React, { useRef, useState } from 'react'
import { useUserStore } from '@/store/userStore'

const SettingProfile = () => {
    const { currentUser, updateUser } = useUserStore()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [previewImage, setPreviewImage] = useState<string | undefined>(currentUser.profileImage)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleSave = () => {
        if (previewImage) {
            updateUser({ profileImage: previewImage })
            alert('保存しました')
        }
    }

    return (
        <div className='bg-white mx-20 my-10 pb-10 rounded-2xl text-center'>
            <div className='flex p-20'>
                <div className='flex-1 flex flex-col items-center'>
                    <div className='bg-gray-200 p-1 rounded-full h-50 w-50 overflow-hidden flex items-center justify-center'>
                        {previewImage ? (
                            <img src={previewImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <div className="w-full h-full bg-gray-300"></div>
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <button
                        onClick={handleUploadClick}
                        className="w-50 p-2 bg-[#F8574A] text-white rounded-full mt-6 cursor-pointer hover:bg-[#ff6b5f] transition-colors"
                    >
                        画像をアップロード
                    </button>
                </div>
                <div className='flex-1 text-start'>
                    <h2 className='text-gray-600 font-bold text-2xl'>お名前</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        defaultValue={currentUser.name}
                        className="w-full border-b border-gray-300 p-2 mb-8 mt-4 outline-none"
                    />
                    <h2 className='text-gray-600 font-bold text-2xl'>連絡先情報</h2>
                    <input
                        type="text"
                        placeholder="Email"
                        defaultValue={currentUser.email}
                        className="w-full border-b border-gray-300 p-2 mb-8 mt-4 outline-none"
                    />
                </div>
            </div>
            <button
                onClick={handleSave}
                className='px-6 py-2 bg-[#3BB1FF] text-white rounded-full w-50 hover:bg-[#4bc2ff] transition-colors'
            >
                保存する
            </button>
        </div>
    )
}

export default SettingProfile
