import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, type IUserRepository } from "src/domains/repositories/user.repository.interface";
import type { IUserUpdateService } from "../interfaces/user-update.interface";
import { UserUpdateRequest } from "../dtos/user-update.request-dto";
import { User } from "src/domains/entities/user.entity";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserUpdateService implements IUserUpdateService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
  ) {}

  private toSafeUser(user: User): Omit<User, "password"> {
    const { password, ...rest } = user;
    return rest;
  }

  async update(userId: string, dto: UserUpdateRequest): Promise<Omit<User, "password">> {
    const data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }
    const updated = await this.users.update(userId, data);
    return this.toSafeUser(updated);
  }
}
