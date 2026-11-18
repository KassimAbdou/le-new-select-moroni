import type { EventItem } from '../types';
import { formatFrenchDate, getTodayInMoroni } from './date';

/** Événements à venir ou en cours, du plus proche au plus lointain. */
export function getUpcomingEvents(
  events: EventItem[],
  today: string = getTodayInMoroni(),
): EventItem[] {
  return events
    .filter((event) => {
      if (event.isVisible === false || !event.eventDate) return false;
      const end = event.endDate ?? event.eventDate;
      return end >= today;
    })
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate));
}

/** Prix unitaire d'un billet : le prix dédié l'emporte sur le prix de l'événement. */
export function getEventTicketPrice(event: EventItem): number | undefined {
  return event.ticketPriceKmf ?? event.priceKmf;
}

/** Date lisible d'un événement, avec gestion des événements sur plusieurs jours. */
export function formatEventDate(event: EventItem): string {
  if (!event.eventDate) return '';
  const start = formatFrenchDate(event.eventDate);
  if (!event.endDate || event.endDate === event.eventDate) return start;
  return `${start} – ${formatFrenchDate(event.endDate)}`;
}
