import { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

export interface AdminSessionState {
  session: Session | null;
  authorized: boolean;
  checking: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
}

export function useAdminSession(client: SupabaseClient | null): AdminSessionState {
  const [session, setSession] = useState<Session | null>(null);
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(Boolean(client));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client) {
      setChecking(false);
      return;
    }

    let active = true;
    const sync = async (nextSession: Session | null) => {
      setSession(nextSession);
      setError(null);
      if (!nextSession) {
        setAuthorized(false);
        setChecking(false);
        return;
      }

      const { data, error: accessError } = await client
        .from('lns_admins')
        .select('user_id')
        .eq('user_id', nextSession.user.id)
        .maybeSingle();

      if (!active) return;
      if (accessError) {
        setError(accessError.message);
        setAuthorized(false);
      } else {
        setAuthorized(Boolean(data));
      }
      setChecking(false);
    };

    void client.auth.getSession().then(({ data }) => {
      if (active) void sync(data.session);
    });
    const { data } = client.auth.onAuthStateChange((_event, nextSession) => {
      void sync(nextSession);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [client]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!client) return 'Supabase n’est pas configuré.';
      setChecking(true);
      setError(null);
      const { error: signInError } = await client.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setChecking(false);
        return signInError.message;
      }
      return null;
    },
    [client],
  );

  const signOut = useCallback(async () => {
    if (!client) return;
    await client.auth.signOut();
    setSession(null);
    setAuthorized(false);
  }, [client]);

  return { session, authorized, checking, error, signIn, signOut };
}
