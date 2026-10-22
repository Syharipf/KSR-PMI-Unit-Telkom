import { getKegiatanList } from '@/lib/content';
import { KegiatanFilter } from '@/components/sections/KegiatanFilter';
import { PageHero } from '@/components/layout/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dokumentasi & Berita Kegiatan',
  description: 'Liputan dan arsip kegiatan aksi kemanusiaan, siaga medis, donor darah, dan pelatihan KSR PMI Tel-U.',
};

export default function KegiatanIndexPage() {
  const allKegiatan = getKegiatanList();

  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow="Lorem Ipsum Dolor"
        title="Lorem Ipsum Dolor Sit Amet"
        lead="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />

      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <KegiatanFilter initialKegiatan={allKegiatan} />
      </section>
    </div>
  );
}
