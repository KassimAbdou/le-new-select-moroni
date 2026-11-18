import { createContext } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { SiteContent } from '../data/siteContent';

export type ContentSource = 'local' | 'supabase';

export interface SiteContentContextValue {
  content: SiteContent;
  source: ContentSource;
  live: boolean;
  loading: boolean;
  error: string | null;
  client: SupabaseClient | null;
  /** strict=true remonte l'erreur à l'appelant (utilisé après un enregistrement). */
  refresh: (strict?: boolean) => Promise<void>;
}

export const SiteContentContext = createContext<SiteContentContextValue | null>(null);
