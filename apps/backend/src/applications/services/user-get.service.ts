import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, type IUserRepository } from "src/domains/repositories/user.repository.interface";
import type { IUserGetService } from "../interfaces/user-get.interface";
import { User } from "src/domains/entities/user.entity";

@Injectable()
export class UserGetService implements IUserGetService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    ) {}

    private toSafeUser(user: User): Omit<User, "password"> {
        const { password, ...rest } = user;
        return rest;
    }

    async list(excludeUserId?: string): Promise<Omit<User, "password">[]> {
        const all = await this.users.findAll(excludeUserId);
        return all.map((u) => this.toSafeUser(u));
    }
}
