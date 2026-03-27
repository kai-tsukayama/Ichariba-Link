import { Message, MessageUser } from "../interfaces/Message";

// ユーザーのシードデータ
export const messageUsersData: MessageUser[] = [
    { id: 1, name: 'Name1', profile: 'Profile', type: 'new', color: 'bg-[#00D957]' },
    { id: 2, name: 'Name2', profile: 'Profile', type: 'viewed', color: 'bg-[#FF9E9E]' },
    { id: 3, name: 'Name3', profile: 'Profile', type: 'new', color: 'bg-[#00D957]' },
    { id: 4, name: 'Name4', profile: 'Profile', type: 'viewed', color: 'bg-[#FF9E9E]' },
];

// メッセージのシードデータ
export const seedMessages: Message[] = [
    {
        id: "1",
        userId: "11",
        message: "こんにちは！",
        postedAt: new Date(),
    },
    {
        id: "2",
        userId: "22",
        message: "はじめまして、よろしくお願いします。",
        postedAt: new Date(Date.now() - 1000 * 60 * 60),
    }
];
