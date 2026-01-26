import { Body, Controller, Get, Inject, Post, Query, Req } from '@nestjs/common';
import { CHAT_ROOM_SERVICE, type IChatRoomService } from 'src/applications/interfaces/chat-room.service.interface';
import { MESSAGE_SERVICE, type IMessageService } from 'src/applications/interfaces/message.service.interface';
import { CreateChatRoomDto } from 'src/applications/dtos/create-chat-room.dto';
import { SendMessageDto } from 'src/applications/dtos/send-message.dto';
import { ListRoomsDto } from 'src/applications/dtos/list-rooms.dto';
import { MessageHistoryDto } from 'src/applications/dtos/message-history.dto';
import { ApiSecurity } from '@nestjs/swagger';

@Controller('chat')
export class ChatController {
  constructor(
    @Inject(CHAT_ROOM_SERVICE) private readonly chatRooms: IChatRoomService,
    @Inject(MESSAGE_SERVICE) private readonly messages: IMessageService,
  ) {}

  @ApiSecurity('x-user-id')
  @Post('rooms')
  async createRoom(@Req() req, @Body() dto: CreateChatRoomDto) {
    return this.chatRooms.createOrGetRoom(req.user.id, dto.partnerUserId);
  }

  @ApiSecurity('x-user-id')
  @Get('rooms')
  async listRooms(@Req() req, @Query() dto: ListRoomsDto) {
    const limit = dto.limit ? Number(dto.limit) : 20;
    return this.chatRooms.listMyRooms(req.user.id, limit, dto.cursor);
  }

  @ApiSecurity('x-user-id')
  @Post('messages')
  async sendMessage(@Req() req, @Body() dto: SendMessageDto) {
    return this.messages.send(req.user.id, dto.roomId, dto.content);
  }

  @ApiSecurity('x-user-id')
  @Get('messages')
  async history(@Req() req, @Query() dto: MessageHistoryDto) {
    const limit = dto.limit ? Number(dto.limit) : 20;
    return this.messages.history(req.user.id, dto.roomId, limit, dto.cursor);
  }
}
