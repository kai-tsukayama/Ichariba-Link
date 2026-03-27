export const CHAT_ROOM_REPOSITORY = Symbol('CHAT_ROOM_REPOSITORY');
export interface IChatRoomRepository {
  findOneToOneRoom(userId: string, partnerId: string): Promise<{ id: string } | null>;
  createOneToOneRoom(userId: string, partnerId: string): Promise<{ id: string }>;
  listRoomsWithLatestMessage(userId: string, limit: number, cursor?: string): Promise<any[]>;
  isMember(roomId: string, userId: string): Promise<boolean>;
}
