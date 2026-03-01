"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { authApi } from "@/utils/api";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setMessage("");
    if (!name.trim() || !email.trim()) {
      setError("氏名とメールアドレスを入力してください。");
      return;
    }
    setLoading(true);
    try {
      const res = await authApi.requestPasswordReset({ name, email });
      setMessage("本人確認が完了しました。パスワード再設定へ進みます。");
      router.push(`/reset-password?token=${encodeURIComponent(res.resetToken)}`);
    } catch (e: any) {
      setError(e?.message ?? "確認に失敗しました。再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">パスワードをお忘れですか？</h1>
          <p className="text-sm text-gray-600">登録済みの氏名とメールアドレスで本人確認を行います。</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">氏名</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
              placeholder="山田 太郎"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
              placeholder="taro@example.com"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#F8574A] text-white rounded-full py-3 font-semibold disabled:opacity-60"
          >
            {loading ? "確認中..." : "本人確認を実行"}
          </button>
          <button
            onClick={() => router.push("/login")}
            className="w-full text-sm text-gray-600 hover:text-gray-800"
          >
            ログイン画面に戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
