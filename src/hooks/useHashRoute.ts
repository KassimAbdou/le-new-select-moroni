import { useCallback, useEffect, useState } from 'react';
import type { PageId } from '../types';
import { useLocale } from '../i18n/LocaleContext';

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
  const { t } = useLocale();

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
    document.title = `${t(`pages.${page}`)} — Le New Select · Moroni`;
  }, [page, t]);

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
