import { Body, Controller, Delete, Get, Inject, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { UserDeleteRequest } from "src/applications/dtos/user-delete.request-dto";
import { UserPostRequest } from "src/applications/dtos/user-post-request-dto";
import { USER_DELETE_SERVICE } from "src/applications/interfaces/user-delete.interface";
import { USER_POST_SERVICE } from "src/applications/interfaces/user-post.interface";
import { UserDeleteService } from "src/applications/services/user-delete.service";
import { UserPostService } from "src/applications/services/user-post.service";
import { User } from "src/domains/entities/user.entity";
import { USER_GET_SERVICE, type IUserGetService } from "src/applications/interfaces/user-get.interface";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { USER_UPDATE_SERVICE, type IUserUpdateService } from "src/applications/interfaces/user-update.interface";
import { UserUpdateRequest } from "src/applications/dtos/user-update.request-dto";

@Controller("User")
export class UserController {
    constructor(
        @Inject(USER_POST_SERVICE)
        private readonly userPostService: UserPostService,
        @Inject(USER_DELETE_SERVICE)
        private readonly userDeleteService: UserDeleteService,
        @Inject(USER_GET_SERVICE)
        private readonly userGetService: IUserGetService,
        @Inject(USER_UPDATE_SERVICE)
        private readonly userUpdateService: IUserUpdateService,
    ) {}

    @Post()
    postUser(@Body() request: UserPostRequest): Promise<User> {
        return this.userPostService.userPostAsync(request);
    }

    @Delete()
    deleteUser(@Query() request: UserDeleteRequest): Promise<string> {
        return this.userDeleteService.userDeleteAsync(request);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    async listUsers(@Req() req): Promise<Omit<User, "password">[]> {
        return this.userGetService.list(req.user.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch()
    async updateUser(@Req() req, @Body() body: UserUpdateRequest): Promise<Omit<User, "password">> {
        return this.userUpdateService.update(req.user.id, body);
    }
}
