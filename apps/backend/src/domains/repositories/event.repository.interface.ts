import { Event } from "../entities/event.entity";
import { EventCreateDto } from "src/applications/dtos/event-create.dto";
import { EventListDto } from "src/applications/dtos/event-list.dto";

export const EVENT_REPOSITORY = Symbol("EVENT_REPOSITORY");

export interface IEventRepository {
  create(userId: string, data: EventCreateDto): Promise<Event>;
  findAll(filter: EventListDto): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
}
