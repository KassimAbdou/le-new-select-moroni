import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLocalizedContent } from '../hooks/useLocalizedContent';
import { useLocale } from '../i18n/LocaleContext';
import type { GalleryCategory } from '../types';
import { ResilientImage } from '../components/ResilientImage';

export function GalleryPage() {
  const { content } = useLocalizedContent();
  const { t } = useLocale();
  const galleryItems = content.gallery.filter((item) => item.isVisible !== false);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const galleryFilters: { id: GalleryCategory; label: string }[] = [
    { id: 'all', label: t('gallery.all') },
    { id: 'terrasse', label: t('gallery.terrace') },
    { id: 'salle', label: t('gallery.room') },
    { id: 'plats', label: t('gallery.dishes') },
    { id: 'evenements', label: t('gallery.events') },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const isLightboxOpen = lightboxIndex !== null;

  // Verrouille le défilement, place le focus dans la modale puis le restaure.
  useEffect(() => {
    if (!isLightboxOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((current) =>
          current === null ? null : (current + 1) % filteredItems.length,
        );
      } else if (event.key === 'ArrowLeft') {
        setLightboxIndex((current) =>
          current === null
            ? null
            : (current - 1 + filteredItems.length) % filteredItems.length,
        );
      } else if (event.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLightboxOpen, filteredItems.length]);

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="py-10 md:py-14 space-y-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-medium text-ocean">{t('gallery.kicker')}</p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink text-balance">
              {t('gallery.title')}
            </h1>
            <p className="text-base text-ink-muted leading-relaxed">
              {t('gallery.intro')}
            </p>
          </div>

          <div
            role="group"
            aria-label={t('gallery.filtersAria')}
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-surface-alt border border-line rounded-xl w-fit"
          >
            {galleryFilters.map((filter) => {
              const isActive = activeCategory === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setActiveCategory(filter.id);
                    setLightboxIndex(null);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-surface text-ink shadow-xs border border-line'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightboxIndex(idx)}
              aria-label={t('common.enlargePhoto', { title: item.title })}
              className="group text-left bg-surface border border-line rounded-xl overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
            >
              <div className="overflow-hidden bg-surface-muted">
                <ResilientImage src={item.image} alt={item.title} />
              </div>
              <div className="p-5 space-y-1.5">
                <p className="text-xs text-ocean font-medium">{item.categoryLabel}</p>
                <h2 className="font-display text-2xl font-semibold text-ink">
                  {item.title}
                </h2>
                <p className="text-sm text-ink-muted leading-relaxed">{item.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          ref={dialogRef}
          role="presentation"
          className="fixed inset-0 z-50 bg-basalt/90 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLightboxIndex(null);
            }}
            aria-label={t('common.closePreview')}
            className="absolute top-3 right-3 z-10 w-10 h-10 shrink-0 rounded-lg bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxItem.title}
            className="relative max-w-4xl w-full max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain bg-surface rounded-xl border border-line"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-fit max-w-full mx-auto bg-basalt">
              <ResilientImage
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                imageClassName="block max-w-full max-h-[65dvh] w-auto h-auto object-contain"
              />
            </div>

            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-medium text-ocean" aria-live="polite">
                  {activeLightboxItem.categoryLabel} · {lightboxIndex + 1} /{' '}
                  {filteredItems.length}
                </p>
                <h3 className="font-display text-2xl font-semibold text-ink">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-sm text-ink-muted">{activeLightboxItem.caption}</p>
              </div>

              {filteredItems.length > 1 && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    aria-label={t('common.previousPhoto')}
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + filteredItems.length) % filteredItems.length,
                      )
                    }
                    className="w-10 h-10 rounded-lg border border-line flex items-center justify-center text-ink hover:bg-surface-alt transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    aria-label={t('common.nextPhoto')}
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
                    }
                    className="w-10 h-10 rounded-lg border border-line flex items-center justify-center text-ink hover:bg-surface-alt transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
