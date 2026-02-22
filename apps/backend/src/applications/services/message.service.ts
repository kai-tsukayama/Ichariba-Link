import { ForbiddenException, Injectable, Inject } from '@nestjs/common';
import { IMessageService } from '../interfaces/message.service.interface';
import { MESSAGE_REPOSITORY } from 'src/domains/repositories/message.repository.interface';
import type { IMessageRepository } from 'src/domains/repositories/message.repository.interface';
import { CHAT_ROOM_REPOSITORY } from 'src/domains/repositories/chat-room.repository.interface';
import type { IChatRoomRepository } from 'src/domains/repositories/chat-room.repository.interface';
import { ChatGateway } from 'src/presentations/gateways/chat.gateway';

@Injectable()
export class MessageService implements IMessageService {
  constructor(
    @Inject(MESSAGE_REPOSITORY) private readonly messages: IMessageRepository,
    @Inject(CHAT_ROOM_REPOSITORY) private readonly chatRooms: IChatRoomRepository,
    private readonly chatGateway: ChatGateway,
  ) {}

  async send(userId: string, roomId: string, content: string) {
    const isMember = await this.chatRooms.isMember(roomId, userId);
    if (!isMember) throw new ForbiddenException('not a member of this room');
    const created = await this.messages.create(roomId, userId, content);

    // push to connected clients in the same room
    this.chatGateway.notifyNewMessage({
      id: created.id,
      roomId: created.roomId,
      content: created.content,
      senderId: created.senderId,
      createdAt: created.createdAt,
    });

    return created;
  }

  async history(userId: string, roomId: string, limit = 20, cursor?: string) {
    const isMember = await this.chatRooms.isMember(roomId, userId);
    if (!isMember) throw new ForbiddenException('not a member of this room');
    return this.messages.getHistory(roomId, limit, cursor);
  }
}
