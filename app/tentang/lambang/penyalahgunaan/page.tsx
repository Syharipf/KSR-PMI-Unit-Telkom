import { getTentangPage } from '@/lib/content';
import { TentangShell, LAMBANG_LINKS } from '@/components/layout/TentangShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Penyalahgunaan Lambang',
  description: 'Peniruan, pemakaian tidak semestinya, dan tipu daya licik beserta akibat hukumnya.',
};

export default function Page() {
  const { frontmatter, body } = getTentangPage('lambang-penyalahgunaan');

  return (
    <TentangShell
      slug="lambang"
      eyebrow="Bagian Lambang"
      title={frontmatter.title}
      lead={frontmatter.ringkas}
      body={body}
      subnav={LAMBANG_LINKS}
      activeHref="/tentang/lambang/penyalahgunaan"
    />
  );
}
