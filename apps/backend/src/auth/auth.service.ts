import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UserPostRequest } from "src/applications/dtos/user-post-request-dto";
import { LoginRequestDto } from "./dto/login-request.dto";
import { USER_REPOSITORY, type IUserRepository } from "src/domains/repositories/user.repository.interface";
import { User } from "src/domains/entities/user.entity";

type AuthResponse = { accessToken: string; user: Omit<User, "password"> };

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    private readonly jwt: JwtService,
  ) {}

  private toSafeUser(user: User): Omit<User, "password"> {
    const { password, ...rest } = user;
    return rest;
  }

  private sign(user: User): string {
    return this.jwt.sign({ sub: user.id, name: user.name, email: user.email });
  }

  async signup(dto: UserPostRequest): Promise<AuthResponse> {
    const existingEmail = await this.users.findByEmail(dto.email);
    if (existingEmail) throw new ConflictException("email already in use");
    const existingName = await this.users.findByName(dto.name);
    if (existingName) throw new ConflictException("name already in use");

    const hashed = await bcrypt.hash(dto.password, 10);
    const created = await this.users.create({ ...dto, password: hashed });
    return { accessToken: this.sign(created), user: this.toSafeUser(created) };
  }

  async login(dto: LoginRequestDto): Promise<AuthResponse> {
    const user =
      (await this.users.findByName(dto.name)) ??
      (await this.users.findByEmail(dto.name)); // フロントの「Name or Email」入力に対応
    if (!user) throw new UnauthorizedException("invalid credentials");
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException("invalid credentials");
    return { accessToken: this.sign(user), user: this.toSafeUser(user) };
  }
}
