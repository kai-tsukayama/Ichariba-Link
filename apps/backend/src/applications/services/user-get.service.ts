import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, type IUserRepository } from "src/domains/repositories/user.repository.interface";
import type { IUserGetService } from "../interfaces/user-get.interface";
import { User } from "src/domains/entities/user.entity";

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
export class UserGetService implements IUserGetService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    ) {}

    private toSafeUser(user: User): Omit<User, "password"> & { badgeKey: string | null } {
        const { password, ...rest } = user;
        return { ...rest, badgeKey: termToBadgeKey(user.residenceTerm) };
    }

    async list(excludeUserId?: string): Promise<Omit<User, "password">[]> {
        const all = await this.users.findAll(excludeUserId);
        return all.map((u) => this.toSafeUser(u));
    }
}
