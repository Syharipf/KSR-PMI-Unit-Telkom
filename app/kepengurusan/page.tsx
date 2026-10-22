import Link from 'next/link';
import Image from 'next/image';
import { getKabinet } from '@/lib/content';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageHero } from '@/components/layout/PageHero';
import { MemberCard } from '@/components/ui/MemberCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kabinet Kepengurusan Aktif',
  description:
    'Susunan kabinet pengurus aktif KSR PMI Unit Universitas Telkom: inti, badan pengawas, dan enam divisi.',
};

export default function KepengurusanPage() {
  const kabinet = getKabinet();
  const pengawas = kabinet.pengawas ?? [];

  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow={`Kabinet ${kabinet.periode}`}
        title="Susunan Kepengurusan Aktif"
        lead={kabinet.motto}
        actions={
          <Link
            href="/kepengurusan/arsip"
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-mono text-xs font-semibold tracking-wider text-[var(--fg)] uppercase transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Lihat Riwayat Arsip Periode →
          </Link>
        }
      />
      {/* Inti */}
      <section className="w-full border-b border-[var(--border)] bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-10 lg:py-14">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border-soft)] pb-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--fg)]">Inti</h2>
            <span className="font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
              Komandan → Wakil → Sekretaris → Bendahara
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {kabinet.komandan && (
              <FadeIn className="sm:col-span-2 xl:row-span-2" duration={0.5}>
                <MemberCard
                  member={kabinet.komandan}
                  role="Komandan"
                  featured
                  priority
                  sizes="(max-width: 640px) 100vw, 640px"
                />
              </FadeIn>
            )}

            {kabinet.wakil.map((w, idx) => (
              <FadeIn key={`wakil-${w.nama}`} delay={0.06 + idx * 0.06}>
                <MemberCard member={w} role="Wakil Komandan" />
              </FadeIn>
            ))}

            {kabinet.inti.map((p, idx) => (
              <FadeIn key={`inti-${p.jabatan}-${p.nama}`} delay={0.12 + idx * 0.06}>
                <MemberCard member={p} role={p.jabatan} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Badan Pengawas */}
      {pengawas.length > 0 && (
        <section className="w-full border-b border-[var(--border)] bg-[var(--surface-warm)] px-[clamp(20px,2.8vw,56px)] py-10 lg:py-14">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border-soft)] pb-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--fg)]">
                Badan Pengawas
              </h2>
              <span className="font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
                Satu wakil per unit
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pengawas.map((p, idx) => (
                <FadeIn key={`bp-${p.jabatan}-${p.nama}`} delay={idx * 0.05}>
                  <MemberCard member={p} role={p.jabatan} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Divisi */}
      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-10 lg:py-14">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border-soft)] pb-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--fg)]">Divisi</h2>
            <span className="font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
              06 divisi · {kabinet.divisi.reduce((total, d) => total + d.anggota.length, 0)} pengurus
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {kabinet.divisi.map((div, idx) => {
              const [kadep] = div.anggota;
              return (
                <FadeIn key={div.slug} delay={idx * 0.05} className="h-full">
                  <div className="group mx-auto flex h-full w-full max-w-[420px] flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent)]/50 hover:shadow-xl">
                    {kadep && (
                      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-warm)]">
                        {kadep.foto ? (
                          <Image
                            src={kadep.foto.src}
                            alt={kadep.foto.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, 420px"
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : null}
                        <span className="absolute top-3 left-3 rounded-[var(--radius-pill)] bg-[var(--accent)] px-3 py-1 font-mono text-xs font-bold tracking-wider text-[var(--accent-on)] uppercase">
                          {div.anggota.length} pengurus
                        </span>
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                        {div.nama}
                      </h3>
                      {kadep && (
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          Kepala divisi: {kadep.nama}
                          {kadep.angkatan ? ` (${kadep.angkatan})` : ''}
                        </p>
                      )}
                      <div className="mt-auto pt-5">
                        <Link
                          href={`/kepengurusan/divisi/${div.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
                        >
                          Lihat Jobdesk &amp; Anggota Divisi →
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
