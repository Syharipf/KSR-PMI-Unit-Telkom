'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CinematicWallpaperProps {
  sources: {
    webm?: string;
    mp4?: string;
    poster: string;
  };
  /** Foto bergilir dengan crossfade dan dorongan zoom halus. Bila diisi, video diabaikan. */
  stills?: string[];
  opacity?: number;
  intervalMs?: number;
}

export function CinematicWallpaper({
  sources,
  stills,
  opacity = 0.55,
  intervalMs = 7000,
}: CinematicWallpaperProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<number[]>([0]);

  const slides = stills ?? [];
  const slideCount = slides.length;
  const hasStills = slideCount > 0;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    if (slideCount < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActive((current) => {
        const next = (current + 1) % slideCount;
        setLoadedIndices((prev) => (prev.includes(next) ? prev : [...prev, next]));
        return next;
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [slideCount, intervalMs]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[var(--bg)]"
    >
      {/* Ambient gradient hemat memori & GPU */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, color-mix(in srgb, var(--accent) 15%, transparent) 0%, transparent 75%)',
        }}
      />

      <div className="absolute inset-0" style={{ opacity: `var(--wallpaper-opacity, ${opacity})` }}>
        {hasStills ? (
          slides.map((src, index) => {
            const isActive = index === active;
            const isLoaded = loadedIndices.includes(index);
            if (!isLoaded) return null;

            const mobileSrc = src.replace('/media/hero/', '/media/hero/mobile/');

            return (
              <div
                key={src}
                className="absolute inset-0 transition-opacity duration-[2600ms] ease-in-out will-change-[opacity]"
                style={{
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 2 : 1,
                }}
              >
                {/* Gunakan elemen native <picture> & <img> agar scanner C++ browser langsung mendeteksi gambar LCP */}
                <picture className="absolute inset-0 block h-full w-full">
                  <source media="(max-width: 767px)" srcSet={mobileSrc} />
                  <img
                    src={src}
                    alt="KSR PMI Unit Universitas Telkom"
                    fetchPriority={index === 0 ? 'high' : 'low'}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-contain object-center transition-transform duration-[10000ms] ease-out will-change-transform"
                    style={{
                      transform: isActive ? 'scale(1.015)' : 'scale(1)',
                    }}
                  />
                </picture>
              </div>
            );
          })
        ) : sources.mp4 ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            poster={sources.poster}
            className="h-full w-full object-cover object-top"
          >
            {sources.webm && <source src={sources.webm} type="video/webm" />}
            <source src={sources.mp4} type="video/mp4" />
          </video>
        ) : (
          <img
            src={sources.poster}
            alt=""
            className="h-full w-full object-cover object-top"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/35 via-transparent to-[var(--bg)]/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/25 via-transparent to-[var(--bg)]/10" />
    </div>
  );
}
