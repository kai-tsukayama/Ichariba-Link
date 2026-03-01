import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { UserPostRequest } from "src/applications/dtos/user-post-request-dto";
import { USER_REPOSITORY, type IUserRepository } from "src/domains/repositories/user.repository.interface";
import { User } from "src/domains/entities/user.entity";
import { LoginRequestDto } from "./dto/login-request.dto";
import { PasswordVerifyDto } from "./dto/password-verify.dto";
import { PasswordResetDto } from "./dto/password-reset.dto";

type AuthResponse = { accessToken: string; user: Omit<User, "password"> };

const termToBadgeKey = (term?: string | null): string | null => {
  switch (term) {
    case "CONSIDERING":
      return "considering";
    case "LT_1M":
      return "newcomer_1m";
    case "LT_1Y":
      return "newcomer_1y";
    case "Y1_3":
      return "settling_in";
    case "GTE_3Y":
      return "veteran_member";
    default:
      return null;
  }
};

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    private readonly jwt: JwtService,
  ) {}

  private toSafeUser(user: User): Omit<User, "password"> & { badgeKey: string | null } {
    const { password, ...rest } = user;
    return { ...rest, badgeKey: termToBadgeKey(user.residenceTerm) };
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
      (await this.users.findByEmail(dto.name)); // name or email でログイン
    if (!user) throw new UnauthorizedException("invalid credentials");
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException("invalid credentials");
    return { accessToken: this.sign(user), user: this.toSafeUser(user) };
  }

  async requestPasswordReset(dto: PasswordVerifyDto): Promise<{ resetToken: string }> {
    const user = await this.users.findByNameAndEmail(dto.name, dto.email);
    if (!user) throw new UnauthorizedException("invalid credentials");

    const token = randomUUID();
    const expires = new Date(Date.now() + 15 * 60 * 1000);
    await this.users.update(user.id, { resetToken: token, resetTokenExpires: expires });
    return { resetToken: token };
  }

  async resetPassword(dto: PasswordResetDto): Promise<void> {
    const user = await this.users.findByResetToken(dto.token);
    if (!user || !user.resetTokenExpires || user.resetTokenExpires.getTime() < Date.now()) {
      throw new UnauthorizedException("invalid or expired token");
    }
    const hashed = await bcrypt.hash(dto.newPassword, 10);
    await this.users.update(user.id, { password: hashed, resetToken: null, resetTokenExpires: null });
  }
}
