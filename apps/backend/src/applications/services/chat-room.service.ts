import { Inject, Injectable } from "@nestjs/common";
import { IChatRoomService } from "../interfaces/chat-room.service.interface";
import { CHAT_ROOM_REPOSITORY } from "src/domains/repositories/chat-room.repository.interface";
import type { IChatRoomRepository } from "src/domains/repositories/chat-room.repository.interface";

const termToBadgeKey = (term?: string | null): string | null => {
    switch (term) {
        case "CONSIDERING":
            return "considering";
        case "LT_1M":
            return "newcomer_1m";
        case "LT_1Y":
            return "newcomer_1y";
        case "Y1_3":
            return "settling_in";
        case "GTE_3Y":
            return "veteran_member";
        default:
            return null;
    }
};

@Injectable()
export class ChatRoomService implements IChatRoomService {
    constructor(
        @Inject(CHAT_ROOM_REPOSITORY)
        private readonly chatRoomRepository: IChatRoomRepository,
    ) {}

    async createOrGetRoom(userId: string, partnerUserId: string): Promise<{ roomId: string; }> {
        const existing = await this.chatRoomRepository.findOneToOneRoom(userId, partnerUserId);
        if(existing) return { roomId: existing.id };

        const created = await this.chatRoomRepository.createOneToOneRoom(userId, partnerUserId);
        return { roomId: created.id };
    }

    async listMyRooms(userId: string, limit = 20, cursor?: string): Promise<any[]> {
        const rooms = await this.chatRoomRepository.listRoomsWithLatestMessage(userId, limit ,cursor);
         return rooms.map((room: any) => {
            const partner = room.users.find((u:any) => u.userId !== userId);
            const latest = room.messages?.[0] ?? null;
            return {
                roomId: room.id,
                partner: partner ? {
                    id: partner.user.id,
                    name: partner.user.name,
                    profileImage: partner.user.profileImage,
                    career: partner.user.career,
                    intro: partner.user.intro,
                    baseLocation: partner.user.baseLocation,
                    residenceTerm: partner.user.residenceTerm,
                    badgeKey: termToBadgeKey(partner.user.residenceTerm),
                } : null,
                latestMessage: latest ? {
                    id: latest.id,
                    content: latest.content,
                    createdAt: latest.createdAt,
                    senderId: latest.senderId,
                } : null,
                updatedAt: room.updatedAt,
            };
        });
    }
}
