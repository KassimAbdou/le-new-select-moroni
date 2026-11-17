export type PageId =
  'accueil' | 'menu' | 'histoire' | 'galerie' | 'reservation' | 'infos';

export type MenuMoment =
  'all' | 'petit-dejeuner' | 'dejeuner' | 'diner' | 'desserts-boissons';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  priceKmf: number;
  moment: Exclude<MenuMoment, 'all'>;
  sectionLabel: string;
  tag?: string;
  isSignature?: boolean;
  image?: string;
  /** false = masqué côté client, mais encore visible dans le dashboard. */
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
