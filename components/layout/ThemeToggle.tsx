'use client';

import React, { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();

  if (!isClient) {
    return (
      <div className="h-9 w-9 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] sm:h-10 sm:w-10" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      data-sound="chime"
      aria-label={isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
      className="flex h-9 w-9 min-w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] sm:h-10 sm:w-10 sm:min-w-10 transition-colors hover:bg-[var(--surface-warm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] cursor-pointer"
    >
      {isDark ? (
        <span title="Mode Terang" className="text-base">
          ☀
        </span>
      ) : (
        <span title="Mode Gelap" className="text-base">
          ☾
        </span>
      )}
    </button>
  );
}
