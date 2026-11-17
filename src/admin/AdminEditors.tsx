import { useCallback, useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Copy, Edit3, ImagePlus, Plus, RefreshCw, Trash2 } from 'lucide-react';
import {
  GALLERY_CATEGORY_LABELS,
  MEDIA_BUCKET,
  deleteBrigadeMember,
  deleteFaqItem,
  deleteGalleryItem,
  deleteMenuItem,
  initializeSiteContent,
  listMedia,
  saveBrigadeMember,
  saveFaqItem,
  saveGalleryItem,
  saveMenuItem,
  saveSiteSettings,
  uploadMedia,
  type SiteContent,
  type SiteSettings,
} from '../data/siteContent';
import { formatKmf } from '../lib/format';
import type {
  BrigadeMember,
  FaqItem,
  GalleryCategory,
  GalleryItem,
  MenuItem,
  MenuMoment,
  PageId,
} from '../types';
import {
  Field,
  ImageField,
  Notice,
  ToggleRow,
  dangerButtonClass,
  inputClass,
  primaryButtonClass,
  secondaryButtonClass,
} from './ui';
import { createId } from './utils';

type Notify = (message: string, tone?: 'info' | 'error' | 'success') => void;
type Ranked = { sortOrder: number; isVisible: boolean };

interface EditorProps {
  client: SupabaseClient;
  content: SiteContent;
  onChanged: () => Promise<void>;
  notify: Notify;
}

function useEditorAction({
  onChanged,
  notify,
}: Pick<EditorProps, 'onChanged' | 'notify'>) {
  const [busy, setBusy] = useState(false);
  const run = useCallback(
    async (action: () => Promise<void>, successMessage: string) => {
      setBusy(true);
      try {
        await action();
        await onChanged();
        notify(successMessage, 'success');
        return true;
      } catch (cause) {
        notify(cause instanceof Error ? cause.message : 'Erreur inconnue', 'error');
        return false;
      } finally {
        setBusy(false);
      }
    },
    [notify, onChanged],
  );
  return { busy, run };
}

const MOMENT_LABELS: Record<Exclude<MenuMoment, 'all'>, string> = {
  'petit-dejeuner': 'Petit-déjeuner',
  dejeuner: 'Déjeuner',
  diner: 'Dîner',
  'desserts-boissons': 'Desserts & Boissons',
};

const MOMENTS = Object.keys(MOMENT_LABELS) as Exclude<MenuMoment, 'all'>[];
const GALLERY_CATEGORIES = Object.keys(GALLERY_CATEGORY_LABELS) as Exclude<
  GalleryCategory,
  'all'
>[];

function EditorShell({
  title,
  description,
  children,
  onAdd,
  busy,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  onAdd?: () => void;
  busy?: boolean;
}) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E6DF] pb-5">
        <div className="space-y-1.5">
          <h2 className="font-display text-3xl font-semibold text-[#151A19]">{title}</h2>
          <p className="text-sm text-[#4A5552] max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className={primaryButtonClass}
            disabled={busy}
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Ajouter
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

