import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import { ResilientImage } from './ResilientImage';

interface ImageLightboxProps {
  image: string;
  title: string;
  onClose: () => void;
}

/** Affiche une photo en grand, sans recadrage, avec fermeture clavier/souris. */
export function ImageLightbox({ image, title, onClose }: ImageLightboxProps) {
  const { t } = useLocale();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
      } else if (event.key === 'Tab') {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, []);

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 bg-basalt/90 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label={t('common.close')}
        className="absolute top-3 right-3 z-10 w-10 h-10 shrink-0 rounded-lg bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <X className="w-5 h-5" aria-hidden="true" />
      </button>

      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-6xl max-h-[92dvh] min-h-0 overflow-y-auto overscroll-contain flex flex-col items-center justify-center gap-3"
        onClick={(event) => event.stopPropagation()}
      >
        <ResilientImage
          src={image}
          alt={title}
          imageClassName="block max-w-full max-h-[78dvh] w-auto h-auto object-contain rounded-lg shadow-2xl bg-surface"
        />
        <p className="text-sm font-medium text-white/90 text-center">{title}</p>
      </div>
    </div>
  );
}
