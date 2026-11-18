import { useEffect, useState } from 'react';
import { Utensils } from 'lucide-react';
import { resolveImageUrl } from '../lib/imageUrl';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  /** Charge l'image en priorité (à réserver au contenu above-the-fold). */
  priority?: boolean;
  /**
   * `contain` (défaut) affiche l'image en entier et laisse son cadre suivre
   * ses proportions naturelles. `cover` recadre pour remplir le cadre.
   */
  fit?: 'cover' | 'contain';
  /** Remplace complètement les classes de l'<img> (ex. : lightbox taillée à la demande). */
  imageClassName?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-[4/3]',
  priority = false,
  fit = 'contain',
  imageClassName,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = resolveImageUrl(src);

  useEffect(() => {
    setHasError(false);
  }, [resolvedSrc]);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-surface-muted text-ocean p-6 text-center ${aspectClassName} ${className}`}
      >
        <Utensils className="w-7 h-7 mb-2 opacity-60" strokeWidth={1.5} />
        <span className="text-xs font-medium text-ink-muted max-w-[22ch]">{alt}</span>
      </div>
    );
  }

  const defaultImageClassName =
    fit === 'contain'
      ? 'w-full h-auto block object-contain'
      : 'w-full h-full object-cover';

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      onError={() => setHasError(true)}
      className={imageClassName ?? `${defaultImageClassName} ${className}`}
    />
  );
}
