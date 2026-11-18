import AdminPage from './admin/AdminPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SiteContentProvider } from './context/SiteContentContext';
import { useHashRoute } from './hooks/useHashRoute';
import { LocaleProvider, useLocale } from './i18n/LocaleContext';
import { ThemeProvider } from './theme/ThemeContext';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { HistoryPage } from './pages/HistoryPage';
import { HomePage } from './pages/HomePage';
import { InfosPage } from './pages/InfosPage';
import { MenuPage } from './pages/MenuPage';
import { ReservationPage } from './pages/ReservationPage';

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <SiteContentProvider>
          <AppShell />
        </SiteContentProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

function AppShell() {
  const { page, navigate } = useHashRoute();
  const { t } = useLocale();

  if (page === 'admin') {
    return <AdminPage onNavigate={navigate} />;
  }

  return (
    <ErrorBoundary>
      <button
        type="button"
        onClick={() => document.getElementById('contenu')?.focus()}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-burgundy focus:text-white no-print focus:outline-2 focus:outline-offset-2 focus:outline-ink"
      >
        {t('nav.skipToContent')}
      </button>

      <div className="min-h-screen flex flex-col bg-canvas text-ink transition-colors">
        <Header activePage={page} onNavigate={navigate} />

        <main id="contenu" className="flex-1" tabIndex={-1}>
          {page === 'accueil' && <HomePage onNavigate={navigate} />}
          {(page === 'menu' || page === 'pizzas' || page === 'plats-du-jour') && (
            <MenuPage
              key={page}
              onNavigate={navigate}
              focus={
                page === 'pizzas'
                  ? 'pizzas'
                  : page === 'plats-du-jour'
                    ? 'daily-specials'
                    : undefined
              }
            />
          )}
          {page === 'histoire' && <HistoryPage onNavigate={navigate} />}
          {page === 'galerie' && <GalleryPage />}
          {page === 'evenements' && <EventsPage onNavigate={navigate} />}
          {page === 'reservation' && <ReservationPage />}
          {page === 'infos' && <InfosPage onNavigate={navigate} />}
        </main>

        <p className="sr-only" role="status" aria-live="polite">
          {t(`pages.${page}`)}
        </p>

        <Footer onNavigate={navigate} />
      </div>
    </ErrorBoundary>
  );
}
