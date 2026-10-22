import { getTentangPage } from '@/lib/content';
import { TentangShell, LAMBANG_LINKS } from '@/components/layout/TentangShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Penggunaan Lambang',
  description: 'Tanda pelindung dan tanda pengenal, siapa yang berhak, serta syarat izin menurut UU Kepalangmerahan.',
};

export default function Page() {
  const { frontmatter, body } = getTentangPage('lambang-penggunaan');

  return (
    <TentangShell
      slug="lambang"
      eyebrow="Bagian Lambang"
      title={frontmatter.title}
      lead={frontmatter.ringkas}
      body={body}
      subnav={LAMBANG_LINKS}
      activeHref="/tentang/lambang/penggunaan"
    />
  );
}
