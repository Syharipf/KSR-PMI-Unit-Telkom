import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getKabinet, getPeriodeList, getSiteConfig } from '@/lib/content';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageHero } from '@/components/layout/PageHero';
import type { Metadata } from 'next';

export const dynamicParams = false;

export function generateStaticParams() {
  const periodes = getPeriodeList();
  return periodes.map((p) => ({ periode: p }));
}

interface ArsipDetailPageProps {
  params: Promise<{ periode: string }>;
}

export async function generateMetadata({ params }: ArsipDetailPageProps): Promise<Metadata> {
  const { periode } = await params;
  return {
    title: `Arsip Kabinet Periode ${periode}`,
    description: `Susunan kepengurusan kabinet KSR PMI Unit Universitas Telkom masa bakti ${periode}.`,
  };
}

export default async function ArsipDetailPage({ params }: ArsipDetailPageProps) {
  const { periode } = await params;
  let kabinet;
  try {
    kabinet = getKabinet(periode);
  } catch {
    notFound();
  }
  const isCurrent = periode === getSiteConfig().period;
  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow={`Arsip ${kabinet.periode}`}
        title={`Kabinet ${kabinet.periode}`}
        lead={kabinet.motto}
        actions={
          isCurrent ? (
            <Link
              href="/kepengurusan"
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-on)]"
            >
              Lihat Halaman Kabinet Aktif Lengkap →
            </Link>
          ) : undefined
        }
      />

      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <Link
          href="/kepengurusan/arsip"
          className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          ← Kembali ke Indeks Arsip
        </Link>

        <h2 className="mb-6 border-b border-[var(--border-soft)] pb-3 text-xl font-bold text-[var(--fg)]">
          Inti
        </h2>
        <FadeIn className="w-full max-w-2xl rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <span className="font-mono text-sm font-bold tracking-wider text-[var(--accent)] uppercase">
            Komandan
          </span>
          {kabinet.komandan ? (
            <>
              <h3 className="mt-2 text-xl font-bold text-[var(--fg)]">{kabinet.komandan.nama}</h3>
              <p className="mt-1 text-sm font-medium text-[var(--muted)]">
                {[kabinet.komandan.programStudi, kabinet.komandan.angkatan].filter(Boolean).join(' · ')}
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Nama komandan periode ini tidak tercatat pada arsip.
            </p>
          )}
        </FadeIn>
      </section>

      {kabinet.inti.length > 0 && (
        <section className="w-full border-t border-[var(--border)] bg-[var(--surface-warm)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
          <h2 className="mb-6 border-b border-[var(--border-soft)] pb-3 text-xl font-bold text-[var(--fg)]">
            Pengurus Inti
          </h2>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {kabinet.inti.map((p, idx) => (
              <FadeIn
                key={idx}
                delay={idx * 0.05}
                className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="font-mono text-sm font-bold tracking-wider text-[var(--muted)] uppercase">
                  {p.jabatan}
                </span>
                <h3 className="mt-2 text-lg font-bold text-[var(--fg)]">{p.nama}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {p.programStudi} ({p.angkatan})
                </p>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {kabinet.wakil && kabinet.wakil.length > 0 && (
        <section className="w-full border-t border-[var(--border)] bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
          <h2 className="mb-6 border-b border-[var(--border-soft)] pb-3 text-xl font-bold text-[var(--fg)]">
            Wakil Komandan
          </h2>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {kabinet.wakil.map((p, idx) => (
              <FadeIn
                key={idx}
                delay={idx * 0.05}
                className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="font-mono text-sm font-bold tracking-wider text-[var(--muted)] uppercase">
                  {p.jabatan}
                </span>
                <h3 className="mt-2 text-lg font-bold text-[var(--fg)]">{p.nama}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {[p.programStudi, p.angkatan].filter(Boolean).join(' · ')}
                </p>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {kabinet.pengawas && kabinet.pengawas.length > 0 && (
        <section className="w-full border-t border-[var(--border)] bg-[var(--surface-warm)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
          <h2 className="mb-6 border-b border-[var(--border-soft)] pb-3 text-xl font-bold text-[var(--fg)]">
            Badan Pengawas
          </h2>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {kabinet.pengawas.map((p, idx) => (
              <FadeIn
                key={idx}
                delay={idx * 0.05}
                className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="font-mono text-sm font-bold tracking-wider text-[var(--muted)] uppercase">
                  {p.jabatan}
                </span>
                <h3 className="mt-2 text-lg font-bold text-[var(--fg)]">{p.nama}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {[p.programStudi, p.angkatan].filter(Boolean).join(' · ')}
                </p>
              </FadeIn>
            ))}
          </div>
        </section>
      )}

      {kabinet.divisi && kabinet.divisi.length > 0 && (
        <section className="w-full border-t border-[var(--border)] bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
          <h2 className="mb-6 border-b border-[var(--border-soft)] pb-3 text-xl font-bold text-[var(--fg)]">
            Divisi
          </h2>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {kabinet.divisi.map((d, idx) => (
              <FadeIn
                key={d.slug}
                delay={idx * 0.05}
                className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="font-mono text-sm font-bold tracking-wider text-[var(--accent)] uppercase">
                  {d.anggota.length} Pengurus
                </span>
                <h3 className="mt-2 text-lg font-bold text-[var(--fg)]">{d.nama}</h3>
                <ul className="mt-3 divide-y divide-[var(--border-soft)] text-sm">
                  {d.anggota.map((a, aIdx) => (
                    <li key={aIdx} className="flex items-center justify-between py-1.5">
                      <span className="font-medium text-[var(--fg)]">{a.nama}</span>
                      <span className="text-xs text-[var(--muted)]">
                        {a.jabatan}
                        {a.angkatan ? ` (${a.angkatan})` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
