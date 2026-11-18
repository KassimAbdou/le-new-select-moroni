import { useEffect, useState } from 'react';
import { CalendarDays, Globe, Menu, Moon, Sun, X } from 'lucide-react';
import type { PageId } from '../types';
import { useLocale } from '../i18n/LocaleContext';
import { LOCALES, LOCALE_META } from '../i18n/types';
import { useTheme } from '../theme/ThemeContext';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export function Header({ activePage, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const { theme, toggleTheme } = useTheme();

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'accueil', label: t('nav.home') },
    { id: 'menu', label: t('nav.menu') },
    { id: 'pizzas', label: t('nav.pizzas') },
    { id: 'plats-du-jour', label: t('nav.dailySpecials') },
    { id: 'histoire', label: t('nav.history') },
    { id: 'galerie', label: t('nav.gallery') },
    { id: 'evenements', label: t('nav.events') },
    { id: 'infos', label: t('nav.infos') },
  ];

  const handleNav = (page: PageId) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const LanguageSwitcher = ({ mobile = false }: { mobile?: boolean }) => (
    <label className={`inline-flex items-center gap-1.5 ${mobile ? 'w-full' : ''}`}>
      <Globe className="w-4 h-4 text-ink-muted" aria-hidden="true" />
      <span className="sr-only">
        {locale === 'fr'
          ? 'Langue'
          : locale === 'ar'
            ? 'اللغة'
            : locale === 'sw'
              ? 'Lugha'
              : 'Language'}
      </span>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as typeof locale)}
        className={`bg-surface border border-line-strong rounded-lg px-2 py-1.5 text-xs font-medium text-ink focus:outline-2 focus:outline-ocean cursor-pointer ${mobile ? 'flex-1' : ''}`}
        aria-label={
          locale === 'fr'
            ? 'Choisir la langue'
            : locale === 'ar'
              ? 'اختر اللغة'
              : locale === 'sw'
                ? 'Chagua lugha'
                : 'Select language'
        }
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_META[code].nativeLabel}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <header className="no-print sticky top-0 z-40 bg-canvas/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#accueil"
          onClick={(e) => {
            e.preventDefault();
            handleNav('accueil');
          }}
          className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-ink whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean"
        >
          Le New Select
        </a>

        {/* Zone 2: concise single-line text navigation links */}
        <nav
          aria-label={t('nav.mainAria')}
          className="hidden lg:flex items-center gap-3 xl:gap-5 min-w-0 overflow-x-auto no-scrollbar"
        >
          {navLinks.map((item) => {
            const isActive = activePage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-xs xl:text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean ${
                  isActive ? 'text-ocean' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-ocean"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')
              }
              title={theme === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-line-strong bg-surface text-ink hover:bg-surface-alt transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            onClick={() => handleNav('reservation')}
            aria-label={t('nav.reservation')}
            className={`inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean ${
              activePage === 'reservation'
                ? 'bg-ink text-canvas'
                : 'bg-burgundy text-white hover:bg-burgundy-hover'
            }`}
          >
            <CalendarDays className="w-4 h-4 sm:hidden" aria-hidden="true" />
            <span className="hidden sm:inline">{t('nav.reservation')}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="navigation-mobile"
            aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-line text-ink hover:bg-surface-alt transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileOpen && (
        <nav
          id="navigation-mobile"
          aria-label={t('nav.mobileAria')}
          className="lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-canvas px-4 py-3 space-y-2"
        >
          <div className="pb-2 border-b border-line space-y-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full inline-flex items-center justify-between gap-3 px-3 py-2 rounded-lg border border-line-strong bg-surface text-ink hover:bg-surface-alt transition-colors cursor-pointer"
              aria-label={
                theme === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')
              }
            >
              <span className="text-sm font-medium">
                {theme === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')}
              </span>
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <LanguageSwitcher mobile />
          </div>
          {navLinks.map((item) => {
            const isActive = activePage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-ocean/10 text-ocean' : 'text-ink hover:bg-surface-alt'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="#reservation"
            onClick={(e) => {
              e.preventDefault();
              handleNav('reservation');
            }}
            className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activePage === 'reservation'
                ? 'bg-ocean/10 text-ocean'
                : 'text-ink hover:bg-surface-alt'
            }`}
          >
            {t('nav.reservationContact')}
          </a>
        </nav>
      )}
    </header>
  );
}
