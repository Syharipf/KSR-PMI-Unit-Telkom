import Link from 'next/link';
import { getTentangPage } from '@/lib/content';
import { TentangShell, LAMBANG_LINKS } from '@/components/layout/TentangShell';
import { FadeIn } from '@/components/motion/FadeIn';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lambang Kemanusiaan',
  description: 'Fungsi, penggunaan, penyalahgunaan, dan penerapan identitas lambang palang merah menurut ICRC dan UU Kepalangmerahan.',
};

const SECTIONS = [
  {
    href: '/tentang/lambang/penggunaan',
    label: 'Penggunaan Lambang',
    note: 'Tanda pelindung dan tanda pengenal, termasuk syarat izin Panglima TNI dan persetujuan Pengurus Pusat PMI.',
  },
  {
    href: '/tentang/lambang/penyalahgunaan',
    label: 'Penyalahgunaan Lambang',
    note: 'Peniruan, pemakaian tidak semestinya, dan tipu daya licik beserta akibat hukumnya.',
  },
  {
    href: '/tentang/lambang/ruu',
    label: 'RUU Lambang Palang Merah',
    note: 'Empat larangan Pasal 36 dan sanksi pidana Pasal 37 sampai Pasal 40 UU Nomor 1 Tahun 2018.',
  },
  {
    href: '/tentang/lambang/penerapan',
    label: 'Penerapan Identitas PMI',
    note: 'Bentuk lambang PMI, pihak yang berhak memakainya, dan konsistensi tampilan identitas.',
  },
];

export default function LambangPage() {
  const { frontmatter, body } = getTentangPage('lambang');

  return (
    <TentangShell
      slug="lambang"
      eyebrow="Lambang & Perlindungan"
      title={frontmatter.title}
      lead={frontmatter.ringkas}
      body={body}
      subnav={LAMBANG_LINKS}
      activeHref="/tentang/lambang"
      before={
        <section className="w-full border-b border-[var(--border)] bg-[var(--surface-warm)]/40 px-[clamp(20px,2.8vw,56px)] py-8 lg:py-10">
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {SECTIONS.map((s, idx) => (
              <FadeIn key={s.href} delay={idx * 0.05}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:shadow-xl"
                >
                  <span className="font-mono text-sm font-bold text-[var(--accent)]">
                    0{idx + 1}
                  </span>
                  <span className="mt-3 text-lg leading-snug font-bold text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                    {s.label}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{s.note}</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)]">
                    Buka bagian →
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>
      }
    />
  );
}
