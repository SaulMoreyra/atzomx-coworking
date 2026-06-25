import type { CommunityEvent } from "@/mocks/events";

const parseLocalDate = (isoDate: string): Date => {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const startOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

/** Upcoming events whose calendar month is the current month or the next one. */
export const filterUpcomingEventsInCurrentAndNextMonth = (
  events: CommunityEvent[],
  now: Date = new Date()
): CommunityEvent[] => {
  const today = startOfDay(now);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const nextMonthAnchor = new Date(currentYear, currentMonth + 1, 1);
  const nextYear = nextMonthAnchor.getFullYear();
  const nextMonth = nextMonthAnchor.getMonth();

  return events.filter(event => {
    const eventDate = startOfDay(parseLocalDate(event.startsAt));
    if (eventDate < today) return false;

    const eventYear = eventDate.getFullYear();
    const eventMonth = eventDate.getMonth();

    const inCurrentMonth = eventYear === currentYear && eventMonth === currentMonth;
    const inNextMonth = eventYear === nextYear && eventMonth === nextMonth;

    return inCurrentMonth || inNextMonth;
  });
};
