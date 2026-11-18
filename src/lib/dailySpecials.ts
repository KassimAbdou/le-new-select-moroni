import type { DailySpecial } from '../types';
import { formatFrenchDate, getTodayInMoroni } from './date';

/** Un plat du jour est actif si la date du jour est dans sa période (bornes incluses). */
export function isSpecialActive(special: DailySpecial, today: string): boolean {
  if (!special.startDate || !special.endDate) return false;
  return today >= special.startDate && today <= special.endDate;
}

/** Retourne les plats du jour en cours, triés par ordre d'affichage. */
export function getActiveDailySpecials(
  specials: DailySpecial[],
  today: string = getTodayInMoroni(),
): DailySpecial[] {
  return specials
    .filter((special) => special.isVisible !== false && isSpecialActive(special, today))
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

/** Période lisible d'un plat du jour. */
export function formatSpecialPeriod(special: DailySpecial): string {
  if (!special.startDate) return '';
  if (!special.endDate || special.endDate === special.startDate) {
    return formatFrenchDate(special.startDate);
  }
  return `${formatFrenchDate(special.startDate)} – ${formatFrenchDate(special.endDate)}`;
}
