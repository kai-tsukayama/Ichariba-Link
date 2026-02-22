"use client";

import { imageSeeds } from '@/app/seeds/EventSeeds';
import { prefectureOptions } from '@/app/seeds/LocationSeeds';
import { useEventStore } from '@/store/eventStore';
import { useAuth } from '@/store/useAuth';
import { chatApi } from '@/utils/api';
import { formatEventDateTime } from '@/utils/formatDate';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

const SerchEvents = () => {
  const { token } = useAuth();
  const router = useRouter();
  const events = useEventStore((state) => state.events);
  const fetchEvents = useEventStore((state) => state.fetchEvents);
  const [prefectureCode, setPrefectureCode] = useState('');

  useEffect(() => {
    fetchEvents(token ?? undefined);
  }, [fetchEvents, token]);

  const selectedPrefecture = useMemo(
    () => prefectureOptions.find((p) => p.code === prefectureCode) ?? null,
    [prefectureCode],
  );

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (selectedPrefecture && event.prefecture !== selectedPrefecture.name) return false;
      return true;
    });
  }, [events, selectedPrefecture]);

  const handleJoin = async (organizerId: string) => {
    if (!token) {
      alert('ログインしてください');
      return;
    }
    try {
      const room = await chatApi.createdRoom(token, organizerId);
      router.push(`/chat/${room.roomId}`);
    } catch (e) {
      console.error(e);
      alert('チャットの開始に失敗しました');
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 p-8 bg-[#EEF3FF] rounded-x justify-center">
        <select
          className="appearance-none text-center px-6 py-2 rounded-full border border-gray-300 bg-white text-sm"
          value={prefectureCode}
          onChange={(e) => setPrefectureCode(e.target.value)}
        >
          <option value="">都道府県</option>
          {prefectureOptions.map((p) => (
            <option key={p.code} value={p.code}>
              {p.name}
            </option>
          ))}
        </select>

        <input type="date" className="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm" />
        <span className="font-medium ml-2">のイベントを表示</span>

        <button
          onClick={() => setPrefectureCode('')}
          className="px-5 py-2 text-white rounded-full text-sm bg-gray-400 hover:bg-gray-500 ml-3 transition-colors"
        >
          絞り込み解除
        </button>
      </div>

      <hr className="border-gray-300 mt-2" />

      {filteredEvents.map((r) => {
        const image = imageSeeds.find((img) => img.id === r.imageId);
        const imageSrc =
          r.imageUrl && (r.imageUrl.startsWith('data:') || r.imageUrl.startsWith('http') || r.imageUrl.startsWith('blob:'))
            ? r.imageUrl
            : image?.filePath;
        return (
          <React.Fragment key={r.id}>
            <div className="w-full flex justify-center">
              <div className="w-[1000px] py-10 flex gap-10">
                <div className="w-[480px] h-[280px] bg-gray-300 overflow-hidden">
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={r.title}
                      className="w-[480px] h-[280px] object-cover"
                    />
                  )}
                </div>
                <div className="w-[400px] shrink-0">
                  <h3 className="text-2xl font-bold text-gray-800">{r.title}</h3>
                  <p className="text-xl text-gray-600 mt-3">
                    {formatEventDateTime(new Date(r.startDate), new Date(r.endDate))}
                  </p>

                  <div className="flex gap-8 mt-3">
                    <Link
                      href={`/events/${r.id}`}
                      className="px-8 py-1 text-xl rounded-full border-2 border-[#F8574A] text-[#F8574A] hover:bg-[#F8574A] hover:text-white transition"
                    >
                      詳細を見る
                    </Link>
                    <button
                      className="px-10 py-1 text-xl rounded-full bg-[#F8574A] text-white hover:bg-[#e04840] transition"
                      onClick={() => handleJoin(r.userId)}
                    >
                      参加する
                    </button>
                  </div>

                  <div className="mt-6">{r.description}</div>
                </div>
              </div>
            </div>
            <hr className="border-gray-300 mt-2" />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SerchEvents;
