import { useCallback, useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Copy, Edit3, ImagePlus, Plus, RefreshCw, Trash2, UserRound } from 'lucide-react';
import {
  clearClientRecords,
  deleteClientRecord,
  listClientRecords,
  type ClientRecord,
} from '../lib/clientRecords';
import { useLocale } from '../i18n/LocaleContext';
import type { Locale } from '../i18n/types';
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

interface ClientRecordsEditorProps {
  client: SupabaseClient;
  notify: Notify;
}

function useEditorAction({
  onChanged,
  notify,
}: Pick<EditorProps, 'onChanged' | 'notify'>) {
  const { t } = useLocale();
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
        notify(cause instanceof Error ? cause.message : t('dashboard.editors.errorUnknown'), 'error');
        return false;
      } finally {
        setBusy(false);
      }
    },
    [notify, onChanged, t],
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
  const { t } = useLocale();
  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-5">
        <div className="space-y-1.5">
          <h2 className="font-display text-3xl font-semibold text-ink">{title}</h2>
          <p className="text-sm text-ink-muted max-w-2xl leading-relaxed">
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
            {t('common.add')}
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
  const { t } = useLocale();
  const { busy, run } = useEditorAction({ onChanged, notify });
  const stats = [
    { label: t('dashboard.editors.overview.statDishes'), value: content.menu.length },
    { label: t('dashboard.editors.overview.statGallery'), value: content.gallery.length },
    { label: t('dashboard.editors.overview.statTeam'), value: content.brigade.length },
    { label: t('dashboard.editors.overview.statFaq'), value: content.faq.length },
  ];

  return (
    <section className="space-y-6">
      <div className="space-y-1.5 border-b border-line pb-5">
        <p className="text-xs font-medium text-ocean">{t('dashboard.editors.overview.kicker')}</p>
        <h2 className="font-display text-3xl font-semibold text-ink">
          {t('dashboard.editors.overview.title')}
        </h2>
        <p className="text-sm text-ink-muted max-w-2xl leading-relaxed">
          {t('dashboard.editors.overview.description')}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface border border-line rounded-xl p-5 space-y-1"
          >
            <p className="text-3xl font-semibold text-ocean tabular-nums">
              {stat.value}
            </p>
            <p className="text-xs text-ink-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-line rounded-xl p-6 space-y-4">
          <h3 className="font-display text-xl font-semibold text-ink">
            {t('dashboard.editors.overview.syncTitle')}
          </h3>
          <dl className="text-sm divide-y divide-line">
            <div className="flex justify-between gap-3 py-2">
              <dt className="text-ink-muted">{t('dashboard.editors.overview.sourceLabel')}</dt>
              <dd className="font-medium text-ink">
                {source === 'supabase'
                  ? t('dashboard.editors.overview.sourceSupabase')
                  : t('dashboard.editors.overview.sourceLocal')}
              </dd>
            </div>
            <div className="flex justify-between gap-3 py-2">
              <dt className="text-ink-muted">{t('dashboard.editors.overview.liveLabel')}</dt>
              <dd className="font-medium text-ink">
                {live
                  ? t('dashboard.editors.overview.liveActive')
                  : t('dashboard.editors.overview.liveInactive')}
              </dd>
            </div>
          </dl>
          {error && <Notice tone="error">{error}</Notice>}
          {source === 'local' && !error && (
            <Notice>{t('dashboard.editors.overview.noDataNotice')}</Notice>
          )}
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              className={primaryButtonClass}
              disabled={busy}
              onClick={() =>
                void run(
                  () => initializeSiteContent(client),
                  t('dashboard.editors.overview.imported'),
                )
              }
            >
              <RefreshCw
                className={`w-4 h-4 ${busy ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              {t('dashboard.editors.overview.importMissing')}
            </button>
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => void onChanged()}
            >
              {t('dashboard.editors.common.refresh')}
            </button>
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => onNavigate('accueil')}
            >
              {t('dashboard.editors.overview.viewSite')}
            </button>
          </div>
        </div>

        <div className="bg-surface-alt border border-line rounded-xl p-6 space-y-3">
          <h3 className="font-display text-xl font-semibold text-ink">
            {t('dashboard.editors.overview.howTitle')}
          </h3>
          <ol className="list-decimal ps-5 space-y-2 text-sm text-ink-muted leading-relaxed">
            <li>{t('dashboard.editors.overview.how1')}</li>
            <li>{t('dashboard.editors.overview.how2')}</li>
            <li>{t('dashboard.editors.overview.how3')}</li>
            <li>{t('dashboard.editors.overview.how4')}</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

type MenuDraft = MenuItem & Ranked;

export function MenuEditor({ client, content, onChanged, notify }: EditorProps) {
  const { t } = useLocale();
  const { busy, run } = useEditorAction({ onChanged, notify });
  const [draft, setDraft] = useState<MenuDraft | null>(null);
  const [filter, setFilter] = useState<MenuMoment>('all');

  const momentLabel = (moment: Exclude<MenuMoment, 'all'>) => {
    const map: Record<Exclude<MenuMoment, 'all'>, string> = {
      'petit-dejeuner': t('menu.categories.breakfast'),
      dejeuner: t('menu.categories.lunch'),
      diner: t('menu.categories.dinner'),
      'desserts-boissons': t('menu.categories.dessertsDrinks'),
    };
    return map[moment];
  };

  const startNew = () => {
    setDraft({
      id: createId('plat'),
      name: '',
      description: '',
      priceKmf: 0,
      moment: 'dejeuner',
      sectionLabel: momentLabel('dejeuner'),
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
      t('dashboard.editors.menu.saved'),
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
      item.isVisible === false ? t('dashboard.editors.menu.shown') : t('dashboard.editors.menu.hidden'),
    );

  const visibleItems = content.menu
    .filter((item) => filter === 'all' || item.moment === filter)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return (
    <EditorShell
      title={t('dashboard.editors.menu.title')}
      description={t('dashboard.editors.menu.description')}
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
                : 'bg-surface border-line-strong text-ink-muted'
            }`}
          >
            {moment === 'all' ? t('dashboard.editors.menu.all') : momentLabel(moment)}
          </button>
        ))}
      </div>

      {draft && (
        <form
          onSubmit={(event) => void submit(event)}
          className="bg-surface border border-ocean/30 rounded-xl p-6 space-y-5"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-xl font-semibold text-ink">
              {content.menu.some((item) => item.id === draft.id)
                ? t('dashboard.editors.menu.editDish')
                : t('dashboard.editors.menu.newDish')}
            </h3>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className="text-sm text-ink-muted hover:text-ink"
            >
              {t('dashboard.editors.common.close')}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={t('dashboard.editors.menu.name')} htmlFor="admin-dish-name">
              <input
                id="admin-dish-name"
                className={inputClass}
                value={draft.name}
                onChange={(event) => update('name', event.target.value)}
                required
              />
            </Field>
            <Field label={t('dashboard.editors.menu.priceKmf')} htmlFor="admin-dish-price">
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
            <Field label={t('dashboard.editors.menu.moment')} htmlFor="admin-dish-moment">
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
                    {momentLabel(moment)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t('dashboard.editors.menu.section')} htmlFor="admin-dish-section">
              <input
                id="admin-dish-section"
                className={inputClass}
                value={draft.sectionLabel}
                onChange={(event) => update('sectionLabel', event.target.value)}
              />
            </Field>
            <Field
              label={t('dashboard.editors.menu.badge')}
              htmlFor="admin-dish-tag"
              hint={t('dashboard.editors.menu.badgeHint')}
            >
              <input
                id="admin-dish-tag"
                className={inputClass}
                value={draft.tag ?? ''}
                onChange={(event) => update('tag', event.target.value)}
              />
            </Field>
            <Field label={t('dashboard.editors.menu.order')} htmlFor="admin-dish-order">
              <input
                id="admin-dish-order"
                type="number"
                className={inputClass}
                value={draft.sortOrder}
                onChange={(event) => update('sortOrder', Number(event.target.value))}
              />
            </Field>
          </div>
          <Field label={t('dashboard.editors.menu.descriptionField')} htmlFor="admin-dish-description">
            <textarea
              id="admin-dish-description"
              rows={3}
              className={inputClass}
              value={draft.description}
              onChange={(event) => update('description', event.target.value)}
            />
          </Field>
          <Field label={t('dashboard.editors.menu.photo')} htmlFor="admin-dish-image">
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
              label={t('dashboard.editors.menu.showOnSite')}
              checked={draft.isVisible}
              onChange={(checked) => update('isVisible', checked)}
            />
            <ToggleRow
              id="admin-dish-signature"
              label={t('dashboard.editors.menu.signature')}
              checked={draft.isSignature ?? false}
              onChange={(checked) => update('isSignature', checked)}
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className={primaryButtonClass} disabled={busy}>
              {t('dashboard.editors.common.save')}
            </button>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className={secondaryButtonClass}
            >
              {t('dashboard.editors.common.cancel')}
            </button>
          </div>
        </form>
      )}

      <div className="bg-surface border border-line rounded-xl divide-y divide-line">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="p-4 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="w-20 h-16 rounded-lg overflow-hidden bg-surface-muted shrink-0">
              {item.image && (
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-ink">{item.name}</p>
                {item.isVisible === false && (
                  <span className="text-[10px] uppercase tracking-wide bg-[#9B2C2C]/10 text-[#9B2C2C] px-1.5 py-0.5 rounded">
                    {t('dashboard.editors.menu.hiddenBadge')}
                  </span>
                )}
                {item.isSignature && (
                  <span className="text-[10px] uppercase tracking-wide bg-ocean/10 text-ocean px-1.5 py-0.5 rounded">
                    {t('dashboard.editors.menu.signatureBadge')}
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-muted">
                {momentLabel(item.moment)} · {item.sectionLabel}
              </p>
            </div>
            <span className="font-mono text-sm text-ocean tabular-nums whitespace-nowrap">
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
                aria-label={`${t('dashboard.editors.common.edit')} ${item.name}`}
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => void toggleVisibility(item)}
                className={secondaryButtonClass}
                disabled={busy}
              >
                {item.isVisible === false ? t('dashboard.editors.common.show') : t('dashboard.editors.common.hide')}
              </button>
              <button
                type="button"
                onClick={() =>
                  void run(() => deleteMenuItem(client, item.id), t('dashboard.editors.menu.deleted'))
                }
                className={dangerButtonClass}
                aria-label={`${t('dashboard.editors.common.delete')} ${item.name}`}
                disabled={busy}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {visibleItems.length === 0 && (
          <p className="p-6 text-sm text-ink-muted">{t('dashboard.editors.menu.empty')}</p>
        )}
      </div>
    </EditorShell>
  );
}

export function SettingsEditor({ client, content, onChanged, notify }: EditorProps) {
  const { t } = useLocale();
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
      title={t('dashboard.editors.settings.title')}
      description={t('dashboard.editors.settings.description')}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void run(() => saveSiteSettings(client, draft), t('dashboard.editors.settings.saved'));
        }}
        className="bg-surface border border-line rounded-xl p-6 space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label={t('dashboard.editors.settings.restaurantName')} htmlFor="admin-info-name">
            <input
              id="admin-info-name"
              className={inputClass}
              value={draft.info.name}
              onChange={(event) => updateInfo('name', event.target.value)}
            />
          </Field>
          <Field label={t('dashboard.editors.settings.tagline')} htmlFor="admin-info-tagline">
            <input
              id="admin-info-tagline"
              className={inputClass}
              value={draft.info.tagline}
              onChange={(event) => updateInfo('tagline', event.target.value)}
            />
          </Field>
          <Field label={t('dashboard.editors.settings.address')} htmlFor="admin-info-address">
            <input
              id="admin-info-address"
              className={inputClass}
              value={draft.info.address}
              onChange={(event) => updateInfo('address', event.target.value)}
            />
          </Field>
          <Field label={t('dashboard.editors.settings.country')} htmlFor="admin-info-country">
            <input
              id="admin-info-country"
              className={inputClass}
              value={draft.info.country}
              onChange={(event) => updateInfo('country', event.target.value)}
            />
          </Field>
          <Field label={t('dashboard.editors.settings.phoneDisplay')} htmlFor="admin-info-phone">
            <input
              id="admin-info-phone"
              className={inputClass}
              value={draft.info.phoneDisplay}
              onChange={(event) => updateInfo('phoneDisplay', event.target.value)}
            />
          </Field>
          <Field label={t('dashboard.editors.settings.phoneLink')} htmlFor="admin-info-phone-href">
            <input
              id="admin-info-phone-href"
              className={inputClass}
              value={draft.info.phoneHref}
              onChange={(event) => updateInfo('phoneHref', event.target.value)}
            />
          </Field>
          <Field
            label={t('dashboard.editors.settings.whatsappLink')}
            htmlFor="admin-info-whatsapp"
            hint={t('dashboard.editors.settings.whatsappHint')}
          >
            <input
              id="admin-info-whatsapp"
              className={inputClass}
              value={draft.info.whatsappHref}
              onChange={(event) => updateInfo('whatsappHref', event.target.value)}
            />
          </Field>
          <Field label={t('dashboard.editors.settings.email')} htmlFor="admin-info-email">
            <input
              id="admin-info-email"
              type="email"
              className={inputClass}
              value={draft.info.email}
              onChange={(event) => updateInfo('email', event.target.value)}
            />
          </Field>
          <Field label={t('dashboard.editors.settings.hoursSummary')} htmlFor="admin-info-hours">
            <input
              id="admin-info-hours"
              className={inputClass}
              value={draft.info.hoursSummary}
              onChange={(event) => updateInfo('hoursSummary', event.target.value)}
            />
          </Field>
          <Field label={t('dashboard.editors.settings.directionsLink')} htmlFor="admin-info-directions">
            <input
              id="admin-info-directions"
              className={inputClass}
              value={draft.info.directionsUrl}
              onChange={(event) => updateInfo('directionsUrl', event.target.value)}
            />
          </Field>
          <Field label={t('dashboard.editors.settings.latitude')} htmlFor="admin-info-lat">
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
          <Field label={t('dashboard.editors.settings.longitude')} htmlFor="admin-info-lng">
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

        <Field label={t('dashboard.editors.settings.heroImage')} htmlFor="admin-info-hero">
          <ImageField
            id="admin-info-hero"
            value={draft.heroImage}
            onChange={(url) => setDraft((current) => ({ ...current, heroImage: url }))}
            client={client}
          />
        </Field>

        <div className="border-t border-line pt-6 space-y-5">
          <div>
            <h3 className="font-display text-xl font-semibold text-ink">
              {t('dashboard.editors.settings.chefTitle')}
            </h3>
            <p className="text-sm text-ink-muted">{t('dashboard.editors.settings.chefDescription')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={t('dashboard.editors.settings.chefHeading')} htmlFor="admin-chef-title">
              <input
                id="admin-chef-title"
                className={inputClass}
                value={draft.chef.title}
                onChange={(event) => updateChef('title', event.target.value)}
              />
            </Field>
            <Field label={t('dashboard.editors.settings.chefSubtitle')} htmlFor="admin-chef-subtitle">
              <input
                id="admin-chef-subtitle"
                className={inputClass}
                value={draft.chef.subtitle}
                onChange={(event) => updateChef('subtitle', event.target.value)}
              />
            </Field>
            <Field label={t('dashboard.editors.settings.chefDish')} htmlFor="admin-chef-dish">
              <input
                id="admin-chef-dish"
                className={inputClass}
                value={draft.chef.dishName}
                onChange={(event) => updateChef('dishName', event.target.value)}
              />
            </Field>
            <Field label={t('dashboard.editors.settings.chefPrice')} htmlFor="admin-chef-price">
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
            <Field label={t('dashboard.editors.settings.chefAvailability')} htmlFor="admin-chef-availability">
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
          {t('dashboard.editors.settings.saveButton')}
        </button>
      </form>
    </EditorShell>
  );
}

