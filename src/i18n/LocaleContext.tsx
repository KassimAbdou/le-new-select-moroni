import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DEFAULT_LOCALE, LOCALE_META, type Locale } from './types';
import { formatMessage, ui } from './ui';

const STORAGE_KEY = 'lns-locale';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: 'ltr' | 'rtl';
  t: (path: string, values?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value === 'fr' || value === 'en' || value === 'ar' || value === 'sw';
}

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) return stored;
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('ar')) return 'ar';
  if (lang.startsWith('en')) return 'en';
  if (lang.startsWith('sw')) return 'sw';
  return DEFAULT_LOCALE;
}

function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

const META: Record<
  Locale,
  { description: string; ogTitle: string; ogDescription: string; ogLocale: string }
> = {
  fr: {
    description:
      "Le New Select à Moroni, Place de France. Cuisine française et européenne au cœur des Comores : terrasse ombragée, salle climatisée, poissons de l'océan Indien et réservations.",
    ogTitle: 'Le New Select — Moroni | Place de France',
    ogDescription:
      "Cuisine française et européenne au cœur de Moroni. Découvrez la carte, l'histoire de la maison et réservez votre table en terrasse ou en salle climatisée.",
    ogLocale: 'fr_FR',
  },
  en: {
    description:
      'Le New Select in Moroni, Place de France. French and European cuisine in the heart of the Comoros: shaded terrace, air-conditioned dining room, Indian Ocean fish and reservations.',
    ogTitle: 'Le New Select — Moroni | Place de France',
    ogDescription:
      'French and European cuisine in the heart of Moroni. Explore the menu, our story and book your table on the terrace or in the air-conditioned dining room.',
    ogLocale: 'en_US',
  },
  ar: {
    description:
      'لو نيو سيليكت في موروني، ساحة فرنسا. مطبخ فرنسي وأوروبي في قلب جزر القمر: شرفة مظللة، قاعة مكيفة، أسماك المحيط الهندي وحجوزات.',
    ogTitle: 'لو نيو سيليكت — موروني | ساحة فرنسا',
    ogDescription:
      'مطبخ فرنسي وأوروبي في قلب موروني. اكتشف القائمة وقصتنا واحجز طاولتك في الشرفة أو في القاعة المكيفة.',
    ogLocale: 'ar',
  },
  sw: {
    description:
      'Le New Select huko Moroni, Place de France. Vyakula vya Kifaransa na Ulaya katikati ya Komori: mtaro wenye kivuli, chumba chenye kiyoyozi, samaki wa Bahari ya Hindi na uhifadhi.',
    ogTitle: 'Le New Select — Moroni | Place de France',
    ogDescription:
      'Vyakula vya Kifaransa na Ulaya katikati ya Moroni. Gundua menyu, historia yetu na uhifadhi meza yako mtaroni au ndani ya chumba chenye kiyoyozi.',
    ogLocale: 'sw_KE',
  },
};

function setMeta(
  selector: string,
  content: string,
  attr: 'content' | 'href' = 'content',
) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, content);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
  }, []);

  const dir = LOCALE_META[locale].dir;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    const meta = META[locale];
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:locale"]', meta.ogLocale);
    setMeta('meta[property="og:title"]', meta.ogTitle);
    setMeta('meta[property="og:description"]', meta.ogDescription);
    setMeta('meta[name="twitter:title"]', meta.ogTitle);
    setMeta('meta[name="twitter:description"]', meta.ogDescription);
  }, [locale, dir]);

  const t = useCallback(
    (path: string, values?: Record<string, string | number>) => {
      const fromLocale = getByPath(ui[locale], path);
      const fallback = getByPath(ui.fr, path);
      const raw =
        typeof fromLocale === 'string'
          ? fromLocale
          : typeof fallback === 'string'
            ? fallback
            : path;
      return values ? formatMessage(raw, values) : raw;
    },
    [locale],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, dir, t }),
    [locale, setLocale, dir, t],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within LocaleProvider');
  return context;
}
