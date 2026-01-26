import { IsNumberString, IsOptional, IsUUID } from "class-validator";

export class ListRoomsDto {
    @IsOptional()
    @IsNumberString()
    limit?: string;

    @IsOptional()
    @IsUUID()
    cursor?: string;
}
