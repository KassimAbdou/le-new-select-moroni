import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useLocale } from '../i18n/LocaleContext';
import { IMAGES } from '../data/restaurantData';
import type { PageId } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface HistoryPageProps {
  onNavigate: (page: PageId) => void;
}

export function HistoryPage({ onNavigate }: HistoryPageProps) {
  const { content } = useLocalizedContent();
  const { t } = useLocale();
  const brigade = content.brigade.filter((member) => member.isVisible !== false);

  const pillars = [
    { number: '01.', title: t('history.pillars.0.title'), description: t('history.pillars.0.description') },
    { number: '02.', title: t('history.pillars.1.title'), description: t('history.pillars.1.description') },
    { number: '03.', title: t('history.pillars.2.title'), description: t('history.pillars.2.description') },
  ];

  return (
    <div className="py-10 md:py-14 space-y-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro Story Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-medium text-ocean">
                {t('history.kicker')}
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink leading-[1.1] text-balance">
                {t('history.title')}
              </h1>
              <div className="space-y-4 text-base text-ink-muted leading-relaxed">
                <p>{t('history.intro1')}</p>
                <p>{t('history.intro2')}</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('reservation')}
                className="px-5 py-2.5 rounded-lg bg-[#0F4C45] text-white text-sm font-medium hover:bg-[#0B3A35] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t('common.bookTable')}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="text-sm font-medium text-ink hover:text-ocean transition-colors cursor-pointer"
              >
                {t('history.discoverMenu')}
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] rounded-xl overflow-hidden border border-line bg-surface-muted">
              <ResilientImage
                src={IMAGES.salle}
                alt={t('history.heroAlt')}
                aspectClassName="aspect-[4/3] lg:aspect-auto lg:h-full"
                className="lg:h-full"
              />
            </div>
          </div>
        </section>

        {/* Three Foundations */}
        <section className="border-t border-line pt-12 space-y-8">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-ink-muted">{t('history.pillarsKicker')}</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">
              {t('history.pillarsTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <article
                key={pillar.number}
                className="bg-surface border border-line rounded-xl p-6 space-y-3"
              >
                <p className="font-mono text-xs font-medium text-ocean">
                  {pillar.number}
                </p>
                <h3 className="font-display text-2xl font-semibold text-ink">
                  {pillar.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* La Brigade et les Maîtres de rang */}
        <section className="border-t border-line pt-12 space-y-8">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-ink-muted">
              {t('history.teamKicker')}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink">
              {t('history.teamTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brigade.map((member) => (
              <article
                key={member.id}
                className="bg-surface border border-line rounded-xl p-6 space-y-2.5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    {member.name}
                  </h3>
                  <span className="text-xs text-ink-muted">{member.tenure}</span>
                </div>
                <p className="text-xs font-semibold text-ocean">{member.role}</p>
                <p className="text-sm text-ink-muted leading-relaxed pt-1">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
