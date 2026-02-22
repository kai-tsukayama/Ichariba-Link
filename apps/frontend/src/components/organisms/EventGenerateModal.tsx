"use client";

import { EventInput } from '@/app/interfaces/Event';
import { useEventStore } from '@/store/eventStore';
import { useAuth } from '@/store/useAuth';
import { formatEventDateTime } from '@/utils/formatDate';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  onClose: () => void;
  event: EventInput;
};

const EventGenerateModal = ({ onClose, event }: Props) => {
  const router = useRouter();
  const { token } = useAuth();
  const createEvent = useEventStore((state) => state.createEvent);

  const handleCreate = async () => {
    if (!token) {
      alert("ログインしてください");
      return;
    }
    await createEvent(token, {
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      prefecture: event.prefecture,
      city: "",
      imageId: event.imageUrl ?? "",
      imageUrl: event.imageUrl ?? "",
    });
    onClose();
    router.push("/home");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-150 h-100 bg-white border rounded-xl p-10 shadow-xl">
        <h2 className="text-center text-xl font-bold mb-6">
          以下の内容でイベントを作成します
        </h2>

        <div className="pt-5">
          <h3 className="text-sm">イベントタイトル</h3>
          <p className="text-center mb-4 font-bold">{event.title}</p>
          <h3 className="text-sm">日時</h3>
          <p className="text-center mb-4 font-bold">
            {formatEventDateTime(new Date(event.startDate), new Date(event.endDate))}
          </p>
          <h3 className="text-sm">都道府県</h3>
          <p className="text-center mb-4 font-bold">{event.prefecture}</p>
        </div>

        <div className="flex justify-around gap-4 mt-8">
          <button
            className="px-6 py-2 bg-[#3BB1FF] text-white rounded-full w-50"
            onClick={handleCreate}
          >
            作成する
          </button>
          <button
            className="px-6 py-2 bg-white border-3 border-[#3BB1FF] rounded-full w-50 text-[#3BB1FF]"
            onClick={onClose}
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventGenerateModal;
