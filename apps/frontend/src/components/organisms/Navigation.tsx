"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/store/useAuth'

const Navigation = () => {
  const router = useRouter();
  const { clear } = useAuth();

  return (
    <aside className="w-64 h-screen bg-white shadow-md flex flex-col">
      <div className="flex flex-col items-center py-6 border-b border-[#DDDDDD]">
        <Image
          src="/icons/ichariba-link.png"
          alt="Ichariba Link Logo"
          width={160}
          height={120}
        />
      </div>

      <div className="px-4 pt-6 flex-1">
        <p className="text-sm text-gray-500 mb-4">メニュー</p>

        <nav className="space-y-4">
          <Link href="/messages" className="block text-gray-700 px-6 py-3 rounded-xl transition hover:bg-[#00D957] hover:text-white">
            メッセージ
          </Link>

          <Link href="/home" className="block text-gray-700 px-6 py-3 rounded-xl transition hover:bg-[#00D957] hover:text-white">
            イベント一覧
          </Link>

          <Link href="/events/create" className="block text-gray-700 px-6 py-3 rounded-xl transition hover:bg-[#00D957] hover:text-white">
            イベント作成
          </Link>
        </nav>
      </div>

      <div className="mt-auto bg-[#3BB1FF] text-white px-6 py-4 space-y-3">
        <Link href="/setting" className="block hover:underline">
          設定
        </Link>

        <button onClick={() => { clear(); router.push("/login") }} className="block hover:underline text-white">
          ログアウト
        </button>
      </div>
    </aside>
  )
}

export default Navigation
