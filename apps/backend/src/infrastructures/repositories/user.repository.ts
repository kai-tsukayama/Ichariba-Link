import { Injectable } from "@nestjs/common";
import { IUserRepository } from "src/domains/repositories/user.repository.interface";
import { PrismaService } from "../prisma/prisma.service";
import { UserPostRequest } from "src/applications/dtos/user-post-request-dto";
import { User } from "src/domains/entities/user.entity";
import { UserDeleteRequest } from "src/applications/dtos/user-delete.request-dto";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: UserPostRequest): Promise<User> {
        const created = await this.prisma.user.create({ data });
        return new User(
            created.id,
            created.email,
            created.name,
            created.password,
            created.profileImage,
            created.createdAt,
            created.updatedAt,
        );
    }

    async delete(data: UserDeleteRequest): Promise<number> {
        const name = data.name;
        const email = data.email;
        const {count} = await this.prisma.user.deleteMany({ where: {name, email} })
        return count;
    }
}
