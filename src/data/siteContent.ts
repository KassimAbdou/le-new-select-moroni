import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  BrigadeMember,
  DailySpecial,
  EventCategory,
  EventItem,
  FaqItem,
  GalleryCategory,
  GalleryItem,
  MenuCategory,
  MenuItem,
  MenuMoment,
  ReviewItem,
} from '../types';
import {
  BRIGADE,
  CHEF_DAILY_SPECIAL,
  DAILY_SPECIALS,
  EVENTS,
  EVENT_CATEGORIES,
  FAQ_ITEMS,
  FULL_MENU,
  GALLERY_ITEMS,
  IMAGES,
  MENU_CATEGORIES,
  RESTAURANT_INFO,
  SIGNATURE_DISHES,
  TRIPADVISOR_REVIEWS,
} from './restaurantData';
import { safeExternalUrl, safeImageUrl, safePhoneUrl } from '../lib/safeUrl';

export interface RestaurantInfo {
  name: string;
  tagline: string;
  address: string;
  country: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  email: string;
  hoursSummary: string;
  coordinates: { lat: number; lng: number };
  directionsUrl: string;
}

export interface ChefSpecial {
  title: string;
  subtitle: string;
  dishName: string;
  priceKmf: number;
  availability: string;
}

export interface SiteSettings {
  info: RestaurantInfo;
  heroImage: string;
  chef: ChefSpecial;
}

export interface SiteContent {
  settings: SiteSettings;
  menu: MenuItem[];
  menuCategories: MenuCategory[];
  dailySpecials: DailySpecial[];
  events: EventItem[];
  eventCategories: EventCategory[];
  signature: MenuItem[];
  gallery: GalleryItem[];
  brigade: BrigadeMember[];
  faq: FaqItem[];
  reviews: ReviewItem[];
}

export const MEDIA_BUCKET = 'lns-media';

const MENU_MOMENTS: Exclude<MenuMoment, 'all'>[] = [
  'petit-dejeuner',
  'dejeuner',
  'diner',
  'desserts-boissons',
];

const GALLERY_CATEGORIES: Exclude<GalleryCategory, 'all'>[] = [
  'terrasse',
  'salle',
  'plats',
  'evenements',
];

export const GALLERY_CATEGORY_LABELS: Record<Exclude<GalleryCategory, 'all'>, string> = {
  terrasse: 'Terrasse',
  salle: 'Salle',
  plats: 'Plats',
  evenements: 'Événements',
};

export const DEFAULT_CONTENT: SiteContent = {
  settings: {
    info: RESTAURANT_INFO,
    heroImage: IMAGES.heroTerrace,
    chef: CHEF_DAILY_SPECIAL,
  },
  menu: FULL_MENU,
  menuCategories: MENU_CATEGORIES,
  dailySpecials: DAILY_SPECIALS,
  events: EVENTS,
  eventCategories: EVENT_CATEGORIES,
  signature: SIGNATURE_DISHES,
  gallery: GALLERY_ITEMS,
  brigade: BRIGADE,
  faq: FAQ_ITEMS,
  reviews: TRIPADVISOR_REVIEWS,
};

type Nullable = string | null | undefined;
type Ranked = { sortOrder: number; isVisible: boolean };

interface SettingsRow {
  id: string;
  name: Nullable;
  tagline: Nullable;
  address: Nullable;
  country: Nullable;
  phone_display: Nullable;
  phone_href: Nullable;
  whatsapp_href: Nullable;
  email: Nullable;
  hours_summary: Nullable;
  latitude: number | null;
  longitude: number | null;
  directions_url: Nullable;
  hero_image_url: Nullable;
  chef_title: Nullable;
  chef_subtitle: Nullable;
  chef_dish_name: Nullable;
  chef_price_kmf: number | null;
  chef_availability: Nullable;
}

interface MenuRow {
  id: string;
  name: Nullable;
  description: Nullable;
  price_kmf: number | null;
  moment: Nullable;
  section_label: Nullable;
  category_id: Nullable;
  price_options: unknown;
  tag: Nullable;
  is_signature: boolean | null;
  image_url: Nullable;
  is_visible: boolean | null;
  sort_order: number | null;
}

interface MenuCategoryRow {
  id: string;
  name: Nullable;
  description: Nullable;
  is_visible: boolean | null;
  sort_order: number | null;
}

