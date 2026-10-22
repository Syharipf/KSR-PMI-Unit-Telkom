import { getTentangPage } from '@/lib/content';
import { TentangShell } from '@/components/layout/TentangShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visi, Misi, dan Nilai Organisasi',
  description: 'Arah pandang dan landasan perjuangan relawan kemanusiaan KSR PMI Unit Universitas Telkom.',
};

export default function VisiMisiPage() {
  const { frontmatter, body } = getTentangPage('visi-misi');

  return (
    <TentangShell
      slug="visi-misi"
      eyebrow="Arah Organisasi"
      title={frontmatter.title}
      lead={frontmatter.ringkas}
      body={body}
    />
  );
}
