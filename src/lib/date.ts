/** Fuseau horaire des Comores (UTC+3), utilisé pour les réservations. */
export const MORONI_TIME_ZONE = 'Indian/Comoro';

const ISO_DATE_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  timeZone: MORONI_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/**
 * Retourne la date du jour à Moroni au format `AAAA-MM-JJ`.
 * `toISOString()` utiliserait UTC et pourrait décaler d'un jour après 21h locales.
 */
export function getTodayInMoroni(now: Date = new Date()): string {
  return ISO_DATE_FORMATTER.format(now);
}

/** Formate une date ISO pour l'affichage, sans décalage de fuseau. */
export function formatFrenchDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${year}-${month}-${day}T12:00:00Z`));
}
