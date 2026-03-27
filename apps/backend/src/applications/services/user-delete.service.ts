import { Inject, NotFoundException } from "@nestjs/common";
import { IUserDeleteService } from "../interfaces/user-delete.interface";
import { UserDeleteRequest } from "../dtos/user-delete.request-dto";
import { USER_REPOSITORY } from "src/domains/repositories/user.repository.interface";
import { UserRepository } from "src/infrastructures/repositories/user.repository";

export class UserDeleteService implements IUserDeleteService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    ) {}

    async userDeleteAsync(req: UserDeleteRequest): Promise<string> {
        const result = await this.userRepository.delete(req);
        if(result === 0) throw new NotFoundException("User not found.");
        return `${req.name}を削除しました。`
    }
}
