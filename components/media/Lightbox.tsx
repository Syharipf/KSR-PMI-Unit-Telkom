'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import type { Media } from '@/lib/content/schema';

interface LightboxProps {
  media: Media | null;
  onClose: () => void;
}

export interface PriceListImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function PhotoTrigger({
  photo,
  sizes,
  priority = false,
}: {
  photo: Media;
  sizes?: string;
  priority?: boolean;
}) {
  const [active, setActive] = useState<Media | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => setActive(photo)}
        aria-label={`Perbesar foto ${photo.alt}`}
        className="group/photo relative block h-full w-full cursor-zoom-in overflow-hidden focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="cabinet-photo object-cover"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/30 via-transparent to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover/photo:opacity-100"
        >
          <span className="rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold text-white">
            Perbesar
          </span>
        </span>
      </button>
      <Lightbox media={active} onClose={() => setActive(null)} />
    </>
  );
}

export function PriceListGallery({ images }: { images: PriceListImage[] }) {
  const [active, setActive] = useState<Media | null>(null);

  return (
    <>
      <div className="flex snap-x gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive({ ...image, type: 'image' })}
            aria-label={`Perbesar ${image.alt}`}
            className="group relative w-[180px] shrink-0 cursor-pointer snap-start overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-white text-left focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-[320px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="absolute right-2 bottom-2 rounded-full bg-[var(--bg)]/95 px-2 py-1 font-mono text-[10px] font-bold text-[var(--fg-2)]">
              Halaman {index + 1}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
        Geser untuk melihat poster. Klik poster untuk memperbesar.
      </p>
      <Lightbox media={active} onClose={() => setActive(null)} />
    </>
  );
}

export function Lightbox({ media, onClose }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (media) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [media, onClose]);

  if (!media) return null;

  const content = (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup penampil gambar"
        className="absolute top-6 right-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none"
      >
        ✕
      </button>
      <div
        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          className="max-h-[80vh] w-auto rounded-[var(--radius-md)] object-contain"
          priority
        />
        <div className="mt-2 text-center text-xs text-[var(--muted)]">
          {media.alt} {media.credit && `• Foto: ${media.credit}`}
        </div>
      </div>
    </div>
  );

  return typeof document === 'undefined' ? content : createPortal(content, document.body);
}
