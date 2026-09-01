"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type EventType = "worship" | "meeting" | "prayer" | "fellowship" | "outreach";

interface ChurchEvent {
  id: string;
  title: string;
  date: string | null;
  time: string | null;
  location: string | null;
  type: EventType | string;
  repeat: string | null;
  dayOfWeek: number | null;
}

interface CalendarEvent extends ChurchEvent {
  dateString: string;
}

const eventColors: Record<string, string> = {
  worship: "#FDC20F",
  meeting: "#17593F",
  prayer: "#3465a4",
  fellowship: "#c27c0e",
  outreach: "#7b3fc9",
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDateString(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getLocalDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getEventsForMonth(
  data: ChurchEvent[],
  year: number,
  month: number,
): Record<string, CalendarEvent[]> {
  const monthEvents: Record<string, CalendarEvent[]> = {};

  const addEvent = (event: ChurchEvent, dateString: string) => {
    if (!monthEvents[dateString]) {
      monthEvents[dateString] = [];
    }

    monthEvents[dateString].push({
      ...event,
      dateString,
    });
  };

  data.forEach((event) => {
    // Normal one-time event
    if (event.date) {
      const eventDate = getLocalDate(event.date);

      if (eventDate.getFullYear() === year && eventDate.getMonth() === month) {
        addEvent(event, event.date);
      }
    }

    // Weekly repeating event
    if (
      event.repeat === "weekly" &&
      event.dayOfWeek !== null &&
      event.dayOfWeek !== undefined
    ) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);

        if (date.getDay() === event.dayOfWeek) {
          addEvent(event, formatDateString(year, month, day));
        }
      }
    }
  });

  return monthEvents;
}

function getNextEvent(
  events: Record<string, CalendarEvent[]>,
): CalendarEvent | null {
  const allEvents = Object.values(events).flat();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    allEvents
      .filter((event) => {
        const date = getLocalDate(event.dateString);
        return date >= today;
      })
      .sort(
        (a, b) =>
          getLocalDate(a.dateString).getTime() -
          getLocalDate(b.dateString).getTime(),
      )[0] ?? null
  );
}

