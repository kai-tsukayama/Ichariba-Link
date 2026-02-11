"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/store/useAuth";
import { chatApi } from "@/utils/api";

type ThreadItem = {
  id: string;
  name: string;
  profile: string;
  avatar?: string | null;
  type: "new" | "viewed";
  color: string;
  roomId?: string;
  partnerId: string;
};

const trimPreview = (text: string, limit = 50) => {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}…` : text;
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
        const mapped: ThreadItem[] = rooms
          .map((room: any) => ({
            id: room.roomId,
            name: room.partner?.name ?? "Unknown",
            profile: trimPreview(room.latestMessage?.content ?? ""),
            avatar: room.partner?.profileImage ?? null,
            type: room.latestMessage && room.latestMessage.senderId !== userId ? "new" : "viewed",
            color: room.latestMessage && room.latestMessage.senderId !== userId ? "bg-[#00D957]" : "bg-[#FF9E9E]",
            roomId: room.roomId,
            partnerId: room.partner?.id ?? "",
          }))
          .filter((room: ThreadItem) => room.partnerId);

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
      if (activeNew && msg.type === "new") return true;
      if (activeWatch && msg.type === "viewed") return true;
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
          className={`w-30 py-1 rounded-full text-white m-5 cursor-pointer ${activeNew ? "bg-[#3BB1FF]" : "bg-[#D9D9D9]"}`}
        >
          未返信
        </button>
        <button
          onClick={() => setActiveWatch(!activeWatch)}
          className={`w-30 py-1 rounded-full text-white cursor-pointer ${activeWatch ? "bg-[#3BB1FF]" : "bg-[#D9D9D9]"}`}
        >
          返信済み
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
                    <img src={msg.avatar || "/icons/chari-love.jpg"} alt={msg.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="pl-10">
                    <h2 className="text-xl font-bold">{msg.name}</h2>
                    <p className="text-[#7B7B7B]">{msg.profile || "メッセージを送ってみましょう"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {!loading && filteredMessages.length === 0 && (
          <p className="text-gray-500 px-6">表示できるメッセージがありません</p>
        )}
      </div>
    </div>
  );
};

export default MessagesField;
