"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/store/useAuth';
import { chatApi, userApi } from '@/utils/api';
import { User } from '@/app/interfaces/User';

type ThreadItem = {
  id: string;
  name: string;
  profile: string;
  type: 'new' | 'viewed';
  color: string;
  roomId?: string;
  partnerId: string;
};

const MessagesField = () => {
  const router = useRouter();
  const { userId, token, hydrate, loading: authLoading } = useAuth();
  const [items, setItems] = useState<ThreadItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeNew, setActiveNew] = useState(false);
  const [activeWatch, setActiveWatch] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (authLoading || !userId || !token) return;
    const load = async () => {
      setLoading(true);
      try {
        const rooms = await chatApi.listRooms(token);
        let mapped: ThreadItem[] = rooms.map((room: any) => ({
          id: room.roomId,
          name: room.partner?.name ?? 'Unknown',
          profile: room.latestMessage?.content ?? '縺ゅｊ縺ｮ繝｡繝・そ繝ｼ繧ｸ繧呈ｱ縺ｲ蜃ｺ縺励ｇ縺・',
          type: room.latestMessage && room.latestMessage.senderId !== userId ? 'new' : 'viewed',
          color: room.latestMessage && room.latestMessage.senderId !== userId ? 'bg-[#00D957]' : 'bg-[#FF9E9E]',
          roomId: room.roomId,
          partnerId: room.partner?.id ?? '',
        })).filter((room: ThreadItem) => room.partnerId);

        if (mapped.length === 0) {
          const users: User[] = await userApi.list(token);
          const others = users.filter((u) => u.id !== userId);
          if (others[0]) {
            await chatApi.createdRoom(token, others[0].id);
            const refreshed = await chatApi.listRooms(token);
            mapped = refreshed.map((room: any) => ({
              id: room.roomId,
              name: room.partner?.name ?? 'Unknown',
              profile: room.latestMessage?.content ?? '縺ゅｊ縺ｮ繝｡繝・そ繝ｼ繧ｸ繧呈ｱ縺ｲ蜃ｺ縺励ｇ縺・',
              type: room.latestMessage && room.latestMessage.senderId !== userId ? 'new' : 'viewed',
              color: room.latestMessage && room.latestMessage.senderId !== userId ? 'bg-[#00D957]' : 'bg-[#FF9E9E]',
              roomId: room.roomId,
              partnerId: room.partner?.id ?? '',
            })).filter((room: ThreadItem) => room.partnerId);
          } else {
            mapped = others.map((u, idx) => ({
              id: u.id,
              name: u.name,
              profile: u.email ?? '',
              type: 'new',
              color: idx % 2 === 0 ? 'bg-[#00D957]' : 'bg-[#FF9E9E]',
              partnerId: u.id,
            }));
          }
        }

        setItems(mapped);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [authLoading, token, userId]);

  const filteredMessages = useMemo(() => {
    return items.filter((msg) => {
      if (!activeNew && !activeWatch) return true;
      if (activeNew && msg.type === 'new') return true;
      if (activeWatch && msg.type === 'viewed') return true;
      return false;
    });
  }, [items, activeNew, activeWatch]);

  const handleClick = async (msg: ThreadItem) => {
    if (!token || (!msg.partnerId && !msg.roomId)) return;
    try {
      const roomId = msg.roomId ?? (await chatApi.createdRoom(token, msg.partnerId)).roomId;
      router.push(`/chat/${roomId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="pl-4 pt-4 pr-4">
      <div>
        <button
          onClick={() => setActiveNew(!activeNew)}
          className={`w-30 py-1 rounded-full text-white m-5 cursor-pointer ${activeNew ? 'bg-[#3BB1FF]' : 'bg-[#D9D9D9]'}`}
        >
          譁ｰ逹
        </button>
        <button
          onClick={() => setActiveWatch(!activeWatch)}
          className={`w-30 py-1 rounded-full text-white cursor-pointer ${activeWatch ? 'bg-[#3BB1FF]' : 'bg-[#D9D9D9]'}`}
        >
          髢ｲ隕ｧ貂医∩
        </button>
      </div>
      <div>
        {loading && <p className="text-gray-500 px-6">Loading...</p>}
        {!loading &&
          filteredMessages.map((msg) => (
            <div key={msg.id} onClick={() => handleClick(msg)} className="cursor-pointer">
              <div className="flex mb-4 w-full">
                <div className={`${msg.color} h-30 w-3 mr-2`}></div>
                <div className="bg-white flex flex-1 items-center px-8">
                  <div className="rounded-full h-15 w-15 bg-[#D9D9D9] overflow-hidden">
                    <img src="/icons/chari-love.jpg" alt={msg.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="pl-10">
                    <h2 className="text-xl font-bold">{msg.name}</h2>
                    <p className="text-[#7B7B7B]">{msg.profile || '縺薙％縺九ｉ繝｡繝・そ繝ｼ繧ｸ縺悟ｭｭ蛻昴・・'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {!loading && filteredMessages.length === 0 && (
          <p className="text-gray-500 px-6">繝｡繝・そ繝ｼ繧ｸ荳隕ｧ縺ｮ繝ｦ繝ｼ繧ｶ繝ｼ縺後↑縺・→縺阪↑縺薙ｌ縺ｰ縺ゅｊ縺ｮ繝ｫ繝ｼ繝繧貞岼蟾･縺吶ｋ縺・</p>
        )}
      </div>
    </div>
  );
};

export default MessagesField;
