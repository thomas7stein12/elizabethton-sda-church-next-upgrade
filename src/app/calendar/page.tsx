import Hero from "@/components/Hero";
import EventCalendar from "@/components/EventCalendar";

export default function CalendarPage() {
  return (
    <>
      <Hero
        title="Calendar"
        description="Please join us in our next gathering!"
      />

      <EventCalendar />
    </>
  );
}
