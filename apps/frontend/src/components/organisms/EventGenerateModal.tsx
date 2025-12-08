import React from 'react'

const EventGenerateModal = ({ onClose }: {onClose: () => void}) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-150 h-100 bg-white border rounded-xl p-10 shadow-xl">
        <h2 className="text-center text-xl font-bold mb-6">
          以下の内容でイベントを作成しますか？
        </h2>

        <div className='pt-5'>
            <h3 className='text-sm'>イベント名</h3>
            <p className='text-center mb-4 font-bold'>移住者歓迎！泡盛飲み比べ</p>
            <h3 className='text-sm'>日時</h3>
            <p className='text-center mb-4 font-bold'>2025/11/03　18:00　～　20:00</p>
            <h3 className='text-sm'>場所</h3>
            <p className='text-center mb-4 font-bold'>沖縄県うるま市</p>
        </div>

        <div className="flex justify-around gap-4 mt-8">
            <button className="px-6 py-2 bg-[#3BB1FF] text-white rounded-full w-50">
                作成する
            </button>
            <button className="px-6 py-2 bg-white border-3 border-[#3BB1FF] rounded-full w-50 text-[#3BB1FF]"
            onClick={onClose}
            >
                キャンセル
            </button>
        </div>
      </div>
    </div>
  )
}

export default EventGenerateModal