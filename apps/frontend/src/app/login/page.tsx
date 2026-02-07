"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/useAuth';
import { useUserStore } from '@/store/userStore';

const Login = () => {
  const router = useRouter();
  const { setAuth, hydrate, userId, loading } = useAuth();
  const { setUser } = useUserStore();

  const [name, SetName] = useState("");
  const [pass, SetPass] = useState("");
  const [error, SetError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { hydrate(); }, [hydrate]);
  useEffect(() => {
    if(!loading && userId) {
      router.push("/home");
    }
  }, [loading, userId, router]);

  const handleLogin = async () => {
    SetError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password: pass }),
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.message ?? "名前 / メールアドレス または パスワードが違います");

      setAuth(data.accessToken, data.user.id);
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        profileImage: data.user.profileImage,
        pass: ''
      });
      router.push("/home");
    } catch (e:any) {
      SetError(e.message ?? "名前 / メールアドレス または パスワードが違います");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-white px-30">
      <div className="flex flex-col flex-1 items-center justify-center text-center relative -mt-40">
        <Image
          src="/icons/ichariba-link.png"
          alt="Ichariba Link Logo"
          width={420}
          height={380}
          className='block'
        />

        <div className="absolute top-[90%] text-center">
            <h1 className="text-3xl font-bold text-[#2BBD32]">
            ここから始まる、あなたの第二のふるさと。
            </h1>

            <h2 className="pt-3 text-[#16AEDB] font-bold text-xl">
            ― いちゃりばLINKで、人と人がゆるやかに結ばれる ―
            </h2>
        </div>
      </div>

      <div className="flex flex-col flex-1 items-center justify-center text-center">
        <div className="w-100">

          <h1 className="text-3xl font-bold mb-8">Login</h1>

          <input
            type="text"
            placeholder="Name or Email"
            className="w-full border-b border-gray-300 p-2 mb-8 outline-none"
            onChange={(e) => SetName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border-b border-gray-300 p-2 mb-8 outline-none"
            onChange={(e) => SetPass(e.target.value)}
          />

          {error && (<p className='text-red-500 text-sm mb-4'>{error}</p>)}

          <button onClick={handleLogin} disabled={submitting} className="w-full bg-[#F8574A] text-white py-3 rounded-full text-lg mb-4 font-bold disabled:opacity-60">
            {submitting ? "Loading..." : "Login"}
          </button>

          <div className="text-sm text-gray-600">
            Forgot your password?{" "}
            <span className="text-[#F8574A] cursor-pointer">Click!</span>
          </div>

          <div className="text-sm text-gray-600 mt-2">
            Don't have an account?{" "}
            <span onClick={() => router.push("/signin")} className="text-[#F8574A] cursor-pointer">Sign up!</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