interface DailySpecialRow {
  id: string;
  title: Nullable;
  dish_name: Nullable;
  description: Nullable;
  price_kmf: number | null;
  image_url: Nullable;
  start_date: Nullable;
  end_date: Nullable;
  availability: Nullable;
  is_visible: boolean | null;
  sort_order: number | null;
}

interface EventCategoryRow {
  id: string;
  name: Nullable;
  description: Nullable;
  is_visible: boolean | null;
  sort_order: number | null;
}

interface EventRow {
  id: string;
  title: Nullable;
  description: Nullable;
  category_id: Nullable;
  category_label: Nullable;
  event_date: Nullable;
  end_date: Nullable;
  time: Nullable;
  location: Nullable;
  price_kmf: number | null;
  image_url: Nullable;
  ticket_price_kmf: number | null;
  tickets_available: number | null;
  ticket_sale_points: Nullable;
  ticketing_url: Nullable;
  is_visible: boolean | null;
  sort_order: number | null;
}

interface GalleryRow {
  id: string;
  title: Nullable;
  caption: Nullable;
  category: Nullable;
  category_label: Nullable;
  image_url: Nullable;
  is_visible: boolean | null;
  sort_order: number | null;
}

interface BrigadeRow {
  id: string;
  name: Nullable;
  role: Nullable;
  tenure: Nullable;
  bio: Nullable;
  is_visible: boolean | null;
  sort_order: number | null;
}

interface FaqRow {
  id: string;
  question: Nullable;
  answer: Nullable;
  is_visible: boolean | null;
  sort_order: number | null;
}

function parseMoment(value: Nullable): MenuItem['moment'] {
  return MENU_MOMENTS.find((moment) => moment === value) ?? 'dejeuner';
}

function parseCategory(value: Nullable): Exclude<GalleryCategory, 'all'> {
  return GALLERY_CATEGORIES.find((category) => category === value) ?? 'plats';
}

function parsePriceOptions(value: unknown): MenuItem['priceOptions'] {
  if (!Array.isArray(value)) return undefined;
  const options = value.flatMap((option) => {
    if (!option || typeof option !== 'object') return [];
    const candidate = option as {
      label?: unknown;
      price_kmf?: unknown;
      priceKmf?: unknown;
    };
    const label = typeof candidate.label === 'string' ? candidate.label : '';
    const price = Number(candidate.price_kmf ?? candidate.priceKmf);
    return label && Number.isFinite(price) ? [{ label, priceKmf: price }] : [];
  });
  return options.length > 0 ? options : undefined;
}

function parseDate(value: Nullable, fallback: string): string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? value
    : fallback;
}

function settingsToRow(settings: SiteSettings) {
  const { info, chef } = settings;
  return {
    id: 'main',
    name: info.name,
    tagline: info.tagline,
    address: info.address,
    country: info.country,
    phone_display: info.phoneDisplay,
    phone_href: info.phoneHref,
    whatsapp_href: info.whatsappHref,
    email: info.email,
    hours_summary: info.hoursSummary,
    latitude: info.coordinates.lat,
    longitude: info.coordinates.lng,
    directions_url: info.directionsUrl,
    hero_image_url: settings.heroImage,
    chef_title: chef.title,
    chef_subtitle: chef.subtitle,
    chef_dish_name: chef.dishName,
    chef_price_kmf: chef.priceKmf,
    chef_availability: chef.availability,
    updated_at: new Date().toISOString(),
  };
}

const LEGACY_HERO_IMAGE_URLS = new Set([
  'https://nloedrakjuvdavyenqzy.supabase.co/storage/v1/object/public/lns-media/1794952288782-zx72ww.png',
]);

function normalizeHeroImage(url: string | null | undefined, fallback: string): string {
  const value = url?.trim();
  if (!value) return fallback;
  if (LEGACY_HERO_IMAGE_URLS.has(value) || value.includes('1794952288782-zx72ww')) {
    return fallback;
  }
  return value;
}

