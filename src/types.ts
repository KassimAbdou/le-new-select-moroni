export type PageId =
  | 'accueil'
  | 'menu'
  | 'pizzas'
  | 'plats-du-jour'
  | 'histoire'
  | 'galerie'
  | 'evenements'
  | 'reservation'
  | 'infos';

export type MenuMoment =
  'all' | 'petit-dejeuner' | 'dejeuner' | 'diner' | 'desserts-boissons';

/** Prix alternatifs d'un même plat (ex. : 26 cm / 33 cm, PM / GM). */
export interface PriceOption {
  label: string;
  priceKmf: number;
}

/** Catégorie de carte, gérable depuis le dashboard. */
export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  isVisible?: boolean;
  sortOrder?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  priceKmf: number;
  moment: Exclude<MenuMoment, 'all'>;
  sectionLabel: string;
  /** Référence vers MenuCategory.id. */
  categoryId?: string;
  priceOptions?: PriceOption[];
  tag?: string;
  isSignature?: boolean;
  image?: string;
  /** false = masqué côté client, mais encore visible dans le dashboard. */
  isVisible?: boolean;
  sortOrder?: number;
}

/** Plat du jour daté : plusieurs entrées, seule la période en cours est affichée. */
export interface DailySpecial {
  id: string;
  title: string;
  dishName: string;
  description: string;
  priceKmf: number;
  image?: string;
  /** Dates inclusives, au format AAAA-MM-JJ (heure de Moroni). */
  startDate: string;
  endDate: string;
  availability?: string;
  isVisible?: boolean;
  sortOrder?: number;
}

/** Catégorie d'événement, ajoutable/supprimable depuis le dashboard. */
export interface EventCategory {
  id: string;
  name: string;
  description: string;
  isVisible?: boolean;
  sortOrder?: number;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  categoryId?: string;
  categoryLabel?: string;
  /** AAAA-MM-JJ. */
  eventDate: string;
  /** AAAA-MM-JJ, optionnel pour les événements sur plusieurs jours. */
  endDate?: string;
  /** Ex. : "19h30". */
  time?: string;
  location?: string;
  /** 0 = gratuit, undefined = prix non communiqué. */
  priceKmf?: number;
  image?: string;
  /** Prix unitaire d'un billet. Par défaut, `priceKmf` est utilisé. */
  ticketPriceKmf?: number;
  /** Nombre de places disponibles ; undefined = non limité/non renseigné. */
  ticketsAvailable?: number;
  /** Points de vente physiques ou modalités d'achat, affichés aux clients. */
  ticketSalePoints?: string;
  /** Lien de billetterie en ligne optionnel (billetterie externe). */
  ticketingUrl?: string;
  isVisible?: boolean;
  sortOrder?: number;
}

export type GalleryCategory = 'all' | 'terrasse' | 'salle' | 'plats' | 'evenements';

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: Exclude<GalleryCategory, 'all'>;
  categoryLabel: string;
  image: string;
  isVisible?: boolean;
  sortOrder?: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  origin: string;
  date: string;
  rating: number;
  title: string;
  quote: string;
  context: string;
}

export interface BrigadeMember {
  id: string;
  name: string;
  role: string;
  tenure: string;
  bio: string;
  isVisible?: boolean;
  sortOrder?: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  isVisible?: boolean;
  sortOrder?: number;
}
