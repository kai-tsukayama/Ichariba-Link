import { Inject, Injectable } from "@nestjs/common";
import { EVENT_REPOSITORY, type IEventRepository } from "src/domains/repositories/event.repository.interface";
import type { IEventService } from "../interfaces/event-service.interface";
import { EventCreateDto } from "../dtos/event-create.dto";
import { EventListDto } from "../dtos/event-list.dto";
import { Event } from "src/domains/entities/event.entity";

@Injectable()
export class EventService implements IEventService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: IEventRepository,
  ) {}

  create(userId: string, dto: EventCreateDto): Promise<Event> {
    return this.eventRepository.create(userId, dto);
  }

  list(filter: EventListDto): Promise<Event[]> {
    return this.eventRepository.findAll(filter);
  }

  detail(id: string): Promise<Event | null> {
    return this.eventRepository.findById(id);
  }
}