function rowToSettings(row: SettingsRow | null): SiteSettings {
  if (!row) return DEFAULT_CONTENT.settings;
  const fallback = DEFAULT_CONTENT.settings;
  return {
    info: {
      name: row.name ?? fallback.info.name,
      tagline: row.tagline ?? fallback.info.tagline,
      address: row.address ?? fallback.info.address,
      country: row.country ?? fallback.info.country,
      phoneDisplay: row.phone_display ?? fallback.info.phoneDisplay,
      phoneHref: safePhoneUrl(row.phone_href, fallback.info.phoneHref),
      whatsappHref: safeExternalUrl(row.whatsapp_href, fallback.info.whatsappHref),
      email: row.email ?? fallback.info.email,
      hoursSummary: row.hours_summary ?? fallback.info.hoursSummary,
      coordinates: {
        lat: row.latitude ?? fallback.info.coordinates.lat,
        lng: row.longitude ?? fallback.info.coordinates.lng,
      },
      directionsUrl: safeExternalUrl(row.directions_url, fallback.info.directionsUrl),
    },
    heroImage: safeImageUrl(
      normalizeHeroImage(row.hero_image_url, fallback.heroImage),
      fallback.heroImage,
    ),
    chef: {
      title: row.chef_title ?? fallback.chef.title,
      subtitle: row.chef_subtitle ?? fallback.chef.subtitle,
      dishName: row.chef_dish_name ?? fallback.chef.dishName,
      priceKmf: row.chef_price_kmf ?? fallback.chef.priceKmf,
      availability: row.chef_availability ?? fallback.chef.availability,
    },
  };
}

export function menuItemToRow(item: MenuItem, rank: Ranked) {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price_kmf: item.priceKmf,
    moment: item.moment,
    section_label: item.sectionLabel,
    category_id: item.categoryId ?? null,
    price_options: item.priceOptions ?? [],
    tag: item.tag ?? null,
    is_signature: item.isSignature ?? false,
    image_url: item.image ?? null,
    is_visible: rank.isVisible,
    sort_order: rank.sortOrder,
    updated_at: new Date().toISOString(),
  };
}

function rowToMenuItem(row: MenuRow): MenuItem {
  return {
    id: row.id,
    name: row.name ?? 'Plat sans nom',
    description: row.description ?? '',
    priceKmf: Number(row.price_kmf ?? 0),
    moment: parseMoment(row.moment),
    sectionLabel: row.section_label ?? '',
    categoryId: row.category_id ?? undefined,
    priceOptions: parsePriceOptions(row.price_options),
    tag: row.tag ?? undefined,
    isSignature: row.is_signature ?? undefined,
    image: safeImageUrl(row.image_url) || undefined,
    isVisible: row.is_visible ?? true,
    sortOrder: row.sort_order ?? 0,
  };
}

export function menuCategoryToRow(category: MenuCategory, rank: Ranked) {
  return {
    id: category.id,
    name: category.name,
    description: category.description,
    is_visible: rank.isVisible,
    sort_order: rank.sortOrder,
    updated_at: new Date().toISOString(),
  };
}

function rowToMenuCategory(row: MenuCategoryRow): MenuCategory {
  return {
    id: row.id,
    name: row.name ?? 'Catégorie',
    description: row.description ?? '',
    isVisible: row.is_visible ?? true,
    sortOrder: row.sort_order ?? 0,
  };
}

export function dailySpecialToRow(special: DailySpecial, rank: Ranked) {
  return {
    id: special.id,
    title: special.title,
    dish_name: special.dishName,
    description: special.description,
    price_kmf: special.priceKmf,
    image_url: special.image ?? null,
    start_date: special.startDate,
    end_date: special.endDate,
    availability: special.availability ?? null,
    is_visible: rank.isVisible,
    sort_order: rank.sortOrder,
    updated_at: new Date().toISOString(),
  };
}

function rowToDailySpecial(row: DailySpecialRow): DailySpecial {
  return {
    id: row.id,
    title: row.title ?? 'Plat du jour',
    dishName: row.dish_name ?? '',
    description: row.description ?? '',
    priceKmf: Number(row.price_kmf ?? 0),
    image: safeImageUrl(row.image_url) || undefined,
    startDate: parseDate(row.start_date, ''),
    endDate: parseDate(row.end_date, row.start_date ?? ''),
    availability: row.availability ?? undefined,
    isVisible: row.is_visible ?? true,
    sortOrder: row.sort_order ?? 0,
  };
}

export function eventCategoryToRow(category: EventCategory, rank: Ranked) {
  return {
    id: category.id,
    name: category.name,
    description: category.description,
    is_visible: rank.isVisible,
    sort_order: rank.sortOrder,
    updated_at: new Date().toISOString(),
  };
}