export default function EventCalendar() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [sourceEvents, setSourceEvents] = useState<ChurchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );

  const loadEvents = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      setSourceEvents([]);
      setLoading(false);
      return;
    }

    setSourceEvents((data ?? []) as ChurchEvent[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  useEffect(() => {
    const channel = supabase
      .channel("events-calendar")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "events",
        },
        () => {
          void loadEvents();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [loadEvents]);

  const events = useMemo(
    () =>
      getEventsForMonth(
        sourceEvents,
        currentDate.getFullYear(),
        currentDate.getMonth(),
      ),
    [sourceEvents, currentDate],
  );

  const nextEvent = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const candidates: CalendarEvent[] = [];

    sourceEvents.forEach((event) => {
      if (event.date) {
        const eventDate = getLocalDate(event.date);

        if (eventDate >= today) {
          candidates.push({
            ...event,
            dateString: event.date,
          });
        }
      }

      if (
        event.repeat === "weekly" &&
        event.dayOfWeek !== null &&
        event.dayOfWeek !== undefined
      ) {
        const candidate = new Date(today);

        const difference = (event.dayOfWeek - candidate.getDay() + 7) % 7;

        candidate.setDate(candidate.getDate() + difference);

        candidates.push({
          ...event,
          dateString: formatDateString(
            candidate.getFullYear(),
            candidate.getMonth(),
            candidate.getDate(),
          ),
        });
      }
    });

    return (
      candidates.sort(
        (a, b) =>
          getLocalDate(a.dateString).getTime() -
          getLocalDate(b.dateString).getTime(),
      )[0] ?? null
    );
  }, [sourceEvents]);

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const emptyDays = Array.from(
      { length: firstDay },
      (_, index) => `empty-${index}`,
    );

    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    return [...emptyDays, ...days];
  }, [currentDate]);

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const todayString = formatDateString(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  );

  const goToPreviousMonth = () => {
    setCurrentDate(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
  };

  const nextEventDate = nextEvent ? getLocalDate(nextEvent.dateString) : null;

  const nextEventDateText = nextEventDate
    ? nextEventDate.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  if (loading) {
    return (
      <section className="min-h-screen bg-[#f7f7f7] px-5 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-[24px] bg-white p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <p className="text-gray-600">Loading calendar...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="min-h-screen bg-[#f7f7f7] px-5 py-[80px]">
        <div className="mx-auto w-[90%] max-w-[1200px]">
          {/* NEXT EVENT */}
          <div className="mb-10 rounded-[24px] bg-white p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:p-10">
            <span className="font-bold uppercase tracking-[2px] text-[#17593f]">
              NEXT GATHERING
            </span>

            <h2 className="my-4 text-3xl font-bold md:text-5xl">
              {nextEvent?.title ?? "No Gatherings"}
            </h2>

            {nextEvent && (
              <>
                <p className="text-gray-700">
                  {nextEventDateText}
                  {nextEvent.time ? ` • ${nextEvent.time}` : ""}
                </p>

                <div className="my-5 text-lg text-gray-700">
                  <i className="fas fa-location-dot mr-2 text-[#17593f]" />
                  {nextEvent.location || "No location set"}
                </div>
              </>
            )}

            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-contact"))}
              className="inline-block rounded-full bg-[#17593f] px-7 py-3 text-white transition hover:-translate-y-0.5"
            >
              Contact Us
            </button>
          </div>

          {/* CALENDAR */}
          <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between bg-[#17593f] px-5 py-5 text-white md:px-6 md:py-6">
              <button
                type="button"
                onClick={goToPreviousMonth}
                aria-label="Previous month"
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
              >
                <i className="fas fa-chevron-left" />
              </button>

              <h2 className="mb-0 text-2xl font-bold md:text-3xl">
                {monthName}
              </h2>

              <button
                type="button"
                onClick={goToNextMonth}
                aria-label="Next month"
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
              >
                <i className="fas fa-chevron-right" />
              </button>
            </div>

            <div className="grid grid-cols-7">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="bg-[#f0f0f0] px-1 py-3 text-center text-xs font-bold sm:px-2 sm:text-sm md:py-4 md:text-base"
                >
                  {day}
                </div>
              ))}

              {calendarDays.map((day) => {
                if (typeof day === "string") {
                  return (
                    <div
                      key={day}
                      className="min-h-[90px] border border-[#eee] bg-white p-1.5 sm:min-h-[110px] sm:p-2 md:min-h-[130px]"
                    />
                  );
                }

                const dateString = formatDateString(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day,
                );

                const dayEvents = events[dateString] ?? [];
                const isToday = dateString === todayString;

                return (
                  <div
                    key={dateString}
                    className={`min-h-[90px] border border-[#eee] p-1.5 sm:min-h-[110px] sm:p-2 md:min-h-[130px] ${
                      isToday
                        ? "relative rounded-[10px] border-2 border-[#17593f] bg-[#17593f]/[0.08]"
                        : "bg-white"
                    }`}
                  >
                    <div
                      className={`mb-1 flex h-6 w-6 items-center justify-center text-xs font-bold sm:h-7 sm:w-7 sm:text-sm ${
                        isToday
                          ? "rounded-full bg-[#17593f] text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {day}
                    </div>

                    <div className="space-y-1">
                      {dayEvents.map((event) => (
                        <button
                          type="button"
                          key={`${event.id}-${dateString}`}
                          onClick={() => setSelectedEvent(event)}
                          title={`${event.time ?? ""} | ${
                            event.location ?? ""
                          }`}
                          className="block w-full overflow-hidden rounded-md px-1.5 py-1 text-left text-[10px] font-medium leading-tight text-white transition hover:brightness-110 sm:text-xs"
                          style={{
                            background: eventColors[event.type] ?? "#666",
                          }}
                        >
                          {event.title}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* EVENT MODAL */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-[99998] flex items-center justify-center bg-black/60 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedEvent(null);
            }
          }}
        >
          <div
            className="relative w-full max-w-[450px] rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              aria-label="Close event"
              className="absolute right-3 top-2 text-2xl text-gray-700 transition hover:opacity-60"
            >
              ✕
            </button>

            <h2 className="mb-5 pr-8 text-2xl font-bold">
              {selectedEvent.title || "Event"}
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Date:</strong>{" "}
                {selectedEvent.date
                  ? getLocalDate(selectedEvent.date).toLocaleDateString(
                      undefined,
                      {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      },
                    )
                  : "Weekly Event"}
              </p>

              <p>
                <strong>Time:</strong> {selectedEvent.time || "Not set"}
              </p>

              <p>
                <strong>Location:</strong> {selectedEvent.location || "Not set"}
              </p>

              <p>
                <strong>Type:</strong> {selectedEvent.type || "Not set"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
