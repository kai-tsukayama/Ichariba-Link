export const MESSAGE_REPOSITORY = Symbol('MESSAGE_REPOSITORY');
export interface IMessageRepository {
  create(roomId: string, senderId: string, content: string): Promise<any>;
  getHistory(roomId: string, limit: number, cursor?: string): Promise<any[]>;
}
