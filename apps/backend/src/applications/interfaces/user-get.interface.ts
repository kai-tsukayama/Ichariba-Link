import { User } from "src/domains/entities/user.entity";

export const USER_GET_SERVICE = Symbol("USER_GET_SERVICE");

export interface IUserGetService {
    list(excludeUserId?: string): Promise<Omit<User, "password">[]>;
}
