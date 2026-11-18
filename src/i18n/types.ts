export type Locale = 'fr' | 'en' | 'ar' | 'sw';

export const LOCALES: Locale[] = ['fr', 'en', 'ar', 'sw'];

export const LOCALE_META: Record<Locale, { label: string; nativeLabel: string; dir: 'ltr' | 'rtl' }> = {
  fr: { label: 'Français', nativeLabel: 'Français', dir: 'ltr' },
  en: { label: 'English', nativeLabel: 'English', dir: 'ltr' },
  ar: { label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl' },
  sw: { label: 'Swahili', nativeLabel: 'Kiswahili', dir: 'ltr' },
};

export const DEFAULT_LOCALE: Locale = 'fr';
