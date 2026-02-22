import { Event, ImageData } from "../interfaces/Event";

// ローカル開発用のダミーイベント（prefecture のみ利用）
export const eventsData: Event[] = [
  {
    id: "seed-1",
    title: "サイクリング交流会 in 札幌",
    startDate: "2026-03-10T10:00:00.000Z",
    endDate: "2026-03-10T13:00:00.000Z",
    description: "ゆったりペースで市内を回る初心者向けサイクリング。",
    prefecture: "北海道",
    city: "",
    imageId: "1111",
    userId: "seed-user-1",
  },
  {
    id: "seed-2",
    title: "登山好き集まれ in 長野",
    startDate: "2026-03-20T07:00:00.000Z",
    endDate: "2026-03-20T15:00:00.000Z",
    description: "北アルプスの入門ルートを歩きます。",
    prefecture: "長野県",
    city: "",
    imageId: "2222",
    userId: "seed-user-2",
  },
];

export const imageSeeds: ImageData[] = [
  {
    id: "1111",
    filePath: "/icons/hand-love.jpg",
  },
  {
    id: "2222",
    filePath: "/icons/chari-love.jpg",
  },
];
