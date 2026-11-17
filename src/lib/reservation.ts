import { getTodayInMoroni } from './date';

export type SeatingChoice = 'terrasse' | 'salle';

export interface ReservationInput {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guests: string;
  seating: SeatingChoice;
  notes: string;
}

export const SEATING_LABELS: Record<SeatingChoice, string> = {
  terrasse: 'Terrasse ombragée',
  salle: 'Salle climatisée',
};

export const TIME_SLOTS = [
  {
    label: 'Petit-déjeuner',
    slots: [
      { value: '07:30', label: '07h30' },
      { value: '08:30', label: '08h30' },
      { value: '09:30', label: '09h30' },
    ],
  },
  {
    label: 'Déjeuner',
    slots: [
      { value: '12:00', label: '12h00' },
      { value: '12:30', label: '12h30' },
      { value: '13:00', label: '13h00' },
      { value: '13:30', label: '13h30' },
      { value: '14:15', label: '14h15' },
    ],
  },
  {
    label: 'Dîner',
    slots: [
      { value: '18:30', label: '18h30' },
      { value: '19:30', label: '19h30' },
      { value: '20:00', label: '20h00' },
      { value: '20:30', label: '20h30' },
      { value: '21:30', label: '21h30' },
    ],
  },
] as const;

export const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10, 12] as const;
export const GROUP_OPTION = '15+';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_TIME_SLOTS: string[] = TIME_SLOTS.flatMap((group) =>
  group.slots.map((slot) => slot.value),
);

const ALLOWED_GUEST_COUNTS: string[] = [...GUEST_OPTIONS.map(String), GROUP_OPTION];

export function createEmptyReservation(
  today: string = getTodayInMoroni(),
): ReservationInput {
  return {
    fullName: '',
    phone: '',
    email: '',
    date: today,
    timeSlot: '12:30',
    guests: '2',
    seating: 'terrasse',
    notes: '',
  };
}

/**
 * Valide une demande de réservation. Retourne `null` si tout est valide,
 * sinon le message à afficher à l'utilisateur.
 */
export function validateReservation(
  input: ReservationInput,
  today: string = getTodayInMoroni(),
): string | null {
  if (input.fullName.trim().length < 2) {
    return 'Veuillez indiquer votre nom complet.';
  }

  if (input.phone.replace(/\D/g, '').length < 6) {
    return 'Veuillez renseigner un numéro de téléphone ou WhatsApp valide.';
  }

  if (input.email.trim() && !EMAIL_PATTERN.test(input.email.trim())) {
    return 'Le format de l’adresse e-mail semble invalide.';
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    return 'Veuillez sélectionner une date de réservation valide.';
  }

  if (input.date < today) {
    return 'Veuillez choisir une date à partir d’aujourd’hui.';
  }

  if (!ALLOWED_TIME_SLOTS.includes(input.timeSlot)) {
    return 'Veuillez choisir un horaire de service proposé.';
  }

  if (!ALLOWED_GUEST_COUNTS.includes(input.guests)) {
    return 'Veuillez choisir un nombre de couverts valide.';
  }

  return null;
}

/** Construit le message transmis au restaurant via WhatsApp. */
export function buildWhatsAppMessage(
  input: ReservationInput,
  reference?: string,
): string {
  const lines = [
    'Bonjour Le New Select, je souhaite réserver une table',
    reference ? `(référence ${reference})` : '',
    '',
    `- Nom : ${input.fullName.trim()}`,
    `- Téléphone : ${input.phone.trim()}`,
    input.email.trim() ? `- E-mail : ${input.email.trim()}` : null,
    `- Date : ${input.date} à ${input.timeSlot}`,
    `- Couverts : ${input.guests} personne(s)`,
    `- Placement : ${SEATING_LABELS[input.seating]}`,
    input.notes.trim() ? `- Notes : ${input.notes.trim()}` : null,
  ];

  return lines.filter((line) => line !== null && line !== '').join('\n');
}

/** Génère une référence courte et lisible pour la demande. */
export function createReference(): string {
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `LNS-${randomPart}`;
}