function rowToEventCategory(row: EventCategoryRow): EventCategory {
  return {
    id: row.id,
    name: row.name ?? 'Catégorie',
    description: row.description ?? '',
    isVisible: row.is_visible ?? true,
    sortOrder: row.sort_order ?? 0,
  };
}

export function eventToRow(event: EventItem, rank: Ranked) {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    category_id: event.categoryId ?? null,
    category_label: event.categoryLabel ?? '',
    event_date: event.eventDate,
    end_date: event.endDate ?? null,
    time: event.time ?? null,
    location: event.location ?? null,
    price_kmf: event.priceKmf ?? null,
    image_url: event.image ?? null,
    ticket_price_kmf: event.ticketPriceKmf ?? null,
    tickets_available: event.ticketsAvailable ?? null,
    ticket_sale_points: event.ticketSalePoints ?? null,
    ticketing_url: event.ticketingUrl ?? null,
    is_visible: rank.isVisible,
    sort_order: rank.sortOrder,
    updated_at: new Date().toISOString(),
  };
}

function rowToEvent(row: EventRow): EventItem {
  return {
    id: row.id,
    title: row.title ?? 'Événement',
    description: row.description ?? '',
    categoryId: row.category_id ?? undefined,
    categoryLabel: row.category_label ?? undefined,
    eventDate: parseDate(row.event_date, ''),
    endDate: row.end_date ? parseDate(row.end_date, row.event_date ?? '') : undefined,
    time: row.time ?? undefined,
    location: row.location ?? undefined,
    priceKmf: row.price_kmf === null ? undefined : Number(row.price_kmf),
    image: safeImageUrl(row.image_url) || undefined,
    ticketPriceKmf:
      row.ticket_price_kmf === null ? undefined : Number(row.ticket_price_kmf),
    ticketsAvailable:
      row.tickets_available === null ? undefined : Number(row.tickets_available),
    ticketSalePoints: row.ticket_sale_points ?? undefined,
    ticketingUrl: safeExternalUrl(row.ticketing_url) || undefined,
    isVisible: row.is_visible ?? true,
    sortOrder: row.sort_order ?? 0,
  };
}

export function galleryItemToRow(item: GalleryItem, rank: Ranked) {
  return {
    id: item.id,
    title: item.title,
    caption: item.caption,
    category: item.category,
    category_label: GALLERY_CATEGORY_LABELS[item.category],
    image_url: item.image,
    is_visible: rank.isVisible,
    sort_order: rank.sortOrder,
    updated_at: new Date().toISOString(),
  };
}

function rowToGalleryItem(row: GalleryRow): GalleryItem {
  const category = parseCategory(row.category);
  return {
    id: row.id,
    title: row.title ?? 'Photo sans titre',
    caption: row.caption ?? '',
    category,
    categoryLabel: row.category_label ?? GALLERY_CATEGORY_LABELS[category],
    image: safeImageUrl(row.image_url),
    isVisible: row.is_visible ?? true,
    sortOrder: row.sort_order ?? 0,
  };
}

export function brigadeMemberToRow(member: BrigadeMember, rank: Ranked) {
  return {
    id: member.id,
    name: member.name,
    role: member.role,
    tenure: member.tenure,
    bio: member.bio,
    is_visible: rank.isVisible,
    sort_order: rank.sortOrder,
    updated_at: new Date().toISOString(),
  };
}

function rowToBrigadeMember(row: BrigadeRow): BrigadeMember {
  return {
    id: row.id,
    name: row.name ?? 'Membre',
    role: row.role ?? '',
    tenure: row.tenure ?? '',
    bio: row.bio ?? '',
    isVisible: row.is_visible ?? true,
    sortOrder: row.sort_order ?? 0,
  };
}

export function faqItemToRow(faq: FaqItem, rank: Ranked) {
  return {
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    is_visible: rank.isVisible,
    sort_order: rank.sortOrder,
    updated_at: new Date().toISOString(),
  };
}

function rowToFaqItem(row: FaqRow): FaqItem {
  return {
    id: row.id,
    question: row.question ?? 'Question',
    answer: row.answer ?? '',
    isVisible: row.is_visible ?? true,
    sortOrder: row.sort_order ?? 0,
  };
}