export function DashboardOverview({
  client,
  content,
  source,
  live,
  error,
  onChanged,
  notify,
  onNavigate,
}: {
  client: SupabaseClient;
  content: SiteContent;
  source: 'local' | 'supabase';
  live: boolean;
  error: string | null;
  onChanged: () => Promise<void>;
  notify: Notify;
  onNavigate: (page: PageId) => void;
}) {
  const { busy, run } = useEditorAction({ onChanged, notify });
  const stats = [
    { label: 'Plats à la carte', value: content.menu.length },
    { label: 'Photos de galerie', value: content.gallery.length },
    { label: 'Membres de l’équipe', value: content.brigade.length },
    { label: 'Questions fréquentes', value: content.faq.length },
  ];

  return (
    <section className="space-y-6">
      <div className="space-y-1.5 border-b border-[#E2E6DF] pb-5">
        <p className="text-xs font-medium text-[#0F4C45]">Vue d’ensemble</p>
        <h2 className="font-display text-3xl font-semibold text-[#151A19]">
          Bienvenue dans l’espace propriétaire
        </h2>
        <p className="text-sm text-[#4A5552] max-w-2xl leading-relaxed">
          Modifiez les plats, les coordonnées, les photos ou l’équipe : le site client se
          met à jour automatiquement grâce à Supabase Realtime.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-[#E2E6DF] rounded-xl p-5 space-y-1"
          >
            <p className="text-3xl font-semibold text-[#0F4C45] tabular-nums">
              {stat.value}
            </p>
            <p className="text-xs text-[#4A5552]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E2E6DF] rounded-xl p-6 space-y-4">
          <h3 className="font-display text-xl font-semibold text-[#151A19]">
            État de la synchronisation
          </h3>
          <dl className="text-sm divide-y divide-[#E2E6DF]">
            <div className="flex justify-between gap-3 py-2">
              <dt className="text-[#4A5552]">Source des données</dt>
              <dd className="font-medium text-[#151A19]">
                {source === 'supabase' ? 'Supabase' : 'Contenu local'}
              </dd>
            </div>
            <div className="flex justify-between gap-3 py-2">
              <dt className="text-[#4A5552]">Mises à jour en direct</dt>
              <dd className="font-medium text-[#151A19]">
                {live ? 'Actives' : 'Inactives'}
              </dd>
            </div>
          </dl>
          {error && <Notice tone="error">{error}</Notice>}
          {source === 'local' && !error && (
            <Notice>
              Aucune donnée Supabase pour le moment. Importez le contenu d’origine pour
              commencer à gérer le site depuis le dashboard.
            </Notice>
          )}
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              className={primaryButtonClass}
              disabled={busy}
              onClick={() =>
                void run(
                  () => initializeSiteContent(client),
                  'Contenu manquant importé (modifications préservées).',
                )
              }
            >
              <RefreshCw
                className={`w-4 h-4 ${busy ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              Importer le contenu manquant
            </button>
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => void onChanged()}
            >
              Actualiser
            </button>
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => onNavigate('accueil')}
            >
              Voir le site
            </button>
          </div>
        </div>

        <div className="bg-[#F1F3EF] border border-[#E2E6DF] rounded-xl p-6 space-y-3">
          <h3 className="font-display text-xl font-semibold text-[#151A19]">
            Comment ça marche
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-[#4A5552] leading-relaxed">
            <li>
              Importez une fois le contenu manquant : vos modifications déjà enregistrées
              ne sont pas écrasées.
            </li>
            <li>
              Modifiez un plat ou une information : l’enregistrement écrit dans Supabase.
            </li>
            <li>
              Les visiteurs voient la modification instantanément, sans recharger la page.
            </li>
            <li>
              Utilisez « Masquer » pour retirer un élément du site sans le supprimer.
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

type MenuDraft = MenuItem & Ranked;

export function MenuEditor({ client, content, onChanged, notify }: EditorProps) {
  const { busy, run } = useEditorAction({ onChanged, notify });
  const [draft, setDraft] = useState<MenuDraft | null>(null);
  const [filter, setFilter] = useState<MenuMoment>('all');

  const startNew = () => {
    setDraft({
      id: createId('plat'),
      name: '',
      description: '',
      priceKmf: 0,
      moment: 'dejeuner',
      sectionLabel: MOMENT_LABELS.dejeuner,
      tag: '',
      isSignature: false,
      image: '',
      isVisible: true,
      sortOrder: content.menu.length * 10,
    });
  };

  const update = <K extends keyof MenuDraft>(key: K, value: MenuDraft[K]) => {
    setDraft((current) => (current ? { ...current, [key]: value } : current));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft || !draft.name.trim()) return;
    const saved = await run(
      () => saveMenuItem(client, { ...draft, name: draft.name.trim() }),
      'Plat enregistré. Le site client est à jour.',
    );
    if (saved) setDraft(null);
  };

  const toggleVisibility = (item: MenuItem) =>
    void run(
      () =>
        saveMenuItem(client, {
          ...item,
          isVisible: item.isVisible === false,
          sortOrder: item.sortOrder ?? 0,
        }),
      item.isVisible === false ? 'Plat affiché.' : 'Plat masqué.',
    );

  const visibleItems = content.menu
    .filter((item) => filter === 'all' || item.moment === filter)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return (
    <EditorShell
      title="Les plats"
      description="Ajoutez un plat, modifiez son prix ou sa photo, masquez-le le temps d’une rupture. Le total du panier client suit automatiquement."
      onAdd={startNew}
      busy={busy}
    >
      <div className="flex flex-wrap gap-2">
        {(['all', ...MOMENTS] as MenuMoment[]).map((moment) => (
          <button
            key={moment}
            type="button"
            onClick={() => setFilter(moment)}
            aria-pressed={filter === moment}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
              filter === moment
                ? 'bg-[#0F4C45] text-white border-[#0F4C45]'
                : 'bg-white border-[#D4DAD0] text-[#4A5552]'
            }`}
          >
            {moment === 'all' ? 'Tous' : MOMENT_LABELS[moment]}
          </button>
        ))}
      </div>

      {draft && (
        <form
          onSubmit={(event) => void submit(event)}
          className="bg-white border border-[#0F4C45]/30 rounded-xl p-6 space-y-5"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-xl font-semibold text-[#151A19]">
              {content.menu.some((item) => item.id === draft.id)
                ? 'Modifier le plat'
                : 'Nouveau plat'}
            </h3>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className="text-sm text-[#4A5552] hover:text-[#151A19]"
            >
              Fermer
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Nom du plat" htmlFor="admin-dish-name">
              <input
                id="admin-dish-name"
                className={inputClass}
                value={draft.name}
                onChange={(event) => update('name', event.target.value)}
                required
              />
            </Field>
            <Field label="Prix (KMF)" htmlFor="admin-dish-price">
              <input
                id="admin-dish-price"
                type="number"
                min="0"
                step="100"
                className={inputClass}
                value={draft.priceKmf}
                onChange={(event) => update('priceKmf', Number(event.target.value))}
                required
              />
            </Field>
            <Field label="Moment de service" htmlFor="admin-dish-moment">
              <select
                id="admin-dish-moment"
                className={inputClass}
                value={draft.moment}
                onChange={(event) =>
                  update('moment', event.target.value as MenuDraft['moment'])
                }
              >
                {MOMENTS.map((moment) => (
                  <option key={moment} value={moment}>
                    {MOMENT_LABELS[moment]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Section sur la carte" htmlFor="admin-dish-section">
              <input
                id="admin-dish-section"
                className={inputClass}
                value={draft.sectionLabel}
                onChange={(event) => update('sectionLabel', event.target.value)}
              />
            </Field>
            <Field
              label="Badge (optionnel)"
              htmlFor="admin-dish-tag"
              hint="Ex. : Signature, Sur arrivage, Fait maison."
            >
              <input
                id="admin-dish-tag"
                className={inputClass}
                value={draft.tag ?? ''}
                onChange={(event) => update('tag', event.target.value)}
              />
            </Field>
            <Field label="Ordre d’affichage" htmlFor="admin-dish-order">
              <input
                id="admin-dish-order"
                type="number"
                className={inputClass}
                value={draft.sortOrder}
                onChange={(event) => update('sortOrder', Number(event.target.value))}
              />
            </Field>
          </div>
          <Field label="Description" htmlFor="admin-dish-description">
            <textarea
              id="admin-dish-description"
              rows={3}
              className={inputClass}
              value={draft.description}
              onChange={(event) => update('description', event.target.value)}
            />
          </Field>
          <Field label="Photo du plat" htmlFor="admin-dish-image">
            <ImageField
              id="admin-dish-image"
              value={draft.image ?? ''}
              onChange={(url) => update('image', url)}
              client={client}
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ToggleRow
              id="admin-dish-visible"
              label="Afficher sur le site"
              checked={draft.isVisible}
              onChange={(checked) => update('isVisible', checked)}
            />
            <ToggleRow
              id="admin-dish-signature"
              label="Plat phare (accueil)"
              checked={draft.isSignature ?? false}
              onChange={(checked) => update('isSignature', checked)}
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className={primaryButtonClass} disabled={busy}>
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className={secondaryButtonClass}
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-[#E2E6DF] rounded-xl divide-y divide-[#E2E6DF]">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="p-4 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="w-20 h-16 rounded-lg overflow-hidden bg-[#EBF0EB] shrink-0">
              {item.image && (
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-[#151A19]">{item.name}</p>
                {item.isVisible === false && (
                  <span className="text-[10px] uppercase tracking-wide bg-[#9B2C2C]/10 text-[#9B2C2C] px-1.5 py-0.5 rounded">
                    Masqué
                  </span>
                )}
                {item.isSignature && (
                  <span className="text-[10px] uppercase tracking-wide bg-[#0F4C45]/10 text-[#0F4C45] px-1.5 py-0.5 rounded">
                    Phare
                  </span>
                )}
              </div>
              <p className="text-xs text-[#4A5552]">
                {MOMENT_LABELS[item.moment]} · {item.sectionLabel}
              </p>
            </div>
            <span className="font-mono text-sm text-[#0F4C45] tabular-nums whitespace-nowrap">
              {formatKmf(item.priceKmf)}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() =>
                  setDraft({
                    ...item,
                    sortOrder: item.sortOrder ?? 0,
                    isVisible: item.isVisible !== false,
                  })
                }
                className={secondaryButtonClass}
                aria-label={`Modifier ${item.name}`}
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => void toggleVisibility(item)}
                className={secondaryButtonClass}
                disabled={busy}
              >
                {item.isVisible === false ? 'Afficher' : 'Masquer'}
              </button>
              <button
                type="button"
                onClick={() =>
                  void run(() => deleteMenuItem(client, item.id), 'Plat supprimé.')
                }
                className={dangerButtonClass}
                aria-label={`Supprimer ${item.name}`}
                disabled={busy}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {visibleItems.length === 0 && (
          <p className="p-6 text-sm text-[#4A5552]">Aucun plat dans cette catégorie.</p>
        )}
      </div>
    </EditorShell>
  );
}

export function SettingsEditor({ client, content, onChanged, notify }: EditorProps) {
  const { busy, run } = useEditorAction({ onChanged, notify });
  const [draft, setDraft] = useState<SiteSettings>(content.settings);

  useEffect(() => setDraft(content.settings), [content.settings]);

  const updateInfo = <K extends keyof SiteSettings['info']>(
    key: K,
    value: SiteSettings['info'][K],
  ) => setDraft((current) => ({ ...current, info: { ...current.info, [key]: value } }));
  const updateChef = <K extends keyof SiteSettings['chef']>(
    key: K,
    value: SiteSettings['chef'][K],
  ) => setDraft((current) => ({ ...current, chef: { ...current.chef, [key]: value } }));

  return (
    <EditorShell
      title="Informations essentielles"
      description="Nom, coordonnées, horaires, photo d’accueil et plat du jour : ces champs alimentent toutes les pages du site."
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void run(() => saveSiteSettings(client, draft), 'Informations enregistrées.');
        }}
        className="bg-white border border-[#E2E6DF] rounded-xl p-6 space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Nom du restaurant" htmlFor="admin-info-name">
            <input
              id="admin-info-name"
              className={inputClass}
              value={draft.info.name}
              onChange={(event) => updateInfo('name', event.target.value)}
            />
          </Field>
          <Field label="Accroche" htmlFor="admin-info-tagline">
            <input
              id="admin-info-tagline"
              className={inputClass}
              value={draft.info.tagline}
              onChange={(event) => updateInfo('tagline', event.target.value)}
            />
          </Field>
          <Field label="Adresse" htmlFor="admin-info-address">
            <input
              id="admin-info-address"
              className={inputClass}
              value={draft.info.address}
              onChange={(event) => updateInfo('address', event.target.value)}
            />
          </Field>
          <Field label="Pays" htmlFor="admin-info-country">
            <input
              id="admin-info-country"
              className={inputClass}
              value={draft.info.country}
              onChange={(event) => updateInfo('country', event.target.value)}
            />
          </Field>
          <Field label="Téléphone affiché" htmlFor="admin-info-phone">
            <input
              id="admin-info-phone"
              className={inputClass}
              value={draft.info.phoneDisplay}
              onChange={(event) => updateInfo('phoneDisplay', event.target.value)}
            />
          </Field>
          <Field label="Lien téléphone" htmlFor="admin-info-phone-href">
            <input
              id="admin-info-phone-href"
              className={inputClass}
              value={draft.info.phoneHref}
              onChange={(event) => updateInfo('phoneHref', event.target.value)}
            />
          </Field>
          <Field
            label="Lien WhatsApp"
            htmlFor="admin-info-whatsapp"
            hint="Ex. : https://wa.me/2697730031 — utilisé pour les commandes et réservations."
          >
            <input
              id="admin-info-whatsapp"
              className={inputClass}
              value={draft.info.whatsappHref}
              onChange={(event) => updateInfo('whatsappHref', event.target.value)}
            />
          </Field>
          <Field label="E-mail" htmlFor="admin-info-email">
            <input
              id="admin-info-email"
              type="email"
              className={inputClass}
              value={draft.info.email}
              onChange={(event) => updateInfo('email', event.target.value)}
            />
          </Field>
          <Field label="Horaires (résumé)" htmlFor="admin-info-hours">
            <input
              id="admin-info-hours"
              className={inputClass}
              value={draft.info.hoursSummary}
              onChange={(event) => updateInfo('hoursSummary', event.target.value)}
            />
          </Field>
          <Field label="Lien itinéraire" htmlFor="admin-info-directions">
            <input
              id="admin-info-directions"
              className={inputClass}
              value={draft.info.directionsUrl}
              onChange={(event) => updateInfo('directionsUrl', event.target.value)}
            />
          </Field>
          <Field label="Latitude" htmlFor="admin-info-lat">
            <input
              id="admin-info-lat"
              type="number"
              step="0.0001"
              className={inputClass}
              value={draft.info.coordinates.lat}
              onChange={(event) =>
                updateInfo('coordinates', {
                  ...draft.info.coordinates,
                  lat: Number(event.target.value),
                })
              }
            />
          </Field>
          <Field label="Longitude" htmlFor="admin-info-lng">
            <input
              id="admin-info-lng"
              type="number"
              step="0.0001"
              className={inputClass}
              value={draft.info.coordinates.lng}
              onChange={(event) =>
                updateInfo('coordinates', {
                  ...draft.info.coordinates,
                  lng: Number(event.target.value),
                })
              }
            />
          </Field>
        </div>

        <Field label="Photo principale (accueil)" htmlFor="admin-info-hero">
          <ImageField
            id="admin-info-hero"
            value={draft.heroImage}
            onChange={(url) => setDraft((current) => ({ ...current, heroImage: url }))}
            client={client}
          />
        </Field>

        <div className="border-t border-[#E2E6DF] pt-6 space-y-5">
          <div>
            <h3 className="font-display text-xl font-semibold text-[#151A19]">
              Plat du jour du chef
            </h3>
            <p className="text-sm text-[#4A5552]">Affiché en haut de la carte.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Titre" htmlFor="admin-chef-title">
              <input
                id="admin-chef-title"
                className={inputClass}
                value={draft.chef.title}
                onChange={(event) => updateChef('title', event.target.value)}
              />
            </Field>
            <Field label="Sous-titre" htmlFor="admin-chef-subtitle">
              <input
                id="admin-chef-subtitle"
                className={inputClass}
                value={draft.chef.subtitle}
                onChange={(event) => updateChef('subtitle', event.target.value)}
              />
            </Field>
            <Field label="Nom du plat" htmlFor="admin-chef-dish">
              <input
                id="admin-chef-dish"
                className={inputClass}
                value={draft.chef.dishName}
                onChange={(event) => updateChef('dishName', event.target.value)}
              />
            </Field>
            <Field label="Prix (KMF)" htmlFor="admin-chef-price">
              <input
                id="admin-chef-price"
                type="number"
                min="0"
                step="100"
                className={inputClass}
                value={draft.chef.priceKmf}
                onChange={(event) => updateChef('priceKmf', Number(event.target.value))}
              />
            </Field>
            <Field label="Disponibilité" htmlFor="admin-chef-availability">
              <input
                id="admin-chef-availability"
                className={inputClass}
                value={draft.chef.availability}
                onChange={(event) => updateChef('availability', event.target.value)}
              />
            </Field>
          </div>
        </div>

        <button type="submit" className={primaryButtonClass} disabled={busy}>
          Enregistrer les informations
        </button>
      </form>
    </EditorShell>
  );
}

type GalleryDraft = GalleryItem & Ranked;

export function GalleryEditor({ client, content, onChanged, notify }: EditorProps) {
  const { busy, run } = useEditorAction({ onChanged, notify });
  const [draft, setDraft] = useState<GalleryDraft | null>(null);

  const update = <K extends keyof GalleryDraft>(key: K, value: GalleryDraft[K]) =>
    setDraft((current) => (current ? { ...current, [key]: value } : current));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft || !draft.title.trim() || !draft.image) return;
    const saved = await run(() => saveGalleryItem(client, draft), 'Photo enregistrée.');
    if (saved) setDraft(null);
  };

  return (
    <EditorShell
      title="Galerie photo"
      description="Remplacez les visuels de la terrasse, de la salle et des plats. Les photos uploadées sont stockées dans le bucket Supabase dédié."
      onAdd={() =>
        setDraft({
          id: createId('photo'),
          title: '',
          caption: '',
          category: 'plats',
          categoryLabel: GALLERY_CATEGORY_LABELS.plats,
          image: '',
          isVisible: true,
          sortOrder: content.gallery.length * 10,
        })
      }
      busy={busy}
    >
      {draft && (
        <form
          onSubmit={(event) => void submit(event)}
          className="bg-white border border-[#0F4C45]/30 rounded-xl p-6 space-y-5"
        >
          <h3 className="font-display text-xl font-semibold text-[#151A19]">
            {content.gallery.some((item) => item.id === draft.id)
              ? 'Modifier la photo'
              : 'Nouvelle photo'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Titre" htmlFor="admin-gallery-title">
              <input
                id="admin-gallery-title"
                className={inputClass}
                value={draft.title}
                onChange={(event) => update('title', event.target.value)}
              />
            </Field>
            <Field label="Catégorie" htmlFor="admin-gallery-category">
              <select
                id="admin-gallery-category"
                className={inputClass}
                value={draft.category}
                onChange={(event) => {
                  const category = event.target.value as GalleryDraft['category'];
                  setDraft((current) =>
                    current
                      ? {
                          ...current,
                          category,
                          categoryLabel: GALLERY_CATEGORY_LABELS[category],
                        }
                      : current,
                  );
                }}
              >
                {GALLERY_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {GALLERY_CATEGORY_LABELS[category]}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Légende" htmlFor="admin-gallery-caption">
            <textarea
              id="admin-gallery-caption"
              rows={2}
              className={inputClass}
              value={draft.caption}
              onChange={(event) => update('caption', event.target.value)}
            />
          </Field>
          <Field label="Image" htmlFor="admin-gallery-image">
            <ImageField
              id="admin-gallery-image"
              value={draft.image}
              onChange={(url) => update('image', url)}
              client={client}
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ToggleRow
              id="admin-gallery-visible"
              label="Afficher dans la galerie"
              checked={draft.isVisible}
              onChange={(checked) => update('isVisible', checked)}
            />
            <Field label="Ordre d’affichage" htmlFor="admin-gallery-order">
              <input
                id="admin-gallery-order"
                type="number"
                className={inputClass}
                value={draft.sortOrder}
                onChange={(event) => update('sortOrder', Number(event.target.value))}
              />
            </Field>
          </div>
          <div className="flex gap-3">
            <button type="submit" className={primaryButtonClass} disabled={busy}>
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className={secondaryButtonClass}
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {content.gallery.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E2E6DF] rounded-xl overflow-hidden"
          >
            <div className="aspect-[4/3] bg-[#EBF0EB]">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p className="text-xs text-[#0F4C45]">{item.categoryLabel}</p>
                <p className="font-medium text-[#151A19]">{item.title}</p>
                {item.isVisible === false && (
                  <span className="text-[10px] uppercase text-[#9B2C2C]">Masquée</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      ...item,
                      sortOrder: item.sortOrder ?? 0,
                      isVisible: item.isVisible !== false,
                    })
                  }
                  className={secondaryButtonClass}
                >
                  <Edit3 className="w-4 h-4" /> Modifier
                </button>
                <button
                  type="button"
                  onClick={() =>
                    void run(() => deleteGalleryItem(client, item.id), 'Photo supprimée.')
                  }
                  className={dangerButtonClass}
                  aria-label={`Supprimer ${item.title}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </EditorShell>
  );
}

type BrigadeDraft = BrigadeMember & Ranked;

export function BrigadeEditor({ client, content, onChanged, notify }: EditorProps) {
  const { busy, run } = useEditorAction({ onChanged, notify });
  const [draft, setDraft] = useState<BrigadeDraft | null>(null);
  const update = <K extends keyof BrigadeDraft>(key: K, value: BrigadeDraft[K]) =>
    setDraft((current) => (current ? { ...current, [key]: value } : current));

  return (
    <EditorShell
      title="La brigade"
      description="Présentez l’équipe sur la page « Notre Histoire »."
      onAdd={() =>
        setDraft({
          id: createId('equipe'),
          name: '',
          role: '',
          tenure: '',
          bio: '',
          isVisible: true,
          sortOrder: content.brigade.length * 10,
        })
      }
      busy={busy}
    >
      {draft && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!draft.name.trim()) return;
            void run(() => saveBrigadeMember(client, draft), 'Membre enregistré.').then(
              (saved) => saved && setDraft(null),
            );
          }}
          className="bg-white border border-[#0F4C45]/30 rounded-xl p-6 space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Nom" htmlFor="admin-team-name">
              <input
                id="admin-team-name"
                className={inputClass}
                value={draft.name}
                onChange={(event) => update('name', event.target.value)}
              />
            </Field>
            <Field label="Rôle" htmlFor="admin-team-role">
              <input
                id="admin-team-role"
                className={inputClass}
                value={draft.role}
                onChange={(event) => update('role', event.target.value)}
              />
            </Field>
            <Field label="Ancienneté" htmlFor="admin-team-tenure">
              <input
                id="admin-team-tenure"
                className={inputClass}
                value={draft.tenure}
                onChange={(event) => update('tenure', event.target.value)}
              />
            </Field>
            <Field label="Ordre d’affichage" htmlFor="admin-team-order">
              <input
                id="admin-team-order"
                type="number"
                className={inputClass}
                value={draft.sortOrder}
                onChange={(event) => update('sortOrder', Number(event.target.value))}
              />
            </Field>
          </div>
          <Field label="Biographie" htmlFor="admin-team-bio">
            <textarea
              id="admin-team-bio"
              rows={3}
              className={inputClass}
              value={draft.bio}
              onChange={(event) => update('bio', event.target.value)}
            />
          </Field>
          <ToggleRow
            id="admin-team-visible"
            label="Afficher sur le site"
            checked={draft.isVisible}
            onChange={(checked) => update('isVisible', checked)}
          />
          <div className="flex gap-3">
            <button type="submit" className={primaryButtonClass} disabled={busy}>
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className={secondaryButtonClass}
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-[#E2E6DF] rounded-xl divide-y divide-[#E2E6DF]">
        {content.brigade.map((member) => (
          <div
            key={member.id}
            className="p-4 flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <div className="flex-1">
              <p className="font-medium text-[#151A19]">{member.name}</p>
              <p className="text-xs text-[#4A5552]">
                {member.role} · {member.tenure}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setDraft({
                  ...member,
                  sortOrder: member.sortOrder ?? 0,
                  isVisible: member.isVisible !== false,
                })
              }
              className={secondaryButtonClass}
            >
              <Edit3 className="w-4 h-4" /> Modifier
            </button>
            <button
              type="button"
              onClick={() =>
                void run(() => deleteBrigadeMember(client, member.id), 'Membre supprimé.')
              }
              className={dangerButtonClass}
              aria-label={`Supprimer ${member.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </EditorShell>
  );
}

type FaqDraft = FaqItem & Ranked;

export function FaqEditor({ client, content, onChanged, notify }: EditorProps) {
  const { busy, run } = useEditorAction({ onChanged, notify });
  const [draft, setDraft] = useState<FaqDraft | null>(null);
  const update = <K extends keyof FaqDraft>(key: K, value: FaqDraft[K]) =>
    setDraft((current) => (current ? { ...current, [key]: value } : current));

  return (
    <EditorShell
      title="Questions fréquentes"
      description="Gérez les réponses affichées sur la page « Informations pratiques »."
      onAdd={() =>
        setDraft({
          id: createId('faq'),
          question: '',
          answer: '',
          isVisible: true,
          sortOrder: content.faq.length * 10,
        })
      }
      busy={busy}
    >
      {draft && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!draft.question.trim()) return;
            void run(() => saveFaqItem(client, draft), 'Question enregistrée.').then(
              (saved) => saved && setDraft(null),
            );
          }}
          className="bg-white border border-[#0F4C45]/30 rounded-xl p-6 space-y-5"
        >
          <Field label="Question" htmlFor="admin-faq-question">
            <input
              id="admin-faq-question"
              className={inputClass}
              value={draft.question}
              onChange={(event) => update('question', event.target.value)}
            />
          </Field>
          <Field label="Réponse" htmlFor="admin-faq-answer">
            <textarea
              id="admin-faq-answer"
              rows={4}
              className={inputClass}
              value={draft.answer}
              onChange={(event) => update('answer', event.target.value)}
            />
          </Field>
          <ToggleRow
            id="admin-faq-visible"
            label="Afficher sur le site"
            checked={draft.isVisible}
            onChange={(checked) => update('isVisible', checked)}
          />
          <div className="flex gap-3">
            <button type="submit" className={primaryButtonClass} disabled={busy}>
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className={secondaryButtonClass}
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-[#E2E6DF] rounded-xl divide-y divide-[#E2E6DF]">
        {content.faq.map((faq) => (
          <div
            key={faq.id}
            className="p-4 flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <div className="flex-1">
              <p className="font-medium text-[#151A19]">{faq.question}</p>
              <p className="text-xs text-[#4A5552] line-clamp-1">{faq.answer}</p>
            </div>
            <button
              type="button"
              onClick={() =>
                setDraft({
                  ...faq,
                  sortOrder: faq.sortOrder ?? 0,
                  isVisible: faq.isVisible !== false,
                })
              }
              className={secondaryButtonClass}
            >
              <Edit3 className="w-4 h-4" /> Modifier
            </button>
            <button
              type="button"
              onClick={() =>
                void run(() => deleteFaqItem(client, faq.id), 'Question supprimée.')
              }
              className={dangerButtonClass}
              aria-label={`Supprimer ${faq.question}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </EditorShell>
  );
}

interface MediaItem {
  path: string;
  url: string;
}

export function MediaLibrary({
  client,
  notify,
}: {
  client: SupabaseClient;
  notify: Notify;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const files = await listMedia(client);
      setItems(
        files.map((file) => ({
          path: file.name,
          url: client.storage.from(MEDIA_BUCKET).getPublicUrl(file.name).data.publicUrl,
        })),
      );
      setError(null);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : 'Impossible de lister les médias',
      );
    }
  }, [client]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <EditorShell
      title="Bibliothèque de médias"
      description="Uploadez vos photos une fois, puis copiez leur URL dans un plat ou une photo de galerie."
    >
      <div className="bg-white border border-[#E2E6DF] rounded-xl p-6 space-y-5">
        <label
          className={`${primaryButtonClass} w-fit ${uploading ? 'opacity-50 cursor-wait' : ''}`}
        >
          <ImagePlus className="w-4 h-4" aria-hidden="true" />
          {uploading ? 'Envoi…' : 'Importer des images'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            className="sr-only"
            disabled={uploading}
            onChange={(event) => {
              const files = Array.from(event.target.files ?? []);
              if (files.length === 0) return;
              setUploading(true);
              Promise.all(files.map((file) => uploadMedia(client, file)))
                .then(() => {
                  notify(`${files.length} image(s) importée(s).`, 'success');
                  return load();
                })
                .catch((cause) =>
                  setError(cause instanceof Error ? cause.message : 'Envoi impossible'),
                )
                .finally(() => setUploading(false));
            }}
          />
        </label>
        {error && <Notice tone="error">{error}</Notice>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.path} className="space-y-2">
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#E2E6DF] bg-[#EBF0EB]">
                <img
                  src={item.url}
                  alt={item.path}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard?.writeText(item.url);
                  notify('URL copiée.', 'success');
                }}
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-medium text-[#0F4C45] hover:underline"
              >
                <Copy className="w-3.5 h-3.5" /> Copier l’URL
              </button>
              <p className="text-[10px] text-[#4A5552] truncate" title={item.path}>
                {item.path}
              </p>
            </div>
          ))}
        </div>
        {items.length === 0 && !error && (
          <p className="text-sm text-[#4A5552]">Aucune image dans la bibliothèque.</p>
        )}
      </div>
    </EditorShell>
  );
}
