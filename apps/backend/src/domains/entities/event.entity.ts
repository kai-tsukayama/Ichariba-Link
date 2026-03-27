export class Event {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly prefecture: string,
    public readonly city: string,
    public readonly location: string,
    public readonly imageId: string,
    public readonly imageUrl: string | null,
    public readonly userId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
