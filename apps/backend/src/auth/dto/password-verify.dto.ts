import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class PasswordVerifyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;
}
