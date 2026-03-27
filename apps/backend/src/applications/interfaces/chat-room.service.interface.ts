export const CHAT_ROOM_SERVICE = Symbol("CHAT_ROOM_SERVICE");
export interface IChatRoomService {
    createOrGetRoom(userId: string, partnerUserId: string): Promise<{ roomId: string }>;
    listMyRooms(userId: string, limit?: number, cursor?: string): Promise<any[]>;
}
