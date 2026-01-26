export class Message {
    constructor(
        public readonly id: string,
        public readonly content: string,
        public readonly isRead: boolean,
        public readonly createdAt: Date,
        public readonly roomId: string,
        public readonly senderId: string
    ){}
}