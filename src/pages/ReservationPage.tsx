import { useState } from 'react';
import { CheckCircle2, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';
import { getTodayInMoroni } from '../lib/date';
import {
  GUEST_OPTIONS,
  GROUP_OPTION,
  SEATING_LABELS,
  TIME_SLOTS,
  buildWhatsAppMessage,
  createEmptyReservation,
  createReference,
  validateReservation,
} from '../lib/reservation';
import type { ReservationInput, SeatingChoice } from '../lib/reservation';

interface Landmark {
  id: string;
  name: string;
  distance: string;
  note: string;
  x: number;
  y: number;
}

const MORONI_LANDMARKS: Landmark[] = [
  {
    id: 'select',
    name: 'Le New Select',
    distance: 'Place de France',
    note: 'Terrasse ombragée sous les badamiers et salle climatisée face à la place.',
    x: 245,
    y: 135,
  },
  {
    id: 'mosquee',
    name: 'Ancienne Mosquée du Vendredi',
    distance: '3 min à pied',
    note: 'Monument historique en pierre de corail blanche au bord de l’eau.',
    x: 105,
    y: 95,
  },
  {
    id: 'port',
    name: 'Port de Moroni',
    distance: '4 min à pied',
    note: 'Arrivages quotidiens des pêcheurs alimentant la carte du jour.',
    x: 75,
    y: 195,
  },
  {
    id: 'parking',
    name: 'Stationnement Place de France',
    distance: '1 min à pied',
    note: 'Aires de stationnement public bordant la place et les avenues adjacentes.',
    x: 345,
    y: 175,
  },
];

export function ReservationPage() {
  const { content } = useSiteContent();
  const { info } = content.settings;
  const today = getTodayInMoroni();
  const [reservation, setReservation] = useState<ReservationInput>(() =>
    createEmptyReservation(today),
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark>(
    MORONI_LANDMARKS[0]!,
  );

  const updateField = <K extends keyof ReservationInput>(
    key: K,
    value: ReservationInput[K],
  ) => {
    setReservation((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validateReservation(reservation, today);
    setFormError(error);
    if (error) return;
    setConfirmedRef(createReference());
  };

  const whatsappUrl = `${info.whatsappHref}?text=${encodeURIComponent(
    buildWhatsAppMessage(reservation, confirmedRef ?? undefined),
  )}`;

  return (
    <div className="py-10 md:py-14 space-y-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-2 max-w-2xl border-b border-[#E2E6DF] pb-8">
          <p className="text-xs font-medium text-[#0F4C45]">
            Réservation & Contact · Moroni, Place de France
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#151A19] text-balance">
            Réserver votre table
          </h1>
          <p className="text-base text-[#4A5552] leading-relaxed">
            Choisissez votre placement en terrasse sous les arbres ou dans la salle
            climatisée. Confirmation immédiate ou par téléphone au{' '}
            <span className="font-medium text-[#151A19] tabular-nums">
              {info.phoneDisplay}
            </span>
            .
          </p>
        </div>

        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Reservation Form or Confirmation */}
          <div className="lg:col-span-7 bg-white border border-[#E2E6DF] rounded-xl p-6 sm:p-8">
            {confirmedRef ? (
              <div className="space-y-6" aria-live="polite">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-[#0F4C45] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <p className="text-xs font-mono font-medium text-[#0F4C45]">
                      Référence {confirmedRef}
                    </p>
                    <h2 className="font-display text-3xl font-semibold text-[#151A19]">
                      Demande de réservation enregistrée
                    </h2>
                    <p className="text-sm text-[#4A5552]">
                      Merci {reservation.fullName}. Votre demande est prête ;
                      transmettez-la via WhatsApp pour une prise en charge immédiate par
                      notre maître d’hôtel.
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-[#F1F3EF] border border-[#E2E6DF] text-sm">
                  <div>
                    <dt className="text-xs text-[#4A5552]">Date & Heure</dt>
                    <dd className="font-semibold text-[#151A19] tabular-nums">
                      {reservation.date} à {reservation.timeSlot}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#4A5552]">Nombre de couverts</dt>
                    <dd className="font-semibold text-[#151A19] tabular-nums">
                      {reservation.guests === GROUP_OPTION
                        ? 'Groupe (15+ personnes)'
                        : `${reservation.guests} ${
                            Number(reservation.guests) > 1 ? 'personnes' : 'personne'
                          }`}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#4A5552]">Placement souhaité</dt>
                    <dd className="font-semibold text-[#151A19]">
                      {SEATING_LABELS[reservation.seating]}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#4A5552]">Téléphone</dt>
                    <dd className="font-semibold text-[#151A19] tabular-nums">
                      {reservation.phone}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F4C45] text-white text-sm font-medium hover:bg-[#0B3A35] transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Confirmer via WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setConfirmedRef(null)}
                    className="px-4 py-2.5 rounded-lg border border-[#D4DAD0] text-sm font-medium text-[#151A19] hover:bg-[#F1F3EF] transition-colors cursor-pointer"
                  >
                    Modifier la réservation
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <fieldset className="space-y-2">
                  <legend className="text-sm font-medium text-[#151A19]">
                    Choix de placement
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(
                      [
                        {
                          value: 'terrasse' as SeatingChoice,
                          title: 'Terrasse ombragée',
                          detail: 'Sous les badamiers · Vue Place de France',
                        },
                        {
                          value: 'salle' as SeatingChoice,
                          title: 'Salle climatisée',
                          detail: 'Boiseries calmes · Idéal déjeuners d’affaires',
                        },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateField('seating', option.value)}
                        aria-pressed={reservation.seating === option.value}
                        className={`p-4 rounded-xl border text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C45] ${
                          reservation.seating === option.value
                            ? 'border-[#0F4C45] bg-[#0F4C45]/5'
                            : 'border-[#E2E6DF] hover:bg-[#F8F9F7]'
                        }`}
                      >
                        <p className="text-sm font-semibold text-[#151A19]">
                          {option.title}
                        </p>
                        <p className="text-xs text-[#4A5552] mt-0.5">{option.detail}</p>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="res-name"
                      className="block text-sm font-medium text-[#151A19]"
                    >
                      Nom complet *
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      autoComplete="name"
                      required
                      value={reservation.fullName}
                      onChange={(event) => updateField('fullName', event.target.value)}
                      placeholder="Ex. : Aminata Said"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DAD0] bg-white text-sm text-[#151A19] focus:outline-2 focus:outline-[#0F4C45]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="res-phone"
                      className="block text-sm font-medium text-[#151A19]"
                    >
                      Téléphone / WhatsApp *
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={reservation.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      placeholder="+269 3XX XX XX"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DAD0] bg-white text-sm text-[#151A19] focus:outline-2 focus:outline-[#0F4C45] tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="res-date"
                      className="block text-sm font-medium text-[#151A19]"
                    >
                      Date *
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      min={today}
                      required
                      value={reservation.date}
                      onChange={(event) => updateField('date', event.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DAD0] bg-white text-sm text-[#151A19] focus:outline-2 focus:outline-[#0F4C45] tabular-nums"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="res-time"
                      className="block text-sm font-medium text-[#151A19]"
                    >
                      Heure d’arrivée
                    </label>
                    <select
                      id="res-time"
                      value={reservation.timeSlot}
                      onChange={(event) => updateField('timeSlot', event.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DAD0] bg-white text-sm text-[#151A19] focus:outline-2 focus:outline-[#0F4C45] tabular-nums"
                    >
                      {TIME_SLOTS.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                          {group.slots.map((slot) => (
                            <option key={slot.value} value={slot.value}>
                              {slot.label}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="res-guests"
                      className="block text-sm font-medium text-[#151A19]"
                    >
                      Couverts
                    </label>
                    <select
                      id="res-guests"
                      value={reservation.guests}
                      onChange={(event) => updateField('guests', event.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DAD0] bg-white text-sm text-[#151A19] focus:outline-2 focus:outline-[#0F4C45] tabular-nums"
                    >
                      {GUEST_OPTIONS.map((count) => (
                        <option key={count} value={String(count)}>
                          {count} {count > 1 ? 'personnes' : 'personne'}
                        </option>
                      ))}
                      <option value={GROUP_OPTION}>Groupe (15+ personnes)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="res-email"
                      className="block text-sm font-medium text-[#151A19]"
                    >
                      E-mail (optionnel)
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      autoComplete="email"
                      value={reservation.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      placeholder="nom@exemple.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DAD0] bg-white text-sm text-[#151A19] focus:outline-2 focus:outline-[#0F4C45]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="res-notes"
                      className="block text-sm font-medium text-[#151A19]"
                    >
                      Précisions ou allergies
                    </label>
                    <input
                      id="res-notes"
                      type="text"
                      value={reservation.notes}
                      onChange={(event) => updateField('notes', event.target.value)}
                      placeholder="Chaise haute, table calme, sans crustacés..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DAD0] bg-white text-sm text-[#151A19] focus:outline-2 focus:outline-[#0F4C45]"
                    />
                  </div>
                </div>

                {formError && (
                  <p
                    id="res-error"
                    role="alert"
                    aria-live="assertive"
                    className="text-sm font-medium text-[#9B2C2C] bg-[#9B2C2C]/8 border border-[#9B2C2C]/25 rounded-lg px-4 py-2.5"
                  >
                    {formError}
                  </p>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-[#0F4C45] text-white text-sm font-medium hover:bg-[#0B3A35] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C45]"
                  >
                    Confirmer la demande
                  </button>
                  <span className="text-xs text-[#4A5552]">
                    Service continu de 07h00 à 23h00
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Right: Direct Contact + Moroni Situation Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact */}
            <div className="bg-white border border-[#E2E6DF] rounded-xl p-6 space-y-5">
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#4A5552]">Ligne directe</p>
                <h2 className="font-display text-2xl font-semibold text-[#151A19]">
                  Contacter la salle sans attendre
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <a
                  href={info.phoneHref}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-[#D4DAD0] bg-[#F8F9F7] hover:bg-[#F1F3EF] transition-colors"
                >
                  <span className="inline-flex items-center gap-2.5 text-sm font-medium text-[#151A19]">
                    <Phone className="w-4 h-4 text-[#0F4C45]" aria-hidden="true" />
                    <span>Appeler le restaurant</span>
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#0F4C45] tabular-nums">
                    {info.phoneDisplay}
                  </span>
                </a>

                <a
                  href={`${info.whatsappHref}?text=${encodeURIComponent(
                    'Bonjour Le New Select, je souhaite réserver une table.',
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#0F4C45] text-white hover:bg-[#0B3A35] transition-colors"
                >
                  <span className="inline-flex items-center gap-2.5 text-sm font-medium">
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Écrire sur WhatsApp</span>
                  </span>
                  <span className="text-xs opacity-90">Réponse rapide</span>
                </a>
              </div>
            </div>

            {/* Interactive Situation Map of Place de France, Moroni */}
            <div className="bg-white border border-[#E2E6DF] rounded-xl p-6 space-y-4">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-[#4A5552]">
                    Situation géographique · Moroni
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-[#151A19]">
                    Plan de la Place de France
                  </h2>
                </div>
                <a
                  href={info.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#0F4C45] hover:underline whitespace-nowrap shrink-0"
                >
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Ouvrir la carte GPS</span>
                </a>
              </div>

              <div className="rounded-lg border border-[#E2E6DF] bg-[#F1F3EF] overflow-hidden">
                <svg
                  viewBox="0 0 420 250"
                  role="img"
                  aria-label="Carte schématique de la Place de France à Moroni et repères autour du restaurant Le New Select"
                  className="w-full h-auto block"
                >
                  {/* Indian Ocean */}
                  <path d="M 0 0 L 145 0 Q 115 115 88 250 L 0 250 Z" fill="#DCE7E4" />
                  <text
                    x="18"
                    y="45"
                    fill="#4A6B66"
                    fontSize="10"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight="600"
                  >
                    Océan Indien
                  </text>

                  {/* Corniche / Coastal road */}
                  <path
                    d="M 145 0 Q 118 115 92 250"
                    stroke="#FFFFFF"
                    strokeWidth="9"
                    fill="none"
                  />
                  <path
                    d="M 118 135 L 420 135"
                    stroke="#FFFFFF"
                    strokeWidth="8"
                    fill="none"
                  />
                  <path
                    d="M 245 30 L 245 230"
                    stroke="#FFFFFF"
                    strokeWidth="7"
                    fill="none"
                  />

                  {/* Place de France plaza */}
                  <rect
                    x="185"
                    y="95"
                    width="125"
                    height="82"
                    rx="10"
                    fill="#E5EAE2"
                    stroke="#C7D1C2"
                    strokeWidth="1.5"
                  />
                  <text
                    x="247"
                    y="165"
                    textAnchor="middle"
                    fill="#4A5552"
                    fontSize="10"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight="500"
                  >
                    Place de France
                  </text>

                  {/* Landmarks */}
                  {MORONI_LANDMARKS.map((landmark) => {
                    const isSelected = selectedLandmark.id === landmark.id;
                    const isPrimary = landmark.id === 'select';
                    return (
                      <g
                        key={landmark.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`Voir le repère : ${landmark.name}`}
                        aria-pressed={isSelected}
                        className="cursor-pointer focus:outline-none"
                        onClick={() => setSelectedLandmark(landmark)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            setSelectedLandmark(landmark);
                          }
                        }}
                      >
                        <circle
                          cx={landmark.x}
                          cy={landmark.y}
                          r={isPrimary ? 10 : 7}
                          fill={
                            isPrimary ? '#0F4C45' : isSelected ? '#151A19' : '#FFFFFF'
                          }
                          stroke={isPrimary ? '#FFFFFF' : '#0F4C45'}
                          strokeWidth="2.5"
                        />
                        <text
                          x={landmark.x}
                          y={landmark.y - 14}
                          textAnchor="middle"
                          fill="#151A19"
                          fontSize={isPrimary ? '11' : '9.5'}
                          fontWeight={isPrimary || isSelected ? '700' : '500'}
                          fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                          {landmark.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div
                className="p-4 rounded-lg bg-[#F8F9F7] border border-[#E2E6DF] space-y-1"
                aria-live="polite"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-[#151A19]">
                    {selectedLandmark.name}
                  </p>
                  <span className="text-xs font-medium text-[#0F4C45]">
                    {selectedLandmark.distance}
                  </span>
                </div>
                <p className="text-xs text-[#4A5552] leading-relaxed">
                  {selectedLandmark.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
