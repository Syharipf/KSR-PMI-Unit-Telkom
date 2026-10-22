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
      <div className="h-10 w-10 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)]" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      data-sound="chime"
      aria-label={isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
      className="flex h-10 w-10 min-w-10 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] transition-colors hover:bg-[var(--surface-warm)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none"
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
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.9 4.9l1.4 1.4" />
            <path d="M17.7 17.7l1.4 1.4" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M4.9 19.1l1.4-1.4" />
            <path d="M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M20.3 14.7A8.5 8.5 0 0 1 9.3 3.7 8.5 8.5 0 1 0 20.3 14.7Z" />
        )}
      </svg>
    </button>
  );
}
