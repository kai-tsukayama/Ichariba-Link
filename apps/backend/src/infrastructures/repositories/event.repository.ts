import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { EVENT_REPOSITORY, IEventRepository } from "src/domains/repositories/event.repository.interface";
import { EventCreateDto } from "src/applications/dtos/event-create.dto";
import { EventListDto } from "src/applications/dtos/event-list.dto";
import { Event } from "src/domains/entities/event.entity";

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: EventCreateDto): Promise<Event> {
    const created = await this.prisma.event.create({
      data: {
        title: dto.title,
        description: dto.description,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        prefecture: dto.prefecture,
        city: dto.city ?? "",
        location: dto.location ?? "",
        imageId: dto.imageId ?? "",
        imageUrl: dto.imageUrl ?? null,
        userId,
      },
    });
    return this.toEntity(created);
  }

  async findAll(filter: EventListDto): Promise<Event[]> {
    const where: any = {};
    if (filter.prefecture) where.prefecture = filter.prefecture;
    if (filter.from || filter.to) {
      where.startDate = {};
      if (filter.from) where.startDate.gte = new Date(filter.from);
      if (filter.to) where.startDate.lte = new Date(filter.to);
    }
    const events = await this.prisma.event.findMany({
      where,
      orderBy: { startDate: "asc" },
    });
    return events.map((e) => this.toEntity(e));
  }

  async findById(id: string): Promise<Event | null> {
    const e = await this.prisma.event.findUnique({ where: { id } });
    if (!e) return null;
    return this.toEntity(e);
  }

  private toEntity(e: any): Event {
    return new Event(
      e.id,
      e.title,
      e.description,
      e.startDate,
      e.endDate,
      e.prefecture,
      e.city,
      e.location,
      e.imageId,
      e.imageUrl ?? null,
      e.userId,
      e.createdAt,
      e.updatedAt,
    );
  }
}
