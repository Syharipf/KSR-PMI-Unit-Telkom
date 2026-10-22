import { getSiteConfig } from '@/lib/content';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageHero } from '@/components/layout/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alamat Sekretariat & Kontak Resmi',
  description: 'Lokasi sekretariat, peta Google Maps, email resmi, nomor WhatsApp, dan akun media sosial KSR PMI Tel-U.',
};

export default function KontakPage() {
  const config = getSiteConfig();

  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow="Hubungi Kami"
        title="Alamat Sekretariat & Kontak Resmi"
        lead="Informasi resmi lokasi sekretariat, koordinat peta Student Center Telkom University, kanal komunikasi, dan media sosial KSR PMI Unit Universitas Telkom."
      />

      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Info */}
          <div className="flex flex-col gap-6 xl:col-span-5">
            <FadeIn className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-md">
              <h2 className="mb-4 text-lg font-bold text-[var(--fg)]">Alamat Sekretariat</h2>
              <p className="text-base leading-relaxed text-[var(--fg-2)]">
                {config.address.label}
                <br />
                {config.address.street}
                <br />
                {config.address.city}, {config.address.region} {config.address.postalCode}
              </p>
              <div className="mt-5">
                <a
                  href={config.address.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] hover:underline"
                >
                  Buka di Aplikasi Google Maps ↗
                </a>
              </div>
            </FadeIn>

            <FadeIn
              delay={0.05}
              className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-md"
            >
              <h2 className="mb-4 text-lg font-bold text-[var(--fg)]">Saluran Komunikasi</h2>
              <div className="flex flex-col gap-4 text-base text-[var(--fg-2)]">
                <div>
                  <span className="block font-mono text-sm font-semibold text-[var(--meta)] uppercase">
                    Surat &amp; Email:
                  </span>
                  <a
                    href={`mailto:${config.contact.email}`}
                    className="text-base font-medium transition-colors hover:text-[var(--accent)] sm:text-lg"
                  >
                    {config.contact.email}
                  </a>
                </div>
                <div className="pt-2">
                  <span className="block font-mono text-sm font-semibold text-[var(--meta)] uppercase">
                    WhatsApp Hotline / Siaga:
                  </span>
                  <a
                    href={`https://wa.me/${config.contact.whatsapp.replace(/\D/g, '')}`}
                    className="font-mono text-base font-medium transition-colors hover:text-[var(--accent)] sm:text-lg"
                  >
                    {config.contact.whatsapp}
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn
              delay={0.1}
              className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-warm)] p-6"
            >
              <h2 className="mb-4 text-base font-bold tracking-wider text-[var(--fg)] uppercase">
                Media Sosial Resmi
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {config.socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-sm"
                  >
                    <span className="block font-bold text-[var(--fg)] capitalize">{s.platform}</span>
                    <span className="mt-1 block truncate text-sm text-[var(--muted)]">{s.handle}</span>
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Peta */}
          <FadeIn delay={0.15} className="flex flex-col xl:col-span-7">
            <div className="relative h-[440px] min-h-[440px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-warm)] shadow-sm xl:h-full">
              <iframe
                src={config.address.mapsEmbedUrl}
                title="Peta Lokasi Sekretariat KSR PMI Tel-U"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