function withRank<T>(items: T[]): (T & Ranked)[] {
  return items.map((item, index) => ({
    ...item,
    isVisible: true,
    sortOrder: index * 10,
  }));
}

interface OptionalRows<T> {
  rows: T[];
  /** false = table absente (migration 004 non exécutée). */
  available: boolean;
}

function isMissingTableError(error: { code?: string; message?: string }): boolean {
  return (
    error.code === 'PGRST205' ||
    error.code === '42P01' ||
    /could not find the table/i.test(error.message ?? '')
  );
}

/**
 * Charge tout le contenu éditable. Les lignes masquées remontent aussi au dashboard.
 *
 * Les tables ajoutées par la migration 004 sont optionnelles : si elle n'a pas
 * encore été exécutée dans Supabase, le site utilise le contenu local pour ces
 * nouvelles sections, mais continue à charger toutes les modifications faites
 * dans les tables historiques (menu, infos, galerie, équipe, FAQ).
 */
export async function loadSiteContent(client: SupabaseClient): Promise<SiteContent> {
  const ordered = <T>(table: string) =>
    client
      .from(table)
      .select('*')
      .order('sort_order', { ascending: true })
      .returns<T[]>();

  const optional = async <T>(table: string): Promise<OptionalRows<T>> => {
    const { data, error } = await ordered<T>(table);
    if (!error) return { rows: data ?? [], available: true };
    if (isMissingTableError(error)) return { rows: [], available: false };
    throw new Error(error.message);
  };

  const [
    settingsResult,
    menuResult,
    galleryResult,
    brigadeResult,
    faqResult,
    menuCategoriesResult,
    dailySpecialsResult,
    eventsResult,
    eventCategoriesResult,
  ] = await Promise.all([
    client
      .from('lns_site_settings')
      .select('*')
      .eq('id', 'main')
      .maybeSingle<SettingsRow>(),
    ordered<MenuRow>('lns_menu_items'),
    ordered<GalleryRow>('lns_gallery_items'),
    ordered<BrigadeRow>('lns_brigade_members'),
    ordered<FaqRow>('lns_faq_items'),
    optional<MenuCategoryRow>('lns_menu_categories'),
    optional<DailySpecialRow>('lns_daily_specials'),
    optional<EventRow>('lns_events'),
    optional<EventCategoryRow>('lns_event_categories'),
  ]);

  const firstError = [
    settingsResult.error,
    menuResult.error,
    galleryResult.error,
    brigadeResult.error,
    faqResult.error,
  ].find((error) => error !== null);
  if (firstError) throw new Error(firstError.message);

  // Avant le premier import, le site affiche exactement le contenu d'origine.
  if (!settingsResult.data) return DEFAULT_CONTENT;

  const menu = (menuResult.data ?? []).map(rowToMenuItem);
  const menuCategories = menuCategoriesResult.available
    ? menuCategoriesResult.rows.map(rowToMenuCategory)
    : DEFAULT_CONTENT.menuCategories;
  const dailySpecials = dailySpecialsResult.available
    ? dailySpecialsResult.rows.map(rowToDailySpecial)
    : DEFAULT_CONTENT.dailySpecials;
  const eventCategories = eventCategoriesResult.available
    ? eventCategoriesResult.rows.map(rowToEventCategory)
    : DEFAULT_CONTENT.eventCategories;
  const events = eventsResult.available
    ? eventsResult.rows.map(rowToEvent)
    : DEFAULT_CONTENT.events;
  const categoryNames = new Map(
    eventCategories.map((category) => [category.id, category.name]),
  );
  const signatureFromMenu = menu
    .filter((item) => item.isSignature && item.isVisible !== false)
    .slice(0, 3);
  return {
    settings: rowToSettings(settingsResult.data),
    menu,
    menuCategories,
    dailySpecials,
    events: events.map((event) => ({
      ...event,
      categoryLabel:
        event.categoryLabel ?? categoryNames.get(event.categoryId ?? '') ?? '',
    })),
    eventCategories,
    signature:
      signatureFromMenu.length > 0 ? signatureFromMenu : DEFAULT_CONTENT.signature,
    gallery: (galleryResult.data ?? []).map(rowToGalleryItem),
    brigade: (brigadeResult.data ?? []).map(rowToBrigadeMember),
    faq: (faqResult.data ?? []).map(rowToFaqItem),
    reviews: DEFAULT_CONTENT.reviews,
  };
}

