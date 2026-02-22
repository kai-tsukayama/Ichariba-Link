"use client";

import Header from '@/components/organisms/Header';
import Navigation from '@/components/organisms/Navigation';
import EventField from '@/components/ui/EventField';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useEventStore } from '@/store/eventStore';
import { eventApi } from '@/utils/api';
import { Event } from '@/app/interfaces/Event';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const getEventById = useEventStore((state) => state.getEventById);
  const fetchEvents = useEventStore((state) => state.fetchEvents);
  const events = useEventStore((state) => state.events);
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (!id) return;
    const existing = getEventById(id);
    if (existing) {
      setEvent(existing);
      return;
    }
    // fallback fetch single event
    eventApi
      .detail(id as string)
      .then((res) => setEvent(res))
      .catch(() => fetchEvents());
  }, [id, getEventById, fetchEvents]);

  if (!event) {
    return <div className="p-10">イベントが見つかりませんでした</div>;
  }

  return (
    <AuthGuard>
      <div className="bg-[#F0F4FF]">
        <div className="flex h-screen">
          <Navigation />
          <div className="flex-1 flex flex-col px-1">
            <div className="shrink-0">
              <Header title="イベント詳細" />
            </div>
            <div className="flex-1 overflow-hidden">
              <EventField event={event} />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default EventDetails;
