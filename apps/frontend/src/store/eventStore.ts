import { create } from "zustand";
import { Event } from "@/app/interfaces/Event";
import { eventsData } from "@/app/seeds/EventSeeds";

type EventStore = {
  events: Event[];
  addEvent: (event: Event) => void;
};

export const useEventStore = create<EventStore>((set) => ({
  events: eventsData,

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),
}));
