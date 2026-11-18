import type { MenuItem } from '../types';
import type { Locale } from '../i18n/types';
import { formatKmf } from './format';

export interface OrderCustomer {
  name: string;
  phone: string;
}

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

const ORDER_MESSAGES: Record<
  Locale,
  { intro: string; total: string; outro: string; name: string; phone: string }
> = {
  fr: {
    intro: 'Bonjour Le New Select, je souhaite commander les plats suivants :',
    total: 'Total :',
    outro: 'Merci de me confirmer la disponibilité et le délai de préparation.',
    name: 'Nom',
    phone: 'WhatsApp',
  },
  en: {
    intro: 'Hello Le New Select, I would like to order the following dishes:',
    total: 'Total:',
    outro: 'Please confirm availability and preparation time.',
    name: 'Name',
    phone: 'WhatsApp',
  },
  ar: {
    intro: 'مرحبًا لو نيو سيليكت، أود طلب الأطباق التالية:',
    total: 'الإجمالي:',
    outro: 'يرجى تأكيد التوفر ووقت التحضير.',
    name: 'الاسم',
    phone: 'واتساب',
  },
  sw: {
    intro: 'Habari Le New Select, ningependa kuagiza vyakula vifuatavyo:',
    total: 'Jumla:',
    outro: 'Tafadhali thibitisha upatikanaji na muda wa maandalizi.',
    name: 'Jina',
    phone: 'WhatsApp',
  },
};

/** Message pré-rempli envoyé au restaurant via WhatsApp. */
export function buildOrderMessage(
  cart: Cart,
  locale: Locale = 'fr',
  customer?: OrderCustomer,
): string {
  const msg = ORDER_MESSAGES[locale];
  const lines = [
    msg.intro,
    '',
    ...cart.map(
      (line) =>
        `- ${line.quantity} × ${line.name} — ${formatKmf(line.priceKmf * line.quantity)}`,
    ),
    '',
    `${msg.total} ${formatKmf(getCartTotal(cart))}`,
    customer?.name?.trim() ? `- ${msg.name} : ${customer.name.trim()}` : null,
    customer?.phone?.trim() ? `- ${msg.phone} : ${customer.phone.trim()}` : null,
    '',
    msg.outro,
  ];

  return lines.filter((line): line is string => line !== null).join('\n');
}