/**
 * Tables nouvelles (migration 004) encore absentes de la base Supabase.
 * Permet au dashboard d'afficher un avertissement au lieu d'échouer silencieusement.
 */
export async function getMissingContentTables(client: SupabaseClient): Promise<string[]> {
  const tables = [
    'lns_menu_categories',
    'lns_daily_specials',
    'lns_events',
    'lns_event_categories',
  ];
  const results = await Promise.all(
    tables.map((table) => client.from(table).select('id').limit(1)),
  );
  return tables.filter((_, index) => {
    const error = results[index]?.error;
    return Boolean(error && isMissingTableError(error));
  });
}

/** Ajoute le contenu d'origine manquant, sans écraser les modifications existantes. */
export async function initializeSiteContent(client: SupabaseClient) {
  const options = { onConflict: 'id', ignoreDuplicates: true } as const;
  const operations = [
    client
      .from('lns_site_settings')
      .upsert(settingsToRow(DEFAULT_CONTENT.settings), options),
    client.from('lns_menu_items').upsert(
      withRank(DEFAULT_CONTENT.menu).map((item) => menuItemToRow(item, item)),
      options,
    ),
    client.from('lns_menu_categories').upsert(
      withRank(DEFAULT_CONTENT.menuCategories).map((item) =>
        menuCategoryToRow(item, item),
      ),
      options,
    ),
    client.from('lns_daily_specials').upsert(
      withRank(DEFAULT_CONTENT.dailySpecials).map((item) =>
        dailySpecialToRow(item, item),
      ),
      options,
    ),
    client.from('lns_events').upsert(
      withRank(DEFAULT_CONTENT.events).map((item) => eventToRow(item, item)),
      options,
    ),
    client.from('lns_event_categories').upsert(
      withRank(DEFAULT_CONTENT.eventCategories).map((item) =>
        eventCategoryToRow(item, item),
      ),
      options,
    ),
    client.from('lns_gallery_items').upsert(
      withRank(DEFAULT_CONTENT.gallery).map((item) => galleryItemToRow(item, item)),
      options,
    ),
    client.from('lns_brigade_members').upsert(
      withRank(DEFAULT_CONTENT.brigade).map((item) => brigadeMemberToRow(item, item)),
      options,
    ),
    client.from('lns_faq_items').upsert(
      withRank(DEFAULT_CONTENT.faq).map((item) => faqItemToRow(item, item)),
      options,
    ),
  ];
  const results = await Promise.all(operations);
  const error = results.find((result) => result.error !== null)?.error;
  if (error) throw new Error(error.message);
}

/**
 * Applique la nouvelle carte (catégories, plats, plats du jour et événements)
 * en écrasant les lignes correspondantes. Les photos, horaires et textes du
 * restaurant ne sont pas modifiés.
 */
export async function importNewMenuContent(client: SupabaseClient) {
  const options = { onConflict: 'id' } as const;
  const operations = [
    client.from('lns_menu_items').upsert(
      withRank(DEFAULT_CONTENT.menu).map((item) => menuItemToRow(item, item)),
      options,
    ),
    client.from('lns_menu_categories').upsert(
      withRank(DEFAULT_CONTENT.menuCategories).map((item) =>
        menuCategoryToRow(item, item),
      ),
      options,
    ),
    client.from('lns_daily_specials').upsert(
      withRank(DEFAULT_CONTENT.dailySpecials).map((item) =>
        dailySpecialToRow(item, item),
      ),
      options,
    ),
    client.from('lns_events').upsert(
      withRank(DEFAULT_CONTENT.events).map((item) => eventToRow(item, item)),
      options,
    ),
    client.from('lns_event_categories').upsert(
      withRank(DEFAULT_CONTENT.eventCategories).map((item) =>
        eventCategoryToRow(item, item),
      ),
      options,
    ),
  ];
  const results = await Promise.all(operations);
  const error = results.find((result) => result.error !== null)?.error;
  if (error) throw new Error(error.message);

  // Les anciens plats qui ne font plus partie de la carte sont masqués.
  const ids = DEFAULT_CONTENT.menu.map((item) => item.id);
  const { error: hideError } = await client
    .from('lns_menu_items')
    .update({ is_visible: false })
    .not('id', 'in', `(${ids.join(',')})`);
  if (hideError) throw new Error(hideError.message);
}

