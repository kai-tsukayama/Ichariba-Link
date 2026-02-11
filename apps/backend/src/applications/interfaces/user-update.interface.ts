import { UserUpdateRequest } from "../dtos/user-update.request-dto";
import { User } from "src/domains/entities/user.entity";

export const USER_UPDATE_SERVICE = Symbol("USER_UPDATE_SERVICE");

export interface IUserUpdateService {
  update(userId: string, dto: UserUpdateRequest): Promise<Omit<User, "password">>;
}
