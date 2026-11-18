import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_CONTENT, loadSiteContent, type SiteContent } from '../data/siteContent';
import { supabase } from '../lib/supabase';
import {
  SiteContentContext,
  type ContentSource,
  type SiteContentContextValue,
} from './siteContentContext';

const REALTIME_TABLES = [
  'lns_site_settings',
  'lns_menu_items',
  'lns_menu_categories',
  'lns_daily_specials',
  'lns_events',
  'lns_event_categories',
  'lns_gallery_items',
  'lns_brigade_members',
  'lns_faq_items',
];

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [source, setSource] = useState<ContentSource>('local');
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const refreshTimer = useRef<number | undefined>(undefined);

  const refresh = useCallback(async (strict = false) => {
    if (!supabase) return;
    try {
      const next = await loadSiteContent(supabase);
      setContent(next);
      setSource('supabase');
      setError(null);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'Erreur Supabase inconnue';
      setSource('local');
      setError(message);
      if (strict) throw new Error(message, { cause });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!supabase) return;
    setLoading(true);
    void refresh();
  }, [refresh]);

  // Un abonnement Realtime rafraîchit la page client dès que le dashboard écrit.
  // Un canal par table : si la migration 004 n'est pas encore appliquée, les
  // canaux des tables manquantes échouent sans bloquer ceux des tables existantes.
  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimer.current);
      refreshTimer.current = window.setTimeout(() => void refresh(), 150);
    };

    let connected = 0;
    const channels = REALTIME_TABLES.map((table) => {
      const channel = client.channel(`lns-site-content-${table}`);
      channel.on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        scheduleRefresh,
      );
      channel.subscribe((status) => {
        if (status === 'SUBSCRIBED') connected += 1;
        if (status === 'CLOSED' || status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          connected = Math.max(0, connected - 1);
        }
        setLive(connected > 0);
      });
      return channel;
    });

    return () => {
      window.clearTimeout(refreshTimer.current);
      channels.forEach((channel) => void client.removeChannel(channel));
      setLive(false);
    };
  }, [refresh]);

  const value = useMemo<SiteContentContextValue>(
    () => ({
      content,
      source,
      live,
      loading,
      error,
      client: supabase,
      refresh,
    }),
    [content, source, live, loading, error, refresh],
  );

  return (
    <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
  );
}
