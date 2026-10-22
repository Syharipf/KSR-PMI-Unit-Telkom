import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAlbum, getAlbumList } from '@/lib/content';
import { FadeIn } from '@/components/motion/FadeIn';
import { EcgDivider } from '@/components/motion/EcgDivider';
import type { Metadata } from 'next';

export const dynamicParams = false;

export function generateStaticParams() {
  const albums = getAlbumList();
  return albums.map((a) => ({ slug: a.slug }));
}

interface GaleriDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GaleriDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const album = getAlbum(slug);
    return {
      title: album.title,
      description: `Album dokumentasi foto ${album.title} KSR PMI Unit Universitas Telkom.`,
    };
  } catch {
    return { title: 'Album Tidak Ditemukan' };
  }
}

export default async function GaleriDetailPage({ params }: GaleriDetailPageProps) {
  const { slug } = await params;
  let album;
  try {
    album = getAlbum(slug);
  } catch {
    notFound();
  }

  return (
    <div className="flex w-full flex-col">
      <section className="w-full border-b border-[var(--border)] bg-[var(--surface-warm)]/60 px-[clamp(20px,2.8vw,56px)] pt-10 pb-8">
        <Link
          href="/galeri"
          className="mb-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          ← Kembali ke Indeks Galeri
        </Link>
        <span className="block font-mono text-sm font-medium text-[var(--meta)]">
          {new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(new Date(album.date))}
        </span>
        <h1 className="mt-2 max-w-[28ch] text-[clamp(1.6rem,2vw,2.25rem)] leading-[1.15] font-extrabold tracking-[-0.02em] text-[var(--fg)]">
          {album.title}
        </h1>
      </section>

      <EcgDivider />

      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {album.items.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.05}>
              <div className="group relative aspect-video overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-warm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm font-medium text-white">{item.alt}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
