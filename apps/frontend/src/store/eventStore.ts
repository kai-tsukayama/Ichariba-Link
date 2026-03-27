import { create } from "zustand";
import { Event } from "@/app/interfaces/Event";
import { eventsData } from "@/app/seeds/EventSeeds";
import { eventApi } from "@/utils/api";

type EventCreatePayload = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  prefecture: string;
  city?: string;
  imageId?: string;
  imageUrl?: string;
};

type EventStore = {
  events: Event[];
  loading: boolean;
  fetchEvents: (token?: string | null) => Promise<void>;
  addEvent: (event: Event) => void;
  createEvent: (token: string, input: EventCreatePayload) => Promise<Event>;
  getEventById: (id: string) => Event | undefined;
};

export const useEventStore = create<EventStore>((set, get) => ({
  events: eventsData,
  loading: false,

  fetchEvents: async (token) => {
    set({ loading: true });
    try {
      const res = await eventApi.list(token ?? undefined);
      set({ events: res, loading: false });
    } catch (e) {
      console.error("failed to fetch events", e);
      set({ loading: false });
    }
  },

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),

  createEvent: async (token, input) => {
    const created = await eventApi.create(token, {
      ...input,
      city: input.city ?? "",
      imageId: input.imageId ?? "",
      imageUrl: input.imageUrl ?? input.imageId ?? "",
    });
    set((state) => ({ events: [...state.events, created] }));
    return created;
  },

  getEventById: (id) => {
    const { events } = get();
    return events.find((e) => e.id === id);
  },
}));
