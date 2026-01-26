import { IsNumberString, IsOptional, IsUUID } from "class-validator";

export class MessageHistoryDto {
    @IsUUID()
    roomId!: string;

    @IsOptional()
    @IsNumberString()
    limit?: string;

    @IsOptional()
    @IsUUID()
    cursor?: string;
}
