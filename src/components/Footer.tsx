import { useSiteContent } from '../hooks/useSiteContent';
import type { RouteId } from '../hooks/useHashRoute';

interface FooterProps {
  onNavigate: (page: RouteId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { content } = useSiteContent();
  const { info } = content.settings;
  const handleLink = (e: React.MouseEvent, page: RouteId) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="no-print border-t border-[#E2E6DF] bg-[#F1F3EF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#E2E6DF]">
          <div className="md:col-span-5 space-y-3">
            <p className="font-display text-2xl font-semibold text-[#151A19]">
              {info.name}
            </p>
            <p className="text-sm text-[#4A5552] max-w-sm leading-relaxed">
              {info.tagline}. Une maison ouverte chaque jour sur la Place de France, entre
              produits frais de l’océan Indien et savoir-faire bistrot.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <p className="text-xs font-semibold tracking-wide text-[#4A5552]">
              Navigation
            </p>
            <ul className="space-y-2 text-sm text-[#151A19]">
              <li>
                <a
                  href="#accueil"
                  onClick={(e) => handleLink(e, 'accueil')}
                  className="hover:text-[#0F4C45] transition-colors"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  onClick={(e) => handleLink(e, 'menu')}
                  className="hover:text-[#0F4C45] transition-colors"
                >
                  La Carte & Menus
                </a>
              </li>
              <li>
                <a
                  href="#histoire"
                  onClick={(e) => handleLink(e, 'histoire')}
                  className="hover:text-[#0F4C45] transition-colors"
                >
                  Notre Histoire
                </a>
              </li>
              <li>
                <a
                  href="#galerie"
                  onClick={(e) => handleLink(e, 'galerie')}
                  className="hover:text-[#0F4C45] transition-colors"
                >
                  Galerie Photo
                </a>
              </li>
              <li>
                <a
                  href="#reservation"
                  onClick={(e) => handleLink(e, 'reservation')}
                  className="hover:text-[#0F4C45] transition-colors"
                >
                  Réservation & Contact
                </a>
              </li>
              <li>
                <a
                  href="#infos"
                  onClick={(e) => handleLink(e, 'infos')}
                  className="hover:text-[#0F4C45] transition-colors"
                >
                  Informations Pratiques
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-sm">
            <p className="text-xs font-semibold tracking-wide text-[#4A5552]">
              Moroni · Place de France
            </p>
            <p className="text-[#151A19]">{info.address}</p>
            <p className="text-[#4A5552]">{info.hoursSummary}</p>
            <p className="pt-1">
              <a
                href={info.phoneHref}
                className="font-medium text-[#0F4C45] hover:underline tabular-nums"
              >
                {info.phoneDisplay}
              </a>
            </p>
            <p>
              <a
                href={info.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#4A5552] hover:text-[#151A19] underline underline-offset-4"
              >
                Ouvrir l’itinéraire Place de France
              </a>
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#4A5552]">
          <p>
            © {new Date().getFullYear()} {info.name} · Moroni, Union des Comores
          </p>
          <div className="flex flex-col sm:items-end gap-1">
            <p>Terrasse ombragée · Salle climatisée · Vente à emporter</p>
            <a
              href="#admin"
              onClick={(event) => {
                event.preventDefault();
                onNavigate('admin');
              }}
              className="text-[#4A5552] hover:text-[#0F4C45] underline underline-offset-4"
            >
              Espace propriétaire
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
