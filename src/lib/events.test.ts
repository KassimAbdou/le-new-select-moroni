import { describe, expect, it } from 'vitest';
import type { EventItem } from '../types';
import { formatEventDate, getEventTicketPrice, getUpcomingEvents } from './events';

const makeEvent = (overrides: Partial<EventItem> = {}): EventItem => ({
  id: 'evt-test',
  title: 'Soirée test',
  description: '',
  eventDate: '2026-11-20',
  priceKmf: 5000,
  isVisible: true,
  ...overrides,
});

describe('événements', () => {
  it('ne montre que les événements à venir et visibles', () => {
    const events = [
      makeEvent({ id: 'past', eventDate: '2026-01-01' }),
      makeEvent({ id: 'hidden', eventDate: '2026-12-01', isVisible: false }),
      makeEvent({ id: 'next', eventDate: '2026-12-15' }),
    ];
    expect(getUpcomingEvents(events, '2026-11-19').map((event) => event.id)).toEqual([
      'next',
    ]);
  });

  it('formate les événements sur plusieurs jours', () => {
    expect(formatEventDate(makeEvent({ endDate: '2026-11-22' }))).toContain('20');
    expect(formatEventDate(makeEvent({ endDate: '2026-11-22' }))).toContain('22');
  });

  it('utilise le prix du billet quand il est renseigné', () => {
    expect(getEventTicketPrice(makeEvent())).toBe(5000);
    expect(getEventTicketPrice(makeEvent({ ticketPriceKmf: 0 }))).toBe(0);
    expect(getEventTicketPrice(makeEvent({ ticketPriceKmf: 2500 }))).toBe(2500);
  });
});
