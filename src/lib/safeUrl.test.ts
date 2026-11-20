import { describe, expect, it } from 'vitest';
import { safeExternalUrl, safeImageUrl, safePhoneUrl } from './safeUrl';

describe('URLs sûres', () => {
  it('accepte les liens http(s) et refuse les schémas exécutables', () => {
    expect(safeExternalUrl('https://wa.me/2697730031')).toBe('https://wa.me/2697730031');
    expect(safeExternalUrl('  https://example.com/billets  ')).toBe(
      'https://example.com/billets',
    );
    expect(safeExternalUrl('javascript:alert(1)', 'https://safe.example')).toBe(
      'https://safe.example',
    );
    expect(safeExternalUrl('data:text/html,<script>alert(1)</script>', '')).toBe('');
  });

  it('accepte uniquement les liens tel: pour le téléphone', () => {
    expect(safePhoneUrl('tel:+2697730031')).toBe('tel:+2697730031');
    expect(safePhoneUrl('javascript:alert(1)', 'tel:+2697730031')).toBe(
      'tel:+2697730031',
    );
  });

  it('accepte les images relatives et http(s)', () => {
    expect(safeImageUrl('/assets/images/hero.webp')).toBe('/assets/images/hero.webp');
    expect(safeImageUrl('https://example.com/photo.jpg')).toBe(
      'https://example.com/photo.jpg',
    );
    expect(safeImageUrl('javascript:alert(1)', '/fallback.webp')).toBe('/fallback.webp');
  });
});
