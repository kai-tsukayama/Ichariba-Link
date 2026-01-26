import { UserPostRequest } from "src/applications/dtos/user-post-request-dto";
import { User } from "../entities/user.entity";
import { UserDeleteRequest } from "src/applications/dtos/user-delete.request-dto";

export const USER_REPOSITORY = Symbol("USER_REPOSITORY");
export interface IUserRepository {
    create(data: UserPostRequest): Promise<User>;
    delete(data: UserDeleteRequest): Promise<number>;
}
