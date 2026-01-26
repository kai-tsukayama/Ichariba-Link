export const MESSAGE_SERVICE = Symbol('MESSAGE_SERVICE');
export interface IMessageService {
  send(userId: string, roomId: string, content: string): Promise<any>;
  history(userId: string, roomId: string, limit?: number, cursor?: string): Promise<any[]>;
}
