import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class PasswordResetDto {
  @IsString()
  @IsNotEmpty()
  token!: string;

  @IsString()
  @MinLength(4)
  newPassword!: string;
}
