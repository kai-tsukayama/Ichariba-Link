import { User } from "src/domains/entities/user.entity";
import { UserPostRequest } from "../dtos/user-post-request-dto";

export const USER_POST_SERVICE = Symbol("USER_POST_SERVICE");
export interface IUserPostService {
    userPostAsync(data: UserPostRequest): Promise<User>;
}