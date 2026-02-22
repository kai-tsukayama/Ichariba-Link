import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class EventCreateDto {
  @IsString()
  @MaxLength(200)
  title!: string;

  @IsString()
  @MaxLength(2000)
  description!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsString()
  prefecture!: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  imageId?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
