import { describe, expect, it } from 'vitest';
import { resolveImageUrl } from './imageUrl';

describe('resolveImageUrl', () => {
  it('résout un ancien chemin /src/assets/images vers une URL d’image', () => {
    const resolved = resolveImageUrl(
      '/src/assets/images/dish_capitaine_poele_1794936280936.webp',
    );
    expect(resolved).toMatch(/^\//);
    expect(resolved).toContain('dish_capitaine_poele_1794936280936');
  });

  it('laisse inchangées les URL déjà publiées', () => {
    const url =
      'https://example.supabase.co/storage/v1/object/public/lns-media/photo.webp';
    expect(resolveImageUrl(url)).toBe(url);
  });
});
