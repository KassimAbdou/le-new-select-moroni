import { useState } from 'react';
import { ChevronDown, MapPin, Phone } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';
import type { PageId } from '../types';

interface InfosPageProps {
  onNavigate: (page: PageId) => void;
}

const PAYMENT_METHODS = [
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
  const { content } = useSiteContent();
  const { info } = content.settings;
  const faqItems = content.faq.filter((item) => item.isVisible !== false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <div className="py-10 md:py-14 space-y-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="space-y-2 max-w-2xl border-b border-[#E2E6DF] pb-8">
          <p className="text-xs font-medium text-[#0F4C45]">
            Informations Pratiques · Moroni
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#151A19] text-balance">
            Préparer votre venue au New Select
          </h1>
          <p className="text-base text-[#4A5552] leading-relaxed">
            Accès, stationnement autour de la Place de France, moyens de paiement et
            réponses aux questions fréquentes.
          </p>
        </div>

        {/* Access & Stationnement + Takeaway & Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white border border-[#E2E6DF] rounded-xl p-6 sm:p-8 space-y-4">
            <p className="text-xs font-medium text-[#0F4C45]">
              01. Accès & Stationnement
            </p>
            <h2 className="font-display text-3xl font-semibold text-[#151A19]">
              Aux abords de la Place de France
            </h2>
            <p className="text-sm text-[#4A5552] leading-relaxed">
              Situé en plein centre-ville de Moroni, le restaurant est accessible à pied
              depuis les ministères, banques, ambassades et le port. Des places de
              stationnement public longent la Place de France et la rue adjacente, à moins
              de cinquante mètres de l’entrée de la terrasse.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-sm">
              <a
                href={info.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[#0F4C45] hover:underline"
              >
                <MapPin className="w-4 h-4" />
                <span>Itinéraire GPS Place de France</span>
              </a>
              <span className="text-[#4A5552] tabular-nums">
                11°42&apos;06&quot;S · 43°15&apos;17&quot;E
              </span>
            </div>
          </section>

          <section className="bg-white border border-[#E2E6DF] rounded-xl p-6 sm:p-8 space-y-4">
            <p className="text-xs font-medium text-[#0F4C45]">02. À emporter & Groupes</p>
            <h2 className="font-display text-3xl font-semibold text-[#151A19]">
              Vente à emporter et grandes tables
            </h2>
            <p className="text-sm text-[#4A5552] leading-relaxed">
              Tous les plats de la carte peuvent être commandés à emporter pour vos
              bureaux ou votre domicile en appelant vingt minutes avant votre passage.
              Pour les groupes de 8 à 30 couverts (déjeuners officiels, réunions, dîners
              familiaux), nous privatisons une zone de la salle climatisée ou de la
              terrasse.
            </p>
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
                className="text-sm font-medium text-[#151A19] hover:text-[#0F4C45] transition-colors cursor-pointer"
              >
                Demander un devis groupe
              </button>
            </div>
          </section>
        </div>

        {/* Moyens de paiement */}
        <section className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs font-medium text-[#4A5552]">
              Règlement sur place ou à emporter
            </p>
            <h2 className="font-display text-3xl font-semibold text-[#151A19]">
              Moyens de paiement acceptés
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAYMENT_METHODS.map((pm) => (
              <div
                key={pm.title}
                className="bg-white border border-[#E2E6DF] rounded-xl p-6 space-y-2"
              >
                <h3 className="text-base font-semibold text-[#151A19]">{pm.title}</h3>
                <p className="text-sm text-[#4A5552] leading-relaxed">{pm.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Foire aux questions */}
        <section className="space-y-6">
          <div className="space-y-1">
            <p className="text-xs font-medium text-[#4A5552]">
              Services en salle et en terrasse
            </p>
            <h2 className="font-display text-3xl font-semibold text-[#151A19]">
              Foire aux questions
            </h2>
          </div>

          <div className="bg-white border border-[#E2E6DF] rounded-xl divide-y divide-[#E2E6DF]">
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
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-[#F8F9F7] transition-colors cursor-pointer"
                  >
                    <span className="text-base font-medium text-[#151A19]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#4A5552] shrink-0 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-[#0F4C45]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      className="px-6 pb-5 text-sm text-[#4A5552] leading-relaxed"
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