export async function saveSiteSettings(client: SupabaseClient, settings: SiteSettings) {
  const { error } = await client
    .from('lns_site_settings')
    .upsert(settingsToRow(settings), { onConflict: 'id' });
  if (error) throw new Error(error.message);
}

export async function saveMenuItem(client: SupabaseClient, item: MenuItem & Ranked) {
  const { error } = await client
    .from('lns_menu_items')
    .upsert(menuItemToRow(item, item), { onConflict: 'id' });
  if (error) throw new Error(error.message);
}

export async function deleteMenuItem(client: SupabaseClient, id: string) {
  const { error } = await client.from('lns_menu_items').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function saveMenuCategory(
  client: SupabaseClient,
  category: MenuCategory & Ranked,
) {
  const { error } = await client
    .from('lns_menu_categories')
    .upsert(menuCategoryToRow(category, category), { onConflict: 'id' });
  if (error) throw new Error(error.message);
}

export async function deleteMenuCategory(client: SupabaseClient, id: string) {
  const { error } = await client.from('lns_menu_categories').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function saveDailySpecial(
  client: SupabaseClient,
  special: DailySpecial & Ranked,
) {
  const { error } = await client
    .from('lns_daily_specials')
    .upsert(dailySpecialToRow(special, special), { onConflict: 'id' });
  if (error) throw new Error(error.message);
}

export async function deleteDailySpecial(client: SupabaseClient, id: string) {
  const { error } = await client.from('lns_daily_specials').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function saveEventCategory(
  client: SupabaseClient,
  category: EventCategory & Ranked,
) {
  const { error } = await client
    .from('lns_event_categories')
    .upsert(eventCategoryToRow(category, category), { onConflict: 'id' });
  if (error) throw new Error(error.message);
}

export async function deleteEventCategory(client: SupabaseClient, id: string) {
  const { error } = await client.from('lns_event_categories').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function saveEvent(client: SupabaseClient, event: EventItem & Ranked) {
  const { error } = await client
    .from('lns_events')
    .upsert(eventToRow(event, event), { onConflict: 'id' });
  if (error) throw new Error(error.message);
}

export async function deleteEvent(client: SupabaseClient, id: string) {
  const { error } = await client.from('lns_events').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function saveGalleryItem(
  client: SupabaseClient,
  item: GalleryItem & Ranked,
) {
  const { error } = await client
    .from('lns_gallery_items')
    .upsert(galleryItemToRow(item, item), { onConflict: 'id' });
  if (error) throw new Error(error.message);
}

export async function deleteGalleryItem(client: SupabaseClient, id: string) {
  const { error } = await client.from('lns_gallery_items').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function saveBrigadeMember(
  client: SupabaseClient,
  member: BrigadeMember & Ranked,
) {
  const { error } = await client
    .from('lns_brigade_members')
    .upsert(brigadeMemberToRow(member, member), { onConflict: 'id' });
  if (error) throw new Error(error.message);
}

export async function deleteBrigadeMember(client: SupabaseClient, id: string) {
  const { error } = await client.from('lns_brigade_members').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function saveFaqItem(client: SupabaseClient, faq: FaqItem & Ranked) {
  const { error } = await client
    .from('lns_faq_items')
    .upsert(faqItemToRow(faq, faq), { onConflict: 'id' });
  if (error) throw new Error(error.message);
}

export async function deleteFaqItem(client: SupabaseClient, id: string) {
  const { error } = await client.from('lns_faq_items').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

/** Dépose une image dans le bucket dédié et renvoie son URL publique. */
export async function uploadMedia(client: SupabaseClient, file: File) {
  const extension =
    file.name
      .split('.')
      .pop()
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, '') || 'jpg';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
  const { error } = await client.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, { contentType: file.type, cacheControl: '3600' });
  if (error) throw new Error(error.message);
  const { data } = client.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function listMedia(client: SupabaseClient) {
  const { data, error } = await client.storage.from(MEDIA_BUCKET).list('', {
    limit: 100,
    sortBy: { column: 'created_at', order: 'desc' },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteMedia(client: SupabaseClient, path: string) {
  const { error } = await client.storage.from(MEDIA_BUCKET).remove([path]);
  if (error) throw new Error(error.message);
}
