import Image from "next/image";
import { Event, ImageData } from "../interfaces/Event";
export const eventsData: Event[] = [
    {
        id: "1",
        title: "移住者交流会 in 恩納村",
        startData: new Date("2025-11-03T18:00:00"),
        endData: new Date("2025-11-03T20:00:00"),
        description: "沖縄への移住を考えている方や、すでに恩納村で暮らしている方を対象にした交流会です。仕事や暮らしのこと、移住して感じたリアルな体験談などを気軽に共有できます。初めての参加でも安心して話せる、アットホームな雰囲気のイベントです。",
        prefecture: "沖縄県",
        city: "恩納村",
        imageId: "1111"
    },
    {
        id: "2",
        title: "移住者交流会 in 名護",
        startData: new Date("2025-11-03T20:00:00"),
        endData: new Date("2025-11-03T22:00:00"),
        description: "名護市周辺に移住した方や、これから移住を検討している方向けの交流イベントです。地域の魅力や生活情報を共有しながら、新しいつながりを作ることができます。少人数制で、ゆっくり会話を楽しめる時間をご用意しています。",
        prefecture: "沖縄県",
        city: "名護",
        imageId: "2222"
    },
]

export const imageSeeds: ImageData[] = [
    {
        id: "1111",
        filePath: "/icons/hand-love.jpg"
    },
    {
        id: "2222",
        filePath: "/icons/chari-love.jpg"
    },
]

