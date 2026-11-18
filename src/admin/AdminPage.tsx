import { useCallback, useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Globe,
  LogOut,
  Moon,
  ShieldCheck,
  Sun,
} from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';
import { SUPABASE_URL, isSupabaseConfigured } from '../lib/supabase';
import type { PageId } from '../types';
import {
  BrigadeEditor,
  ClientRecordsEditor,
  DailySpecialsEditor,
  DashboardOverview,
  EventsEditor,
  FaqEditor,
  GalleryEditor,
  MediaLibrary,
  MenuCategoriesEditor,
  MenuEditor,
  SettingsEditor,
} from './AdminEditors';
import { Notice, inputClass, primaryButtonClass } from './ui';
import { useAdminSession } from './useAdminSession';
import { useLocale } from '../i18n/LocaleContext';
import { useTheme } from '../theme/ThemeContext';
import { LOCALES, LOCALE_META } from '../i18n/types';

type Tab =
  | 'tableau'
  | 'plats'
  | 'menuCategories'
  | 'dailySpecials'
  | 'evenements'
  | 'infos'
  | 'galerie'
  | 'equipe'
  | 'faq'
  | 'medias'
  | 'clients';

const TAB_IDS: Tab[] = [
  'tableau',
  'plats',
  'menuCategories',
  'dailySpecials',
  'evenements',
  'infos',
  'galerie',
  'equipe',
  'faq',
  'medias',
  'clients',
];

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { locale, setLocale, t } = useLocale();
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="bg-basalt text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 min-h-16 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-white/80" aria-hidden="true" />
            <span className="font-display text-xl font-semibold">
              Le New Select{' '}
              <span className="text-white/60 font-sans text-sm">
                · {t('dashboard.title')}
              </span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')
              }
              title={theme === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4" aria-hidden="true" />
              )}
            </button>
            <label className="inline-flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-white/70" aria-hidden="true" />
              <span className="sr-only">Language</span>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as typeof locale)}
                className="bg-white/10 border border-white/20 rounded-lg px-2 py-1.5 text-xs font-medium text-white focus:outline-2 focus:outline-white/50 cursor-pointer"
                aria-label="Language"
              >
                {LOCALES.map((code) => (
                  <option key={code} value={code} className="text-ink bg-surface">
                    {LOCALE_META[code].nativeLabel}
                  </option>
                ))}
              </select>
            </label>
            <a
              href="#accueil"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              {t('dashboard.backToSite')}
            </a>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

function SetupScreen() {
  const { t } = useLocale();
  return (
    <AdminLayout>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="font-display text-4xl font-semibold text-ink">
          {t('dashboard.setup.title')}
        </h1>
        <div className="mt-6 space-y-5">
          <Notice>{t('dashboard.setup.notice')}</Notice>
          <div className="bg-surface border border-line rounded-xl p-6 space-y-4">
            <p className="text-sm font-medium text-ink">
              {t('dashboard.setup.varsTitle')}
            </p>
            <pre className="bg-surface-alt rounded-lg p-4 text-xs overflow-x-auto">
              {`VITE_SUPABASE_URL=${SUPABASE_URL}\nVITE_SUPABASE_ANON_KEY=la_cle_anon_du_projet`}
            </pre>
            <p className="text-sm text-ink-muted leading-relaxed">
              {t('dashboard.setup.help')}
            </p>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}

function LoginScreen({
  error,
  onSubmit,
}: {
  error: string | null;
  onSubmit: (email: string, password: string) => Promise<string | null>;
}) {
  const { t } = useLocale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <AdminLayout>
      <main className="max-w-md mx-auto px-4 py-14">
        <div className="bg-surface border border-line rounded-xl p-7 space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-ocean">
              {t('dashboard.login.kicker')}
            </p>
            <h1 className="font-display text-3xl font-semibold text-ink">
              {t('dashboard.login.title')}
            </h1>
            <p className="text-sm text-ink-muted">{t('dashboard.login.intro')}</p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setBusy(true);
              setMessage(null);
              void onSubmit(email, password).then((failure) => {
                setMessage(failure);
                setBusy(false);
              });
            }}
          >
            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="block text-sm font-medium">
                {t('dashboard.login.email')}
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                className={inputClass}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="block text-sm font-medium">
                {t('dashboard.login.password')}
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                className={inputClass}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {(message || error) && <Notice tone="error">{message ?? error}</Notice>}
            <button
              type="submit"
              className={`${primaryButtonClass} w-full`}
              disabled={busy}
            >
              {busy ? t('dashboard.login.submitting') : t('dashboard.login.submit')}
            </button>
          </form>
        </div>
      </main>
    </AdminLayout>
  );
}

