import Link from 'next/link';
import Image from 'next/image';
import { getAlbumList } from '@/lib/content';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageHero } from '@/components/layout/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeri Dokumentasi Foto & Video',
  description: 'Kumpulan album foto kegiatan gladi lapangan, donor darah, dan aksi kemanusiaan KSR PMI Tel-U.',
};

export default function GaleriIndexPage() {
  const albums = getAlbumList();

  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow="Lorem Ipsum Dolor"
        title="Lorem Ipsum Dolor Sit Amet"
        lead="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />

      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {albums.map((album, idx) => (
            <FadeIn key={album.slug} delay={idx * 0.05}>
              <Link
                href={`/galeri/${album.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:shadow-xl"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface-warm)]">
                  <Image
                    src={album.cover.src}
                    alt={album.cover.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-3 bottom-3 rounded-[var(--radius-sm)] bg-black/75 px-2.5 py-1 font-mono text-sm font-semibold text-white backdrop-blur-sm">
                    {album.items.length} Foto
                  </span>
                </div>
                <div className="p-6">
                  <span className="font-mono text-sm font-medium text-[var(--meta)]">
                    {new Intl.DateTimeFormat('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }).format(new Date(album.date))}
                  </span>
                  <h2 className="mt-2 text-lg font-bold text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                    {album.title}
                  </h2>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
