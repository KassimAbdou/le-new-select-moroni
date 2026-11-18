import type { SupabaseClient } from '@supabase/supabase-js';
import type { Locale } from '../i18n/types';
import type { Cart } from './cart';
import { supabase } from './supabase';

export type ClientRecordKind = 'order' | 'reservation';

export interface ClientRecord {
  id: string;
  kind: ClientRecordKind;
  name: string;
  phone: string;
  email?: string | null;
  locale?: Locale | null;
  details: Record<string, unknown>;
  createdAt: string;
}

const LOCAL_KEY = 'lns-client-records';
const TABLE = 'lns_client_records';

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function readLocalRecords(): ClientRecord[] {
  if (typeof window === 'undefined') return [];
  const records = safeParse<ClientRecord[]>(window.localStorage.getItem(LOCAL_KEY), []);
  return Array.isArray(records) ? records : [];
}

function writeLocalRecords(records: ClientRecord[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(records.slice(0, 500)));
  } catch {
    // ignore storage quota/errors
  }
}

export function saveLocalClientRecord(
  input: Omit<ClientRecord, 'id' | 'createdAt'> & { id?: string; createdAt?: string },
): ClientRecord {
  const record: ClientRecord = {
    id: input.id ?? generateId(),
    createdAt: input.createdAt ?? new Date().toISOString(),
    kind: input.kind,
    name: input.name,
    phone: input.phone,
    email: input.email ?? null,
    locale: input.locale ?? null,
    details: input.details ?? {},
  };
  const records = readLocalRecords();
  records.unshift(record);
  writeLocalRecords(records);
  return record;
}

export async function saveClientRecord(
  input: Omit<ClientRecord, 'id' | 'createdAt'> & { id?: string; createdAt?: string },
  client: SupabaseClient | null = supabase,
): Promise<ClientRecord> {
  const record = saveLocalClientRecord(input);
  if (!client) return record;

  const { error } = await client.from(TABLE).insert({
    id: record.id,
    kind: record.kind,
    name: record.name,
    phone: record.phone,
    email: record.email ?? null,
    locale: record.locale ?? null,
    details: record.details,
    created_at: record.createdAt,
  });

  if (error) {
    // Keep local copy; table/policy may not exist yet.
    console.warn('Client record not saved to Supabase:', error.message);
  }
  return record;
}

export async function listClientRecords(
  client: SupabaseClient | null = supabase,
): Promise<ClientRecord[]> {
  if (client) {
    const { data, error } = await client
      .from(TABLE)
      .select('id, kind, name, phone, email, locale, details, created_at')
      .order('created_at', { ascending: false })
      .limit(200);
    if (!error && data) {
      return data.map((row) => ({
        id: String(row.id),
        kind: row.kind as ClientRecordKind,
        name: String(row.name ?? ''),
        phone: String(row.phone ?? ''),
        email: row.email ? String(row.email) : null,
        locale: (row.locale as Locale | null) ?? null,
        details: (row.details as Record<string, unknown>) ?? {},
        createdAt: String(row.created_at ?? new Date().toISOString()),
      }));
    }
  }
  return readLocalRecords();
}

function isMissingTableError(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes('schema cache') ||
    m.includes('could not find the table') ||
    m.includes('relation') && m.includes('does not exist') ||
    m.includes('42p01')
  );
}

export async function deleteClientRecord(
  id: string,
  client: SupabaseClient | null = supabase,
): Promise<void> {
  const records = readLocalRecords().filter((r) => r.id !== id);
  writeLocalRecords(records);
  if (client) {
    const { error } = await client.from(TABLE).delete().eq('id', id);
    if (error && !isMissingTableError(error.message)) {
      throw new Error(error.message);
    }
    if (error) {
      console.warn('Client record not deleted from Supabase:', error.message);
    }
  }
}

export async function clearClientRecords(
  client: SupabaseClient | null = supabase,
): Promise<void> {
  writeLocalRecords([]);
  if (client) {
    const { error } = await client.from(TABLE).delete().neq('id', '');
    if (error && !isMissingTableError(error.message)) {
      throw new Error(error.message);
    }
    if (error) {
      console.warn('Client records not cleared from Supabase:', error.message);
    }
  }
}

export function summarizeCart(cart: Cart) {
  return cart.map((line) => ({
    id: line.id,
    name: line.name,
    priceKmf: line.priceKmf,
    quantity: line.quantity,
    moment: line.moment,
  }));
}
