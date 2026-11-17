import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, LogOut, ShieldCheck } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';
import { SUPABASE_URL, isSupabaseConfigured } from '../lib/supabase';
import type { PageId } from '../types';
import {
  BrigadeEditor,
  DashboardOverview,
  FaqEditor,
  GalleryEditor,
  MediaLibrary,
  MenuEditor,
  SettingsEditor,
} from './AdminEditors';
import { Notice, inputClass, primaryButtonClass } from './ui';
import { useAdminSession } from './useAdminSession';

type Tab = 'tableau' | 'plats' | 'infos' | 'galerie' | 'equipe' | 'faq' | 'medias';

const TABS: { id: Tab; label: string }[] = [
  { id: 'tableau', label: 'Tableau de bord' },
  { id: 'plats', label: 'Plats' },
  { id: 'infos', label: 'Informations' },
  { id: 'galerie', label: 'Galerie' },
  { id: 'equipe', label: 'Équipe' },
  { id: 'faq', label: 'FAQ' },
  { id: 'medias', label: 'Médias' },
];

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F9F7] text-[#151A19]">
      <header className="bg-[#151A19] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#8FC7B8]" aria-hidden="true" />
            <span className="font-display text-xl font-semibold">
              Le New Select{' '}
              <span className="text-white/60 font-sans text-sm">· Administration</span>
            </span>
          </div>
          <a
            href="#accueil"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Retour au site
          </a>
        </div>
      </header>
      {children}
    </div>
  );
}

function SetupScreen() {
  return (
    <AdminLayout>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="font-display text-4xl font-semibold text-[#151A19]">
          Configuration Supabase requise
        </h1>
        <div className="mt-6 space-y-5">
          <Notice>
            Le dashboard est prêt, mais la clé publique Supabase n’est pas encore définie
            dans l’environnement de l’application.
          </Notice>
          <div className="bg-white border border-[#E2E6DF] rounded-xl p-6 space-y-4">
            <p className="text-sm font-medium text-[#151A19]">Variables à définir :</p>
            <pre className="bg-[#F1F3EF] rounded-lg p-4 text-xs overflow-x-auto">
              {`VITE_SUPABASE_URL=${SUPABASE_URL}\nVITE_SUPABASE_ANON_KEY=la_cle_anon_du_projet`}
            </pre>
            <p className="text-sm text-[#4A5552] leading-relaxed">
              Ajoutez-les dans <code>.env.local</code> en local, puis dans les variables
              d’environnement Vercel. Exécutez ensuite{' '}
              <code>supabase/migrations/001_lns_site_content.sql</code> dans le SQL Editor
              de Supabase. Seule la clé <strong>anon</strong> est exposée au navigateur :
              la clé service_role ne doit jamais être utilisée ici.
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <AdminLayout>
      <main className="max-w-md mx-auto px-4 py-14">
        <div className="bg-white border border-[#E2E6DF] rounded-xl p-7 space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-[#0F4C45]">Espace propriétaire</p>
            <h1 className="font-display text-3xl font-semibold text-[#151A19]">
              Connexion
            </h1>
            <p className="text-sm text-[#4A5552]">
              Réservé au propriétaire du restaurant. Utilisez le compte Supabase Auth
              autorisé.
            </p>
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
                E-mail
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
                Mot de passe
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
              {busy ? 'Connexion…' : 'Se connecter'}
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
        <main className="max-w-3xl mx-auto px-4 py-14 text-sm text-[#4A5552]">
          Vérification de l’accès…
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
        onChanged={refresh}
        notify={notify}
      />
    ),
    plats: (
      <MenuEditor client={client} content={content} onChanged={refresh} notify={notify} />
    ),
    infos: (
      <SettingsEditor
        client={client}
        content={content}
        onChanged={refresh}
        notify={notify}
      />
    ),
    galerie: (
      <GalleryEditor
        client={client}
        content={content}
        onChanged={refresh}
        notify={notify}
      />
    ),
    equipe: (
      <BrigadeEditor
        client={client}
        content={content}
        onChanged={refresh}
        notify={notify}
      />
    ),
    faq: (
      <FaqEditor client={client} content={content} onChanged={refresh} notify={notify} />
    ),
    medias: <MediaLibrary client={client} notify={notify} />,
  };

  return (
    <AdminLayout>
      <div className="border-b border-[#E2E6DF] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <nav aria-label="Sections du dashboard" className="flex flex-wrap gap-1 py-3">
            {TABS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                aria-current={tab === item.id ? 'page' : undefined}
                className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  tab === item.id
                    ? 'bg-[#0F4C45]/10 text-[#0F4C45]'
                    : 'text-[#4A5552] hover:bg-[#F1F3EF]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3 py-3 text-xs text-[#4A5552]">
            <span className="inline-flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${live ? 'bg-[#0F4C45]' : 'bg-[#9A6B26]'}`}
                aria-hidden="true"
              />
              {live ? 'Synchronisation active' : 'Mode local'}
            </span>
            <button
              type="button"
              onClick={() => void signOut()}
              className="inline-flex items-center gap-1.5 font-medium hover:text-[#151A19]"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {toast && (
          <div className="mb-6">
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
        {editors[tab]}
      </main>
    </AdminLayout>
  );
}
