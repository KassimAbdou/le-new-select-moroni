import { useEffect, useState } from 'react';
import {
  CalendarDays,
  Check,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBasket,
  Trash2,
} from 'lucide-react';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useLocale } from '../i18n/LocaleContext';
import { formatSpecialPeriod, getActiveDailySpecials } from '../lib/dailySpecials';
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
import type { DailySpecial, MenuItem, MenuMoment, PageId } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface MenuPageProps {
  onNavigate: (page: PageId) => void;
  /** Section mise en avant quand on arrive depuis le header (pizzas / plats du jour). */
  focus?: 'pizzas' | 'daily-specials';
}

const ORDERED_MOMENTS: Exclude<MenuMoment, 'all'>[] = [
  'petit-dejeuner',
  'dejeuner',
  'diner',
  'desserts-boissons',
];

export function MenuPage({ onNavigate, focus }: MenuPageProps) {
  const { content, live } = useLocalizedContent();
  const { locale, t } = useLocale();
  const { info, heroImage } = content.settings;

  const menu = content.menu.filter((item) => item.isVisible !== false);
  const activeSpecials = getActiveDailySpecials(content.dailySpecials);
  const menuCategories = content.menuCategories
    .filter((category) => category.isVisible !== false)
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const momentTabs: { id: MenuMoment; label: string }[] = [
    { id: 'all', label: t('menu.all') },
    { id: 'petit-dejeuner', label: t('menu.breakfast') },
    { id: 'dejeuner', label: t('menu.lunch') },
    { id: 'diner', label: t('menu.dinner') },
    { id: 'desserts-boissons', label: t('menu.dessertsDrinks') },
  ];

  const momentHeadings: Record<
    Exclude<MenuMoment, 'all'>,
    { title: string; hours: string }
  > = {
    'petit-dejeuner': {
      title: t('menu.headings.breakfast.title'),
      hours: t('menu.headings.breakfast.hours'),
    },
    dejeuner: {
      title: t('menu.headings.lunch.title'),
      hours: t('menu.headings.lunch.hours'),
    },
    diner: {
      title: t('menu.headings.dinner.title'),
      hours: t('menu.headings.dinner.hours'),
    },
    'desserts-boissons': {
      title: t('menu.headings.dessertsDrinks.title'),
      hours: t('menu.headings.dessertsDrinks.hours'),
    },
  };

  /** Un plat du jour devient une ligne de panier classique, avec un identifiant dédié. */
  const specialToMenuItem = (special: DailySpecial): MenuItem => ({
    id: `special-${special.id}`,
    name: special.dishName,
    description: special.description,
    priceKmf: special.priceKmf,
    moment: 'dejeuner',
    sectionLabel: special.title,
    tag: special.availability ?? t('common.accordingToArrival'),
    image: special.image ?? heroImage,
  });

  /** Regroupe les plats d'un moment par catégorie, puis par lot « Autres ». */
  const groupsFor = (items: MenuItem[]) => {
    const groups = menuCategories
      .map((category) => ({
        key: category.id,
        name: category.name,
        description: category.description,
        items: items.filter((item) => item.categoryId === category.id),
      }))
      .filter((group) => group.items.length > 0);

    const uncategorized = items.filter(
      (item) =>
        !item.categoryId ||
        !menuCategories.some((category) => category.id === item.categoryId),
    );
    if (uncategorized.length > 0) {
      groups.push({
        key: 'other',
        name: t('menu.all'),
        description: '',
        items: uncategorized,
      });
    }
    return groups;
  };

  const cartLineId = (itemId: string, optionLabel?: string) =>
    optionLabel ? `${itemId}::${optionLabel}` : itemId;

  const [selectedMoment, setSelectedMoment] = useState<MenuMoment>(
    focus === 'pizzas' ? 'diner' : 'all',
  );
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [cart, setCart] = useState<Cart>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderError, setOrderError] = useState<string | null>(null);
  const [sendingOrder, setSendingOrder] = useState(false);

  // Arrivée depuis le header : on amène directement la section demandée sous
  // l'en-tête fixe, une fois le menu rendu.
  useEffect(() => {
    if (!focus) return;
    const targetId = focus === 'pizzas' ? 'menu-pizzas' : 'menu-daily-specials';
    const timer = window.setTimeout(() => {
      const target = document.getElementById(targetId);
      if (typeof target?.scrollIntoView === 'function') {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
    return () => window.clearTimeout(timer);
  }, [focus]);

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
            <p className="text-xs font-medium text-ocean">{t('menu.kicker')}</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink text-balance">
              {t('menu.title')}
            </h1>
            <p className="text-base text-ink-muted leading-relaxed">{t('menu.intro')}</p>
            {live && (
              <p className="inline-flex items-center gap-1.5 text-xs font-medium text-ocean">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean" aria-hidden="true" />
                {t('common.liveMenu')}
              </p>
            )}
          </div>
        </div>

        {/* Plats du jour en cours */}
        <section
          id="menu-daily-specials"
          aria-labelledby="daily-specials-heading"
          className="rounded-xl bg-surface-alt border border-line p-6 sm:p-8 space-y-6 scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-line pb-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-ocean">
                {t('home.dailySpecialKicker')}
              </p>
              <h2
                id="daily-specials-heading"
                className="font-display text-2xl md:text-3xl font-semibold text-ink"
              >
                {t('home.dailySpecialTitle')}
              </h2>
            </div>
          </div>

          {activeSpecials.length === 0 ? (
            <p className="text-sm text-ink-muted leading-relaxed rounded-lg bg-canvas border border-dashed border-line-strong p-4">
              {t('menu.noDailySpecial')}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeSpecials.map((special) => {
                const item = specialToMenuItem(special);
                const quantity = quantityFor(item.id);
                const period = formatSpecialPeriod(special);

                return (
                  <article
                    key={special.id}
                    className="flex flex-col sm:flex-row gap-5 bg-surface border border-line rounded-xl overflow-hidden"
                  >
                    <div className="sm:w-40 sm:self-start shrink-0 overflow-hidden bg-surface-muted">
                      <ResilientImage
                        src={special.image ?? heroImage}
                        alt={special.dishName}
                      />
                    </div>
                    <div className="p-5 sm:p-6 flex-1 flex flex-col gap-3">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-ocean">
                          {special.title}
                        </p>
                        <h3 className="font-display text-xl font-semibold text-ink leading-snug">
                          {special.dishName}
                        </h3>
                      </div>
                      <p className="text-sm text-ink-muted leading-relaxed">
                        {special.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                        {period && (
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays
                              className="w-3.5 h-3.5 text-ocean"
                              aria-hidden="true"
                            />
                            {period}
                          </span>
                        )}
                        {special.availability && <span>{special.availability}</span>}
                      </div>
                      <div className="pt-3 mt-auto border-t border-surface-alt flex flex-wrap items-center justify-between gap-3">
                        <span className="font-mono text-lg font-semibold text-ink tabular-nums">
                          {formatKmf(special.priceKmf)}
                        </span>
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setCart((current) => addToCart(current, item))}
                            aria-label={`${t('common.add')} ${special.dishName}`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-burgundy text-white hover:bg-burgundy-hover transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
                          >
                            {quantity > 0 ? (
                              <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            ) : (
                              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            )}
                            {quantity > 0
                              ? t('common.addedCount', { count: quantity })
                              : t('common.add')}
                          </button>
                          <button
                            type="button"
                            onClick={() => onNavigate('reservation')}
                            className="text-xs font-medium text-ink-muted hover:text-ocean underline underline-offset-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
                          >
                            {t('common.ratherBook')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
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
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-burgundy text-white text-sm font-medium cursor-pointer"
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
                  <p className="text-xs font-medium text-ocean">
                    {t('common.currentOrder')}
                  </p>
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
                          className="text-ink-muted hover:text-burgundy cursor-pointer shrink-0"
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
                <p className="text-xs font-semibold text-ink">
                  {t('menu.customerInfoTitle')}
                </p>
                <div className="space-y-1.5">
                  <label
                    htmlFor="cart-customer-name"
                    className="block text-xs font-medium text-ink-muted"
                  >
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
                  <label
                    htmlFor="cart-customer-phone"
                    className="block text-xs font-medium text-ink-muted"
                  >
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
                  <p
                    role="alert"
                    className="text-xs font-medium text-burgundy bg-burgundy/8 border border-burgundy/25 rounded-lg px-3 py-2"
                  >
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
                <p className="text-xs text-ink-muted">{t('common.pricesNote')}</p>
              </div>

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => void sendOrder()}
                  disabled={cart.length === 0 || sendingOrder}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-burgundy text-white text-sm font-medium hover:bg-burgundy-hover transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  {sendingOrder ? '...' : t('common.validateOrder')}
                </button>
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCart([])}
                    className="w-full text-xs font-medium text-ink-muted hover:text-burgundy cursor-pointer"
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
              const groups = groupsFor(items);
              const pizzaGroupIndex = groups.findIndex(
                (group) => /pizza/i.test(group.name) || group.key === 'cat-pizzas',
              );

              return (
                <section key={momentKey} className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-ink/15 pb-3">
                    <h2 className="font-display text-3xl font-semibold text-ink">
                      {heading.title}
                    </h2>
                    <p className="text-xs text-ink-muted">{heading.hours}</p>
                  </div>

                  {groups.length === 0 ? (
                    <p className="text-sm text-ink-muted leading-relaxed rounded-lg bg-surface border border-dashed border-line-strong p-4">
                      {t('menu.empty')}
                    </p>
                  ) : (
                    <div className="space-y-8">
                      {groups.map((group, groupIndex) => (
                        <div
                          key={group.key}
                          id={groupIndex === pizzaGroupIndex ? 'menu-pizzas' : undefined}
                          className="space-y-4 scroll-mt-24"
                        >
                          <div className="space-y-1 border-b border-line/70 pb-2">
                            <h3 className="font-display text-xl md:text-2xl font-semibold text-ink">
                              {group.name}
                            </h3>
                            {group.description && (
                              <p className="text-sm text-ink-muted leading-relaxed">
                                {group.description}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {group.items.map((item) => {
                              const options = item.priceOptions ?? [];
                              const selectedLabel =
                                selectedOptions[item.id] ?? options[0]?.label ?? '';
                              const selectedOption =
                                options.find(
                                  (option) => option.label === selectedLabel,
                                ) ?? options[0];
                              const displayedPrice =
                                selectedOption?.priceKmf ?? item.priceKmf;
                              const quantity = quantityFor(
                                cartLineId(item.id, selectedOption?.label),
                              );

                              return (
                                <article
                                  key={item.id}
                                  className="flex flex-col bg-surface border border-line rounded-xl overflow-hidden"
                                >
                                  <div className="overflow-hidden bg-surface-muted">
                                    <ResilientImage
                                      src={item.image ?? heroImage}
                                      alt={item.name}
                                    />
                                  </div>
                                  <div className="p-5 flex-1 flex flex-col gap-3">
                                    <div className="flex items-baseline justify-between gap-3">
                                      <h4 className="text-base font-semibold text-ink leading-snug">
                                        {item.name}
                                      </h4>
                                      <span className="font-mono text-sm font-medium text-ink tabular-nums whitespace-nowrap shrink-0">
                                        {formatKmf(displayedPrice)}
                                      </span>
                                    </div>
                                    <p className="text-sm text-ink-muted leading-relaxed">
                                      {item.description}
                                    </p>
                                    {options.length > 0 && (
                                      <div className="space-y-1.5">
                                        <label
                                          htmlFor={`option-${item.id}`}
                                          className="block text-xs font-medium text-ink-muted"
                                        >
                                          {t('menu.chooseOption')}
                                        </label>
                                        <select
                                          id={`option-${item.id}`}
                                          aria-label={t('menu.chooseOption')}
                                          value={selectedOption?.label ?? ''}
                                          onChange={(event) =>
                                            setSelectedOptions((current) => ({
                                              ...current,
                                              [item.id]: event.target.value,
                                            }))
                                          }
                                          className="w-full px-3 py-2 rounded-lg border border-line-strong bg-canvas text-sm text-ink focus:outline-2 focus:outline-ocean cursor-pointer"
                                        >
                                          {options.map((option) => (
                                            <option
                                              key={option.label}
                                              value={option.label}
                                            >
                                              {`${option.label} — ${formatKmf(option.priceKmf)}`}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    )}
                                    <div className="pt-3 mt-auto border-t border-surface-alt flex items-center justify-between gap-3">
                                      <span className="text-xs text-ink-muted">
                                        {item.tag ?? t('common.preparedToOrder')}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setCart((current) =>
                                            addToCart(current, item, selectedOption),
                                          )
                                        }
                                        aria-label={`${t('common.add')} ${item.name}${
                                          selectedOption
                                            ? ` (${selectedOption.label})`
                                            : ''
                                        }`}
                                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-burgundy text-white hover:bg-burgundy-hover transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
                                      >
                                        {quantity > 0 ? (
                                          <Check
                                            className="w-3.5 h-3.5"
                                            aria-hidden="true"
                                          />
                                        ) : (
                                          <Plus
                                            className="w-3.5 h-3.5"
                                            aria-hidden="true"
                                          />
                                        )}
                                        {quantity > 0
                                          ? t('common.addedCount', { count: quantity })
                                          : t('common.add')}
                                      </button>
                                    </div>
                                  </div>
                                </article>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
