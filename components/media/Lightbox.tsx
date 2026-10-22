'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Media } from '@/lib/content/schema';

interface LightboxProps {
  media: Media | null;
  onClose: () => void;
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

  return (
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
        className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus:outline-none cursor-pointer"
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
}
