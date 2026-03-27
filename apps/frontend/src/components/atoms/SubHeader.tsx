"use client";

import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  title?: string;
};

const SubHeader = ({ title }: Props) => {
  const router = useRouter();
  return (
    <div className="bg-[#3BB1FF] text-white flex items-center p-4 mt-2">
      <button onClick={() => router.push("/messages")} className="flex-1 text-left pl-2">
        ＜
      </button>
      <h2 className="flex-1 text-center">{title || "いちゃちばLINK運営からのメッセージ"}</h2>
      <div className="flex-1"></div>
    </div>
  );
};

export default SubHeader;
