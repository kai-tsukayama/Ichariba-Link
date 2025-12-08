import React from 'react'
import SubHeader from '../atoms/SubHeader'

const EventField = () => {
  return (
    <div className='bg-white h-screen mt-3 flex flex-col'>
        <div className='bg-[#00D957] text-center text-white p-3 flex'>
            <button className='text-left pl-2 '>＜</button>
            <h3 className='flex-2'>移住者交流会 in 恩納村</h3>
        </div>
        <div className='flex p-10'>
            <div className='bg-gray-300 h-[450px] w-[600px]'></div>
            <div className='text-left pl-8 flex-1 flex-col'>
                <h2 className='text-left font-bold text-2xl'>移住者交流会 in 恩納村</h2>
                <p className='pt-4 text-[#0047DF] text-xl'>2025/12/06 18:00～20:00</p>

                <div className='pt-4'>
                    <button className='px-10 py-1 text-xl rounded-full border-2 border-[#F8574A] text-[#F8574A] hover:bg-[#F8574A]/10 transition'>気になる</button>
                    <button className='px-10 py-1 text-xl rounded-full bg-[#F8574A] text-white hover:bg-[#e04840] transition ml-4'>参加する</button>
                </div>
                <div className='pt-4 flex-1'>
                    <h3 className='font-bold pb-2'>イベント詳細</h3>
                    <p className='h-[270px] overflow-y-auto'>
                        「いちゃりばちょーでー（出会えば兄弟）」の心をテーマに、移住者と地域住民が気軽に語り合える“ゆんたくナイト”を開催します！ 今回の会場は、那覇港を一望できる海沿いのカフェテラス。潮風を感じながら、音楽と笑顔に包まれたアットホームなひとときを過ごしましょう。
                        イベント前半は、沖縄移住をきっかけに新たな挑戦を始めたゲストスピーカーによるトークセッション。「移住して感じたリアルな喜びや苦労」「地域との関わり方」など、等身大のストーリーをお届けします。
                        後半は、地元食材を使った軽食とドリンクを囲みながらのフリートークタイム。初めての方も安心して参加できるよう、交流サポーターが会話のきっかけをお手伝いします。 さらに、地元アーティストによるアコースティックライブも予定！心地よい音楽とともに、ゆったりとした“島時間”をお楽しみください。
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EventField