import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useLocale } from '../i18n/LocaleContext';
import { contentTranslations } from '../i18n/content';
import { getTodayInMoroni } from '../lib/date';
import { saveClientRecord } from '../lib/clientRecords';
import {
  GUEST_OPTIONS,
  GROUP_OPTION,
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

const BASE_LANDMARKS: Landmark[] = [
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
  const { content } = useLocalizedContent();
  const { locale, t } = useLocale();
  const { info } = content.settings;
  const today = getTodayInMoroni();
  const [reservation, setReservation] = useState<ReservationInput>(() =>
    createEmptyReservation(today),
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  const landmarks = useMemo(() => {
    const overrides =
      locale === 'fr' ? {} : (contentTranslations[locale]?.landmarks ?? {});
    return BASE_LANDMARKS.map((lm) => ({ ...lm, ...(overrides[lm.id] ?? {}) }));
  }, [locale]);

  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string>(
    BASE_LANDMARKS[0]!.id,
  );
  const selectedLandmark =
    landmarks.find((l) => l.id === selectedLandmarkId) ?? landmarks[0]!;

  useEffect(() => {
    if (!landmarks.some((l) => l.id === selectedLandmarkId)) {
      setSelectedLandmarkId(landmarks[0]!.id);
    }
  }, [landmarks, selectedLandmarkId]);

  const timeSlotGroups = useMemo(() => {
    const labels: Record<string, string> = {
      'Petit-déjeuner': t('menu.headings.breakfast.title'),
      Déjeuner: t('menu.headings.lunch.title'),
      Dîner: t('menu.headings.dinner.title'),
    };
    return TIME_SLOTS.map((group) => ({
      ...group,
      label: labels[group.label] ?? group.label,
    }));
  }, [t]);

  const seatingLabels: Record<SeatingChoice, string> = {
    terrasse: t('reservation.terraceTitle'),
    salle: t('reservation.roomTitle'),
  };

  const updateField = <K extends keyof ReservationInput>(
    key: K,
    value: ReservationInput[K],
  ) => {
    setReservation((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validateReservation(reservation, today, locale);
    setFormError(error);
    if (error) return;
    const ref = createReference();
    // La confirmation s'affiche immédiatement : l'enregistrement est best-effort
    // et ne doit jamais bloquer le client si Supabase est lent ou indisponible.
    setConfirmedRef(ref);
    void saveClientRecord({
      kind: 'reservation',
      name: reservation.fullName.trim(),
      phone: reservation.phone.trim(),
      email: reservation.email.trim() || null,
      locale,
      details: {
        reference: ref,
        date: reservation.date,
        timeSlot: reservation.timeSlot,
        guests: reservation.guests,
        seating: reservation.seating,
        notes: reservation.notes.trim() || null,
        email: reservation.email.trim() || null,
      },
    }).catch(() => {
      // Best effort: do not block confirmation flow if storage fails.
    });
  };

  const whatsappUrl = `${info.whatsappHref}?text=${encodeURIComponent(
    buildWhatsAppMessage(reservation, confirmedRef ?? undefined, locale),
  )}`;

  return (
    <div className="py-10 md:py-14 space-y-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-2 max-w-2xl border-b border-line pb-8">
          <p className="text-xs font-medium text-ocean">{t('reservation.kicker')}</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink text-balance">
            {t('reservation.title')}
          </h1>
          <p className="text-base text-ink-muted leading-relaxed">
            {t('reservation.intro')}
            <span className="font-medium text-ink tabular-nums">{info.phoneDisplay}</span>
            .
          </p>
        </div>

        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Reservation Form or Confirmation */}
          <div className="lg:col-span-7 bg-surface border border-line rounded-xl p-6 sm:p-8">
            {confirmedRef ? (
              <div className="space-y-6" aria-live="polite">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-ocean shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <p className="text-xs font-mono font-medium text-ocean">
                      {t('reservation.confirmedKicker', { ref: confirmedRef })}
                    </p>
                    <h2 className="font-display text-3xl font-semibold text-ink">
                      {t('reservation.confirmedTitle')}
                    </h2>
                    <p className="text-sm text-ink-muted">
                      {t('reservation.confirmedThanks', { name: reservation.fullName })}
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-surface-alt border border-line text-sm">
                  <div>
                    <dt className="text-xs text-ink-muted">
                      {t('reservation.dateTime')}
                    </dt>
                    <dd className="font-semibold text-ink tabular-nums">
                      {reservation.date} · {reservation.timeSlot}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-muted">{t('reservation.covers')}</dt>
                    <dd className="font-semibold text-ink tabular-nums">
                      {reservation.guests === GROUP_OPTION
                        ? t('common.group15')
                        : `${reservation.guests} ${
                            Number(reservation.guests) > 1
                              ? t('common.people')
                              : t('common.person')
                          }`}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-muted">{t('reservation.seating')}</dt>
                    <dd className="font-semibold text-ink">
                      {seatingLabels[reservation.seating]}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-ink-muted">
                      {t('reservation.phoneLabel')}
                    </dt>
                    <dd className="font-semibold text-ink tabular-nums">
                      {reservation.phone}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-burgundy text-white text-sm font-medium hover:bg-burgundy-hover transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>{t('reservation.confirmWhatsApp')}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setConfirmedRef(null)}
                    className="px-4 py-2.5 rounded-lg border border-line-strong text-sm font-medium text-ink hover:bg-surface-alt transition-colors cursor-pointer"
                  >
                    {t('common.modifyReservation')}
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => void handleSubmit(e)}
                noValidate
                className="space-y-6"
              >
                <fieldset className="space-y-2">
                  <legend className="text-sm font-medium text-ink">
                    {t('reservation.seatingLegend')}
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(
                      [
                        {
                          value: 'terrasse' as SeatingChoice,
                          title: t('reservation.terraceTitle'),
                          detail: t('reservation.terraceDetail'),
                        },
                        {
                          value: 'salle' as SeatingChoice,
                          title: t('reservation.roomTitle'),
                          detail: t('reservation.roomDetail'),
                        },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateField('seating', option.value)}
                        aria-pressed={reservation.seating === option.value}
                        className={`p-4 rounded-xl border text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean ${
                          reservation.seating === option.value
                            ? 'border-ocean bg-ocean/10'
                            : 'border-line hover:bg-canvas'
                        }`}
                      >
                        <p className="text-sm font-semibold text-ink">{option.title}</p>
                        <p className="text-xs text-ink-muted mt-0.5">{option.detail}</p>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="res-name"
                      className="block text-sm font-medium text-ink"
                    >
                      {t('reservation.fullName')}
                    </label>
                    <input
                      id="res-name"
                      type="text"
                      autoComplete="name"
                      required
                      value={reservation.fullName}
                      onChange={(event) => updateField('fullName', event.target.value)}
                      placeholder={t('reservation.fullNamePlaceholder')}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-line-strong bg-surface text-sm text-ink focus:outline-2 focus:outline-ocean"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="res-phone"
                      className="block text-sm font-medium text-ink"
                    >
                      {t('reservation.phone')}
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={reservation.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                      placeholder={t('reservation.phonePlaceholder')}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-line-strong bg-surface text-sm text-ink focus:outline-2 focus:outline-ocean tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="res-date"
                      className="block text-sm font-medium text-ink"
                    >
                      {t('reservation.date')}
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      min={today}
                      required
                      value={reservation.date}
                      onChange={(event) => updateField('date', event.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-line-strong bg-surface text-sm text-ink focus:outline-2 focus:outline-ocean tabular-nums"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="res-time"
                      className="block text-sm font-medium text-ink"
                    >
                      {t('reservation.time')}
                    </label>
                    <select
                      id="res-time"
                      value={reservation.timeSlot}
                      onChange={(event) => updateField('timeSlot', event.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-line-strong bg-surface text-sm text-ink focus:outline-2 focus:outline-ocean tabular-nums"
                    >
                      {timeSlotGroups.map((group) => (
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
                      className="block text-sm font-medium text-ink"
                    >
                      {t('reservation.guests')}
                    </label>
                    <select
                      id="res-guests"
                      value={reservation.guests}
                      onChange={(event) => updateField('guests', event.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-line-strong bg-surface text-sm text-ink focus:outline-2 focus:outline-ocean tabular-nums"
                    >
                      {GUEST_OPTIONS.map((count) => (
                        <option key={count} value={String(count)}>
                          {count} {count > 1 ? t('common.people') : t('common.person')}
                        </option>
                      ))}
                      <option value={GROUP_OPTION}>{t('common.group15')}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="res-email"
                      className="block text-sm font-medium text-ink"
                    >
                      {t('reservation.email')}
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      autoComplete="email"
                      value={reservation.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      placeholder={t('reservation.emailPlaceholder')}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-line-strong bg-surface text-sm text-ink focus:outline-2 focus:outline-ocean"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="res-notes"
                      className="block text-sm font-medium text-ink"
                    >
                      {t('reservation.notes')}
                    </label>
                    <input
                      id="res-notes"
                      type="text"
                      value={reservation.notes}
                      onChange={(event) => updateField('notes', event.target.value)}
                      placeholder={t('reservation.notesPlaceholder')}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-line-strong bg-surface text-sm text-ink focus:outline-2 focus:outline-ocean"
                    />
                  </div>
                </div>

                {formError && (
                  <p
                    id="res-error"
                    role="alert"
                    aria-live="assertive"
                    className="text-sm font-medium text-burgundy bg-burgundy/8 border border-burgundy/25 rounded-lg px-4 py-2.5"
                  >
                    {formError}
                  </p>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-burgundy text-white text-sm font-medium hover:bg-burgundy-hover transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
                  >
                    {t('common.confirmRequest')}
                  </button>
                  <span className="text-xs text-ink-muted">
                    {t('reservation.serviceHours')}
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Right: Direct Contact + Moroni Situation Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact */}
            <div className="bg-surface border border-line rounded-xl p-6 space-y-5">
              <div className="space-y-1">
                <p className="text-xs font-medium text-ink-muted">
                  {t('reservation.directLine')}
                </p>
                <h2 className="font-display text-2xl font-semibold text-ink">
                  {t('reservation.contactWithoutWaiting')}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <a
                  href={info.phoneHref}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-line-strong bg-canvas hover:bg-surface-alt transition-colors"
                >
                  <span className="inline-flex items-center gap-2.5 text-sm font-medium text-ink">
                    <Phone className="w-4 h-4 text-ocean" aria-hidden="true" />
                    <span>{t('common.callRestaurant')}</span>
                  </span>
                  <span className="font-mono text-sm font-semibold text-ocean tabular-nums">
                    {info.phoneDisplay}
                  </span>
                </a>

                <a
                  href={`${info.whatsappHref}?text=${encodeURIComponent(t('reservation.whatsappPrefill'))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-lg bg-burgundy text-white hover:bg-burgundy-hover transition-colors"
                >
                  <span className="inline-flex items-center gap-2.5 text-sm font-medium">
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>{t('common.writeWhatsApp')}</span>
                  </span>
                  <span className="text-xs opacity-90">
                    {t('reservation.whatsappQuick')}
                  </span>
                </a>
              </div>
            </div>

            {/* Interactive Situation Map of Place de France, Moroni */}
            <div className="bg-surface border border-line rounded-xl p-6 space-y-4">
              <div className="flex items-baseline justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-ink-muted">
                    {t('reservation.mapKicker')}
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {t('reservation.mapTitle')}
                  </h2>
                </div>
                <a
                  href={info.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-ocean hover:underline whitespace-nowrap shrink-0"
                >
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t('common.openGpsMap')}</span>
                </a>
              </div>

              <div className="rounded-lg border border-line bg-surface-alt overflow-x-auto overscroll-x-contain">
                <svg
                  viewBox="0 0 420 250"
                  role="img"
                  aria-label={t('reservation.mapAlt')}
                  className="w-full min-w-[420px] h-auto block"
                >
                  {/* Indian Ocean */}
                  <path d="M 0 0 L 145 0 Q 115 115 88 250 L 0 250 Z" fill="#F7E7EA" />
                  <text
                    x="18"
                    y="45"
                    fill="#7B1E2B"
                    fontSize="10"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                    fontWeight="600"
                  >
                    {locale === 'ar'
                      ? 'المحيط الهندي'
                      : locale === 'sw'
                        ? 'Bahari ya Hindi'
                        : 'Indian Ocean'}
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
                    fill="#FFF5F6"
                    stroke="#EBC6CD"
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
                    {locale === 'ar' ? 'ساحة فرنسا' : 'Place de France'}
                  </text>

                  {/* Landmarks */}
                  {landmarks.map((landmark) => {
                    const isSelected = selectedLandmark.id === landmark.id;
                    const isPrimary = landmark.id === 'select';
                    return (
                      <g
                        key={landmark.id}
                        role="button"
                        tabIndex={0}
                        aria-label={t('reservation.viewLandmark', {
                          name: landmark.name,
                        })}
                        aria-pressed={isSelected}
                        className="cursor-pointer focus:outline-none"
                        onClick={() => setSelectedLandmarkId(landmark.id)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            setSelectedLandmarkId(landmark.id);
                          }
                        }}
                      >
                        <circle
                          cx={landmark.x}
                          cy={landmark.y}
                          r={isPrimary ? 10 : 7}
                          fill={
                            isPrimary ? '#7B1E2B' : isSelected ? '#2A0F15' : '#FFFFFF'
                          }
                          stroke={isPrimary ? '#FFFFFF' : '#7B1E2B'}
                          strokeWidth="2.5"
                        />
                        <text
                          x={landmark.x}
                          y={landmark.y - 14}
                          textAnchor="middle"
                          fill="#2A0F15"
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
                className="p-4 rounded-lg bg-canvas border border-line space-y-1"
                aria-live="polite"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">
                    {selectedLandmark.name}
                  </p>
                  <span className="text-xs font-medium text-ocean">
                    {selectedLandmark.distance}
                  </span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
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
