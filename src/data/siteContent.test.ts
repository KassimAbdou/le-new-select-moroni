import type { SupabaseClient } from '@supabase/supabase-js';
import { describe, expect, it } from 'vitest';
import { DEFAULT_CONTENT, loadSiteContent } from './siteContent';

function fakeClient(dataByTable: Record<string, unknown[]>): SupabaseClient {
  return {
    from: (table: string) => {
      const rows = dataByTable[table] ?? [];
      const chain = {
        select: () => chain,
        eq: () => chain,
        order: () => chain,
        maybeSingle: async () => ({ data: rows[0] ?? null, error: null }),
        returns: async () => ({ data: rows, error: null }),
      };
      return chain;
    },
  } as unknown as SupabaseClient;
}

describe('contenu du site', () => {
  it('utilise le contenu local avant le premier import Supabase', async () => {
    const content = await loadSiteContent(fakeClient({}));
    expect(content).toBe(DEFAULT_CONTENT);
  });

  it('convertit les lignes Supabase en contenu client', async () => {
    const client = fakeClient({
      lns_site_settings: [
        {
          id: 'main',
          name: 'Le New Select Test',
          tagline: 'Test',
          latitude: -11.7,
          longitude: 43.25,
          chef_dish_name: 'Poisson du jour',
          chef_price_kmf: 7000,
        },
      ],
      lns_menu_items: [
        {
          id: 'plat-test',
          name: 'Plat test',
          description: 'Description',
          price_kmf: 4200,
          moment: 'dejeuner',
          section_label: 'Déjeuner',
          tag: null,
          is_signature: true,
          image_url: '/plat.webp',
          is_visible: true,
          sort_order: 0,
        },
      ],
    });

    const content = await loadSiteContent(client);
    expect(content.settings.info.name).toBe('Le New Select Test');
    expect(content.settings.chef.dishName).toBe('Poisson du jour');
    expect(content.menu[0]).toMatchObject({
      id: 'plat-test',
      priceKmf: 4200,
      image: '/plat.webp',
    });
    expect(content.signature[0]?.name).toBe('Plat test');
  });
});
