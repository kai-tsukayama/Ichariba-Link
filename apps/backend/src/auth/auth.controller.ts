import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserPostRequest } from "src/applications/dtos/user-post-request-dto";
import { LoginRequestDto } from "./dto/login-request.dto";
import { ApiTags } from "@nestjs/swagger";

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
}