type GalleryDraft = GalleryItem & Ranked;

export function GalleryEditor({ client, content, onChanged, notify }: EditorProps) {
  const { t } = useLocale();
  const { busy, run } = useEditorAction({ onChanged, notify });
  const [draft, setDraft] = useState<GalleryDraft | null>(null);

  const update = <K extends keyof GalleryDraft>(key: K, value: GalleryDraft[K]) =>
    setDraft((current) => (current ? { ...current, [key]: value } : current));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft || !draft.title.trim() || !draft.image) return;
    const saved = await run(() => saveGalleryItem(client, draft), t('dashboard.editors.gallery.saved'));
    if (saved) setDraft(null);
  };

  return (
    <EditorShell
      title={t('dashboard.editors.gallery.title')}
      description={t('dashboard.editors.gallery.description')}
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
          className="bg-surface border border-ocean/30 rounded-xl p-6 space-y-5"
        >
          <h3 className="font-display text-xl font-semibold text-ink">
            {content.gallery.some((item) => item.id === draft.id)
              ? t('dashboard.editors.gallery.editPhoto')
              : t('dashboard.editors.gallery.newPhoto')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={t('dashboard.editors.common.title')} htmlFor="admin-gallery-title">
              <input
                id="admin-gallery-title"
                className={inputClass}
                value={draft.title}
                onChange={(event) => update('title', event.target.value)}
              />
            </Field>
            <Field label={t('dashboard.editors.gallery.category')} htmlFor="admin-gallery-category">
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
          <Field label={t('dashboard.editors.gallery.caption')} htmlFor="admin-gallery-caption">
            <textarea
              id="admin-gallery-caption"
              rows={2}
              className={inputClass}
              value={draft.caption}
              onChange={(event) => update('caption', event.target.value)}
            />
          </Field>
          <Field label={t('dashboard.editors.common.image')} htmlFor="admin-gallery-image">
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
              label={t('dashboard.editors.gallery.showInGallery')}
              checked={draft.isVisible}
              onChange={(checked) => update('isVisible', checked)}
            />
            <Field label={t('dashboard.editors.common.order')} htmlFor="admin-gallery-order">
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
              {t('dashboard.editors.common.save')}
            </button>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className={secondaryButtonClass}
            >
              {t('dashboard.editors.common.cancel')}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {content.gallery.map((item) => (
          <div
            key={item.id}
            className="bg-surface border border-line rounded-xl overflow-hidden"
          >
            <div className="aspect-[4/3] bg-surface-muted">
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
                <p className="text-xs text-ocean">{item.categoryLabel}</p>
                <p className="font-medium text-ink">{item.title}</p>
                {item.isVisible === false && (
                  <span className="text-[10px] uppercase text-[#9B2C2C]">{t('dashboard.editors.gallery.hiddenBadge')}</span>
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
                  <Edit3 className="w-4 h-4" /> {t('dashboard.editors.common.edit')}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    void run(() => deleteGalleryItem(client, item.id), t('dashboard.editors.gallery.deleted'))
                  }
                  className={dangerButtonClass}
                  aria-label={`${t('dashboard.editors.common.delete')} ${item.title}`}
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
  const { t } = useLocale();
  const { busy, run } = useEditorAction({ onChanged, notify });
  const [draft, setDraft] = useState<BrigadeDraft | null>(null);
  const update = <K extends keyof BrigadeDraft>(key: K, value: BrigadeDraft[K]) =>
    setDraft((current) => (current ? { ...current, [key]: value } : current));

  return (
    <EditorShell
      title={t('dashboard.editors.brigade.title')}
      description={t('dashboard.editors.brigade.description')}
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
            void run(() => saveBrigadeMember(client, draft), t('dashboard.editors.brigade.saved')).then(
              (saved) => saved && setDraft(null),
            );
          }}
          className="bg-surface border border-ocean/30 rounded-xl p-6 space-y-5"
        >
          <h3 className="font-display text-xl font-semibold text-ink">
            {content.brigade.some((item) => item.id === draft.id)
              ? t('dashboard.editors.common.edit')
              : t('dashboard.editors.brigade.newMember')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label={t('dashboard.editors.brigade.name')} htmlFor="admin-team-name">
              <input
                id="admin-team-name"
                className={inputClass}
                value={draft.name}
                onChange={(event) => update('name', event.target.value)}
              />
            </Field>
            <Field label={t('dashboard.editors.brigade.role')} htmlFor="admin-team-role">
              <input
                id="admin-team-role"
                className={inputClass}
                value={draft.role}
                onChange={(event) => update('role', event.target.value)}
              />
            </Field>
            <Field label={t('dashboard.editors.brigade.tenure')} htmlFor="admin-team-tenure">
              <input
                id="admin-team-tenure"
                className={inputClass}
                value={draft.tenure}
                onChange={(event) => update('tenure', event.target.value)}
              />
            </Field>
            <Field label={t('dashboard.editors.common.order')} htmlFor="admin-team-order">
              <input
                id="admin-team-order"
                type="number"
                className={inputClass}
                value={draft.sortOrder}
                onChange={(event) => update('sortOrder', Number(event.target.value))}
              />
            </Field>
          </div>
          <Field label={t('dashboard.editors.brigade.bio')} htmlFor="admin-team-bio">
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
            label={t('dashboard.editors.brigade.showOnSite')}
            checked={draft.isVisible}
            onChange={(checked) => update('isVisible', checked)}
          />
          <div className="flex gap-3">
            <button type="submit" className={primaryButtonClass} disabled={busy}>
              {t('dashboard.editors.common.save')}
            </button>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className={secondaryButtonClass}
            >
              {t('dashboard.editors.common.cancel')}
            </button>
          </div>
        </form>
      )}

      <div className="bg-surface border border-line rounded-xl divide-y divide-line">
        {content.brigade.map((member) => (
          <div
            key={member.id}
            className="p-4 flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <div className="flex-1">
              <p className="font-medium text-ink">{member.name}</p>
              <p className="text-xs text-ink-muted">
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
              <Edit3 className="w-4 h-4" /> {t('dashboard.editors.common.edit')}
            </button>
            <button
              type="button"
              onClick={() =>
                void run(() => deleteBrigadeMember(client, member.id), t('dashboard.editors.brigade.deleted'))
              }
              className={dangerButtonClass}
              aria-label={`${t('dashboard.editors.common.delete')} ${member.name}`}
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
  const { t } = useLocale();
  const { busy, run } = useEditorAction({ onChanged, notify });
  const [draft, setDraft] = useState<FaqDraft | null>(null);
  const update = <K extends keyof FaqDraft>(key: K, value: FaqDraft[K]) =>
    setDraft((current) => (current ? { ...current, [key]: value } : current));

  return (
    <EditorShell
      title={t('dashboard.editors.faq.title')}
      description={t('dashboard.editors.faq.description')}
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
            void run(() => saveFaqItem(client, draft), t('dashboard.editors.faq.saved')).then(
              (saved) => saved && setDraft(null),
            );
          }}
          className="bg-surface border border-ocean/30 rounded-xl p-6 space-y-5"
        >
          <h3 className="font-display text-xl font-semibold text-ink">
            {content.faq.some((item) => item.id === draft.id)
              ? t('dashboard.editors.common.edit')
              : t('dashboard.editors.faq.newQuestion')}
          </h3>
          <Field label={t('dashboard.editors.faq.question')} htmlFor="admin-faq-question">
            <input
              id="admin-faq-question"
              className={inputClass}
              value={draft.question}
              onChange={(event) => update('question', event.target.value)}
            />
          </Field>
          <Field label={t('dashboard.editors.faq.answer')} htmlFor="admin-faq-answer">
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
            label={t('dashboard.editors.faq.showOnSite')}
            checked={draft.isVisible}
            onChange={(checked) => update('isVisible', checked)}
          />
          <div className="flex gap-3">
            <button type="submit" className={primaryButtonClass} disabled={busy}>
              {t('dashboard.editors.common.save')}
            </button>
            <button
              type="button"
              onClick={() => setDraft(null)}
              className={secondaryButtonClass}
            >
              {t('dashboard.editors.common.cancel')}
            </button>
          </div>
        </form>
      )}

      <div className="bg-surface border border-line rounded-xl divide-y divide-line">
        {content.faq.map((faq) => (
          <div
            key={faq.id}
            className="p-4 flex flex-col sm:flex-row sm:items-center gap-3"
          >
            <div className="flex-1">
              <p className="font-medium text-ink">{faq.question}</p>
              <p className="text-xs text-ink-muted line-clamp-1">{faq.answer}</p>
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
              <Edit3 className="w-4 h-4" /> {t('dashboard.editors.common.edit')}
            </button>
            <button
              type="button"
              onClick={() =>
                void run(() => deleteFaqItem(client, faq.id), t('dashboard.editors.faq.deleted'))
              }
              className={dangerButtonClass}
              aria-label={`${t('dashboard.editors.common.delete')} ${faq.question}`}
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
  const { t } = useLocale();
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
        cause instanceof Error ? cause.message : t('dashboard.editors.media.listError'),
      );
    }
  }, [client, t]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <EditorShell
      title={t('dashboard.editors.media.title')}
      description={t('dashboard.editors.media.description')}
    >
      <div className="bg-surface border border-line rounded-xl p-6 space-y-5">
        <label
          className={`${primaryButtonClass} w-fit ${uploading ? 'opacity-50 cursor-wait' : ''}`}
        >
          <ImagePlus className="w-4 h-4" aria-hidden="true" />
          {uploading ? t('dashboard.editors.media.uploading') : t('dashboard.editors.media.upload')}
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
                  notify(t('dashboard.editors.media.imported', { count: files.length }), 'success');
                  return load();
                })
                .catch((cause) =>
                  setError(cause instanceof Error ? cause.message : t('dashboard.editors.media.uploadError')),
                )
                .finally(() => setUploading(false));
            }}
          />
        </label>
        {error && <Notice tone="error">{error}</Notice>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.path} className="space-y-2">
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-line bg-surface-muted">
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
                  notify(t('dashboard.editors.media.copied'), 'success');
                }}
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-medium text-ocean hover:underline"
              >
                <Copy className="w-3.5 h-3.5" /> {t('dashboard.editors.media.copyUrl')}
              </button>
              <p className="text-[10px] text-ink-muted truncate" title={item.path}>
                {item.path}
              </p>
            </div>
          ))}
        </div>
        {items.length === 0 && !error && (
          <p className="text-sm text-ink-muted">{t('dashboard.editors.media.empty')}</p>
        )}
      </div>
    </EditorShell>
  );
}

