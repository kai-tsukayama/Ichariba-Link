import Image from 'next/image'
import React from 'react'

const SignIn = () => {
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
          />

          <input
            type="text"
            placeholder="Email"
            className="w-full border-b border-gray-300 p-2 mb-8 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border-b border-gray-300 p-2 mb-8 outline-none"
          />

          <button className="w-full bg-[#F8574A] text-white py-3 rounded-full text-lg mb-4 font-bold">
            Sign up
          </button>

          <div className="text-sm text-gray-600">
            Already have an account?
            <span className="text-[#F8574A] cursor-pointer pl-5">Login</span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignIn