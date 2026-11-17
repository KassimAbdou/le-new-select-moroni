import { useContext } from 'react';
import { SiteContentContext } from '../context/siteContentContext';

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent doit être utilisé dans SiteContentProvider');
  }
  return context;
}
