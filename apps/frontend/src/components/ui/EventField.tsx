"use client";

import React from 'react';
import { Event } from '@/app/interfaces/Event';
import { formatEventDateTime } from '@/utils/formatDate';
import { imageSeeds } from '@/app/seeds/EventSeeds';
import { useAuth } from '@/store/useAuth';
import { chatApi } from '@/utils/api';
import { useRouter } from 'next/navigation';

type Props = {
  event: Event;
};

const EventField = ({ event }: Props) => {
  const image = imageSeeds.find((img) => img.id === event.imageId);
  const imageSrc =
    event.imageUrl && (event.imageUrl.startsWith('data:') || event.imageUrl.startsWith('http') || event.imageUrl.startsWith('blob:'))
      ? event.imageUrl
      : image?.filePath;
  const { token } = useAuth();
  const router = useRouter();

  const handleJoin = async () => {
    if (!token) {
      alert('ログインしてください');
      return;
    }
    try {
      const room = await chatApi.createdRoom(token, event.userId);
      router.push(`/chat/${room.roomId}`);
    } catch (e) {
      console.error(e);
      alert('チャットの開始に失敗しました');
    }
  };

  return (
    <div className="bg-white h-screen mt-3 flex flex-col">
      <div className="bg-[#00D957] text-center text-white p-3 flex">
        <button onClick={() => history.back()} className="text-left pl-2">
          ＜
        </button>
        <h3 className="flex-2">{event.title}</h3>
      </div>
      <div className="flex p-10">
        {imageSrc ? (
          <img src={imageSrc} alt={event.title} className="w-[600px] h-[450px] object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">No Image</div>
        )}
        <div className="text-left pl-8 flex-1 flex-col">
          <h2 className="text-left font-bold text-2xl">{event.title}</h2>
          <p className="pt-4 text-[#0047DF] text-xl">
            {formatEventDateTime(new Date(event.startDate), new Date(event.endDate))}
          </p>

          <div className="pt-4">
            <button
              className="px-10 py-1 text-xl bg-[#F8574A] text-white hover:bg-[#e04840] transition ml-4"
              onClick={handleJoin}
            >
              参加する
            </button>
          </div>
          <div className="pt-4 flex-1">
            <h3 className="font-bold pb-2">イベント説明</h3>
            <p className="h-[270px] overflow-y-auto">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventField;
