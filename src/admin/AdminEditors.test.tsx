import { fireEvent, render, screen } from '@testing-library/react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_CONTENT } from '../data/siteContent';
import { LocaleProvider } from '../i18n/LocaleContext';
import { MenuEditor } from './AdminEditors';

const client = {} as SupabaseClient;

describe('MenuEditor', () => {
  it('accepte un prix qui n’est pas un multiple de 100', async () => {
    const dish = { ...DEFAULT_CONTENT.menu[0]!, priceKmf: 3750 };

    render(
      <LocaleProvider>
        <MenuEditor
          client={client}
          content={{ ...DEFAULT_CONTENT, menu: [dish] }}
          onChanged={vi.fn(async () => undefined)}
          notify={vi.fn()}
        />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: `Modifier ${dish.name}` }));

    const price = document.querySelector<HTMLInputElement>('#admin-dish-price');
    expect(price).not.toBeNull();
    expect(price?.value).toBe('3750');
    expect(price?.getAttribute('step')).toBe('1');
    expect(price?.checkValidity()).toBe(true);
  });
});
