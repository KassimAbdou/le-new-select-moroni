import { useMemo } from 'react';
import { useSiteContent } from './useSiteContent';
import { useLocale } from '../i18n/LocaleContext';
import { localizeContent } from '../i18n/content';

export function useLocalizedContent() {
  const site = useSiteContent();
  const { locale } = useLocale();
  const content = useMemo(
    () => localizeContent(site.content, locale),
    [site.content, locale],
  );
  return { ...site, content };
}
