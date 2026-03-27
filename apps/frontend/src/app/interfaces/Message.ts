// メッセージユーザーインターフェース
export interface MessageUser {
    id: number;
    name: string;
    profile: string;
    type: 'new' | 'viewed';
    color: string;
}

// メッセージインターフェース
export interface Message {
    id: string;
    userId: string;
    message: string;
    postedAt: Date;
}
