// チャット用のインタフェース
export interface Message {
    id: string;
    userId: string,
    message: string,
    postedAt: Date
}
