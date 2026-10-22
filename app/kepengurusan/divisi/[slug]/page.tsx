import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getDivisi, getDivisiList, getKabinet, getProgramList } from '@/lib/content';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageHero } from '@/components/layout/PageHero';
import { MemberCard } from '@/components/ui/MemberCard';
import type { Metadata } from 'next';

export const dynamicParams = false;

export function generateStaticParams() {
  const divisi = getDivisiList();
  return divisi.map((d) => ({ slug: d.slug }));
}

interface DivisiDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DivisiDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const divisi = getDivisi(slug);
    return {
      title: `${divisi.title} — Divisi Kepengurusan`,
      description: divisi.singkat,
    };
  } catch {
    return { title: 'Divisi Tidak Ditemukan' };
  }
}

export default async function DivisiDetailPage({ params }: DivisiDetailPageProps) {
  const { slug } = await params;
  let divisi;
  try {
    divisi = getDivisi(slug);
  } catch {
    notFound();
  }

  const kabinet = getKabinet();
  const kabinetDiv = kabinet.divisi.find((d) => d.slug === slug);
  const allPrograms = getProgramList();
  const relatedPrograms = allPrograms.filter((p) => p.divisi === slug);

  return (
    <div className="flex w-full flex-col">
      <PageHero eyebrow="Divisi Kepengurusan" title={divisi.title} lead={divisi.singkat} />

      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <Link
          href="/kepengurusan"
          className="mb-8 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          ← Kembali ke Susunan Kabinet
        </Link>

        <FadeIn className="w-full rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-6">
          <h2 className="mb-6 text-xl font-bold text-[var(--fg)]">Jobdesk Divisi</h2>
          <ul className="grid w-full list-disc grid-cols-1 gap-3 pl-7 text-base leading-relaxed text-[var(--fg-2)] xl:grid-cols-2">
            {divisi.jobdesk.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </FadeIn>
      </section>

      {kabinetDiv && kabinetDiv.anggota.length > 0 && (
        <section className="w-full border-t border-[var(--border)] bg-[var(--surface-warm)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
          <div className="mx-auto w-full max-w-[1440px]">
            <h2 className="mb-6 border-b border-[var(--border-soft)] pb-3 text-xl font-bold text-[var(--fg)]">
              Anggota Divisi
            </h2>
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {kabinetDiv.anggota.map((ang, idx) => (
                <FadeIn key={`${ang.jabatan}-${ang.nama}`} delay={idx * 0.05}>
                  <MemberCard member={ang} role={ang.jabatan} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
      {relatedPrograms.length > 0 && (
        <section className="w-full border-t border-[var(--border)] bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
          <h2 className="mb-6 border-b border-[var(--border-soft)] pb-3 text-xl font-bold text-[var(--fg)]">
            Program Terkait
          </h2>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {relatedPrograms.map((p, idx) => (
              <FadeIn
                key={p.slug}
                delay={idx * 0.05}
                className="rounded-[var(--radius-lg)] border border-[var(--border-soft)] bg-[var(--surface-warm)] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-[var(--fg)]">{p.title}</h3>
                  <span className="font-mono text-sm font-bold text-[var(--muted)] uppercase">
                    {p.frekuensi}
                  </span>
                </div>
                <p className="mt-2 text-base leading-relaxed text-[var(--fg-2)]">{p.ringkas}</p>
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
