"use client"

import Image from 'next/image'
import React, { use, useState } from 'react'
import { LoginUser, seedUser } from '../seeds/LoginUserSeed';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  const [name, SetName] = useState("");
  const [pass, SetPass] = useState("");
  const [error, SetError] = useState("");

  const handleLogin = () => {
    const user = seedUser.find((u) => (u.name === name || u.email === name) && u.pass === pass)

    if(user) {
      router.push("/home")
    }
    else {
      SetError("名前 / メールアドレス または パスワードが違います")
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

          <button onClick={handleLogin} className="w-full bg-[#F8574A] text-white py-3 rounded-full text-lg mb-4 font-bold">
            Login
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