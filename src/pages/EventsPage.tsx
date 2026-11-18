import { useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useLocale } from '../i18n/LocaleContext';
import { formatEventDate, getEventTicketPrice, getUpcomingEvents } from '../lib/events';
import { formatKmf } from '../lib/format';
import type { EventItem, PageId } from '../types';
import { ResilientImage } from '../components/ResilientImage';
import { ImageLightbox } from '../components/ImageLightbox';
import { TicketReservationDialog } from '../components/TicketReservationDialog';

interface EventsPageProps {
  onNavigate: (page: PageId) => void;
}

export function EventsPage({ onNavigate }: EventsPageProps) {
  const { content } = useLocalizedContent();
  const { t } = useLocale();
  const { info, heroImage } = content.settings;

  const events = getUpcomingEvents(content.events);
  const eventCategories = content.eventCategories.filter(
    (category) => category.isVisible !== false,
  );
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [ticketEvent, setTicketEvent] = useState<EventItem | null>(null);
  const [photoEvent, setPhotoEvent] = useState<EventItem | null>(null);

  const visibleEvents =
    activeCategory === 'all'
      ? events
      : events.filter((event) => event.categoryId === activeCategory);

  const categoryLabelFor = (event: EventItem) =>
    event.categoryLabel ||
    eventCategories.find((category) => category.id === event.categoryId)?.name ||
    '';

  const priceLabel = (price?: number) => {
    if (price === undefined) return t('events.priceOnRequest');
    if (price === 0) return t('events.free');
    return formatKmf(price);
  };

  return (
    <div className="py-10 md:py-14 space-y-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-2 max-w-3xl border-b border-line pb-8">
          <p className="text-xs font-medium text-ocean">{t('events.kicker')}</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink text-balance">
            {t('events.title')}
          </h1>
          <p className="text-base text-ink-muted leading-relaxed">{t('events.intro')}</p>
        </div>

        {/* Category filters */}
        <div
          role="group"
          aria-label={t('events.filtersAria')}
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-surface-alt border border-line rounded-xl w-fit"
        >
          <button
            type="button"
            aria-pressed={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-surface text-ink shadow-xs border border-line'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            {t('events.all')}
          </button>
          {eventCategories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-surface text-ink shadow-xs border border-line'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Events grid */}
        {visibleEvents.length === 0 ? (
          <p className="text-sm text-ink-muted leading-relaxed rounded-xl bg-surface border border-dashed border-line-strong p-6">
            {t('events.empty')}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {visibleEvents.map((event) => {
              const categoryLabel = categoryLabelFor(event);
              const ticketPrice = getEventTicketPrice(event);

              return (
                <article
                  key={event.id}
                  className="group flex flex-col bg-surface border border-line rounded-xl overflow-hidden transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <button
                    type="button"
                    onClick={() => setPhotoEvent(event)}
                    aria-label={t('common.enlargePhoto', { title: event.title })}
                    className="block w-full bg-surface-muted overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean"
                  >
                    <ResilientImage
                      src={event.image ?? heroImage}
                      alt={event.title}
                      fit="contain"
                    />
                  </button>
                  <div className="p-6 flex-1 flex flex-col gap-4">
                    <div className="space-y-2">
                      {categoryLabel && (
                        <p className="text-xs font-semibold text-ocean">
                          {categoryLabel}
                        </p>
                      )}
                      <h2 className="font-display text-2xl font-semibold text-ink leading-snug">
                        {event.title}
                      </h2>
                    </div>

                    <dl className="grid grid-cols-[minmax(4.5rem,auto)_1fr] gap-x-3 gap-y-2 text-sm sm:grid-cols-[6.5rem_1fr]">
                      <dt className="text-xs font-medium text-ink-muted pt-0.5">
                        {t('events.dateLabel')}
                      </dt>
                      <dd className="flex items-center gap-2 font-medium text-ink tabular-nums">
                        <CalendarDays
                          className="w-4 h-4 text-ocean shrink-0"
                          aria-hidden="true"
                        />
                        {formatEventDate(event)}
                      </dd>
                      {event.time && (
                        <>
                          <dt className="text-xs font-medium text-ink-muted pt-0.5">
                            {t('events.timeLabel')}
                          </dt>
                          <dd className="flex items-center gap-2 font-medium text-ink tabular-nums">
                            <Clock
                              className="w-4 h-4 text-ocean shrink-0"
                              aria-hidden="true"
                            />
                            {event.time}
                          </dd>
                        </>
                      )}
                      {event.location && (
                        <>
                          <dt className="text-xs font-medium text-ink-muted pt-0.5">
                            {t('events.locationLabel')}
                          </dt>
                          <dd className="flex items-center gap-2 font-medium text-ink">
                            <MapPin
                              className="w-4 h-4 text-ocean shrink-0"
                              aria-hidden="true"
                            />
                            {event.location}
                          </dd>
                        </>
                      )}
                    </dl>

                    <p className="text-sm text-ink-muted leading-relaxed">
                      {event.description}
                    </p>

                    {(event.ticketSalePoints || event.ticketsAvailable !== undefined) && (
                      <div className="space-y-1 rounded-lg bg-surface-alt border border-line p-3 text-xs text-ink-muted">
                        {event.ticketSalePoints && (
                          <p>
                            <span className="font-semibold text-ink">
                              {t('events.salePoints')} :{' '}
                            </span>
                            {event.ticketSalePoints}
                          </p>
                        )}
                        {event.ticketsAvailable !== undefined && (
                          <p className="tabular-nums">
                            {t('events.ticketsRemaining', {
                              count: event.ticketsAvailable,
                            })}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="pt-4 mt-auto border-t border-surface-alt flex items-center justify-between gap-3">
                      <span
                        className={`font-mono text-sm font-semibold tabular-nums ${
                          ticketPrice === 0 ? 'text-ocean' : 'text-ink'
                        }`}
                      >
                        {priceLabel(ticketPrice)}
                      </span>
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        {event.ticketingUrl && (
                          <a
                            href={event.ticketingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border border-line-strong text-ink hover:bg-surface-alt transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
                          >
                            {t('events.buyOnline')}
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => setTicketEvent(event)}
                          aria-label={`${t('events.bookTickets')} — ${event.title}`}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-burgundy text-white hover:bg-burgundy-hover transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
                        >
                          <span>{t('events.bookTickets')}</span>
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate('reservation')}
                      className="self-start text-xs font-medium text-ocean hover:underline cursor-pointer"
                    >
                      {t('nav.reservation')}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Organiser un événement */}
        <section
          aria-labelledby="organize-event-heading"
          className="rounded-xl bg-surface-alt border border-line p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <h2
              id="organize-event-heading"
              className="font-display text-2xl md:text-3xl font-semibold text-ink"
            >
              {t('events.organizeTitle')}
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              {t('events.organizeText')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-3 shrink-0">
            <a
              href={info.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-burgundy text-white text-sm font-medium hover:bg-burgundy-hover transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {t('events.organizeCta')}
            </a>
            <a
              href={info.phoneHref}
              aria-label={t('common.callRestaurant')}
              className="inline-flex items-center gap-2 text-sm font-medium text-ocean hover:underline whitespace-nowrap tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {info.phoneDisplay}
            </a>
          </div>
        </section>
      </div>

      {ticketEvent && (
        <TicketReservationDialog
          event={ticketEvent}
          whatsappHref={info.whatsappHref}
          onClose={() => setTicketEvent(null)}
        />
      )}

      {photoEvent && (
        <ImageLightbox
          image={photoEvent.image ?? heroImage}
          title={photoEvent.title}
          onClose={() => setPhotoEvent(null)}
        />
      )}
    </div>
  );
}
