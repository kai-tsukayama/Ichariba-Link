import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserPostRequest } from "src/applications/dtos/user-post-request-dto";
import { LoginRequestDto } from "./dto/login-request.dto";
import { ApiTags } from "@nestjs/swagger";
import { PasswordVerifyDto } from "./dto/password-verify.dto";
import { PasswordResetDto } from "./dto/password-reset.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("signup")
  signup(@Body() dto: UserPostRequest) {
    return this.auth.signup(dto);
  }

  @Post("login")
  login(@Body() dto: LoginRequestDto) {
    return this.auth.login(dto);
  }

  @Post("password/verify")
  requestReset(@Body() dto: PasswordVerifyDto) {
    return this.auth.requestPasswordReset(dto);
  }

  @Post("password/reset")
  resetPassword(@Body() dto: PasswordResetDto) {
    return this.auth.resetPassword(dto);
  }
}
