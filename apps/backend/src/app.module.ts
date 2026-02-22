import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TestContoller } from './presentations/controllers/test-get.controller';
import { TestGetService } from './applications/services/test-get.service';
import { TEST_GET_SERVICE } from './applications/interfaces/test-get.interface';
import { UserController } from './presentations/controllers/user.controller';
import { USER_POST_SERVICE } from './applications/interfaces/user-post.interface';
import { UserPostService } from './applications/services/user-post.service';
import { PrismaService } from './infrastructures/prisma/prisma.service';
import { USER_REPOSITORY } from './domains/repositories/user.repository.interface';
import { UserRepository } from './infrastructures/repositories/user.repository';
import { USER_DELETE_SERVICE } from './applications/interfaces/user-delete.interface';
import { UserDeleteService } from './applications/services/user-delete.service';
import { CHAT_ROOM_REPOSITORY } from './domains/repositories/chat-room.repository.interface';
import { CHAT_ROOM_SERVICE } from './applications/interfaces/chat-room.service.interface';
import { ChatRoomService } from './applications/services/chat-room.service';
import { MESSAGE_SERVICE } from './applications/interfaces/message.service.interface';
import { MessageService } from './applications/services/message.service';
import { ChatRoomRepository } from './infrastructures/repositories/chat-room.repository';
import { MESSAGE_REPOSITORY } from './domains/repositories/message.repository.interface';
import { MessageRepository } from './infrastructures/repositories/message.repository';
import { ChatController } from './presentations/controllers/chat.controller';
import { AuthModule } from './auth/auth.module';
import { USER_GET_SERVICE } from './applications/interfaces/user-get.interface';
import { UserGetService } from './applications/services/user-get.service';
import { USER_UPDATE_SERVICE } from './applications/interfaces/user-update.interface';
import { UserUpdateService } from './applications/services/user-update.service';
import { EVENT_SERVICE } from './applications/interfaces/event-service.interface';
import { EventService } from './applications/services/event.service';
import { EVENT_REPOSITORY } from './domains/repositories/event.repository.interface';
import { EventRepository } from './infrastructures/repositories/event.repository';
import { EventController } from './presentations/controllers/event.controller';
import { ChatGateway } from './presentations/gateways/chat.gateway';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [
    AppController,
    TestContoller,
    UserController,
    ChatController,
    EventController,
  ],
  providers: [
    AppService, PrismaService,
    { provide: TEST_GET_SERVICE, useClass: TestGetService,},
    { provide: USER_POST_SERVICE, useClass: UserPostService },
    { provide: USER_DELETE_SERVICE, useClass: UserDeleteService },
    { provide: USER_GET_SERVICE, useClass: UserGetService },
    { provide: USER_UPDATE_SERVICE, useClass: UserUpdateService },
    { provide: CHAT_ROOM_SERVICE, useClass: ChatRoomService },
    { provide: MESSAGE_SERVICE, useClass: MessageService },

    { provide: USER_REPOSITORY, useClass: UserRepository },
    { provide: CHAT_ROOM_REPOSITORY, useClass: ChatRoomRepository },
    { provide: MESSAGE_REPOSITORY, useClass: MessageRepository },
    { provide: EVENT_SERVICE, useClass: EventService },
    { provide: EVENT_REPOSITORY, useClass: EventRepository },
    ChatGateway,
  ],
})
export class AppModule {}
