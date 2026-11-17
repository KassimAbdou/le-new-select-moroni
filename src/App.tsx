import AdminPage from './admin/AdminPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SiteContentProvider } from './context/SiteContentContext';
import { useHashRoute, PAGE_TITLES } from './hooks/useHashRoute';
import { GalleryPage } from './pages/GalleryPage';
import { HistoryPage } from './pages/HistoryPage';
import { HomePage } from './pages/HomePage';
import { InfosPage } from './pages/InfosPage';
import { MenuPage } from './pages/MenuPage';
import { ReservationPage } from './pages/ReservationPage';

export default function App() {
  return (
    <SiteContentProvider>
      <AppShell />
    </SiteContentProvider>
  );
}

function AppShell() {
  const { page, navigate } = useHashRoute();

  if (page === 'admin') {
    return <AdminPage onNavigate={navigate} />;
  }

  return (
    <ErrorBoundary>
      <button
        type="button"
        onClick={() => document.getElementById('contenu')?.focus()}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#0F4C45] focus:text-white no-print focus:outline-2 focus:outline-offset-2 focus:outline-[#151A19]"
      >
        Aller au contenu
      </button>

      <div className="min-h-screen flex flex-col bg-[#F8F9F7] text-[#151A19]">
        <Header activePage={page} onNavigate={navigate} />

        <main id="contenu" className="flex-1" tabIndex={-1}>
          {page === 'accueil' && <HomePage onNavigate={navigate} />}
          {page === 'menu' && <MenuPage onNavigate={navigate} />}
          {page === 'histoire' && <HistoryPage onNavigate={navigate} />}
          {page === 'galerie' && <GalleryPage />}
          {page === 'reservation' && <ReservationPage />}
          {page === 'infos' && <InfosPage onNavigate={navigate} />}
        </main>

        <p className="sr-only" role="status" aria-live="polite">
          {PAGE_TITLES[page]}
        </p>

        <Footer onNavigate={navigate} />
      </div>
    </ErrorBoundary>
  );
}
