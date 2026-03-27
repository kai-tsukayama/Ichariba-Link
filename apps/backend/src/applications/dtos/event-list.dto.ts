import { IsDateString, IsOptional, IsString } from "class-validator";

export class EventListDto {
  @IsOptional()
  @IsString()
  prefecture?: string;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}
