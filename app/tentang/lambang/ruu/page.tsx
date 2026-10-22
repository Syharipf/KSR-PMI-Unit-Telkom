import { getTentangPage } from '@/lib/content';
import { TentangShell, LAMBANG_LINKS } from '@/components/layout/TentangShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RUU Lambang Palang Merah',
  description: 'Larangan Pasal 36 dan ketentuan pidana Pasal 37 sampai 40 UU Nomor 1 Tahun 2018.',
};

export default function Page() {
  const { frontmatter, body } = getTentangPage('lambang-ruu');

  return (
    <TentangShell
      slug="lambang"
      eyebrow="Bagian Lambang"
      title={frontmatter.title}
      lead={frontmatter.ringkas}
      body={body}
      subnav={LAMBANG_LINKS}
      activeHref="/tentang/lambang/ruu"
    />
  );
}
