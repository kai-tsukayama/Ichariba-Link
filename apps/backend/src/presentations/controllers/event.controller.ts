import { Body, Controller, Get, Inject, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { EventCreateDto } from "src/applications/dtos/event-create.dto";
import { EventListDto } from "src/applications/dtos/event-list.dto";
import { EVENT_SERVICE } from "src/applications/interfaces/event-service.interface";
import type { IEventService } from "src/applications/interfaces/event-service.interface";

@Controller("events")
export class EventController {
  constructor(
    @Inject(EVENT_SERVICE)
    private readonly events: IEventService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() dto: EventCreateDto) {
    return this.events.create(req.user.id, dto);
  }

  @Get()
  list(@Query() query: EventListDto) {
    return this.events.list(query);
  }

  @Get(":id")
  detail(@Param("id") id: string) {
    return this.events.detail(id);
  }
}
