'use client';

import React, { useEffect, useState } from 'react';
import { audio } from '@/lib/audio';

const CHAPTER_LABELS = ['Drum pertempuran', 'Lonceng malam', 'Pena Jenewa'] as const;

/**
 * Pemutar suasana film tiga babak. Babak audio mengikuti animasi panggung
 * (36 detik, 12 detik per babak) sehingga drum, lonceng, dan pena berganti
 * tepat saat adegan berganti.
 */
export function StoryAudio() {
  const [playing, setPlaying] = useState(false);
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    if (!playing) return;

    const sync = () => {
      const layer = document.querySelector('.scene-layer');
      const animation = layer?.getAnimations()[0];
      if (!animation) return;

      const duration = animation.effect?.getTiming().duration;
      const current = animation.currentTime;
      if (typeof duration !== 'number' || duration <= 0 || typeof current !== 'number') return;

      const phase = (current % duration) / duration;
      const index = Math.min(CHAPTER_LABELS.length - 1, Math.floor(phase * CHAPTER_LABELS.length));
      setChapter(index);
      audio.setChapter(index as 0 | 1 | 2);
    };

    sync();
    const timer = window.setInterval(sync, 400);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(
    () => () => {
      audio.setAmbience(false);
    },
    [],
  );

  const toggle = () => {
    if (playing) {
      audio.setAmbience(false);
      setPlaying(false);
      return;
    }
    audio.setEnabled(true);
    audio.setAmbience(true);
    setPlaying(true);
  };

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={toggle}
        data-sound="none"
        aria-pressed={playing}
        className="inline-flex cursor-pointer items-center gap-2.5 rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none"
      >
        <span aria-hidden="true" className="flex h-3.5 items-end gap-[2px]">
          {[0, 1, 2, 3].map((bar) => (
            <span
              key={bar}
              className={`w-[3px] rounded-full transition-all duration-300 ${
                playing ? 'story-eq bg-[var(--accent)]' : 'bg-[var(--muted)]'
              }`}
              style={{ height: playing ? `${[9, 14, 7, 11][bar]}px` : '4px', animationDelay: `${bar * 120}ms` }}
            />
          ))}
        </span>
        {playing ? 'Hentikan suasana film' : 'Putar suasana film'}
      </button>

      <p className="font-mono text-xs tracking-[0.12em] text-[var(--muted)] uppercase">
        {playing ? `Babak ${chapter + 1} · ${CHAPTER_LABELS[chapter]}` : 'Audio sintetis · opsional'}
      </p>
    </div>
  );
}
