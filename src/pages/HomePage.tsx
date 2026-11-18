import { ArrowRight, MapPin, Phone, Star, StarHalf, UtensilsCrossed } from 'lucide-react';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useLocale } from '../i18n/LocaleContext';
import { formatKmf } from '../lib/format';
import type { PageId } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { content } = useLocalizedContent();
  const { t } = useLocale();
  const { info, heroImage } = content.settings;
  const signatureDishes = content.signature.filter((dish) => dish.isVisible !== false);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="pt-8 md:pt-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between py-2 lg:py-4">
              <div className="space-y-5">
                <p className="text-xs font-medium tracking-wide text-ocean">
                  {t('home.location')}
                </p>
                <h1 className="font-display text-[clamp(2.35rem,4.2vw,3.65rem)] leading-[1.08] font-semibold tracking-tight text-ink text-balance">
                  {info.tagline}
                </h1>
                <p className="text-base text-ink-muted leading-relaxed max-w-[54ch]">
                  {t('home.intro')}
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="pt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F4C45] text-white text-sm font-medium hover:bg-[#0B3A35] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>{t('home.viewMenuBtn')}</span>
                </button>

                <a
                  href={info.phoneHref}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-line-strong bg-surface text-ink text-sm font-medium hover:bg-surface-alt transition-colors whitespace-nowrap shrink-0 tabular-nums"
                >
                  <Phone className="w-4 h-4 text-ocean" />
                  <span>{info.phoneDisplay}</span>
                </a>

                <a
                  href={info.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-ink-muted hover:text-ocean transition-colors whitespace-nowrap shrink-0"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{t('home.itineraryBtn')}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[280px] lg:min-h-[420px] rounded-xl overflow-hidden border border-line bg-surface-muted">
                <ResilientImage
                  src={heroImage}
                  alt={t('home.heroAlt')}
                  aspectClassName="aspect-[16/9] lg:aspect-auto lg:h-full"
                  className="lg:h-full"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 4-column info strip below hero split */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-line rounded-xl bg-surface divide-y sm:divide-y-0 sm:divide-x divide-line">
            <div className="p-5 space-y-1">
              <p className="text-xs text-ink-muted">{t('home.hoursLabel')}</p>
              <p className="text-sm font-semibold text-ink tabular-nums">
                {info.hoursSummary}
              </p>
            </div>
            <div className="p-5 space-y-1">
              <p className="text-xs text-ink-muted">{t('home.outdoorLabel')}</p>
              <p className="text-sm font-semibold text-ink">
                {t('home.outdoorValue')}
              </p>
            </div>
            <div className="p-5 space-y-1">
              <p className="text-xs text-ink-muted">{t('home.indoorLabel')}</p>
              <p className="text-sm font-semibold text-ink">
                {t('home.indoorValue')}
              </p>
            </div>
            <div className="p-5 space-y-1">
              <p className="text-xs text-ink-muted">{t('home.reservationLabel')}</p>
              <p className="text-sm font-semibold text-ocean tabular-nums">
                {info.phoneDisplay}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Les 3 plats phares en KMF */}
      <section aria-labelledby="plats-phares-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-5">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-ink-muted">
                {t('home.signatureKicker')}
              </p>
              <h2
                id="plats-phares-heading"
                className="font-display text-3xl md:text-4xl font-semibold text-ink text-balance"
              >
                {t('home.signatureTitle')}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ocean hover:text-ocean-hover transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{t('home.signatureAll')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {signatureDishes.map((dish) => (
              <article
                key={dish.id}
                className="group flex flex-col bg-surface border border-line rounded-xl overflow-hidden transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div className="aspect-[4/3] overflow-hidden bg-surface-muted">
                  <ResilientImage
                    src={dish.image || heroImage}
                    alt={`${dish.name} — Le New Select Moroni`}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs text-ink-muted">{dish.sectionLabel}</p>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-2xl font-semibold text-ink">
                        {dish.name}
                      </h3>
                      <span className="text-sm font-semibold text-ocean tabular-nums whitespace-nowrap shrink-0">
                        {formatKmf(dish.priceKmf)}
                      </span>
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-surface-alt flex items-center justify-between text-xs text-ink-muted">
                    <span>{t('common.preparedMinute')}</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('reservation')}
                      className="font-medium text-ocean hover:underline cursor-pointer"
                    >
                      {t('common.reserveTable')}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Avis clients certifiés TripAdvisor */}
      <section aria-labelledby="avis-tripadvisor-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-surface-alt border border-line p-6 sm:p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-line">
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-ink-muted">
                  {t('home.reviewsKicker')}
                </p>
                <h2
                  id="avis-tripadvisor-heading"
                  className="font-display text-3xl md:text-4xl font-semibold text-ink text-balance"
                >
                  {t('home.reviewsTitle')}
                </h2>
              </div>

              <div className="flex items-center gap-3 text-sm text-ink">
                <div
                  className="flex items-center gap-0.5 text-[#9A6B26]"
                  aria-label={t('home.avgRatingAria')}
                >
                  <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                  <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                  <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                  <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                  <StarHalf className="w-4 h-4 fill-current" aria-hidden="true" />
                </div>
                <span className="font-semibold tabular-nums">{t('home.avgRating')}</span>
                <span className="text-ink-muted">·</span>
                <span className="text-ink-muted">{t('home.certified')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.reviews.map((review) => (
                <article
                  key={review.id}
                  className="bg-surface border border-line rounded-xl p-6 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs text-ink-muted">
                      <span>{review.date}</span>
                      <span className="text-[#9A6B26] font-medium tabular-nums">
                        {review.rating}/5
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-ink leading-snug">
                      « {review.title} »
                    </h3>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      {review.quote}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-surface-alt space-y-0.5">
                    <p className="text-sm font-semibold text-ink">
                      {review.author}
                    </p>
                    <p className="text-xs text-ink-muted">
                      {review.origin} · {review.context}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
