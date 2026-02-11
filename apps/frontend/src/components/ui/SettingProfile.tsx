"use client";
import React, { useRef, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { useAuth } from "@/store/useAuth";
import { userApi } from "@/utils/api";

const SettingProfile = () => {
  const { currentUser, updateUser } = useUserStore();
  const { token } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>(currentUser?.name ?? "");
  const [email, setEmail] = useState<string>(currentUser?.email ?? "");
  const [career, setCareer] = useState<string>(currentUser?.career ?? "");
  const [intro, setIntro] = useState<string>(currentUser?.intro ?? "");
  const [previewImage, setPreviewImage] = useState<string | undefined>(currentUser.profileImage);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    if (!token) {
      setError("ログイン情報がありません");
      return;
    }
    if (career.length > 100) {
      setError("経歴は100文字以内で入力してください");
      return;
    }
    setError(null);
    setSaving(true);
    try {
      const payload = {
        name,
        email,
        career,
        intro,
        profileImage: previewImage ?? null,
      };
      const updated = await userApi.update(token, payload);
      updateUser(updated);
      alert("保存しました");
    } catch (e: any) {
      setError(e?.message ?? "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white mx-20 my-10 pb-10 rounded-2xl text-center">
      <div className="flex p-12 gap-10">
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
            アイコンをアップロード
          </button>
        </div>
        <div className="flex-1 text-start">
          <h2 className="text-gray-600 font-bold text-2xl">プロフィール</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-b border-gray-300 p-2 mb-6 mt-4 outline-none bg-transparent"
          />
          <h2 className="text-gray-600 font-bold text-2xl">メールアドレス</h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-gray-300 p-2 mb-6 mt-4 outline-none bg-transparent"
          />
          <h2 className="text-gray-600 font-bold text-2xl">経歴（100文字以内）</h2>
          <textarea
            placeholder="これまでの経歴"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            maxLength={100}
            className="w-full border border-gray-300 rounded-xl p-3 mb-6 outline-none bg-transparent h-24"
          />
          <h2 className="text-gray-600 font-bold text-2xl">一言</h2>
          <input
            type="text"
            placeholder="ひとこと自己紹介"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            className="w-full border-b border-gray-300 p-2 mb-6 mt-4 outline-none bg-transparent"
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button
        onClick={handleSave}
        disabled={saving}
        className="px-8 py-3 bg-[#3BB1FF] text-white rounded-full w-48 hover:bg-[#4bc2ff] transition-colors disabled:opacity-60"
      >
        {saving ? "保存中..." : "保存する"}
      </button>
    </div>
  );
};

export default SettingProfile;
