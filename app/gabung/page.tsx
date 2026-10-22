import { getFaqList, getSiteConfig } from '@/lib/content';
import { AccordionItem } from '@/components/ui/Accordion';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageHero } from '@/components/layout/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pendaftaran Relawan Baru (Diklatsar)',
  description: 'Alur pendaftaran, kriteria persyaratan, FAQ, dan formulir penerimaan relawan KSR PMI Unit Tel-U.',
};

export default function GabungPage() {
  const faqs = getFaqList();
  const config = getSiteConfig();

  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow="Lorem Ipsum Dolor"
        title="Lorem Ipsum Dolor Sit Amet"
        lead="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ambulance
      />

      {/* Syarat & Alur — lebar penuh */}
      <section className="w-full border-b border-[var(--border)] bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
          <FadeIn className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-md sm:p-6">
            <h2 className="mb-6 text-xl font-bold text-[var(--fg)] sm:text-2xl">Lorem Ipsum Dolor</h2>
            <ul className="list-disc space-y-3 pl-6 text-base leading-relaxed text-[var(--fg-2)]">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            </ul>
          </FadeIn>

          <FadeIn
            delay={0.08}
            className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-md sm:p-6"
          >
            <h2 className="mb-6 text-xl font-bold text-[var(--fg)] sm:text-2xl">Lorem Ipsum Dolor</h2>
            <ol className="list-decimal space-y-3 pl-6 text-base leading-relaxed text-[var(--fg-2)]">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            </ol>
          </FadeIn>
        </div>
      </section>

      {/* CTA Box */}
      <section className="w-full bg-[var(--surface-warm)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <FadeIn className="w-full rounded-[var(--radius-lg)] border border-[var(--accent)] bg-[var(--surface)] p-6 text-center shadow-md sm:p-14">
          <span className="font-mono text-sm font-bold tracking-wider text-[var(--accent)] uppercase">
            Lorem Ipsum Dolor
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-[var(--fg)] sm:text-3xl">
            Lorem Ipsum Dolor Sit Amet
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[var(--fg-2)]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={config.links.registration}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:brightness-95 hover:shadow-lg sm:text-base"
            >
              Buka Formulir Pendaftaran (Google Form)
            </a>
            <a
              href={`https://wa.me/${config.contact.whatsapp.replace(/\D/g, '')}?text=Halo%20Kak%20Panitia%20Diklatsar%20KSR%20PMI%20Tel-U%2C%20saya%20sudah%20mengisi%20formulir%20pendaftaran.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-warm)] px-8 py-3.5 text-sm font-semibold text-[var(--fg)] shadow-sm transition-all hover:bg-[var(--border)] sm:text-base"
            >
              Konfirmasi ke WhatsApp Panitia
            </a>
          </div>
        </FadeIn>
      </section>

      {/* FAQ */}
      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="mb-8">
          <span className="font-mono text-sm font-bold tracking-wider text-[var(--accent)] uppercase">
            Lorem Ipsum Dolor
          </span>
          <h2 className="mt-2 text-2xl font-extrabold text-[var(--fg)] sm:text-3xl">
            Lorem Ipsum Dolor Sit Amet
          </h2>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-2">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              question={faq.pertanyaan}
              answer={faq.jawaban}
              defaultOpen={idx === 0}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
