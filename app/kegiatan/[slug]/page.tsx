import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getKegiatan, getKegiatanList } from '@/lib/content';
import { MdxRenderer } from '@/lib/mdx';
import { FadeIn } from '@/components/motion/FadeIn';
import { EcgDivider } from '@/components/motion/EcgDivider';
import type { Metadata } from 'next';

export const dynamicParams = false;

export function generateStaticParams() {
  const kegiatans = getKegiatanList();
  return kegiatans.map((k) => ({ slug: k.slug }));
}

interface KegiatanDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: KegiatanDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const k = getKegiatan(slug);
    return {
      title: k.title,
      description: k.ringkas,
    };
  } catch {
    return { title: 'Kegiatan Tidak Ditemukan' };
  }
}

export default async function KegiatanDetailPage({ params }: KegiatanDetailPageProps) {
  const { slug } = await params;
  let kegiatan;
  try {
    kegiatan = getKegiatan(slug);
  } catch {
    notFound();
  }

  return (
    <div className="flex w-full flex-col">
      <section className="w-full border-b border-[var(--border)] bg-[var(--surface-warm)]/60 px-[clamp(20px,2.8vw,56px)] pt-10 pb-8">
        <Link
          href="/kegiatan"
          className="mb-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          ← Kembali ke Indeks Kegiatan
        </Link>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-[var(--radius-pill)] bg-[var(--accent)] px-3.5 py-1 font-mono text-sm font-bold tracking-wider text-[var(--accent-on)] uppercase shadow-sm">
            {kegiatan.kategori.replace('-', ' ')}
          </span>
          <span className="font-mono text-sm font-medium text-[var(--meta)]">
            {new Intl.DateTimeFormat('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }).format(new Date(kegiatan.date))}
          </span>
        </div>
        <h1 className="max-w-[26ch] text-[clamp(1.6rem,2vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[var(--fg)]">
          {kegiatan.title}
        </h1>
        {kegiatan.lokasi && (
          <p className="mt-3 font-mono text-sm text-[var(--muted)]">Lokasi: {kegiatan.lokasi}</p>
        )}
      </section>

      <EcgDivider />

      {/* Cover + ringkasan berdampingan agar tidak menyisakan ruang kosong */}
      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-12">
          <FadeIn className="xl:col-span-7">
            <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-warm)]">
              <Image
                src={kegiatan.cover.src}
                alt={kegiatan.cover.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>

          <div className="flex flex-col gap-6 xl:col-span-5">
            <FadeIn className="text-lg leading-relaxed font-medium text-[var(--fg)] sm:text-xl">
              {kegiatan.ringkas}
            </FadeIn>

            {kegiatan.mitra && kegiatan.mitra.length > 0 && (
              <FadeIn
                delay={0.05}
                className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--surface-warm)] p-5 text-sm"
              >
                <span className="font-bold text-[var(--fg)]">Mitra Kolaborasi: </span>
                <span className="text-[var(--fg-2)]">{kegiatan.mitra.join(', ')}</span>
              </FadeIn>
            )}

            {kegiatan.tags.length > 0 && (
              <FadeIn delay={0.1} className="flex flex-wrap gap-2 border-t border-[var(--border-soft)] pt-4">
                {kegiatan.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[var(--radius-sm)] border border-[var(--border-soft)] bg-[var(--surface-warm)] px-3 py-1.5 font-mono text-sm text-[var(--meta)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    #{tag}
                  </span>
                ))}
              </FadeIn>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
