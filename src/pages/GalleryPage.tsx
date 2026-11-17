import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useSiteContent } from '../hooks/useSiteContent';
import type { GalleryCategory } from '../types';
import { ResilientImage } from '../components/ResilientImage';

const GALLERY_FILTERS: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'Toutes les vues' },
  { id: 'terrasse', label: 'Terrasse' },
  { id: 'salle', label: 'Salle' },
  { id: 'plats', label: 'Plats' },
  { id: 'evenements', label: 'Événements' },
];

export function GalleryPage() {
  const { content } = useSiteContent();
  const galleryItems = content.gallery.filter((item) => item.isVisible !== false);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2E6DF] pb-8">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-medium text-[#0F4C45]">
              Galerie Photo · Ambiances & Assiettes
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#151A19] text-balance">
              Sous les badamiers et en cuisine
            </h1>
            <p className="text-base text-[#4A5552] leading-relaxed">
              Parcourez la terrasse de la Place de France, la salle climatisée et nos
              assiettes préparées au fil de la journée.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filtrer la galerie photo"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F1F3EF] border border-[#E2E6DF] rounded-xl w-fit"
          >
            {GALLERY_FILTERS.map((filter) => {
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
                      ? 'bg-white text-[#151A19] shadow-xs border border-[#E2E6DF]'
                      : 'text-[#4A5552] hover:text-[#151A19]'
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
              aria-label={`Agrandir la photo : ${item.title}`}
              className="group text-left bg-white border border-[#E2E6DF] rounded-xl overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C45]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#EBF0EB]">
                <ResilientImage
                  src={item.image}
                  alt={item.title}
                  className="transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <p className="text-xs text-[#0F4C45] font-medium">{item.categoryLabel}</p>
                <h2 className="font-display text-2xl font-semibold text-[#151A19]">
                  {item.title}
                </h2>
                <p className="text-sm text-[#4A5552] leading-relaxed">{item.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          role="presentation"
          className="fixed inset-0 z-50 bg-[#151A19]/90 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxItem.title}
            className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden border border-[#E2E6DF]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="aspect-[16/10] bg-[#151A19] relative">
              <ResilientImage
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                aspectClassName="aspect-[16/10]"
              />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Fermer l’aperçu"
                className="absolute top-3 right-3 w-10 h-10 rounded-lg bg-[#151A19]/80 text-white flex items-center justify-center hover:bg-[#151A19] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#0F4C45]" aria-live="polite">
                  {activeLightboxItem.categoryLabel} · {lightboxIndex + 1} /{' '}
                  {filteredItems.length}
                </p>
                <h3 className="font-display text-2xl font-semibold text-[#151A19]">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-sm text-[#4A5552]">{activeLightboxItem.caption}</p>
              </div>

              {filteredItems.length > 1 && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    aria-label="Photo précédente"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + filteredItems.length) % filteredItems.length,
                      )
                    }
                    className="w-10 h-10 rounded-lg border border-[#E2E6DF] flex items-center justify-center text-[#151A19] hover:bg-[#F1F3EF] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Photo suivante"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
                    }
                    className="w-10 h-10 rounded-lg border border-[#E2E6DF] flex items-center justify-center text-[#151A19] hover:bg-[#F1F3EF] transition-colors cursor-pointer"
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
