'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { AudioToggle } from '@/components/audio/AudioToggle';
import type { SiteConfig } from '@/lib/content/schema';

interface SiteHeaderProps {
  config: SiteConfig;
}

export function SiteHeader({ config }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md transition-colors">
      <span aria-hidden="true" className="scroll-progress" />
      <div className="flex h-[var(--header-h)] w-full items-center justify-between px-[clamp(16px,2.4vw,40px)]">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 rounded-md whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
        >
          <div className="relative flex h-11 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-white p-0.5 shadow-xs">
            <Image
              src="/media/brand/icon-pmi.png"
              alt="Logo Palang Merah Indonesia"
              width={32}
              height={43}
              className="h-full w-auto object-contain"
              priority
            />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="font-display text-sm font-bold tracking-tight text-[var(--fg)] sm:text-base">
              KSR PMI
            </span>
            <span className="text-xs text-[var(--muted)] sm:text-sm">Universitas Telkom</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden min-w-0 items-center gap-4 lg:flex xl:gap-6">
          {config.nav.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat py-2 text-[15px] font-semibold text-[var(--fg-2)] transition-[color,background-size] duration-300 hover:bg-[length:100%_2px] hover:text-[var(--accent)] active:translate-y-px"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pointer-events-none invisible absolute top-full left-0 z-50 translate-y-1 pt-2 opacity-0 transition-[opacity,transform,visibility] duration-200 ease-[var(--ease-standard)] group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="min-w-[190px] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium text-[var(--fg-2)] transition-[background-color,color,transform] duration-200 hover:translate-x-0.5 hover:bg-[var(--surface-warm)] hover:text-[var(--accent)]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <AudioToggle />
          <ThemeToggle />
          <Link
            href="/gabung"
            className="hidden items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-on)] shadow-sm transition-all hover:brightness-95 hover:shadow-md xl:inline-flex"
          >
            Gabung Relawan
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] sm:h-10 sm:w-10 lg:hidden"
            aria-label="Toggle menu mobile"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="menu-drawer border-b border-[var(--border)] bg-[var(--surface)] p-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {config.nav.map((item) => (
              <div key={item.href} className="flex flex-col gap-2">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-[var(--fg)] hover:text-[var(--accent)]"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="flex flex-col pl-4 gap-1.5 border-l border-[var(--border)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-[15px] text-[var(--fg-2)] hover:text-[var(--accent)]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/gabung"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] py-3 text-sm font-semibold text-[var(--accent-on)] shadow-sm text-center"
            >
              Gabung Relawan
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