export default function AdminPage({
  onNavigate,
}: {
  onNavigate: (page: PageId) => void;
}) {
  const { t } = useLocale();
  const { client, content, source, live, error, refresh } = useSiteContent();
  const {
    authorized,
    checking,
    error: authError,
    signIn,
    signOut,
  } = useAdminSession(client);
  const [tab, setTab] = useState<Tab>('tableau');
  const [toast, setToast] = useState<{
    message: string;
    tone: 'info' | 'error' | 'success';
  } | null>(null);

  const notify = useCallback(
    (message: string, tone: 'info' | 'error' | 'success' = 'info') => {
      setToast({ message, tone });
    },
    [],
  );

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 6000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!isSupabaseConfigured || !client) return <SetupScreen />;
  if (checking) {
    return (
      <AdminLayout>
        <main className="max-w-3xl mx-auto px-4 py-14 text-sm text-ink-muted">
          {t('dashboard.status.checking')}
        </main>
      </AdminLayout>
    );
  }
  if (!authorized) return <LoginScreen error={authError} onSubmit={signIn} />;

  const editors = {
    tableau: (
      <DashboardOverview
        client={client}
        content={content}
        source={source}
        live={live}
        error={error}
        onNavigate={onNavigate}
        onChanged={() => refresh(true)}
        notify={notify}
      />
    ),
    plats: (
      <MenuEditor
        client={client}
        content={content}
        onChanged={() => refresh(true)}
        notify={notify}
      />
    ),
    menuCategories: (
      <MenuCategoriesEditor
        client={client}
        content={content}
        onChanged={() => refresh(true)}
        notify={notify}
      />
    ),
    dailySpecials: (
      <DailySpecialsEditor
        client={client}
        content={content}
        onChanged={() => refresh(true)}
        notify={notify}
      />
    ),
    evenements: (
      <EventsEditor
        client={client}
        content={content}
        onChanged={() => refresh(true)}
        notify={notify}
      />
    ),
    infos: (
      <SettingsEditor
        client={client}
        content={content}
        onChanged={() => refresh(true)}
        notify={notify}
      />
    ),
    galerie: (
      <GalleryEditor
        client={client}
        content={content}
        onChanged={() => refresh(true)}
        notify={notify}
      />
    ),
    equipe: (
      <BrigadeEditor
        client={client}
        content={content}
        onChanged={() => refresh(true)}
        notify={notify}
      />
    ),
    faq: (
      <FaqEditor
        client={client}
        content={content}
        onChanged={() => refresh(true)}
        notify={notify}
      />
    ),
    medias: <MediaLibrary client={client} notify={notify} />,
    clients: <ClientRecordsEditor client={client} notify={notify} />,
  };

  const tabLabels: Record<Tab, string> = {
    tableau: t('dashboard.tabs.overview'),
    plats: t('dashboard.tabs.dishes'),
    menuCategories: t('dashboard.tabs.menuCategories'),
    dailySpecials: t('dashboard.tabs.dailySpecials'),
    evenements: t('dashboard.tabs.events'),
    infos: t('dashboard.tabs.info'),
    galerie: t('dashboard.tabs.gallery'),
    equipe: t('dashboard.tabs.team'),
    faq: t('dashboard.tabs.faq'),
    medias: t('dashboard.tabs.media'),
    clients: t('dashboard.tabs.clients'),
  };

  return (
    <AdminLayout>
      <div className="border-b border-line bg-surface">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <nav
            aria-label={t('dashboard.title')}
            className="-mx-4 overflow-x-auto px-4 py-3 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex w-max gap-1 sm:w-auto sm:flex-wrap">
              {TAB_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  aria-current={tab === id ? 'page' : undefined}
                  className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    tab === id
                      ? 'bg-ocean/10 text-ocean'
                      : 'text-ink-muted hover:bg-surface-alt'
                  }`}
                >
                  {tabLabels[id]}
                </button>
              ))}
            </div>
          </nav>
          <div className="flex items-center gap-3 py-3 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${live ? 'bg-ocean' : 'bg-brass'}`}
                aria-hidden="true"
              />
              {live ? t('dashboard.status.live') : t('dashboard.status.local')}
            </span>
            <button
              type="button"
              onClick={() => void signOut()}
              className="inline-flex items-center gap-1.5 font-medium hover:text-ink"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              {t('dashboard.logout')}
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 sm:max-w-sm"
        >
          <Notice tone={toast.tone}>
            <span className="inline-flex items-center gap-2">
              {toast.tone === 'success' && (
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              )}
              {toast.message}
            </span>
          </Notice>
        </div>
      )}

      <main
        className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10"
        onInvalidCapture={() => notify(t('dashboard.editors.errorValidation'), 'error')}
      >
        {editors[tab]}
      </main>
    </AdminLayout>
  );
}
