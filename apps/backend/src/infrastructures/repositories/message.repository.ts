import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IMessageRepository } from 'src/domains/repositories/message.repository.interface';

@Injectable()
export class MessageRepository implements IMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  // メッセージ作成後、ルームの updatedAt を更新
  async create(roomId: string, senderId: string, content: string): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const msg = await tx.message.create({
        data: { roomId, senderId, content },
        select: {
          id: true,
          roomId: true,
          content: true,
          createdAt: true,
          senderId: true,
        },
      });
      await tx.chatRoom.update({
        where: { id: roomId },
        data: { updatedAt: new Date() },
      });
      return msg;
    });
  }

  // 履歴取得（ページング用に cursor を利用）
  async getHistory(roomId: string, limit: number, cursor?: string): Promise<any[]> {
    return this.prisma.message.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: { roomId },
      orderBy: { createdAt: 'desc' }, // 必要に応じてフロントで逆順表示
      select: {
        id: true,
        roomId: true,
        content: true,
        createdAt: true,
        senderId: true,
        isRead: true,
      },
    });
  }
}
