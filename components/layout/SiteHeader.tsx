'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { AudioToggle } from '@/components/audio/AudioToggle';
import type { SiteConfig } from '@/lib/content/schema';

interface SiteHeaderProps {
  config: SiteConfig;
}

type NavItem = SiteConfig['nav'][number];

function Chevron({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="size-5"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6 6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export function SiteHeader({ config }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const isLinkActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const isItemActive = (item: NavItem) =>
    isLinkActive(item.href) || (item.children?.some((child) => isLinkActive(child.href)) ?? false);

  // "Gabung" sudah diwakili tombol CTA, jadi tidak diulang di daftar menu.
  const navItems = config.nav.filter((item) => item.href !== '/gabung');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--bg)] transition-colors">
      <span aria-hidden="true" className="scroll-progress" />
      <div className="grid h-[var(--header-h)] w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-[clamp(16px,2.4vw,40px)]">
        <Link
          href="/"
          aria-label="KSR PMI Unit Universitas Telkom — Beranda"
          className="flex min-w-0 shrink-0 items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
        >
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-white p-1 shadow-xs sm:h-12 sm:w-12">
            <Image
              src="/media/brand/icon-pmi.png"
              alt="Logo Palang Merah Indonesia"
              width={32}
              height={43}
              className="h-full w-auto object-contain"
              priority
            />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="font-display text-lg font-extrabold tracking-tight text-[var(--fg)] sm:text-xl">
              KSR PMI
            </span>
            <span className="mt-1 truncate text-[11px] font-medium text-[var(--muted)] sm:text-sm">
              Unit Universitas Telkom
            </span>
          </span>
        </Link>

        {/* Navigasi desktop */}
        <nav
          aria-label="Navigasi utama"
          className="hidden min-w-0 items-center justify-center gap-1 lg:flex"
        >
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-2 text-base font-semibold transition-colors ${
                    active ? 'text-[var(--accent)]' : 'text-[var(--fg-2)] hover:text-[var(--fg)]'
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <Chevron className="size-3 opacity-60 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-[var(--accent)] transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>

                {item.children && (
                  <div className="absolute top-full left-0 z-50 hidden pt-3 group-focus-within:block group-hover:block">
                    <div className="min-w-[210px] rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-lg">
                      {item.children.map((child) => {
                        const childActive = isLinkActive(child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            aria-current={childActive ? 'page' : undefined}
                            className={`block rounded-[var(--radius-sm)] px-3 py-2.5 text-[15px] font-medium transition-colors ${
                              childActive
                                ? 'bg-[var(--surface-warm)] text-[var(--accent)]'
                                : 'text-[var(--fg-2)] hover:bg-[var(--surface-warm)] hover:text-[var(--accent)]'
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Aksi kanan */}
        <div className="flex shrink-0 items-center gap-1.5 justify-self-end sm:gap-2">
          <div className="hidden xl:block">
            <AudioToggle />
          </div>
          <ThemeToggle />
          <Link
            href="/gabung"
            aria-label="Gabung Relawan"
            title="Gabung Relawan"
            className="hidden h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--accent-on)] shadow-sm transition-all hover:shadow-md hover:brightness-95 lg:inline-flex xl:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[18px]"
            >
              <circle cx="9" cy="8" r="3.2" />
              <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
              <path d="M19 8v6" />
              <path d="M16 11h6" />
            </svg>
          </Link>
          <Link
            href="/gabung"
            className="hidden h-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-4 text-[15px] font-semibold text-[var(--accent-on)] shadow-sm transition-all hover:shadow-md hover:brightness-95 xl:inline-flex"
          >
            Gabung Relawan
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((open) => !open);
              setOpenGroup(null);
            }}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] transition-colors hover:bg-[var(--surface-warm)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none lg:hidden"
          >
            <MenuIcon open={mobileMenuOpen} />
          </button>
        </div>
      </div>

      {/* Navigasi seluler */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="menu-drawer max-h-[calc(100svh-var(--header-h))] overflow-y-auto border-b border-[var(--border)] bg-[var(--surface)] lg:hidden"
        >
          <div className="w-full px-[clamp(16px,2.4vw,40px)] py-4">
            <nav aria-label="Navigasi seluler" className="flex flex-col">
              {navItems.map((item) => {
                const active = isItemActive(item);
                if (!item.children) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`rounded-[var(--radius-sm)] px-3 py-3 text-sm font-semibold transition-colors ${
                        active
                          ? 'bg-[var(--surface-warm)] text-[var(--accent)]'
                          : 'text-[var(--fg)] hover:bg-[var(--surface-warm)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                const open = openGroup === item.href;
                return (
                  <div
                    key={item.href}
                    className="border-b border-[var(--border-soft)] last:border-0"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenGroup(open ? null : item.href)}
                      aria-expanded={open}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-[var(--radius-sm)] px-3 py-3 text-left text-sm font-semibold transition-colors ${
                        active
                          ? 'text-[var(--accent)]'
                          : 'text-[var(--fg)] hover:bg-[var(--surface-warm)]'
                      }`}
                    >
                      {item.label}
                      <Chevron
                        className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {open && (
                      <div className="mb-2 ml-4 flex flex-col border-l border-[var(--border)] pl-3">
                        {item.children.map((child) => {
                          const childActive = isLinkActive(child.href);
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileMenuOpen(false)}
                              aria-current={childActive ? 'page' : undefined}
                              className={`rounded-[var(--radius-sm)] px-3 py-2.5 text-sm transition-colors ${
                                childActive
                                  ? 'bg-[var(--surface-warm)] font-semibold text-[var(--accent)]'
                                  : 'text-[var(--fg-2)] hover:bg-[var(--surface-warm)] hover:text-[var(--fg)]'
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <Link
              href="/gabung"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-on)] shadow-sm"
            >
              Gabung Relawan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
