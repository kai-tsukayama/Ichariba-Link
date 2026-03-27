import { Event } from "src/domains/entities/event.entity";
import { EventCreateDto } from "../dtos/event-create.dto";
import { EventListDto } from "../dtos/event-list.dto";

export const EVENT_SERVICE = Symbol("EVENT_SERVICE");

export interface IEventService {
  create(userId: string, dto: EventCreateDto): Promise<Event>;
  list(filter: EventListDto): Promise<Event[]>;
  detail(id: string): Promise<Event | null>;
}
