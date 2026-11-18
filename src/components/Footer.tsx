import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useLocale } from '../i18n/LocaleContext';
import type { RouteId } from '../hooks/useHashRoute';

interface FooterProps {
  onNavigate: (page: RouteId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { content } = useLocalizedContent();
  const { t } = useLocale();
  const { info } = content.settings;
  const handleLink = (e: React.MouseEvent, page: RouteId) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="no-print border-t border-line bg-surface-alt">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-line">
          <div className="md:col-span-5 space-y-3">
            <p className="font-display text-2xl font-semibold text-ink">
              {info.name}
            </p>
            <p className="text-sm text-ink-muted max-w-sm leading-relaxed">
              {info.tagline}. {t('footer.description')}
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <p className="text-xs font-semibold tracking-wide text-ink-muted">
              {t('footer.navigation')}
            </p>
            <ul className="space-y-2 text-sm text-ink">
              <li>
                <a href="#accueil" onClick={(e) => handleLink(e, 'accueil')} className="hover:text-ocean transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => handleLink(e, 'menu')} className="hover:text-ocean transition-colors">
                  {t('footer.menuLink')}
                </a>
              </li>
              <li>
                <a href="#histoire" onClick={(e) => handleLink(e, 'histoire')} className="hover:text-ocean transition-colors">
                  {t('footer.historyLink')}
                </a>
              </li>
              <li>
                <a href="#galerie" onClick={(e) => handleLink(e, 'galerie')} className="hover:text-ocean transition-colors">
                  {t('footer.galleryLink')}
                </a>
              </li>
              <li>
                <a href="#reservation" onClick={(e) => handleLink(e, 'reservation')} className="hover:text-ocean transition-colors">
                  {t('footer.reservationLink')}
                </a>
              </li>
              <li>
                <a href="#infos" onClick={(e) => handleLink(e, 'infos')} className="hover:text-ocean transition-colors">
                  {t('footer.infosLink')}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-sm">
            <p className="text-xs font-semibold tracking-wide text-ink-muted">
              {t('footer.location')}
            </p>
            <p className="text-ink">{info.address}</p>
            <p className="text-ink-muted">{info.hoursSummary}</p>
            <p className="pt-1">
              <a href={info.phoneHref} className="font-medium text-ocean hover:underline tabular-nums">
                {info.phoneDisplay}
              </a>
            </p>
            <p>
              <a
                href={info.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-ink-muted hover:text-ink underline underline-offset-4"
              >
                {t('footer.openItinerary')}
              </a>
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-ink-muted">
          <p>{t('footer.rights', { year: new Date().getFullYear(), name: info.name })}</p>
          <div className="flex flex-col sm:items-end gap-1">
            <p>{t('footer.taglineLine')}</p>
            <a
              href="#admin"
              onClick={(event) => {
                event.preventDefault();
                onNavigate('admin');
              }}
              className="text-ink-muted hover:text-ocean underline underline-offset-4"
            >
              {t('footer.ownerSpace')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
