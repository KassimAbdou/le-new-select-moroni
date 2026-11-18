import { getTodayInMoroni } from './date';
import type { Locale } from '../i18n/types';

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

const VALIDATION_MESSAGES: Record<
  Locale,
  {
    name: string;
    phone: string;
    email: string;
    dateFormat: string;
    datePast: string;
    time: string;
    guests: string;
  }
> = {
  fr: {
    name: 'Veuillez indiquer votre nom complet.',
    phone: 'Veuillez renseigner un numéro de téléphone ou WhatsApp valide.',
    email: 'Le format de l’adresse e-mail semble invalide.',
    dateFormat: 'Veuillez sélectionner une date de réservation valide.',
    datePast: 'Veuillez choisir une date à partir d’aujourd’hui.',
    time: 'Veuillez choisir un horaire de service proposé.',
    guests: 'Veuillez choisir un nombre de couverts valide.',
  },
  en: {
    name: 'Please enter your full name.',
    phone: 'Please enter a valid phone or WhatsApp number.',
    email: 'The email address format appears to be invalid.',
    dateFormat: 'Please select a valid reservation date.',
    datePast: 'Please choose a date from today onward.',
    time: 'Please choose one of the available service times.',
    guests: 'Please choose a valid number of guests.',
  },
  ar: {
    name: 'يرجى إدخال اسمك الكامل.',
    phone: 'يرجى إدخال رقم هاتف أو واتساب صالح.',
    email: 'يبدو أن تنسيق البريد الإلكتروني غير صالح.',
    dateFormat: 'يرجى اختيار تاريخ حجز صالح.',
    datePast: 'يرجى اختيار تاريخ بدءًا من اليوم.',
    time: 'يرجى اختيار وقت خدمة متاح.',
    guests: 'يرجى اختيار عدد صالح للأشخاص.',
  },
  sw: {
    name: 'Tafadhali weka jina lako kamili.',
    phone: 'Tafadhali weka nambari sahihi ya simu au WhatsApp.',
    email: 'Muundo wa barua pepe hauonekani kuwa sahihi.',
    dateFormat: 'Tafadhali chagua tarehe sahihi ya uhifadhi.',
    datePast: 'Tafadhali chagua tarehe kuanzia leo.',
    time: 'Tafadhali chagua muda unaopatikana wa huduma.',
    guests: 'Tafadhali chagua idadi sahihi ya wageni.',
  },
};

const WHATSAPP_MESSAGES: Record<
  Locale,
  {
    intro: string;
    ref: (ref: string) => string;
    name: string;
    phone: string;
    email: string;
    date: string;
    at: string;
    guests: string;
    people: string;
    seating: string;
    notes: string;
    seatingLabels: Record<SeatingChoice, string>;
  }
> = {
  fr: {
    intro: 'Bonjour Le New Select, je souhaite réserver une table',
    ref: (ref) => `(référence ${ref})`,
    name: 'Nom',
    phone: 'Téléphone',
    email: 'E-mail',
    date: 'Date',
    at: 'à',
    guests: 'Couverts',
    people: 'personne(s)',
    seating: 'Placement',
    notes: 'Notes',
    seatingLabels: { terrasse: 'Terrasse ombragée', salle: 'Salle climatisée' },
  },
  en: {
    intro: 'Hello Le New Select, I would like to book a table',
    ref: (ref) => `(reference ${ref})`,
    name: 'Name',
    phone: 'Phone',
    email: 'Email',
    date: 'Date',
    at: 'at',
    guests: 'Guests',
    people: 'person(s)',
    seating: 'Seating',
    notes: 'Notes',
    seatingLabels: { terrasse: 'Shaded terrace', salle: 'Air-conditioned room' },
  },
  ar: {
    intro: 'مرحبًا لو نيو سيليكت، أود حجز طاولة',
    ref: (ref) => `(المرجع ${ref})`,
    name: 'الاسم',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    date: 'التاريخ',
    at: 'الساعة',
    guests: 'عدد الأشخاص',
    people: 'شخص/أشخاص',
    seating: 'مكان الجلوس',
    notes: 'ملاحظات',
    seatingLabels: { terrasse: 'شرفة مظللة', salle: 'قاعة مكيفة' },
  },
  sw: {
    intro: 'Habari Le New Select, ningependa kuhifadhi meza',
    ref: (ref) => `(rejea ${ref})`,
    name: 'Jina',
    phone: 'Simu',
    email: 'Barua pepe',
    date: 'Tarehe',
    at: 'saa',
    guests: 'Wageni',
    people: 'mtu/watu',
    seating: 'Mahali',
    notes: 'Maelezo',
    seatingLabels: { terrasse: 'Mtaro wenye kivuli', salle: 'Chumba chenye kiyoyozi' },
  },
};

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
  locale: Locale = 'fr',
): string | null {
  const m = VALIDATION_MESSAGES[locale];
  if (input.fullName.trim().length < 2) {
    return m.name;
  }

  if (input.phone.replace(/\D/g, '').length < 6) {
    return m.phone;
  }

  if (input.email.trim() && !EMAIL_PATTERN.test(input.email.trim())) {
    return m.email;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    return m.dateFormat;
  }

  if (input.date < today) {
    return m.datePast;
  }

  if (!ALLOWED_TIME_SLOTS.includes(input.timeSlot)) {
    return m.time;
  }

  if (!ALLOWED_GUEST_COUNTS.includes(input.guests)) {
    return m.guests;
  }

  return null;
}

/** Construit le message transmis au restaurant via WhatsApp. */
export function buildWhatsAppMessage(
  input: ReservationInput,
  reference?: string,
  locale: Locale = 'fr',
): string {
  const m = WHATSAPP_MESSAGES[locale];
  const lines = [
    m.intro,
    reference ? m.ref(reference) : '',
    '',
    `- ${m.name} : ${input.fullName.trim()}`,
    `- ${m.phone} : ${input.phone.trim()}`,
    input.email.trim() ? `- ${m.email} : ${input.email.trim()}` : null,
    `- ${m.date} : ${input.date} ${m.at} ${input.timeSlot}`,
    `- ${m.guests} : ${input.guests} ${m.people}`,
    `- ${m.seating} : ${m.seatingLabels[input.seating]}`,
    input.notes.trim() ? `- ${m.notes} : ${input.notes.trim()}` : null,
  ];

  return lines.filter((line) => line !== null && line !== '').join('\n');
}

/** Génère une référence courte et lisible pour la demande. */
export function createReference(): string {
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `LNS-${randomPart}`;
}
