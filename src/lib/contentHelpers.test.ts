import { describe, expect, it } from 'vitest';
import type { DailySpecial, EventItem } from '../types';
import {
  formatSpecialPeriod,
  getActiveDailySpecials,
  isSpecialActive,
} from './dailySpecials';
import { formatEventDate, getUpcomingEvents } from './events';

const special: DailySpecial = {
  id: 'special-test',
  title: 'Plat du jour',
  dishName: 'Poisson grillé',
  description: '',
  priceKmf: 6800,
  startDate: '2026-11-18',
  endDate: '2026-11-20',
};

const event: EventItem = {
  id: 'event-test',
  title: 'Soirée jazz',
  description: '',
  eventDate: '2026-11-28',
};

describe('plats du jour datés', () => {
  it('inclut les bornes de la période', () => {
    expect(isSpecialActive(special, '2026-11-17')).toBe(false);
    expect(isSpecialActive(special, '2026-11-18')).toBe(true);
    expect(isSpecialActive(special, '2026-11-20')).toBe(true);
    expect(isSpecialActive(special, '2026-11-21')).toBe(false);
  });

  it('ne renvoie que les plats actifs et visibles', () => {
    const hidden = { ...special, id: 'hidden', isVisible: false };
    const next = {
      ...special,
      id: 'next',
      startDate: '2026-11-21',
      endDate: '2026-11-22',
    };
    expect(getActiveDailySpecials([hidden, next, special], '2026-11-19')).toEqual([
      special,
    ]);
  });

  it('formate la période en français', () => {
    expect(formatSpecialPeriod(special)).toContain('novembre 2026');
  });
});

describe('événements', () => {
  it('garde les événements en cours et à venir', () => {
    const past = { ...event, id: 'past', eventDate: '2026-11-10' };
    const ongoing = {
      ...event,
      id: 'ongoing',
      eventDate: '2026-11-15',
      endDate: '2026-11-25',
    };
    expect(
      getUpcomingEvents([past, ongoing, event], '2026-11-18').map((item) => item.id),
    ).toEqual(['ongoing', 'event-test']);
  });

  it('formate une date simple et une plage de dates', () => {
    expect(formatEventDate(event)).toBe('28 novembre 2026');
    expect(formatEventDate({ ...event, endDate: '2026-11-29' })).toContain('–');
  });
});
