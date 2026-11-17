import { describe, expect, it } from 'vitest';
import type { MenuItem } from '../types';
import {
  addToCart,
  buildOrderMessage,
  changeQuantity,
  getCartCount,
  getCartTotal,
  removeFromCart,
} from './cart';

const dish: MenuItem = {
  id: 'dej-capitaine',
  name: 'Capitaine poêlé, beurre citron-vanille',
  description: 'Filet de capitaine frais.',
  priceKmf: 7500,
  moment: 'dejeuner',
  sectionLabel: 'Déjeuner',
};

const dessert: MenuItem = {
  ...dish,
  id: 'des-mousse',
  name: 'Mousse au chocolat noir',
  priceKmf: 3000,
  moment: 'desserts-boissons',
  sectionLabel: 'Desserts',
};

describe('panier', () => {
  it('ajoute un plat puis incrémente sa quantité', () => {
    const cart = addToCart(addToCart([], dish), dish);
    expect(cart).toHaveLength(1);
    expect(cart[0]?.quantity).toBe(2);
    expect(getCartCount(cart)).toBe(2);
  });

  it('calcule le total en tenant compte des quantités', () => {
    const cart = addToCart(addToCart([], dessert), dish);
    expect(getCartTotal(cart)).toBe(10500);
    expect(getCartTotal(changeQuantity(cart, dish.id, 1))).toBe(18000);
  });

  it('retire une ligne quand la quantité atteint zéro', () => {
    const cart = addToCart([], dish);
    expect(changeQuantity(cart, dish.id, -1)).toEqual([]);
    expect(removeFromCart(cart, dish.id)).toEqual([]);
  });

  it('construit le message WhatsApp avec le détail et le total', () => {
    const cart = addToCart(addToCart([], dish), dessert);
    const message = buildOrderMessage(cart);
    expect(message).toContain('1 × Capitaine poêlé');
    expect(message).toContain('7 500 KMF');
    expect(message).toContain('Total : 10 500 KMF');
  });
});
