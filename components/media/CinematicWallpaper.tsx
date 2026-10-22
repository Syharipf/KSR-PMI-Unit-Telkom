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
      setActive((current) => (current + 1) % slideCount);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [slideCount, intervalMs]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[var(--bg)]"
    >
      <div className="absolute inset-0" style={{ opacity: `var(--wallpaper-opacity, ${opacity})` }}>
        {hasStills ? (
          slides.map((src, index) => (
            <div
              key={src}
              className="absolute inset-0 transition-opacity duration-[1800ms] ease-[var(--ease-cinematic)]"
              style={{ opacity: index === active ? 1 : 0 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[9000ms] ease-out"
                style={{
                  backgroundImage: `url("${src}")`,
                  transform: index === active ? 'scale(1.07)' : 'scale(1)',
                }}
              />
            </div>
          ))
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
            className="h-full w-full object-cover object-center"
          >
            {sources.webm && <source src={sources.webm} type="video/webm" />}
            <source src={sources.mp4} type="video/mp4" />
          </video>
        ) : (
          <div
            style={{ backgroundImage: `url("${sources.poster}")` }}
            className="h-full w-full bg-cover bg-center"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/55 via-[var(--bg)]/20 to-[var(--bg)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/35 via-transparent to-[var(--bg)]/10" />
    </div>
  );
}
