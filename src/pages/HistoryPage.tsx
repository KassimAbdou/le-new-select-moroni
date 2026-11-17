import { useSiteContent } from '../hooks/useSiteContent';
import { IMAGES } from '../data/restaurantData';
import type { PageId } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface HistoryPageProps {
  onNavigate: (page: PageId) => void;
}

const PILLARS = [
  {
    number: '01.',
    title: 'Esprit bistrot français',
    description:
      'Cuissons précises, sauces montées au beurre, fonds réduits sur place et accueil attentif : une rigueur culinaire héritée de la brasserie traditionnelle.',
  },
  {
    number: '02.',
    title: 'Produits frais de l’océan Indien',
    description:
      'Capitaine, thon jaune, mérou et langoustes proviennent des débarquements matinaux des pêcheurs de Moroni, Itsandra et Mitsamiouli.',
  },
  {
    number: '03.',
    title: 'Approvisionnements locaux de Ngazidja',
    description:
      'Vanille Bourbon, poivre vert, girofle, combava, brèdes et manioc des hauteurs du Karthala signent chaque assiette d’une identité comorienne.',
  },
];

export function HistoryPage({ onNavigate }: HistoryPageProps) {
  const { content } = useSiteContent();
  const brigade = content.brigade.filter((member) => member.isVisible !== false);

  return (
    <div className="py-10 md:py-14 space-y-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro Story Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-medium text-[#0F4C45]">
                Notre Histoire · Moroni, Place de France
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#151A19] leading-[1.1] text-balance">
                Une table ouverte sur la Place de France
              </h1>
              <div className="space-y-4 text-base text-[#4A5552] leading-relaxed">
                <p>
                  Installé face aux arcades historiques de la Place de France, Le New
                  Select s’est imposé au fil des années comme un point de rencontre
                  familier au cœur de Moroni. On s’y retrouve dès sept heures du matin
                  pour un café serré avant d’ouvrir les bureaux, pour un déjeuner
                  d’affaires en salle climatisée ou pour un dîner paisible sous l’ombre
                  des badamiers.
                </p>
                <p>
                  Notre maison défend une cuisine lisible et sincère : des techniques
                  bistrot françaises appliquées avec exigence aux trésors maritimes et
                  agricoles de Grande Comore.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('reservation')}
                className="px-5 py-2.5 rounded-lg bg-[#0F4C45] text-white text-sm font-medium hover:bg-[#0B3A35] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Réserver une table
              </button>
              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="text-sm font-medium text-[#151A19] hover:text-[#0F4C45] transition-colors cursor-pointer"
              >
                Découvrir la carte
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] rounded-xl overflow-hidden border border-[#E2E6DF] bg-[#EBF0EB]">
              <ResilientImage
                src={IMAGES.salle}
                alt="Salle climatisée et boiseries du restaurant Le New Select à Moroni"
                aspectClassName="aspect-[4/3] lg:aspect-auto lg:h-full"
                className="lg:h-full"
              />
            </div>
          </div>
        </section>

        {/* Three Foundations */}
        <section className="border-t border-[#E2E6DF] pt-12 space-y-8">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-[#4A5552]">Philosophie culinaire</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#151A19]">
              Nos trois fondations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar) => (
              <article
                key={pillar.number}
                className="bg-white border border-[#E2E6DF] rounded-xl p-6 space-y-3"
              >
                <p className="font-mono text-xs font-medium text-[#0F4C45]">
                  {pillar.number}
                </p>
                <h3 className="font-display text-2xl font-semibold text-[#151A19]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#4A5552] leading-relaxed">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* La Brigade et les Maîtres de rang */}
        <section className="border-t border-[#E2E6DF] pt-12 space-y-8">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-[#4A5552]">
              Équipe en cuisine et en salle
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#151A19]">
              La brigade et les maîtres de rang
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {brigade.map((member) => (
              <article
                key={member.id}
                className="bg-white border border-[#E2E6DF] rounded-xl p-6 space-y-2.5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl font-semibold text-[#151A19]">
                    {member.name}
                  </h3>
                  <span className="text-xs text-[#4A5552]">{member.tenure}</span>
                </div>
                <p className="text-xs font-semibold text-[#0F4C45]">{member.role}</p>
                <p className="text-sm text-[#4A5552] leading-relaxed pt-1">
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
