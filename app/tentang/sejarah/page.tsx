import { getTentangPage } from '@/lib/content';
import { TentangShell } from '@/components/layout/TentangShell';
import { FadeIn } from '@/components/motion/FadeIn';
import { SolferinoScene, SolferinoTimeline } from '@/components/sections/SolferinoStory';
import { UnitRoots, UnitTimeline } from '@/components/sections/UnitStory';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sejarah KSR PMI Unit Universitas Telkom',
  description: 'Jejak gerakan kemanusiaan dari Pertempuran Solferino 1859 hingga berdirinya KSR PMI Unit Universitas Telkom, disertai rujukan sumber resmi.',
};

export default function SejarahPage() {
  const { frontmatter, body } = getTentangPage('sejarah');

  return (
    <TentangShell
      slug="sejarah"
      eyebrow="Linimasa Kemanusiaan"
      title={frontmatter.title}
      lead={frontmatter.ringkas}
      body={body}
      before={
        <>
          {/* Solferino 1859 — film tiga babak */}
          <section className="w-full border-b border-[var(--border)] bg-[var(--surface-warm)]/40 px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
            <FadeIn className="w-full">
              <SolferinoScene />
            </FadeIn>
            <FadeIn delay={0.1} className="mt-10 w-full">
              <SolferinoTimeline />
            </FadeIn>
          </section>

          {/* Jejak unit di kampus Telkom */}
          <section className="w-full border-b border-[var(--border)] bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
            <FadeIn className="w-full">
              <span className="font-mono text-sm font-bold tracking-wider text-[var(--accent)] uppercase">
                Jejak Unit
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--fg)] sm:text-3xl">
                Tiga akar KSR di kampus Telkom
              </h2>
              <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-[var(--fg-2)] sm:text-lg">
                Unit yang kini bernama KSR PMI Unit Universitas Telkom tumbuh dari tiga unit yang
                lahir pada rentang 1997 sampai 2013.
              </p>
            </FadeIn>

            <FadeIn delay={0.08} className="mt-8 w-full">
              <UnitTimeline />
            </FadeIn>

            <FadeIn delay={0.12} className="mt-10 w-full">
              <UnitRoots />
            </FadeIn>
          </section>
        </>
      }
    />
  );
}
