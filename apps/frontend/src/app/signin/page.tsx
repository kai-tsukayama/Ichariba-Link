"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/store/useAuth';
import { useUserStore } from '@/store/userStore';

const SignIn = () => {
  const router = useRouter();
  const { setAuth, hydrate, userId, loading } = useAuth();
  const { setUser } = useUserStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { hydrate(); }, [hydrate]);
  useEffect(() => {
    if(!loading && userId) {
      router.push("/home");
    }
  }, [loading, userId, router]);

  const handleSignup = async () => {
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.message ?? "登録に失敗しました");

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
      setError(e.message ?? "登録に失敗しました");
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

          <h1 className="text-3xl font-bold mb-8">Save you account now</h1>

          <input
            type="text"
            placeholder="Name of nickname"
            className="w-full border-b border-gray-300 p-2 mb-8 outline-none"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            className="w-full border-b border-gray-300 p-2 mb-8 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border-b border-gray-300 p-2 mb-8 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (<p className='text-red-500 text-sm mb-4'>{error}</p>)}

          <button className="w-full bg-[#F8574A] text-white py-3 rounded-full text-lg mb-4 font-bold disabled:opacity-60" onClick={handleSignup} disabled={submitting}>
            {submitting ? "Loading..." : "Sign up"}
          </button>

          <div className="text-sm text-gray-600">
            Already have an account?
            <span onClick={() => router.push("/login")} className="text-[#F8574A] cursor-pointer pl-5">Login</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignIn
