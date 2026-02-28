import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class UserUpdateRequest {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(4)
  password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  profileImage?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  career?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  intro?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  baseLocation?: string | null;

  @ApiProperty({ required: false, enum: ["CONSIDERING", "LT_1M", "LT_1Y", "Y1_3", "GTE_3Y"] })
  @IsOptional()
  @IsString()
  @IsIn(["CONSIDERING", "LT_1M", "LT_1Y", "Y1_3", "GTE_3Y"])
  residenceTerm?: "CONSIDERING" | "LT_1M" | "LT_1Y" | "Y1_3" | "GTE_3Y";
}
