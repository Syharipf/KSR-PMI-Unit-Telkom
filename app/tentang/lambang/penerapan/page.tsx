import { getTentangPage } from '@/lib/content';
import { TentangShell, LAMBANG_LINKS } from '@/components/layout/TentangShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Penerapan Identitas PMI',
  description: 'Bentuk lambang PMI, pihak yang boleh memakainya, dan konsistensi identitas organisasi.',
};

export default function Page() {
  const { frontmatter, body } = getTentangPage('lambang-penerapan');

  return (
    <TentangShell
      slug="lambang"
      eyebrow="Bagian Lambang"
      title={frontmatter.title}
      lead={frontmatter.ringkas}
      body={body}
      subnav={LAMBANG_LINKS}
      activeHref="/tentang/lambang/penerapan"
    />
  );
}
