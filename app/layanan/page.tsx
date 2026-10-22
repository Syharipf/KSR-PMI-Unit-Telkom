import { getLayananList } from '@/lib/content';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageHero } from '@/components/layout/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Layanan Publik & Permohonan Bantuan',
  description: 'Pelayanan siaga medis acara kampus, donor darah, pelatihan PMR sekolah mitra, dan kerja sama kemanusiaan.',
};

export default function LayananPage() {
  const layanans = getLayananList();

  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow="Lorem Ipsum Dolor"
        title="Lorem Ipsum Dolor Sit Amet"
        lead="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ambulance
      />

      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
          {layanans.map((lay, idx) => (
            <FadeIn
              key={lay.slug}
              id={lay.slug}
              delay={idx * 0.05}
              className="flex scroll-mt-28 flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-lg sm:p-6"
            >
              <div className="flex flex-col gap-3">
                <span className="font-mono text-sm font-bold tracking-wider text-[var(--accent)] uppercase">
                  Lorem ipsum #{lay.slug}
                </span>
                <h2 className="text-xl font-extrabold text-[var(--fg)] sm:text-2xl">{lay.nama}</h2>
                <p className="mt-1 text-lg leading-relaxed font-semibold text-[var(--fg-2)]">
                  {lay.ringkas}
                </p>
                <p className="mt-2 text-base leading-relaxed text-[var(--muted)]">{lay.deskripsi}</p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 border-t border-[var(--border-soft)] pt-7 md:grid-cols-2">
                <div className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--surface-warm)]/40 p-5">
                  <h3 className="mb-4 text-sm font-bold tracking-wider text-[var(--fg)] uppercase">
                    Lorem Ipsum Dolor
                  </h3>
                  <ul className="list-disc space-y-3 pl-5 text-base leading-relaxed text-[var(--fg-2)]">
                    {lay.syarat.map((s, sIdx) => (
                      <li key={sIdx}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--surface-warm)]/40 p-5">
                  <h3 className="mb-4 text-sm font-bold tracking-wider text-[var(--fg)] uppercase">
                    Lorem Ipsum Dolor
                  </h3>
                  <ol className="list-decimal space-y-3 pl-5 text-base leading-relaxed text-[var(--fg-2)]">
                    {lay.alur.map((a, aIdx) => (
                      <li key={aIdx}>{a}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-soft)] pt-6">
                <span className="font-mono text-sm font-medium text-[var(--meta)]">
                  Respon koordinasi: Lorem ipsum dolor
                </span>
                <a
                  href={lay.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:brightness-95 hover:shadow-lg"
                >
                  {lay.cta.label}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
