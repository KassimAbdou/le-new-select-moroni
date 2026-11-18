import { useState } from 'react';
import type { ReactNode } from 'react';
import { Upload } from 'lucide-react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { ResilientImage } from '../components/ResilientImage';
import { uploadMedia } from '../data/siteContent';

export const inputClass =
  'w-full px-3 py-2 rounded-lg border border-line-strong bg-surface text-sm text-ink placeholder:text-ink-faint focus:outline-2 focus:outline-ocean';

export const primaryButtonClass =
  'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0F4C45] text-white text-sm font-medium hover:bg-[#0B3A35] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

export const secondaryButtonClass =
  'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-line-strong bg-surface text-sm font-medium text-ink hover:bg-surface-alt transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

export const dangerButtonClass =
  'inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-[#9B2C2C]/30 text-sm font-medium text-[#9B2C2C] hover:bg-[#9B2C2C]/8 transition-colors cursor-pointer';

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-ink-muted leading-relaxed">{hint}</p>}
    </div>
  );
}

export function Notice({
  tone = 'info',
  children,
}: {
  tone?: 'info' | 'error' | 'success';
  children: ReactNode;
}) {
  const classes = {
    info: 'bg-[#0F4C45]/8 border-[#0F4C45]/25 text-ocean',
    error: 'bg-[#9B2C2C]/8 border-[#9B2C2C]/25 text-[#9B2C2C]',
    success: 'bg-[#0F4C45]/8 border-ocean/30 text-ocean',
  }[tone];
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`rounded-lg border px-4 py-3 text-sm leading-relaxed ${classes}`}
    >
      {children}
    </div>
  );
}

export function ToggleRow({
  label,
  description,
  checked,
  onChange,
  id,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-line bg-surface px-4 py-3">
      <div className="space-y-0.5">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-ink cursor-pointer"
        >
          {label}
        </label>
        {description && <p className="text-xs text-ink-muted">{description}</p>}
      </div>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="w-4 h-4 mt-0.5 accent-[#0F4C45] cursor-pointer"
      />
    </div>
  );
}

export function ImageField({
  id,
  value,
  onChange,
  client,
}: {
  id: string;
  value: string;
  onChange: (url: string) => void;
  client: SupabaseClient | null;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file || !client) return;
    setUploading(true);
    setError(null);
    try {
      onChange(await uploadMedia(client, file));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Envoi impossible');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id={id}
          type="url"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://… ou /chemin/local"
          className={inputClass}
        />
        <label
          className={`${secondaryButtonClass} whitespace-nowrap ${
            uploading ? 'opacity-50 cursor-wait' : ''
          }`}
        >
          <Upload className="w-4 h-4" aria-hidden="true" />
          {uploading ? 'Envoi…' : 'Importer'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="sr-only"
            disabled={uploading || !client}
            onChange={(event) => void handleFile(event.target.files?.[0])}
          />
        </label>
      </div>
      {error && <p className="text-xs text-[#9B2C2C]">{error}</p>}
      {value && (
        <div className="w-full max-w-sm aspect-[16/9] rounded-lg overflow-hidden border border-line bg-surface-muted">
          <ResilientImage
            src={value}
            alt="Aperçu de l’image"
            aspectClassName="aspect-[16/9]"
          />
        </div>
      )}
    </div>
  );
}
