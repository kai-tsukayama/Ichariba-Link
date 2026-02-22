import { Inject, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Server, Socket } from 'socket.io';
import { CHAT_ROOM_REPOSITORY } from 'src/domains/repositories/chat-room.repository.interface';
import type { IChatRoomRepository } from 'src/domains/repositories/chat-room.repository.interface';

type WsUserData = {
  userId: string;
};

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
    credentials: false,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    @Inject(CHAT_ROOM_REPOSITORY) private readonly chatRooms: IChatRoomRepository,
  ) {}

  handleConnection(client: Socket) {
    try {
      const token = this.extractToken(client);
      const payload = this.jwt.verify(token, {
        secret: this.config.get<string>('JWT_SECRET') ?? 'dev-secret',
      });
      (client.data as WsUserData).userId = payload.sub;
    } catch (error) {
      this.logger.debug(
        `disconnecting socket due to auth failure: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      client.disconnect();
    }
  }

  handleDisconnect(_: Socket) {
    // nothing special to do
  }

  @SubscribeMessage('join')
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { roomId?: string },
  ) {
    const userId = (client.data as WsUserData).userId;
    if (!userId || !payload?.roomId) return;

    const isMember = await this.chatRooms.isMember(payload.roomId, userId);
    if (!isMember) {
      client.emit('error', { message: 'not a member of this room' });
      return;
    }

    await client.join(payload.roomId);
    client.emit('joined', { roomId: payload.roomId });
  }

  notifyNewMessage(message: {
    id: string;
    roomId: string;
    content: string;
    senderId: string;
    createdAt: Date;
  }) {
    this.server.to(message.roomId).emit('message', {
      ...message,
      createdAt: message.createdAt,
    });
  }

  private extractToken(client: Socket): string {
    const header = client.handshake.headers.authorization;
    if (header?.startsWith('Bearer ')) return header.slice(7);

    const fromAuth = client.handshake.auth?.token as string | undefined;
    if (fromAuth) return fromAuth;

    const queryToken = client.handshake.query?.token;
    if (typeof queryToken === 'string') return queryToken;

    throw new Error('missing token');
  }
}
