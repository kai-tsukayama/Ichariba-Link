import { UserDeleteRequest } from "../dtos/user-delete.request-dto";

export const USER_DELETE_SERVICE = Symbol("USER_DELETE_SERVICE");
export interface IUserDeleteService {
    userDeleteAsync(data: UserDeleteRequest): Promise<string>;
}
