import { getPrestasiList } from '@/lib/content';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageHero } from '@/components/layout/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rekam Jejak Prestasi',
  description: 'Daftar perolehan kejuaraan dan penghargaan kemanusiaan relawan KSR PMI Unit Universitas Telkom.',
};

export default function PrestasiPage() {
  const prestasiList = getPrestasiList();

  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow="Lorem Ipsum Dolor"
        title="Lorem Ipsum Dolor Sit Amet"
        lead="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />

      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {prestasiList.map((item, idx) => (
            <FadeIn
              key={idx}
              delay={idx * 0.04}
              className="group flex flex-col justify-between gap-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)]/50 hover:shadow-lg"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-[var(--accent)]">{item.tahun}</span>
                  <span className="rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface-warm)] px-3 py-1 font-mono text-sm font-bold text-[var(--fg-2)] uppercase">
                    {item.tingkat}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                  {item.nama}
                </h2>
                <span className="text-sm font-medium text-[var(--muted)]">
                  Penyelenggara: {item.penyelenggara}
                </span>
              </div>

              <div className="border-t border-[var(--border-soft)] pt-4">
                <span className="inline-block rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--surface-warm)] px-4 py-2 text-sm font-bold text-[var(--accent)]">
                  {item.peringkat}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
