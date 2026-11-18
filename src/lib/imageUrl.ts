/**
 * Certaines lignes importées dans Supabase contiennent encore les anciens
 * chemins de développement `/src/assets/images/...`. Ils n'existent plus dans
 * le build : on les remplace par les URL des images traitées par Vite.
 */
const bundledImages = import.meta.glob<string>('../assets/images/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function resolveImageUrl(src: string): string {
  const match = /^\/?src\/assets\/images\/([^/?#]+)$/.exec(src.trim());
  if (!match) return src;
  return bundledImages[`../assets/images/${match[1]}`] ?? src;
}
