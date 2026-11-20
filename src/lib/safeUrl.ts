/**
 * Les URLs éditables depuis le dashboard sont affichées dans le navigateur.
 * On n'autorise que les schémas utiles au site afin qu'un contenu injecté ne
 * puisse pas produire un lien `javascript:` ou `data:`.
 */

function normalize(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

/** Liens externes : uniquement http(s), jamais `javascript:` / `data:`. */
export function safeExternalUrl(value: unknown, fallback = ''): string {
  const input = normalize(value);
  if (!input) return fallback;
  try {
    const url = new URL(input);
    if (url.protocol === 'https:' || url.protocol === 'http:') return input;
  } catch {
    // URL relative ou invalide : refusée pour un lien externe.
  }
  return fallback;
}

/** Liens téléphoniques : uniquement `tel:` avec des chiffres. */
export function safePhoneUrl(value: unknown, fallback = ''): string {
  const input = normalize(value);
  if (!input) return fallback;
  return /^tel:\+?[\d\s().-]{3,30}$/i.test(input) ? input : fallback;
}

/** Images : chemins relatifs du build ou URL http(s). */
export function safeImageUrl(value: unknown, fallback = ''): string {
  const input = normalize(value);
  if (!input) return fallback;
  if (input.startsWith('/') && !input.startsWith('//')) return input;
  return safeExternalUrl(input, fallback);
}
