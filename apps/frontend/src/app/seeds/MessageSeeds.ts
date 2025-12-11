import { Message } from "../interfaces/Message";

export const seedMessages: Message[] = [
    {
        id: "1",
        userId: "11",
        message: "これはテストデータです。",
        postedAt: new Date("2025-12-08")
    },
    {
        id: "2",
        userId: "22",
        message: "これは相手のテストデータです。",
        postedAt: new Date("2025-12-09")
    },
    {
        id: "3",
        userId: "22",
        message: "これは相手の昇順のテストデータです。",
        postedAt: new Date("2025-12-10")
    },
    {
        id: "4",
        userId: "11",
        message: "これは昇順のテストデータです。",
        postedAt: new Date("2025-12-11")
    }
]
