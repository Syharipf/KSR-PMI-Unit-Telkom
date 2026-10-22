'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import { audio } from '@/lib/audio';

/**
 * Sakelar audio global. Default senyap (tersimpan di localStorage) dan baru
 * membuka AudioContext setelah pengguna menekan tombol ini.
 */
export function AudioToggle() {
  const enabled = useSyncExternalStore(
    (onChange) => audio.subscribe(onChange),
    () => audio.isEnabled(),
    () => false,
  );

  useEffect(() => {
    audio.hydrate();
  }, []);

  return (
    <button
      type="button"
      onClick={() => audio.setEnabled(!enabled)}
      data-sound="none"
      aria-pressed={enabled}
      aria-label={enabled ? 'Matikan efek suara situs' : 'Nyalakan efek suara situs'}
      title={enabled ? 'Efek suara aktif — klik untuk mematikan' : 'Efek suara nonaktif — klik untuk menyalakan'}
      className={`flex h-9 w-9 min-w-9 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border bg-[var(--surface)] transition-colors hover:bg-[var(--surface-warm)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none sm:h-10 sm:w-10 sm:min-w-10 ${
        enabled
          ? 'border-[var(--accent)] text-[var(--accent)]'
          : 'border-[var(--border)] text-[var(--muted)]'
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="M4 9.5h3.2L12 5.5v13L7.2 14.5H4z" fill="currentColor" stroke="none" />
        {enabled ? (
          <>
            <path d="M15.4 9.2a4 4 0 0 1 0 5.6" />
            <path d="M17.9 6.7a7.5 7.5 0 0 1 0 10.6" />
          </>
        ) : (
          <>
            <path d="M16 9.8l4 4.4" />
            <path d="M20 9.8l-4 4.4" />
          </>
        )}
      </svg>
    </button>
  );
}
