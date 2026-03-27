"use client";

import Header from "@/components/organisms/Header";
import Navigation from "@/components/organisms/Navigation";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAuth } from "@/store/useAuth";
import { chatApi, userApi } from "@/utils/api";
import { resolveBadge } from "@/utils/badge";
import { User } from "@/app/interfaces/User";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FriendsPage = () => {
  const { token, userId, hydrate, loading: authLoading } = useAuth();
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!token || !userId || authLoading) return;
    const load = async () => {
      setLoading(true);
      try {
        const list = await userApi.list(token);
        setFriends(list.filter((u: User) => u.id !== userId));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token, userId, authLoading]);

  const handleMessage = async (partnerId: string) => {
    if (!token) return;
    try {
      const room = await chatApi.createdRoom(token, partnerId);
      router.push(`/chat/${room.roomId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthGuard>
      <div className="bg-[#F0F4FF]">
        <div className="flex h-screen">
          <Navigation />
          <div className="flex-1 flex flex-col px-1">
            <div className="shrink-0">
              <Header title="友達を見る" />
            </div>
            <div className="flex-1 overflow-y-auto">
              <section className="px-6 py-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-500">登録されている友達</p>
                  <h2 className="text-2xl font-semibold text-[#002365]">
                    {friends.length}人のプロフィール
                  </h2>
                </div>

                {loading && <p className="text-gray-500">読み込み中...</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {friends.map((friend) => (
                    <article
                      key={friend.id}
                      className="bg-white rounded-2xl shadow-md border border-[#E2E8FF] p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#EEF3FF] flex items-center justify-center shrink-0">
                          <img
                            src={friend.profileImage || "/icons/ichariba-link.png"}
                            alt={friend.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        <div className="space-y-1 w-full">
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <p className="text-lg font-semibold text-[#002365]">{friend.name}</p>
                              <p className="text-sm text-gray-600">{friend.email}</p>
                            </div>

                            {resolveBadge(friend.badgeKey) && (
                              <div className="flex items-center">
                                <img
                                  src={resolveBadge(friend.badgeKey)!.icon}
                                  alt={resolveBadge(friend.badgeKey)!.label}
                                  className="w-30 h-30"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-gray-700 leading-relaxed">
                        <span className="text-[#F8574A] font-semibold mr-2">
                          経歴
                        </span>
                        {friend.career || "未入力"}
                      </div>

                      <div className="bg-[#F7FAFF] border border-[#E2E8FF] rounded-xl p-3 text-sm text-gray-600 leading-relaxed">
                        <span className="font-semibold text-[#3BB1FF] mr-2">
                          一言
                        </span>
                        {friend.intro || "よろしくお願いします！"}
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => handleMessage(friend.id)}
                          className="px-4 py-2 rounded-full bg-[#F8574A] text-white text-sm font-semibold hover:bg-[#e04840] transition-colors"
                        >
                          メッセージを送る
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                {!loading && friends.length === 0 && (
                  <p className="text-gray-500 mt-4">表示できる友達がいません。</p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default FriendsPage;
