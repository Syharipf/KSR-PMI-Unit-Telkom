import { getTentangPage } from '@/lib/content';
import { TentangShell } from '@/components/layout/TentangShell';
import { OrgTree } from '@/components/sections/OrgTree';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bagan Struktur Organisasi & Hierarki',
  description:
    'Susunan fungsi kepengurusan KSR PMI Unit Universitas Telkom: badan pengawas, inti pengurus, dan enam divisi beserta bidang kerjanya.',
};

export default function StrukturPage() {
  const { frontmatter, body } = getTentangPage('struktur');

  return (
    <TentangShell
      slug="struktur"
      eyebrow="Struktur Organisasi"
      title={frontmatter.title}
      lead={frontmatter.ringkas}
      body={body}
      before={<OrgTree />}
    />
  );
}
