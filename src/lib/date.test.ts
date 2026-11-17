import { describe, expect, it } from 'vitest';
import { formatFrenchDate, getTodayInMoroni } from './date';

describe('getTodayInMoroni', () => {
  it('retourne la date locale aux Comores (UTC+3) et non la date UTC', () => {
    // 21h30 UTC = 00h30 du jour suivant à Moroni.
    expect(getTodayInMoroni(new Date('2026-11-17T21:30:00Z'))).toBe('2026-11-18');
    expect(getTodayInMoroni(new Date('2026-11-17T20:30:00Z'))).toBe('2026-11-17');
  });
});

describe('formatFrenchDate', () => {
  it('formate une date ISO sans décalage de fuseau', () => {
    expect(formatFrenchDate('2026-11-17')).toBe('17 novembre 2026');
  });

  it('retourne la valeur d’origine si la date est invalide', () => {
    expect(formatFrenchDate('2026-11')).toBe('2026-11');
  });
});
