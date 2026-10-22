import React from 'react';
import Link from 'next/link';
import { MdxRenderer } from '@/lib/mdx';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageHero } from '@/components/layout/PageHero';

export type TentangSlug =
  | 'sejarah'
  | 'visi-misi'
  | 'prinsip'
  | 'lambang'
  | 'lambang-penggunaan'
  | 'lambang-penyalahgunaan'
  | 'lambang-ruu'
  | 'lambang-penerapan'
  | 'struktur';

export const TENTANG_LINKS: Array<{ href: string; label: string }> = [
  { href: '/tentang/sejarah', label: 'Sejarah' },
  { href: '/tentang/visi-misi', label: 'Visi & Misi' },
  { href: '/tentang/prinsip', label: '7 Prinsip Dasar' },
  { href: '/tentang/lambang', label: 'Aturan Lambang' },
  { href: '/tentang/struktur', label: 'Struktur Organisasi' },
];

export const LAMBANG_LINKS: Array<{ href: string; label: string }> = [
  { href: '/tentang/lambang', label: 'Ringkasan' },
  { href: '/tentang/lambang/penggunaan', label: 'Penggunaan' },
  { href: '/tentang/lambang/penyalahgunaan', label: 'Penyalahgunaan' },
  { href: '/tentang/lambang/ruu', label: 'RUU & Sanksi' },
  { href: '/tentang/lambang/penerapan', label: 'Penerapan Identitas' },
];

interface TentangShellProps {
  slug: TentangSlug;
  eyebrow: string;
  title: string;
  lead: string;
  body: string;
  /** Blok tambahan di atas artikel (film, diagram, dan sejenisnya). */
  before?: React.ReactNode;
  /** Blok tambahan di bawah artikel. */
  after?: React.ReactNode;
  /** Sub-navigasi bagian, ditampilkan sebagai pil di atas artikel. */
  subnav?: Array<{ href: string; label: string }>;
  /** Rute aktif untuk sub-navigasi (default mengikuti slug induk). */
  activeHref?: string;
}

/**
 * Kerangka halaman Tentang: hero penuh, sidebar navigasi, artikel MDX.
 * Dipakai seluruh sub-halaman agar navigasi tidak pernah berbeda antar rute.
 */
export function TentangShell({
  slug,
  eyebrow,
  title,
  lead,
  body,
  before,
  after,
  subnav,
  activeHref,
}: TentangShellProps) {
  const active = `/tentang/${slug}`;
  const currentSub = activeHref ?? active;

  return (
    <div className="flex w-full flex-col">
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />

      {before}

      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
                <span className="font-mono text-sm font-bold tracking-wider text-[var(--accent)] uppercase">
                  Profil &amp; Landasan
                </span>
                <h2 className="mt-2 text-lg font-bold text-[var(--fg)]">Tentang Organisasi</h2>
                <nav className="mt-5 flex flex-col gap-2">
                  {TENTANG_LINKS.map((link) => {
                    const isActive = link.href === active;
                    const isParent = link.href === '/tentang/lambang' && link.href === active;
                    return (
                      <div key={link.href} className="flex flex-col gap-2">
                        <Link
                          href={link.href}
                          aria-current={isActive ? 'page' : undefined}
                          className={`flex items-center justify-between rounded-[var(--radius-md)] px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                            isActive
                              ? 'bg-[var(--accent)] text-[var(--accent-on)] shadow-sm'
                              : 'text-[var(--fg-2)] hover:translate-x-0.5 hover:bg-[var(--surface-warm)] hover:text-[var(--fg)]'
                          }`}
                        >
                          <span>{link.label}</span>
                          {isActive && <span className="text-xs">●</span>}
                        </Link>

                        {isParent && subnav && (
                          <div className="ml-3 flex flex-col gap-1 border-l border-[var(--border)] pl-3">
                            {subnav.map((sub) => {
                              const subActive = sub.href === currentSub;
                              return (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  aria-current={subActive ? 'page' : undefined}
                                  className={`rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors ${
                                    subActive
                                      ? 'bg-[var(--surface-warm)] font-semibold text-[var(--accent)]'
                                      : 'text-[var(--muted)] hover:bg-[var(--surface-warm)] hover:text-[var(--fg)]'
                                  }`}
                                >
                                  {sub.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

              <div className="hidden rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--surface-warm)] p-6 lg:block">
                <div className="flex items-center gap-2">
                  <span className="animate-heartbeat size-2 rounded-full bg-[var(--accent)]" />
                  <span className="font-mono text-sm font-bold tracking-wider text-[var(--fg-2)] uppercase">
                    Status Dokumen
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  Disusun dari sumber resmi Palang Merah dan diperbarui berkala sesuai ketentuan
                  organisasi KSR PMI Unit Universitas Telkom.
                </p>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-9">
            {subnav && (
              <nav aria-label="Subbagian lambang" className="mb-6 flex flex-wrap gap-2">
                {subnav.map((sub) => {
                  const subActive = sub.href === currentSub;
                  return (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      aria-current={subActive ? 'page' : undefined}
                      className={`rounded-[var(--radius-pill)] border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                        subActive
                          ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-on)] shadow-sm'
                          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--fg-2)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)]'
                      }`}
                    >
                      {sub.label}
                    </Link>
                  );
                })}
              </nav>
            )}

            <FadeIn className="w-full rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-10">
              <MdxRenderer source={body} />
            </FadeIn>

            {after}
          </main>
        </div>
      </section>
    </div>
  );
}
