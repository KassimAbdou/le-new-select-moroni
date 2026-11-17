import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/** URL du projet Supabase ; seule la clé publique anon doit être exposée au navigateur. */
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL?.trim() || 'https://nloedrakjuvdavyenqzy.supabase.co';

const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? '';

export const isSupabaseConfigured = anonKey.length > 0;

/**
 * Client unique, initialisé uniquement lorsque la clé anon est fournie.
 * Sans configuration, le site continue de fonctionner avec le contenu local.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(SUPABASE_URL, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
