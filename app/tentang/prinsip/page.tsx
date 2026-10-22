import { getTentangPage } from '@/lib/content';
import { TentangShell } from '@/components/layout/TentangShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tujuh Prinsip Dasar Gerakan',
  description: 'Kemanusiaan, kesamaan, kenetralan, kemandirian, kesukarelaan, kesatuan, dan kesemestaan menurut ICRC dan PMI.',
};

export default function PrinsipPage() {
  const { frontmatter, body } = getTentangPage('prinsip');

  return (
    <TentangShell
      slug="prinsip"
      eyebrow="Prinsip Dasar"
      title={frontmatter.title}
      lead={frontmatter.ringkas}
      body={body}
    />
  );
}
