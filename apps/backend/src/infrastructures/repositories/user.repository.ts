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
            created.career ?? null,
            created.intro ?? null,
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

    async findByName(name: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({ where: { name } });
        if(!user) return null;
        return new User(
            user.id,
            user.email,
            user.name,
            user.password,
            user.profileImage,
            user.career ?? null,
            user.intro ?? null,
            user.createdAt,
            user.updatedAt,
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({ where: { email } });
        if(!user) return null;
        return new User(
            user.id,
            user.email,
            user.name,
            user.password,
            user.profileImage,
            user.career ?? null,
            user.intro ?? null,
            user.createdAt,
            user.updatedAt,
        );
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if(!user) return null;
        return new User(
            user.id,
            user.email,
            user.name,
            user.password,
            user.profileImage,
            user.career ?? null,
            user.intro ?? null,
            user.createdAt,
            user.updatedAt,
        );
    }

    async findAll(excludeUserId?: string): Promise<User[]> {
        const users = await this.prisma.user.findMany({
            where: excludeUserId ? { id: { not: excludeUserId } } : undefined,
            orderBy: { createdAt: 'asc' },
        });
        return users.map(
            (user) =>
                new User(
                    user.id,
                    user.email,
                    user.name,
                    user.password,
                    user.profileImage,
                    user.career ?? null,
                    user.intro ?? null,
                    user.createdAt,
                    user.updatedAt,
                ),
        );
    }

    async update(id: string, data: Partial<UserPostRequest> & { profileImage?: string | null; career?: string | null; intro?: string | null; }): Promise<User> {
        const updated = await this.prisma.user.update({
            where: { id },
            data,
        });
        return new User(
            updated.id,
            updated.email,
            updated.name,
            updated.password,
            updated.profileImage,
            updated.career ?? null,
            updated.intro ?? null,
            updated.createdAt,
            updated.updatedAt,
        );
    }
}
