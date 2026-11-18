import { useEffect, useState } from 'react';
import { CheckCircle2, MessageCircle, X } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import { formatEventDate, getEventTicketPrice } from '../lib/events';
import { formatKmf } from '../lib/format';
import { saveClientRecord } from '../lib/clientRecords';
import { createReference } from '../lib/reservation';
import type { EventItem } from '../types';

interface TicketReservationDialogProps {
  event: EventItem;
  whatsappHref: string;
  onClose: () => void;
}

function buildTicketMessage(
  event: EventItem,
  quantity: number,
  reference: string,
  totalKmf: number,
  locale: string,
): string {
  const intro: Record<string, string> = {
    fr: 'Bonjour Le New Select, je souhaite réserver des billets pour :',
    en: 'Hello Le New Select, I would like to book tickets for:',
    ar: 'مرحبًا لو نيو سيليكت، أود حجز تذاكر لـ:',
    sw: 'Habari Le New Select, ningependa kuhifadhi tiketi za:',
  };
  const refWord: Record<string, string> = {
    fr: 'Référence',
    en: 'Reference',
    ar: 'المرجع',
    sw: 'Marejeo',
  };
  const choose = (map: Record<string, string>) => map[locale] ?? map.fr!;
  const priceText =
    totalKmf === 0
      ? choose({ fr: 'Gratuit', en: 'Free', ar: 'مجاني', sw: 'Bure' })
      : formatKmf(totalKmf);
  return [
    choose(intro),
    '',
    `- ${event.title}`,
    `- ${formatEventDate(event)}${event.time ? ` · ${event.time}` : ''}`,
    `- ${quantity} × ${priceText}`,
    `- ${choose(refWord)} : ${reference}`,
  ].join('\n');
}

/** Formulaire de réservation de billets : enregistrement + finalisation WhatsApp. */
export function TicketReservationDialog({
  event,
  whatsappHref,
  onClose,
}: TicketReservationDialogProps) {
  const { t, locale, dir } = useLocale();
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const unitPrice = getEventTicketPrice(event);
  const total = (unitPrice ?? 0) * quantity;

  useEffect(() => {
    const onKeyDown = (keyEvent: KeyboardEvent) => {
      if (keyEvent.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleSubmit = (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    if (!name.trim() || !phone.trim() || quantity < 1) return;
    const ref = createReference();
    // Confirmation immédiate : l'enregistrement reste best-effort.
    setReference(ref);
    setError(null);
    void saveClientRecord({
      kind: 'ticket',
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      locale,
      details: {
        reference: ref,
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.eventDate,
        quantity,
        unitPriceKmf: unitPrice ?? null,
        totalKmf: total,
        email: email.trim() || null,
      },
    }).catch(() => {
      setError(t('events.ticketError'));
    });
  };

  const message = reference
    ? buildTicketMessage(event, quantity, reference, total, locale)
    : '';
  const whatsappUrl = `${whatsappHref}?text=${encodeURIComponent(message)}`;

  const fieldClass =
    'w-full px-3.5 py-2.5 rounded-lg border border-line-strong bg-surface text-sm text-ink focus:outline-2 focus:outline-ocean';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onMouseDown={(clickEvent) => {
        if (clickEvent.target === clickEvent.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-dialog-title"
        dir={dir}
        className="w-full max-w-lg max-h-[90dvh] overflow-y-auto bg-surface border border-line rounded-xl shadow-xl p-5 sm:p-6 space-y-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-ocean">{event.title}</p>
            <h2
              id="ticket-dialog-title"
              className="font-display text-2xl font-semibold text-ink"
            >
              {reference
                ? t('events.ticketConfirmTitle')
                : t('events.ticketFormTitle', { title: event.title })}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            className="p-1.5 rounded-lg text-ink-muted hover:bg-surface-alt hover:text-ink cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {reference ? (
          <div className="space-y-5">
            <div className="flex gap-3 rounded-xl bg-ocean/5 border border-ocean/20 p-4">
              <CheckCircle2
                className="w-6 h-6 text-ocean shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div className="space-y-1">
                <p className="font-mono text-xs font-medium text-ocean">
                  {t('events.ticketReference')} : {reference}
                </p>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {t('events.ticketConfirmText', { ref: reference })}
                </p>
                <p className="text-sm font-medium text-ink tabular-nums">
                  {quantity} × {total === 0 ? t('events.free') : formatKmf(total)}
                </p>
              </div>
            </div>
            {error && <p className="text-sm text-burgundy">{error}</p>}
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-burgundy text-white text-sm font-medium hover:bg-burgundy-hover cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {t('events.ticketWhatsapp')}
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg border border-line-strong text-sm font-medium text-ink hover:bg-surface-alt cursor-pointer"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="ticket-quantity"
                  className="block text-sm font-medium text-ink"
                >
                  {t('events.ticketQuantity')}
                </label>
                <input
                  id="ticket-quantity"
                  type="number"
                  min="1"
                  max={event.ticketsAvailable || undefined}
                  required
                  value={quantity}
                  onChange={(inputEvent) => setQuantity(Number(inputEvent.target.value))}
                  className={`${fieldClass} tabular-nums`}
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="ticket-name"
                  className="block text-sm font-medium text-ink"
                >
                  {t('events.ticketName')}
                </label>
                <input
                  id="ticket-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(inputEvent) => setName(inputEvent.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="ticket-phone"
                  className="block text-sm font-medium text-ink"
                >
                  {t('events.ticketPhone')}
                </label>
                <input
                  id="ticket-phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(inputEvent) => setPhone(inputEvent.target.value)}
                  className={`${fieldClass} tabular-nums`}
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="ticket-email"
                  className="block text-sm font-medium text-ink"
                >
                  {t('events.ticketEmail')}
                </label>
                <input
                  id="ticket-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(inputEvent) => setEmail(inputEvent.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-lg bg-surface-alt border border-line p-4">
              <span className="text-sm text-ink-muted">
                {quantity} ×{' '}
                {unitPrice === undefined
                  ? t('events.priceOnRequest')
                  : unitPrice === 0
                    ? t('events.free')
                    : formatKmf(unitPrice)}
              </span>
              <span className="font-mono text-lg font-semibold text-ink tabular-nums">
                {unitPrice === undefined
                  ? '—'
                  : total === 0
                    ? t('events.free')
                    : formatKmf(total)}
              </span>
            </div>

            {error && <p className="text-sm text-burgundy">{error}</p>}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-burgundy text-white text-sm font-medium hover:bg-burgundy-hover cursor-pointer"
              >
                {t('events.ticketSubmit')}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg border border-line-strong text-sm font-medium text-ink hover:bg-surface-alt cursor-pointer"
              >
                {t('common.close')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
