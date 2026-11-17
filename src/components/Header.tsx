import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { PageId } from '../types';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_LINKS: { id: PageId; label: string }[] = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'menu', label: 'Menu' },
  { id: 'histoire', label: 'Histoire' },
  { id: 'galerie', label: 'Galerie' },
  { id: 'infos', label: 'Infos pratiques' },
];

export function Header({ activePage, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <header className="no-print sticky top-0 z-40 bg-[#F8F9F7]/95 backdrop-blur-sm border-b border-[#E2E6DF]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#accueil"
          onClick={(e) => {
            e.preventDefault();
            handleNav('accueil');
          }}
          className="font-display text-2xl font-semibold tracking-tight text-[#151A19] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F4C45]"
        >
          Le New Select
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_LINKS.map((item) => {
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
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F4C45] ${
                  isActive ? 'text-[#0F4C45]' : 'text-[#4A5552] hover:text-[#151A19]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#0F4C45]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('reservation')}
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C45] ${
              activePage === 'reservation'
                ? 'bg-[#151A19] text-white'
                : 'bg-[#0F4C45] text-white hover:bg-[#0B3A35]'
            }`}
          >
            Réserver
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="navigation-mobile"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E2E6DF] text-[#151A19] hover:bg-[#F1F3EF] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileOpen && (
        <nav
          id="navigation-mobile"
          aria-label="Navigation mobile"
          className="md:hidden border-t border-[#E2E6DF] bg-[#F8F9F7] px-4 py-3 space-y-1"
        >
          {NAV_LINKS.map((item) => {
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
                  isActive
                    ? 'bg-[#0F4C45]/10 text-[#0F4C45]'
                    : 'text-[#151A19] hover:bg-[#F1F3EF]'
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
                ? 'bg-[#0F4C45]/10 text-[#0F4C45]'
                : 'text-[#151A19] hover:bg-[#F1F3EF]'
            }`}
          >
            Réservation & Contact
          </a>
        </nav>
      )}
    </header>
  );
}
