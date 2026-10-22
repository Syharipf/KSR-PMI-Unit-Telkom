import Link from 'next/link';
import { getPeriodeList, getSiteConfig } from '@/lib/content';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageHero } from '@/components/layout/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Arsip Periode Kepengurusan',
  description: 'Daftar arsip masa bakti kabinet kepengurusan KSR PMI Unit Universitas Telkom lintas periode.',
};

export default function ArsipIndexPage() {
  const periodes = getPeriodeList();
  const currentPeriod = getSiteConfig().period;

  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow="Arsip Kepengurusan"
        title="Riwayat Kabinet"
        lead="Daftar periode kepengurusan KSR PMI Unit Universitas Telkom yang terdokumentasi, dari kabinet aktif hingga arsip periode sebelumnya."
      />

      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {periodes.map((p, idx) => (
            <FadeIn key={p} delay={idx * 0.05}>
              <Link
                href={`/kepengurusan/arsip/${p}`}
                className="group flex items-center justify-between rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-lg"
              >
                <div>
                  <span className="font-mono text-sm font-semibold text-[var(--muted)] uppercase">
                    Masa Bakti
                  </span>
                  <div className="mt-1 flex items-center gap-2">
                    <h2 className="text-xl font-bold text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                      Periode {p}
                    </h2>
                    {p === currentPeriod && (
                      <span className="rounded-[var(--radius-pill)] bg-[var(--accent)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--accent-on)] uppercase">
                        Aktif
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-base font-semibold text-[var(--accent)] transition-transform group-hover:translate-x-1">
                  Buka Arsip →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