const LOCALE_TO_INTL: Record<Locale, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  ar: 'ar',
  sw: 'sw',
};

function formatRecordDate(iso: string, locale: Locale): string {
  try {
    return new Intl.DateTimeFormat(LOCALE_TO_INTL[locale] || locale, {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'Indian/Comoro',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function formatRecordSummary(record: ClientRecord, locale: Locale): string {
  const d = record.details || {};
  const itemWord = locale === 'fr' ? 'article(s)' : locale === 'ar' ? 'عنصر' : locale === 'sw' ? 'bidhaa' : 'item(s)';
  const guestsWord = locale === 'fr' ? 'pers.' : locale === 'ar' ? 'أشخاص' : locale === 'sw' ? 'watu' : 'guests';
  if (record.kind === 'order') {
    const count = typeof d.itemCount === 'number' ? d.itemCount : Array.isArray(d.items) ? d.items.length : 0;
    const total = typeof d.totalKmf === 'number' ? formatKmf(d.totalKmf) : '';
    return [count ? `${count} ${itemWord}` : null, total].filter(Boolean).join(' · ');
  }
  const ref = typeof d.reference === 'string' ? d.reference : '';
  const date = typeof d.date === 'string' ? d.date : '';
  const time = typeof d.timeSlot === 'string' ? d.timeSlot : '';
  const guests = typeof d.guests === 'string' ? d.guests : '';
  const seating = typeof d.seating === 'string' ? d.seating : '';
  return [ref, date && time ? `${date} ${time}` : date || time, guests ? `${guests} ${guestsWord}` : null, seating]
    .filter(Boolean)
    .join(' · ');
}

export function ClientRecordsEditor({ client, notify }: ClientRecordsEditorProps) {
  const { t, locale } = useLocale();
  const [records, setRecords] = useState<ClientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listClientRecords(client);
      setRecords(data);
      setError(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t('dashboard.clients.loadError'));
    } finally {
      setLoading(false);
    }
  }, [client, t]);

  useEffect(() => {
    void load();
  }, [load]);

  const remove = async (id: string) => {
    setBusy(true);
    try {
      await deleteClientRecord(id, client);
      setRecords((current) => current.filter((r) => r.id !== id));
      notify(t('dashboard.clients.deleted'), 'success');
    } catch (cause) {
      notify(cause instanceof Error ? cause.message : t('dashboard.clients.deleteError'), 'error');
    } finally {
      setBusy(false);
    }
  };

  const clearAll = async () => {
    if (!window.confirm(t('dashboard.clients.deleteAllConfirm'))) return;
    setBusy(true);
    try {
      await clearClientRecords(client);
      setRecords([]);
      notify(t('dashboard.clients.cleared'), 'success');
    } catch (cause) {
      notify(cause instanceof Error ? cause.message : t('dashboard.clients.deleteError'), 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <EditorShell
      title={t('dashboard.clients.title')}
      description={t('dashboard.clients.description')}
    >
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => void load()} className={secondaryButtonClass} disabled={loading || busy}>
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
          {t('dashboard.clients.refresh')}
        </button>
        {records.length > 0 && (
          <button type="button" onClick={() => void clearAll()} className={dangerButtonClass} disabled={busy}>
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            {t('dashboard.clients.deleteAll')}
          </button>
        )}
        <span className="text-xs text-ink-muted">{t('dashboard.clients.count', { count: records.length })}</span>
      </div>

      {error && <Notice tone="error">{error}</Notice>}

      {!loading && records.length === 0 && !error && (
        <Notice>{t('dashboard.clients.empty')}</Notice>
      )}

      <div className="bg-surface border border-line rounded-xl divide-y divide-line">
        {records.map((record) => (
          <div key={record.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-ocean/10 text-ocean flex items-center justify-center shrink-0">
              <UserRound className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-ink">{record.name || '—'}</p>
                <span
                  className={`text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded ${
                    record.kind === 'order'
                      ? 'bg-ocean/10 text-ocean'
                      : 'bg-[#9A6B26]/15 text-[#9A6B26]'
                  }`}
                >
                  {record.kind === 'order' ? t('dashboard.clients.order') : t('dashboard.clients.reservation')}
                </span>
                <span className="text-xs text-ink-muted">{formatRecordDate(record.createdAt, locale)}</span>
              </div>
              <p className="text-sm text-ink tabular-nums">
                <a href={`tel:${record.phone.replace(/\s+/g, '')}`} className="hover:text-ocean underline-offset-2 hover:underline">
                  {record.phone}
                </a>
                {record.email ? <span className="text-ink-muted"> · {record.email}</span> : null}
              </p>
              <p className="text-xs text-ink-muted leading-relaxed">{formatRecordSummary(record, locale) || '—'}</p>
              {record.kind === 'order' && Array.isArray(record.details?.items) && (
                <ul className="text-xs text-ink-muted list-disc pl-4 space-y-0.5">
                  {(record.details.items as Array<{ name?: string; quantity?: number; priceKmf?: number }>).slice(0, 8).map((it, idx) => (
                    <li key={idx}>
                      {it.quantity ?? 1} × {it.name ?? '—'}
                      {typeof it.priceKmf === 'number' && typeof it.quantity === 'number'
                        ? ` — ${formatKmf(it.priceKmf * it.quantity)}`
                        : ''}
                    </li>
                  ))}
                </ul>
              )}
              {record.kind === 'reservation' && typeof record.details?.notes === 'string' && record.details.notes && (
                <p className="text-xs text-ink-muted">{t('dashboard.clients.note', { note: record.details.notes })}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => void remove(record.id)}
              className={dangerButtonClass}
              aria-label={t('dashboard.clients.deleteRecord', { name: record.name || '—' })}
              disabled={busy}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <Notice>{t('dashboard.clients.migrationNotice')}</Notice>
    </EditorShell>
  );
}
