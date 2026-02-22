import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class LoginRequestDto {
  @ApiProperty()
  @IsString()
  name: string; // name または email を受け付ける

  @ApiProperty()
  @IsString()
  @MinLength(4)
  password: string;
}
