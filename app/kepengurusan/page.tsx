import Link from 'next/link';
import { getKabinet } from '@/lib/content';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageHero } from '@/components/layout/PageHero';
import { MemberCard } from '@/components/ui/MemberCard';
import { PhotoTrigger } from '@/components/media/Lightbox';
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
      <section className="w-full border-b border-[var(--border)] bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border-soft)] pb-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--fg)]">Inti</h2>
            <span className="font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
              Komandan → Wakil → Sekretaris → Bendahara
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ...(kabinet.komandan
                ? [{ member: kabinet.komandan, role: 'Komandan', featured: true }]
                : []),
              ...kabinet.wakil.map((member) => ({
                member,
                role: 'Wakil Komandan',
                featured: false,
              })),
              ...kabinet.inti.map((member) => ({
                member,
                role: member.jabatan,
                featured: false,
              })),
            ].map(({ member, role, featured }, idx) => (
              <FadeIn key={`inti-${role}-${member.nama}`} delay={idx * 0.04} className="h-full">
                <MemberCard
                  member={member}
                  role={role}
                  featured={featured}
                  priority={featured}
                  index={idx + 1}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 460px"
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Badan Pengawas */}
      {pengawas.length > 0 && (
        <section className="w-full border-b border-[var(--border)] bg-[var(--surface-warm)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border-soft)] pb-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--fg)]">
                Badan Pengawas
              </h2>
              <span className="font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
                Satu wakil per unit
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pengawas.map((p, idx) => (
                <FadeIn key={`bp-${p.jabatan}-${p.nama}`} delay={idx * 0.04} className="h-full">
                  <MemberCard
                    member={p}
                    role={p.jabatan}
                    index={idx + 1}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 460px"
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Divisi */}
      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border-soft)] pb-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--fg)]">Divisi</h2>
            <span className="font-mono text-xs tracking-[0.16em] text-[var(--muted)] uppercase">
              06 divisi · {kabinet.divisi.reduce((total, d) => total + d.anggota.length, 0)}{' '}
              pengurus
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kabinet.divisi.map((div, idx) => {
              const [kadep] = div.anggota;
              return (
                <FadeIn key={div.slug} delay={idx * 0.04} className="h-full">
                  <div className="cabinet-card">
                    <div className="cabinet-media">
                      {kadep?.foto ? (
                        <PhotoTrigger photo={kadep.foto} sizes="(max-width: 640px) 132px, 176px" />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="font-display flex h-full w-full items-center justify-center bg-[var(--surface-warm)] text-2xl font-extrabold text-[var(--muted)]"
                        >
                          {div.nama.slice(0, 1)}
                        </span>
                      )}
                    </div>

                    <div className="cabinet-body">
                      <span aria-hidden="true" className="cabinet-index">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="cabinet-role">Divisi</span>
                      <h3 className="cabinet-name">{div.nama}</h3>
                      <p className="cabinet-meta">
                        {kadep
                          ? `Kepala: ${kadep.nama}${kadep.angkatan ? ` (${kadep.angkatan})` : ''} · ${div.anggota.length} pengurus`
                          : 'Belum ada kepala divisi'}
                      </p>
                      <Link
                        href={`/kepengurusan/divisi/${div.slug}`}
                        className="relative z-10 mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
                      >
                        Jobdesk &amp; anggota →
                      </Link>
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
