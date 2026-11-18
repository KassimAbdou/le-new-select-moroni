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

  it('convertit les catégories, prix multiples, plats du jour et événements', async () => {
    const client = fakeClient({
      lns_site_settings: [{ id: 'main', name: 'Le New Select Test' }],
      lns_menu_items: [
        {
          id: 'pizza-test',
          name: 'Pizza test',
          description: '',
          price_kmf: 2750,
          moment: 'diner',
          section_label: 'Pizzas',
          category_id: 'cat-pizzas',
          price_options: [
            { label: '26 cm', price_kmf: 2750 },
            { label: '33 cm', price_kmf: 4000 },
          ],
          is_visible: true,
          sort_order: 0,
        },
      ],
      lns_menu_categories: [
        {
          id: 'cat-pizzas',
          name: 'Pizzas',
          description: 'Pizzas maison',
          is_visible: true,
          sort_order: 0,
        },
      ],
      lns_daily_specials: [
        {
          id: 'special-test',
          title: 'Plat du jour',
          dish_name: 'Poisson grillé',
          description: '',
          price_kmf: 6800,
          start_date: '2026-11-18',
          end_date: '2026-11-20',
          is_visible: true,
          sort_order: 0,
        },
      ],
      lns_events: [
        {
          id: 'event-test',
          title: 'Soirée jazz',
          description: '',
          category_id: 'evt-cat-soirees',
          event_date: '2026-11-28',
          time: '19h30',
          price_kmf: 0,
          ticket_price_kmf: 2500,
          tickets_available: 40,
          ticket_sale_points: 'Au comptoir du restaurant',
          ticketing_url: 'https://example.com/billets',
          is_visible: true,
          sort_order: 0,
        },
      ],
      lns_event_categories: [
        {
          id: 'evt-cat-soirees',
          name: 'Soirées & concerts',
          description: '',
          is_visible: true,
          sort_order: 0,
        },
      ],
    });

    const content = await loadSiteContent(client);
    const pizza = content.menu[0]!;
    expect(pizza).toMatchObject({ categoryId: 'cat-pizzas' });
    expect(pizza.priceOptions).toEqual([
      { label: '26 cm', priceKmf: 2750 },
      { label: '33 cm', priceKmf: 4000 },
    ]);
    expect(content.menuCategories[0]?.name).toBe('Pizzas');
    expect(content.dailySpecials[0]).toMatchObject({
      dishName: 'Poisson grillé',
      startDate: '2026-11-18',
      endDate: '2026-11-20',
    });
    expect(content.events[0]).toMatchObject({
      categoryLabel: 'Soirées & concerts',
      priceKmf: 0,
      ticketPriceKmf: 2500,
      ticketsAvailable: 40,
      ticketSalePoints: 'Au comptoir du restaurant',
      ticketingUrl: 'https://example.com/billets',
    });
    expect(content.dailySpecials).toHaveLength(1);
    expect(content.eventCategories[0]?.name).toBe('Soirées & concerts');
  });

  it('charge les modifications existantes même si la migration 004 est absente', async () => {
    const missingTable = {
      code: 'PGRST205',
      message: "Could not find the table 'public.lns_events' in the schema cache",
    };
    const newTables = [
      'lns_menu_categories',
      'lns_daily_specials',
      'lns_events',
      'lns_event_categories',
    ];
    const client = {
      from: (table: string) => {
        const rows =
          table === 'lns_site_settings'
            ? [{ id: 'main', name: 'Nom modifié' }]
            : table === 'lns_menu_items'
              ? [
                  {
                    id: 'plat-modifie',
                    name: 'Plat modifié',
                    price_kmf: 4200,
                    moment: 'dejeuner',
                    section_label: 'Test',
                    is_visible: true,
                    sort_order: 0,
                  },
                ]
              : [];
        const chain = {
          select: () => chain,
          eq: () => chain,
          order: () => chain,
          maybeSingle: async () => ({ data: rows[0] ?? null, error: null }),
          returns: async () =>
            newTables.includes(table)
              ? { data: null, error: missingTable }
              : { data: rows, error: null },
        };
        return chain;
      },
    } as unknown as SupabaseClient;

    const content = await loadSiteContent(client);
    expect(content.menu[0]?.name).toBe('Plat modifié');
    expect(content.menuCategories).toEqual(DEFAULT_CONTENT.menuCategories);
    expect(content.dailySpecials).toEqual(DEFAULT_CONTENT.dailySpecials);
    expect(content.events).toEqual(DEFAULT_CONTENT.events);
  });
});
