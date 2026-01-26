import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreateChatRoomDto {
    @ApiProperty()
    @IsUUID()
    partnerUserId!: string
}
