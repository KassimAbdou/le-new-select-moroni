import { ArrowRight, MapPin, Phone, Star, StarHalf, UtensilsCrossed } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';
import { formatKmf } from '../lib/format';
import type { PageId } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { content } = useSiteContent();
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
                <p className="text-xs font-medium tracking-wide text-[#0F4C45]">
                  Place de France · Moroni, Grande Comore
                </p>
                <h1 className="font-display text-[clamp(2.35rem,4.2vw,3.65rem)] leading-[1.08] font-semibold tracking-tight text-[#151A19] text-balance">
                  {info.tagline}
                </h1>
                <p className="text-base text-[#4A5552] leading-relaxed max-w-[54ch]">
                  Du café matinal dès 07h00 aux dîners sous les arbres de la Place de
                  France, Le New Select marie la tradition bistrot aux pêches fraîches et
                  épices de l’océan Indien.
                </p>
              </div>

              {/* Quick Action Buttons */}
              <div className="pt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0F4C45] text-white text-sm font-medium hover:bg-[#0B3A35] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C45]"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Voir la Carte</span>
                </button>

                <a
                  href={info.phoneHref}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#D4DAD0] bg-white text-[#151A19] text-sm font-medium hover:bg-[#F1F3EF] transition-colors whitespace-nowrap shrink-0 tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#0F4C45]" />
                  <span>{info.phoneDisplay}</span>
                </a>

                <a
                  href={info.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-[#4A5552] hover:text-[#0F4C45] transition-colors whitespace-nowrap shrink-0"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Itinéraire Place de France</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[280px] lg:min-h-[420px] rounded-xl overflow-hidden border border-[#E2E6DF] bg-[#EBF0EB]">
                <ResilientImage
                  src={heroImage}
                  alt="Terrasse ombragée du restaurant Le New Select sur la Place de France à Moroni"
                  aspectClassName="aspect-[16/9] lg:aspect-auto lg:h-full"
                  className="lg:h-full"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 4-column info strip below hero split */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#E2E6DF] rounded-xl bg-white divide-y sm:divide-y-0 sm:divide-x divide-[#E2E6DF]">
            <div className="p-5 space-y-1">
              <p className="text-xs text-[#4A5552]">Horaires d’ouverture</p>
              <p className="text-sm font-semibold text-[#151A19] tabular-nums">
                {info.hoursSummary}
              </p>
            </div>
            <div className="p-5 space-y-1">
              <p className="text-xs text-[#4A5552]">Cadre extérieur</p>
              <p className="text-sm font-semibold text-[#151A19]">
                Terrasse sous les badamiers
              </p>
            </div>
            <div className="p-5 space-y-1">
              <p className="text-xs text-[#4A5552]">Confort intérieur</p>
              <p className="text-sm font-semibold text-[#151A19]">
                Salle climatisée & Wi-Fi
              </p>
            </div>
            <div className="p-5 space-y-1">
              <p className="text-xs text-[#4A5552]">Réservation & emporter</p>
              <p className="text-sm font-semibold text-[#0F4C45] tabular-nums">
                {info.phoneDisplay}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Les 3 plats phares en KMF */}
      <section aria-labelledby="plats-phares-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E6DF] pb-5">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-[#4A5552]">
                Sélection de la maison · Tarifs en Francs Comoriens
              </p>
              <h2
                id="plats-phares-heading"
                className="font-display text-3xl md:text-4xl font-semibold text-[#151A19] text-balance"
              >
                Les trois plats phares
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0F4C45] hover:text-[#0B3A35] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Consulter toute la carte</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {signatureDishes.map((dish) => (
              <article
                key={dish.id}
                className="group flex flex-col bg-white border border-[#E2E6DF] rounded-xl overflow-hidden transition-transform duration-150 hover:-translate-y-0.5"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#EBF0EB]">
                  <ResilientImage
                    src={dish.image || heroImage}
                    alt={`${dish.name} — Le New Select Moroni`}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs text-[#4A5552]">{dish.sectionLabel}</p>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-2xl font-semibold text-[#151A19]">
                        {dish.name}
                      </h3>
                      <span className="text-sm font-semibold text-[#0F4C45] tabular-nums whitespace-nowrap shrink-0">
                        {formatKmf(dish.priceKmf)}
                      </span>
                    </div>
                    <p className="text-sm text-[#4A5552] leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#F1F3EF] flex items-center justify-between text-xs text-[#4A5552]">
                    <span>Préparé minute</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('reservation')}
                      className="font-medium text-[#0F4C45] hover:underline cursor-pointer"
                    >
                      Réserver une table
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
          <div className="rounded-xl bg-[#F1F3EF] border border-[#E2E6DF] p-6 sm:p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E2E6DF]">
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-[#4A5552]">
                  Retours vérifiés · TripAdvisor Moroni
                </p>
                <h2
                  id="avis-tripadvisor-heading"
                  className="font-display text-3xl md:text-4xl font-semibold text-[#151A19] text-balance"
                >
                  Avis de nos hôtes et voyageurs
                </h2>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#151A19]">
                <div
                  className="flex items-center gap-0.5 text-[#9A6B26]"
                  aria-label="Note moyenne : 4,6 sur 5"
                >
                  <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                  <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                  <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                  <Star className="w-4 h-4 fill-current" aria-hidden="true" />
                  <StarHalf className="w-4 h-4 fill-current" aria-hidden="true" />
                </div>
                <span className="font-semibold tabular-nums">4,6 / 5</span>
                <span className="text-[#4A5552]">·</span>
                <span className="text-[#4A5552]">Avis certifiés TripAdvisor</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.reviews.map((review) => (
                <article
                  key={review.id}
                  className="bg-white border border-[#E2E6DF] rounded-xl p-6 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs text-[#4A5552]">
                      <span>{review.date}</span>
                      <span className="text-[#9A6B26] font-medium tabular-nums">
                        {review.rating}/5
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#151A19] leading-snug">
                      « {review.title} »
                    </h3>
                    <p className="text-sm text-[#4A5552] leading-relaxed">
                      {review.quote}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F1F3EF] space-y-0.5">
                    <p className="text-sm font-semibold text-[#151A19]">
                      {review.author}
                    </p>
                    <p className="text-xs text-[#4A5552]">
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
