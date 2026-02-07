import { User } from "src/domains/entities/user.entity";
import { UserPostRequest } from "../dtos/user-post-request-dto";
import { IUserPostService } from "../interfaces/user-post.interface";
import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "src/domains/repositories/user.repository.interface";
import { UserRepository } from "src/infrastructures/repositories/user.repository";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserPostService implements IUserPostService {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    ){}

    async userPostAsync(req: UserPostRequest): Promise<User> {
        const hashed = await bcrypt.hash(req.password, 10);
        return this.userRepository.create({ ...req, password: hashed })
    }
}
