import { Injectable } from "@nestjs/common";
import { IChatRoomRepository } from "src/domains/repositories/chat-room.repository.interface";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ChatRoomRepository implements IChatRoomRepository {
    constructor( private readonly prisma: PrismaService ){}

    async findOneToOneRoom(userId: string, partnerId: string): Promise<{ id: string } | null> {
        const room = await this.prisma.chatRoom.findFirst({
            where: {
                AND: [
                    { users: {some: {userId}} },
                    { users: {some: {userId: partnerId}}}
                ],
            },
            select: {id: true},
        });
        return room ?? null;
    }

    // 1対1ルームを新規作成（room + chatRoomUser 2件をトランザクション）
    async createOneToOneRoom(userId: string, partnerId: string): Promise<{ id: string }> {
        return this.prisma.$transaction(async (tx) => {
        const room = await tx.chatRoom.create({ data: {} }); // updatedAt はデフォルト
        await tx.chatRoomUser.createMany({
            data: [
            { roomId: room.id, userId },
            { roomId: room.id, userId: partnerId },
            ],
        });
        return { id: room.id };
        });
    }

    // 自分が属するルーム一覧を updatedAt 降順で取得し、最新メッセージ1件を付与
    async listRoomsWithLatestMessage(userId: string, limit: number, cursor?: string): Promise<any[]> {
        const rooms = await this.prisma.chatRoom.findMany({
        take: limit,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        where: { users: { some: { userId } } },
        orderBy: { updatedAt: 'desc' },
        include: {
            users: {
            select: {
                userId: true,
                user: {
                select: { id: true, name: true, profileImage: true, career: true, intro: true },
                },
            },
            },
            messages: {
            take: 1,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                content: true,
                createdAt: true,
                senderId: true,
            },
            },
        },
        });
        return rooms;
    }

    // ルーム所属チェック
    async isMember(roomId: string, userId: string): Promise<boolean> {
        const count = await this.prisma.chatRoomUser.count({ where: { roomId, userId } });
        return count > 0;
    }
}
