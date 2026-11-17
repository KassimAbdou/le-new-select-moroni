import { useState } from 'react';
import { Check, MessageCircle, Minus, Plus, ShoppingBasket, Trash2 } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';
import {
  addToCart,
  buildOrderMessage,
  changeQuantity,
  getCartCount,
  getCartTotal,
  removeFromCart,
} from '../lib/cart';
import { formatKmf } from '../lib/format';
import type { Cart } from '../lib/cart';
import type { MenuItem, MenuMoment, PageId } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface MenuPageProps {
  onNavigate: (page: PageId) => void;
}

const MOMENT_TABS: { id: MenuMoment; label: string }[] = [
  { id: 'all', label: 'Toute la carte' },
  { id: 'petit-dejeuner', label: 'Petit-déjeuner · dès 07h00' },
  { id: 'dejeuner', label: 'Déjeuner · 12h–15h' },
  { id: 'diner', label: 'Dîner · 18h30–23h' },
  { id: 'desserts-boissons', label: 'Desserts & Boissons' },
];

const ORDERED_MOMENTS: Exclude<MenuMoment, 'all'>[] = [
  'petit-dejeuner',
  'dejeuner',
  'diner',
  'desserts-boissons',
];

const MOMENT_HEADINGS: Record<
  Exclude<MenuMoment, 'all'>,
  { title: string; hours: string }
> = {
  'petit-dejeuner': {
    title: 'Petit-déjeuner',
    hours: 'Servi dès 07h00 jusqu’à 10h30 en terrasse et en salle',
  },
  dejeuner: {
    title: 'Déjeuner',
    hours: 'Servi de 12h00 à 15h00 · Formules et carte complète',
  },
  diner: {
    title: 'Dîner',
    hours: 'Servi de 18h30 à 23h00 · Grillades, poissons et classiques bistrot',
  },
  'desserts-boissons': {
    title: 'Desserts maison & Boissons',
    hours: 'Pâtisseries du jour, jus frais pressés et cafés',
  },
};

