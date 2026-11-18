import { useState } from 'react';
import { Check, MessageCircle, Minus, Plus, ShoppingBasket, Trash2 } from 'lucide-react';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useLocale } from '../i18n/LocaleContext';
import {
  addToCart,
  buildOrderMessage,
  changeQuantity,
  getCartCount,
  getCartTotal,
  removeFromCart,
} from '../lib/cart';
import { saveClientRecord, summarizeCart } from '../lib/clientRecords';
import { formatKmf } from '../lib/format';
import type { Cart } from '../lib/cart';
import type { MenuItem, MenuMoment, PageId } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface MenuPageProps {
  onNavigate: (page: PageId) => void;
}

const ORDERED_MOMENTS: Exclude<MenuMoment, 'all'>[] = [
  'petit-dejeuner',
  'dejeuner',
  'diner',
  'desserts-boissons',
];

export function MenuPage({ onNavigate }: MenuPageProps) {
  const { content, live } = useLocalizedContent();
  const { locale, t } = useLocale();
  const { info, chef, heroImage } = content.settings;
  const menu = content.menu.filter((item) => item.isVisible !== false);

  const momentTabs: { id: MenuMoment; label: string }[] = [
    { id: 'all', label: t('menu.all') },
    { id: 'petit-dejeuner', label: t('menu.breakfast') },
    { id: 'dejeuner', label: t('menu.lunch') },
    { id: 'diner', label: t('menu.dinner') },
    { id: 'desserts-boissons', label: t('menu.dessertsDrinks') },
  ];

  const momentHeadings: Record<Exclude<MenuMoment, 'all'>, { title: string; hours: string }> = {
    'petit-dejeuner': { title: t('menu.headings.breakfast.title'), hours: t('menu.headings.breakfast.hours') },
    dejeuner: { title: t('menu.headings.lunch.title'), hours: t('menu.headings.lunch.hours') },
    diner: { title: t('menu.headings.dinner.title'), hours: t('menu.headings.dinner.hours') },
    'desserts-boissons': { title: t('menu.headings.dessertsDrinks.title'), hours: t('menu.headings.dessertsDrinks.hours') },
  };

  const chefItem: MenuItem = {
    id: 'plat-du-jour',
    name: chef.dishName,
    description: chef.subtitle,
    priceKmf: chef.priceKmf,
    moment: 'dejeuner',
    sectionLabel: chef.title,
    tag: t('common.accordingToArrival'),
    image: heroImage,
  };

  const [selectedMoment, setSelectedMoment] = useState<MenuMoment>('all');
  const [cart, setCart] = useState<Cart>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderError, setOrderError] = useState<string | null>(null);
  const [sendingOrder, setSendingOrder] = useState(false);

  const visibleMoments = selectedMoment === 'all' ? ORDERED_MOMENTS : [selectedMoment];

  const cartCount = getCartCount(cart);
  const cartTotal = getCartTotal(cart);

  const quantityFor = (id: string) => cart.find((line) => line.id === id)?.quantity ?? 0;

  const sendOrder = async () => {
    if (cart.length === 0) return;
    const name = customerName.trim();
    const phone = customerPhone.trim();
    if (name.length < 2 || phone.replace(/\D/g, '').length < 6) {
      setOrderError(t('menu.customerRequired'));
      return;
    }
    setOrderError(null);
    setSendingOrder(true);
    const details = {
      items: summarizeCart(cart),
      totalKmf: cartTotal,
      itemCount: cartCount,
      message: buildOrderMessage(cart, locale, { name, phone }),
    };
    try {
      await saveClientRecord({
        kind: 'order',
        name,
        phone,
        locale,
        details,
      });
    } finally {
      setSendingOrder(false);
    }
    const whatsappUrl = `${info.whatsappHref}?text=${encodeURIComponent(
      buildOrderMessage(cart, locale, { name, phone }),
    )}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-10 md:py-14 space-y-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-line pb-8">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-medium text-ocean">
              {t('menu.kicker')}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink text-balance">
              {t('menu.title')}
            </h1>
            <p className="text-base text-ink-muted leading-relaxed">
              {t('menu.intro')}
            </p>
            {live && (
              <p className="inline-flex items-center gap-1.5 text-xs font-medium text-ocean">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-ocean"
                  aria-hidden="true"
                />
                {t('common.liveMenu')}
              </p>
            )}
          </div>
        </div>

        {/* Plat du jour du chef */}
        <section
          aria-label={t('menu.chefSuggestion')}
          className="rounded-xl bg-surface-alt border border-line p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold text-ocean">
              {chef.title} · {chef.subtitle}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink">
              {chef.dishName}
            </h2>
            <p className="text-xs text-ink-muted">{chef.availability}</p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end gap-3 shrink-0">
            <span className="font-mono text-xl font-semibold text-ink tabular-nums">
              {formatKmf(chef.priceKmf)}
            </span>
            <button
              type="button"
              onClick={() => setCart((current) => addToCart(current, chefItem))}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ocean hover:underline whitespace-nowrap shrink-0 cursor-pointer"
            >
              {quantityFor(chefItem.id) > 0 ? (
                <Check className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Plus className="w-4 h-4" aria-hidden="true" />
              )}
              {quantityFor(chefItem.id) > 0
                ? t('common.addedCount', { count: quantityFor(chefItem.id) })
                : t('common.addToCart')}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('reservation')}
              className="text-xs font-medium text-ink-muted hover:text-ocean underline underline-offset-4 cursor-pointer"
            >
              {t('common.ratherBook')}
            </button>
          </div>
        </section>

        {/* Moment Filter Tabs */}
        <div className="space-y-3">
          <div
            role="group"
            aria-label={t('menu.tabsAria')}
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-surface-alt border border-line rounded-xl w-fit"
          >
            {momentTabs.map((tab) => {
              const isActive = selectedMoment === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedMoment(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-surface text-ink shadow-xs border border-line'
                      : 'text-ink-muted hover:text-ink'
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
            {t('common.viewCart', { count: cartCount, total: formatKmf(cartTotal) })}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Cart */}
          <aside
            id="panier-commande"
            aria-label={t('menu.cartAria')}
            className={`${
              cartOpen ? 'block' : 'hidden'
            } lg:block lg:sticky lg:top-24 lg:col-span-4 lg:order-last`}
          >
            <div className="bg-surface border border-line rounded-xl p-6 space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-ocean">{t('common.currentOrder')}</p>
                  <h2 className="font-display text-2xl font-semibold text-ink">
                    {t('common.yourCart')}
                  </h2>
                </div>
                <span
                  className="rounded-full bg-ocean/10 px-2.5 py-1 text-xs font-semibold text-ocean tabular-nums"
                  aria-live="polite"
                >
                  {cartCount} {cartCount > 1 ? t('common.articles') : t('common.article')}
                </span>
              </div>

              {cart.length === 0 ? (
                <p className="text-sm text-ink-muted leading-relaxed rounded-lg bg-canvas border border-dashed border-line-strong p-4">
                  {t('common.cartEmpty')}
                </p>
              ) : (
                <ul className="divide-y divide-line">
                  {cart.map((line) => (
                    <li key={line.id} className="py-3 flex flex-col gap-2.5 first:pt-0">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-ink leading-snug">
                          {line.name}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setCart((current) => removeFromCart(current, line.id))
                          }
                          aria-label={t('common.remove', { name: line.name })}
                          className="text-ink-muted hover:text-[#9B2C2C] cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex items-center border border-line-strong rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              setCart((current) => changeQuantity(current, line.id, -1))
                            }
                            aria-label={t('common.removeUnit', { name: line.name })}
                            className="w-9 h-9 flex items-center justify-center text-ink hover:bg-surface-alt cursor-pointer"
                          >
                            <Minus className="w-4 h-4" aria-hidden="true" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-ink tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setCart((current) => changeQuantity(current, line.id, 1))
                            }
                            aria-label={t('common.addUnit', { name: line.name })}
                            className="w-9 h-9 flex items-center justify-center text-ink hover:bg-surface-alt cursor-pointer"
                          >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-ocean tabular-nums">
                          {formatKmf(line.priceKmf * line.quantity)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="border-t border-line pt-4 space-y-3">
                <p className="text-xs font-semibold text-ink">{t('menu.customerInfoTitle')}</p>
                <div className="space-y-1.5">
                  <label htmlFor="cart-customer-name" className="block text-xs font-medium text-ink-muted">
                    {t('menu.customerName')} *
                  </label>
                  <input
                    id="cart-customer-name"
                    type="text"
                    autoComplete="name"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (orderError) setOrderError(null);
                    }}
                    placeholder={t('menu.customerNamePlaceholder')}
                    className="w-full px-3 py-2.5 rounded-lg border border-line-strong bg-surface text-sm text-ink focus:outline-2 focus:outline-ocean"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="cart-customer-phone" className="block text-xs font-medium text-ink-muted">
                    {t('menu.customerWhatsApp')} *
                  </label>
                  <input
                    id="cart-customer-phone"
                    type="tel"
                    autoComplete="tel"
                    value={customerPhone}
                    onChange={(e) => {
                      setCustomerPhone(e.target.value);
                      if (orderError) setOrderError(null);
                    }}
                    placeholder={t('menu.customerWhatsAppPlaceholder')}
                    className="w-full px-3 py-2.5 rounded-lg border border-line-strong bg-surface text-sm text-ink focus:outline-2 focus:outline-ocean tabular-nums"
                  />
                </div>
                {orderError && (
                  <p role="alert" className="text-xs font-medium text-[#9B2C2C] bg-[#9B2C2C]/8 border border-[#9B2C2C]/25 rounded-lg px-3 py-2">
                    {orderError}
                  </p>
                )}
              </div>

              <div className="border-t border-line pt-4 space-y-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium text-ink-muted">
                    {t('common.totalToPay')}
                  </span>
                  <span
                    className="font-display text-2xl font-semibold text-ink tabular-nums"
                    aria-live="polite"
                  >
                    {formatKmf(cartTotal)}
                  </span>
                </div>
                <p className="text-xs text-ink-muted">
                  {t('common.pricesNote')}
                </p>
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => void sendOrder()}
                  disabled={cart.length === 0 || sendingOrder}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0F4C45] text-white text-sm font-medium hover:bg-[#0B3A35] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  {sendingOrder ? '...' : t('common.validateOrder')}
                </button>
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCart([])}
                    className="w-full text-xs font-medium text-ink-muted hover:text-[#9B2C2C] cursor-pointer"
                  >
                    {t('common.emptyCart')}
                  </button>
                )}
                <p className="text-xs text-ink-muted leading-relaxed">
                  {t('common.orderNote')}
                </p>
              </div>
            </div>
          </aside>

          {/* Menu Sections */}
          <div className="lg:col-span-8 space-y-12">
            {visibleMoments.map((momentKey) => {
              const items = menu.filter((item) => item.moment === momentKey);
              const heading = momentHeadings[momentKey];

              return (
                <section key={momentKey} className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-ink/15 pb-3">
                    <h2 className="font-display text-3xl font-semibold text-ink">
                      {heading.title}
                    </h2>
                    <p className="text-xs text-ink-muted">{heading.hours}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {items.map((item) => {
                      const quantity = quantityFor(item.id);
                      return (
                        <article
                          key={item.id}
                          className="flex flex-col bg-surface border border-line rounded-xl overflow-hidden"
                        >
                          <div className="aspect-[16/10] overflow-hidden bg-surface-muted">
                            <ResilientImage
                              src={item.image ?? heroImage}
                              alt={item.name}
                              aspectClassName="aspect-[16/10]"
                            />
                          </div>
                          <div className="p-5 flex-1 flex flex-col gap-3">
                            <div className="flex items-baseline justify-between gap-3">
                              <h3 className="text-base font-semibold text-ink leading-snug">
                                {item.name}
                              </h3>
                              <span className="font-mono text-sm font-medium text-ink tabular-nums whitespace-nowrap shrink-0">
                                {formatKmf(item.priceKmf)}
                              </span>
                            </div>
                            <p className="text-sm text-ink-muted leading-relaxed">
                              {item.description}
                            </p>
                            <div className="pt-3 mt-auto border-t border-surface-alt flex items-center justify-between gap-3">
                              <span className="text-xs text-ink-muted">
                                {item.tag ?? t('common.preparedToOrder')}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setCart((current) => addToCart(current, item))
                                }
                                aria-label={`${t('common.add')} ${item.name}`}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#0F4C45] text-white hover:bg-[#0B3A35] transition-colors cursor-pointer shrink-0"
                              >
                                {quantity > 0 ? (
                                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                                ) : (
                                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                                )}
                                {quantity > 0 ? t('common.addedCount', { count: quantity }) : t('common.add')}
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
