import { getProgramList, getDivisiList } from '@/lib/content';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageHero } from '@/components/layout/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Katalog Program Kerja',
  description: 'Daftar program kerja rutin dan insidental seluruh divisi operasional KSR PMI Tel-U.',
};

export default function ProgramIndexPage() {
  const programs = getProgramList();
  const divisiList = getDivisiList();

  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow="Program Kerja"
        title="Katalog Program Kerja Kepengurusan"
        lead="Daftar program kerja terencana dan berkelanjutan di setiap departemen KSR PMI Unit Universitas Telkom."
      />

      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {programs.map((prog, idx) => {
            const divInfo = divisiList.find((d) => d.slug === prog.divisi);
            return (
              <FadeIn
                key={prog.slug}
                delay={idx * 0.04}
                className="group flex flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface-warm)] px-3 py-1 font-mono text-sm font-bold tracking-wider text-[var(--fg-2)] uppercase">
                      {prog.frekuensi}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-sm font-semibold text-[var(--meta)] capitalize">
                      <span className="size-1.5 rounded-full bg-[var(--success)]" />
                      {prog.status}
                    </span>
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                    {prog.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[var(--fg-2)]">{prog.ringkas}</p>
                </div>

                <div className="mt-6 flex flex-col gap-1.5 border-t border-[var(--border-soft)] pt-5 text-sm font-medium text-[var(--muted)]">
                  <span>Divisi: {divInfo?.title ?? prog.divisi}</span>
                  <span>Waktu: {prog.jadwal}</span>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </div>
  );
}
