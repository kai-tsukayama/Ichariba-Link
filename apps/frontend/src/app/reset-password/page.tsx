"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { authApi } from "@/utils/api";

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setError("");
    setMessage("");

    if (!token) {
      setError("無効なリンクです。");
      return;
    }
    if (!password || password.length < 4) {
      setError("パスワードは4文字以上で入力してください。");
      return;
    }
    if (password !== confirm) {
      setError("確認用パスワードが一致しません。");
      return;
    }

    setLoading(true);
    try {
      await authApi.resetPassword({ token, newPassword: password });
      setMessage("パスワードを更新しました。ログイン画面へ移動します。");
      setTimeout(() => router.push("/login"), 800);
    } catch (e: any) {
      setError(e?.message ?? "パスワードの再設定に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">新しいパスワードを設定</h1>
          <p className="text-sm text-gray-600">再設定リンクに含まれるトークンで確認しています。</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">新しいパスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
              placeholder="4文字以上"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">確認用パスワード</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}
          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-[#3BB1FF] text-white rounded-full py-3 font-semibold disabled:opacity-60"
          >
            {loading ? "更新中..." : "パスワードを更新"}
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

export default ResetPasswordPage;