export function MenuPage({ onNavigate }: MenuPageProps) {
  const { content, live } = useSiteContent();
  const { info, chef, heroImage } = content.settings;
  const menu = content.menu.filter((item) => item.isVisible !== false);
  const chefItem: MenuItem = {
    id: 'plat-du-jour',
    name: chef.dishName,
    description: chef.subtitle,
    priceKmf: chef.priceKmf,
    moment: 'dejeuner',
    sectionLabel: chef.title,
    tag: 'Selon arrivage',
    image: heroImage,
  };

  const [selectedMoment, setSelectedMoment] = useState<MenuMoment>('all');
  const [cart, setCart] = useState<Cart>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const visibleMoments = selectedMoment === 'all' ? ORDERED_MOMENTS : [selectedMoment];

  const cartCount = getCartCount(cart);
  const cartTotal = getCartTotal(cart);
  const whatsappUrl = `${info.whatsappHref}?text=${encodeURIComponent(
    buildOrderMessage(cart),
  )}`;

  const quantityFor = (id: string) => cart.find((line) => line.id === id)?.quantity ?? 0;

  const sendOrder = () => {
    if (cart.length === 0) return;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-10 md:py-14 space-y-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#E2E6DF] pb-8">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-medium text-[#0F4C45]">
              La Carte & Menus · Tarifs nets en Francs Comoriens (KMF)
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#151A19] text-balance">
              Une carte rythmée par les heures du jour
            </h1>
            <p className="text-base text-[#4A5552] leading-relaxed">
              Du petit-déjeuner matinal aux grillades du soir, nos assiettes sont
              préparées à la commande avec les pêches côtières de Grande Comore.
              Sélectionnez vos plats, le total se calcule automatiquement et votre
              commande part directement sur WhatsApp.
            </p>
            {live && (
              <p className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0F4C45]">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#0F4C45]"
                  aria-hidden="true"
                />
                Carte mise à jour en direct
              </p>
            )}
          </div>
        </div>

        {/* Plat du jour du chef */}
        <section
          aria-label="Suggestion du chef"
          className="rounded-xl bg-[#F1F3EF] border border-[#E2E6DF] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold text-[#0F4C45]">
              {chef.title} · {chef.subtitle}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#151A19]">
              {chef.dishName}
            </h2>
            <p className="text-xs text-[#4A5552]">{chef.availability}</p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 shrink-0">
            <span className="font-mono text-xl font-semibold text-[#151A19] tabular-nums">
              {formatKmf(chef.priceKmf)}
            </span>
            <button
              type="button"
              onClick={() => setCart((current) => addToCart(current, chefItem))}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0F4C45] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
            >
              {quantityFor(chefItem.id) > 0 ? (
                <Check className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Plus className="w-4 h-4" aria-hidden="true" />
              )}
              {quantityFor(chefItem.id) > 0
                ? `Ajouté (${quantityFor(chefItem.id)})`
                : 'Ajouter au panier'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('reservation')}
              className="text-xs font-medium text-[#4A5552] hover:text-[#0F4C45] underline underline-offset-4 cursor-pointer"
            >
              Réserver une table plutôt
            </button>
          </div>
        </section>

        {/* Moment Filter Tabs */}
        <div className="space-y-3">
          <div
            role="group"
            aria-label="Filtrer la carte par moment de la journée"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F1F3EF] border border-[#E2E6DF] rounded-xl w-fit"
          >
            {MOMENT_TABS.map((tab) => {
              const isActive = selectedMoment === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedMoment(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#151A19] shadow-xs border border-[#E2E6DF]'
                      : 'text-[#4A5552] hover:text-[#151A19]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setCartOpen((open) => !open)}
            aria-expanded={cartOpen}
            aria-controls="panier-commande"
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0F4C45] text-white text-sm font-medium cursor-pointer"
          >
            <ShoppingBasket className="w-4 h-4" aria-hidden="true" />
            Voir le panier ({cartCount}) · {formatKmf(cartTotal)}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Cart */}
          <aside
            id="panier-commande"
            aria-label="Votre commande"
            className={`${
              cartOpen ? 'block' : 'hidden'
            } lg:block lg:sticky lg:top-24 lg:col-span-4 lg:order-last`}
          >
            <div className="bg-white border border-[#E2E6DF] rounded-xl p-6 space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-[#0F4C45]">Commande en cours</p>
                  <h2 className="font-display text-2xl font-semibold text-[#151A19]">
                    Votre panier
                  </h2>
                </div>
                <span
                  className="rounded-full bg-[#0F4C45]/10 px-2.5 py-1 text-xs font-semibold text-[#0F4C45] tabular-nums"
                  aria-live="polite"
                >
                  {cartCount} article{cartCount > 1 ? 's' : ''}
                </span>
              </div>

              {cart.length === 0 ? (
                <p className="text-sm text-[#4A5552] leading-relaxed rounded-lg bg-[#F8F9F7] border border-dashed border-[#D4DAD0] p-4">
                  Aucun plat sélectionné. Ajoutez un plat depuis la carte pour composer
                  votre commande.
                </p>
              ) : (
                <ul className="divide-y divide-[#E2E6DF]">
                  {cart.map((line) => (
                    <li key={line.id} className="py-3 flex flex-col gap-2.5 first:pt-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-[#151A19] leading-snug">
                          {line.name}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setCart((current) => removeFromCart(current, line.id))
                          }
                          aria-label={`Retirer ${line.name} du panier`}
                          className="text-[#4A5552] hover:text-[#9B2C2C] cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex items-center border border-[#D4DAD0] rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              setCart((current) => changeQuantity(current, line.id, -1))
                            }
                            aria-label={`Retirer une unité de ${line.name}`}
                            className="w-9 h-9 flex items-center justify-center text-[#151A19] hover:bg-[#F1F3EF] cursor-pointer"
                          >
                            <Minus className="w-4 h-4" aria-hidden="true" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-[#151A19] tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setCart((current) => changeQuantity(current, line.id, 1))
                            }
                            aria-label={`Ajouter une unité de ${line.name}`}
                            className="w-9 h-9 flex items-center justify-center text-[#151A19] hover:bg-[#F1F3EF] cursor-pointer"
                          >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-[#0F4C45] tabular-nums">
                          {formatKmf(line.priceKmf * line.quantity)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="border-t border-[#E2E6DF] pt-4 space-y-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium text-[#4A5552]">
                    Total à régler sur place
                  </span>
                  <span
                    className="font-display text-2xl font-semibold text-[#151A19] tabular-nums"
                    aria-live="polite"
                  >
                    {formatKmf(cartTotal)}
                  </span>
                </div>
                <p className="text-xs text-[#4A5552]">
                  Les prix sont indiqués en francs comoriens, taxes comprises.
                </p>
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={sendOrder}
                  disabled={cart.length === 0}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0F4C45] text-white text-sm font-medium hover:bg-[#0B3A35] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  Valider la commande
                </button>
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCart([])}
                    className="w-full text-xs font-medium text-[#4A5552] hover:text-[#9B2C2C] cursor-pointer"
                  >
                    Vider le panier
                  </button>
                )}
                <p className="text-xs text-[#4A5552] leading-relaxed">
                  Le détail de la commande est pré-rempli dans WhatsApp. Le restaurant
                  confirme la disponibilité et le délai de préparation avant le règlement
                  sur place.
                </p>
              </div>
            </div>
          </aside>

          {/* Menu Sections */}
          <div className="lg:col-span-8 space-y-12">
            {visibleMoments.map((momentKey) => {
              const items = menu.filter((item) => item.moment === momentKey);
              const heading = MOMENT_HEADINGS[momentKey];

              return (
                <section key={momentKey} className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#151A19]/15 pb-3">
                    <h2 className="font-display text-3xl font-semibold text-[#151A19]">
                      {heading.title}
                    </h2>
                    <p className="text-xs text-[#4A5552]">{heading.hours}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {items.map((item) => {
                      const quantity = quantityFor(item.id);
                      return (
                        <article
                          key={item.id}
                          className="flex flex-col bg-white border border-[#E2E6DF] rounded-xl overflow-hidden"
                        >
                          <div className="aspect-[16/10] overflow-hidden bg-[#EBF0EB]">
                            <ResilientImage
                              src={item.image ?? heroImage}
                              alt={item.name}
                              aspectClassName="aspect-[16/10]"
                            />
                          </div>
                          <div className="p-5 flex-1 flex flex-col gap-3">
                            <div className="flex items-baseline justify-between gap-3">
                              <h3 className="text-base font-semibold text-[#151A19] leading-snug">
                                {item.name}
                              </h3>
                              <span className="font-mono text-sm font-medium text-[#151A19] tabular-nums whitespace-nowrap shrink-0">
                                {formatKmf(item.priceKmf)}
                              </span>
                            </div>
                            <p className="text-sm text-[#4A5552] leading-relaxed">
                              {item.description}
                            </p>
                            <div className="pt-3 mt-auto border-t border-[#F1F3EF] flex items-center justify-between gap-3">
                              <span className="text-xs text-[#4A5552]">
                                {item.tag ?? 'Préparé à la commande'}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setCart((current) => addToCart(current, item))
                                }
                                aria-label={`Ajouter ${item.name} au panier`}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#0F4C45] text-white hover:bg-[#0B3A35] transition-colors cursor-pointer shrink-0"
                              >
                                {quantity > 0 ? (
                                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                                ) : (
                                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                                )}
                                {quantity > 0 ? `Ajouté (${quantity})` : 'Ajouter'}
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
