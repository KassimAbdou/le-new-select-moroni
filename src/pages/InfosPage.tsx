import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, MapPin, Phone } from 'lucide-react';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useLocale } from '../i18n/LocaleContext';
import { contentTranslations } from '../i18n/content';
import type { PageId } from '../types';

interface InfosPageProps {
  onNavigate: (page: PageId) => void;
}

const DEFAULT_PAYMENT_METHODS = [
  {
    title: 'Espèces (KMF & EUR)',
    detail:
      'Règlement en Francs Comoriens (KMF) et en Euros (€) selon le taux fixe officiel (1 € = 491,97 KMF).',
  },
  {
    title: 'Cartes bancaires',
    detail:
      'Terminal de paiement acceptant les cartes Visa et Mastercard en salle et au comptoir.',
  },
  {
    title: 'Mobile Money',
    detail:
      'Paiement mobile instantané via Huri Money et MVola Comores accepté pour la salle et l’emporter.',
  },
];

export function InfosPage({ onNavigate }: InfosPageProps) {
  const { content } = useLocalizedContent();
  const { locale, t } = useLocale();
  const { info } = content.settings;
  const faqItems = content.faq.filter((item) => item.isVisible !== false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItems[0]?.id ?? null);

  useEffect(() => {
    if (faqItems.length === 0) {
      setOpenFaqId(null);
      return;
    }
    if (!openFaqId || !faqItems.some((item) => item.id === openFaqId)) {
      setOpenFaqId(faqItems[0]!.id);
    }
  }, [faqItems, openFaqId]);

  const paymentMethods = useMemo(() => {
    if (locale === 'fr') return DEFAULT_PAYMENT_METHODS;
    return contentTranslations[locale]?.paymentMethods ?? DEFAULT_PAYMENT_METHODS;
  }, [locale]);

  return (
    <div className="py-10 md:py-14 space-y-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="space-y-2 max-w-2xl border-b border-line pb-8">
          <p className="text-xs font-medium text-ocean">{t('infos.kicker')}</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink text-balance">
            {t('infos.title')}
          </h1>
          <p className="text-base text-ink-muted leading-relaxed">{t('infos.intro')}</p>
        </div>

        {/* Access & Stationnement + Takeaway & Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-surface border border-line rounded-xl p-6 sm:p-8 space-y-4">
            <p className="text-xs font-medium text-ocean">{t('infos.accessKicker')}</p>
            <h2 className="font-display text-3xl font-semibold text-ink">
              {t('infos.accessTitle')}
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">{t('infos.accessText')}</p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-sm">
              <a
                href={info.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-ocean hover:underline"
              >
                <MapPin className="w-4 h-4" />
                <span>{t('common.openItinerary')}</span>
              </a>
              <span className="text-ink-muted tabular-nums">
                11°42&apos;06&quot;S · 43°15&apos;17&quot;E
              </span>
            </div>
          </section>

          <section className="bg-surface border border-line rounded-xl p-6 sm:p-8 space-y-4">
            <p className="text-xs font-medium text-ocean">{t('infos.takeawayKicker')}</p>
            <h2 className="font-display text-3xl font-semibold text-ink">
              {t('infos.takeawayTitle')}
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">{t('infos.takeawayText')}</p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={info.phoneHref}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0F4C45] text-white text-sm font-medium hover:bg-[#0B3A35] transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4" />
                <span>{info.phoneDisplay}</span>
              </a>
              <button
                type="button"
                onClick={() => onNavigate('reservation')}
                className="text-sm font-medium text-ink hover:text-ocean transition-colors cursor-pointer"
              >
                {t('common.askGroupQuote')}
              </button>
            </div>
          </section>
        </div>

        {/* Moyens de paiement */}
        <section className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs font-medium text-ink-muted">{t('infos.paymentKicker')}</p>
            <h2 className="font-display text-3xl font-semibold text-ink">
              {t('infos.paymentTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paymentMethods.map((pm) => (
              <div
                key={pm.title}
                className="bg-surface border border-line rounded-xl p-6 space-y-2"
              >
                <h3 className="text-base font-semibold text-ink">{pm.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{pm.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Foire aux questions */}
        <section className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs font-medium text-ink-muted">{t('infos.faqKicker')}</p>
            <h2 className="font-display text-3xl font-semibold text-ink">
              {t('infos.faqTitle')}
            </h2>
          </div>

          <div className="bg-surface border border-line rounded-xl divide-y divide-line">
            {faqItems.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    id={`faq-question-${faq.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-canvas transition-colors cursor-pointer"
                  >
                    <span className="text-base font-medium text-ink">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-ink-muted shrink-0 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-ocean' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      className="px-6 pb-5 text-sm text-ink-muted leading-relaxed"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
