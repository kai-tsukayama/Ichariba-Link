"use client";

import React, { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useAuth } from "@/store/useAuth";
import { userApi } from "@/utils/api";

type Props = {
  open: boolean;
};

const ProfileOnboardingModal = ({ open }: Props) => {
  const { currentUser, updateUser } = useUserStore();
  const { token } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(currentUser?.name ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [career, setCareer] = useState<string>(currentUser?.career ?? "");
  const [intro, setIntro] = useState<string>(currentUser?.intro ?? "");
  const [baseLocation, setBaseLocation] = useState<string>(currentUser?.baseLocation ?? "");
  const [residenceTerm, setResidenceTerm] = useState<string>(currentUser?.residenceTerm ?? "");
  const [previewImage, setPreviewImage] = useState<string | undefined>(currentUser?.profileImage ?? undefined);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ユーザー情報が更新されたときにフォームも同期する
  useEffect(() => {
    setName(currentUser?.name ?? "");
    setEmail(currentUser?.email ?? "");
    setCareer(currentUser?.career ?? "");
    setIntro(currentUser?.intro ?? "");
    setBaseLocation(currentUser?.baseLocation ?? "");
    setResidenceTerm(currentUser?.residenceTerm ?? "");
    setPreviewImage(currentUser?.profileImage ?? undefined);
  }, [currentUser]);

  if (!open) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleSave = async () => {
    if (!token) {
      setError("ログイン情報が見つかりません");
      return;
    }
    if (!baseLocation.trim() || !residenceTerm) {
      setError("拠点と居住期間は必須です");
      return;
    }
    if (career.length > 100) {
      setError("経歴は100文字以内で入力してください");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const payload = {
        name,
        email,
        career,
        intro,
        baseLocation,
        residenceTerm: residenceTerm || null,
        profileImage: previewImage ?? null,
      };
      const updated = await userApi.update(token, payload);
      updateUser(updated);
    } catch (e: any) {
      setError(e?.message ?? "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="bg-[#3BB1FF] text-white px-6 py-4">
          <h2 className="text-xl font-bold">はじめにプロフィールを完成させましょう</h2>
          <p className="text-sm opacity-90">拠点と居住期間を入力するとアプリを使い始められます</p>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col items-center">
              <div className="bg-gray-200 p-1 rounded-full h-40 w-40 overflow-hidden flex items-center justify-center">
                {previewImage ? (
                  <img src={previewImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
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
                className="w-40 p-2 bg-[#F8574A] text-white rounded-full mt-6 cursor-pointer hover:bg-[#ff6b5f] transition-colors"
              >
                画像をアップロード
              </button>
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-gray-600 font-semibold text-lg">名前</h3>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-gray-300 p-2 outline-none bg-transparent"
                />
              </div>
              <div>
                <h3 className="text-gray-600 font-semibold text-lg">メールアドレス</h3>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-300 p-2 outline-none bg-transparent"
                />
              </div>
              <div>
                <h3 className="text-gray-600 font-semibold text-lg">経歴（100文字以内）</h3>
                <textarea
                  value={career}
                  onChange={(e) => setCareer(e.target.value)}
                  maxLength={100}
                  className="w-full border border-gray-300 rounded-xl p-3 outline-none bg-transparent h-24"
                />
              </div>
              <div>
                <h3 className="text-gray-600 font-semibold text-lg">拠点 *</h3>
                <input
                  type="text"
                  placeholder="例：沖縄県那覇市 / 東京都内 など"
                  value={baseLocation}
                  onChange={(e) => setBaseLocation(e.target.value)}
                  className="w-full border-b border-gray-300 p-2 outline-none bg-transparent"
                />
              </div>
              <div>
                <h3 className="text-gray-600 font-semibold text-lg">居住期間 *</h3>
                <select
                  value={residenceTerm}
                  onChange={(e) => setResidenceTerm(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 bg-white"
                >
                  <option value="">選択してください</option>
                  <option value="CONSIDERING">検討中</option>
                  <option value="LT_1M">移住1か月未満</option>
                  <option value="LT_1Y">1年未満</option>
                  <option value="Y1_3">1〜3年</option>
                  <option value="GTE_3Y">3年以上</option>
                </select>
              </div>
              <div>
                <h3 className="text-gray-600 font-semibold text-lg">自己紹介</h3>
                <input
                  type="text"
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  className="w-full border-b border-gray-300 p-2 outline-none bg-transparent"
                />
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="px-6 py-4 border-t flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-[#3BB1FF] text-white rounded-full hover:bg-[#4bc2ff] transition-colors disabled:opacity-60"
          >
            {saving ? "保存中..." : "保存してはじめる"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOnboardingModal;
