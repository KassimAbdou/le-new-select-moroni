import { useCallback, useEffect, useState } from 'react';
import type { PageId } from '../types';

export type RouteId = PageId | 'admin';

export const PAGES: readonly PageId[] = [
  'accueil',
  'menu',
  'histoire',
  'galerie',
  'reservation',
  'infos',
];

const ROUTES: readonly RouteId[] = [...PAGES, 'admin'];

export const PAGE_TITLES: Record<RouteId, string> = {
  accueil: 'Accueil',
  menu: 'La Carte & Menus',
  histoire: 'Notre Histoire',
  galerie: 'Galerie Photo',
  reservation: 'Réservation & Contact',
  infos: 'Informations Pratiques',
  admin: 'Administration',
};

function readPageFromHash(): RouteId {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  return ROUTES.find((route) => route === hash) ?? 'accueil';
}

/**
 * Navigation par hash, compatible avec les boutons précédent/suivant du
 * navigateur (`hashchange` ET `popstate`) et avec les liens profonds.
 */
export function useHashRoute() {
  const [page, setPage] = useState<RouteId>(readPageFromHash);

  useEffect(() => {
    const syncFromUrl = () => setPage(readPageFromHash());
    window.addEventListener('hashchange', syncFromUrl);
    window.addEventListener('popstate', syncFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncFromUrl);
      window.removeEventListener('popstate', syncFromUrl);
    };
  }, []);

  useEffect(() => {
    document.title = `${PAGE_TITLES[page]} — Le New Select · Moroni`;
  }, [page]);

  const navigate = useCallback((nextPage: RouteId) => {
    if (readPageFromHash() !== nextPage) {
      // L'affectation du hash pousse une entrée dans l'historique et déclenche
      // `hashchange`, contrairement à history.pushState utilisé auparavant.
      window.location.hash = nextPage;
    }
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { page, navigate };
}
