import type { MenuItem } from '../types';
import { formatKmf } from './format';

export interface CartLine {
  id: string;
  name: string;
  priceKmf: number;
  quantity: number;
  moment: MenuItem['moment'];
}

export type Cart = CartLine[];

/** Ajoute un plat au panier, ou incrémente sa quantité s'il est déjà présent. */
export function addToCart(cart: Cart, item: MenuItem): Cart {
  if (cart.some((line) => line.id === item.id)) {
    return changeQuantity(cart, item.id, 1);
  }

  return [
    ...cart,
    {
      id: item.id,
      name: item.name,
      priceKmf: item.priceKmf,
      quantity: 1,
      moment: item.moment,
    },
  ];
}

/** Ajuste une quantité ; une valeur nulle ou négative retire la ligne. */
export function changeQuantity(cart: Cart, id: string, delta: number): Cart {
  return cart.flatMap((line) => {
    if (line.id !== id) return [line];
    const quantity = line.quantity + delta;
    return quantity > 0 ? [{ ...line, quantity }] : [];
  });
}

export function removeFromCart(cart: Cart, id: string): Cart {
  return cart.filter((line) => line.id !== id);
}

export function getCartCount(cart: Cart): number {
  return cart.reduce((total, line) => total + line.quantity, 0);
}

/** Total de la commande, en francs comoriens. */
export function getCartTotal(cart: Cart): number {
  return cart.reduce((total, line) => total + line.priceKmf * line.quantity, 0);
}

/** Message pré-rempli envoyé au restaurant via WhatsApp. */
export function buildOrderMessage(cart: Cart): string {
  const lines = [
    'Bonjour Le New Select, je souhaite commander les plats suivants :',
    '',
    ...cart.map(
      (line) =>
        `- ${line.quantity} × ${line.name} — ${formatKmf(line.priceKmf * line.quantity)}`,
    ),
    '',
    `Total : ${formatKmf(getCartTotal(cart))}`,
    '',
    'Merci de me confirmer la disponibilité et le délai de préparation.',
  ];

  return lines.join('\n');
}
