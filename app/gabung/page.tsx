import { getFaqList, getSiteConfig } from '@/lib/content';
import { AccordionItem } from '@/components/ui/Accordion';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageHero } from '@/components/layout/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pendaftaran Relawan Baru (Diklatsar)',
  description:
    'Informasi penerimaan calon anggota baru dan tahapan Diklatsar KSR PMI Unit Universitas Telkom.',
};

export default function GabungPage() {
  const faqs = getFaqList();
  const site = getSiteConfig();
  const instagram = site.socials.find((s) => s.platform === 'instagram');

  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow="Open Recruitment"
        title="Pendaftaran Relawan Baru"
        lead="Pendidikan dan Pelatihan Dasar (Diklatsar) Korps Sukarela Palang Merah Indonesia Unit Universitas Telkom."
        ambulance
      />

      {/* Status Pendaftaran: Coming Soon */}
      <section className="w-full border-b border-[var(--border)] bg-[var(--surface-warm)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <FadeIn className="mx-auto w-full max-w-[1440px] rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--accent)]/50 bg-[var(--surface)] p-6 text-center shadow-md sm:p-12">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 px-3.5 py-1 font-mono text-xs font-bold tracking-wider text-[var(--accent)] uppercase">
            <span className="size-2 animate-pulse rounded-full bg-[var(--accent)]" />
            Status: Segera Hadir (Coming Soon)
          </div>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[var(--fg)] sm:text-3xl">
            Pendaftaran Diklatsar Belum Dibuka
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--fg-2)] sm:text-base">
            Masa penerimaan calon relawan baru periode ini saat ini belum dibuka. Simak persyaratan
            dan tahapan di bawah ini untuk mempersiapkan diri, serta pantau terus pengumuman jadwal
            resmi pembukaan pendaftaran melalui kanal informasi resmi kami.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {instagram && (
              <a
                href={instagram.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-95"
              >
                Pantau Pengumuman di Instagram ↗
              </a>
            )}
            <a
              href="https://lin.ee/l7UHvDs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-warm)] px-6 py-2.5 text-sm font-semibold text-[var(--fg)] transition-all hover:bg-[var(--border)]"
            >
              Hubungi via OA LINE ↗
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Syarat & Alur Diklatsar */}
      <section className="w-full border-b border-[var(--border)] bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-6 xl:grid-cols-2">
          <FadeIn className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-2 border-b border-[var(--border-soft)] pb-4">
              <span className="flex size-7 items-center justify-center rounded-full bg-[var(--accent)] text-xs text-white">
                ✓
              </span>
              <h2 className="text-xl font-bold text-[var(--fg)]">
                Persyaratan Calon Relawan
              </h2>
            </div>
            <ul className="mt-6 list-disc space-y-3.5 pl-6 text-sm leading-relaxed text-[var(--fg-2)] sm:text-base">
              <li>Mahasiswa aktif Telkom University dari seluruh program studi dan angkatan.</li>
              <li>Memiliki dedikasi, jiwa kepalangmerahan, dan komitmen kerelawanan yang tinggi.</li>
              <li>Sehat jasmani dan rohani serta siap menjalani kegiatan fisik terukur.</li>
              <li>Bersedia mengikuti seluruh tahapan Diklatsar dari pembekalan ruang hingga gladi lapangan.</li>
              <li>Bersedia menaati Anggaran Dasar, Anggaran Rumah Tangga, dan kode etik KSR PMI.</li>
            </ul>
          </FadeIn>

          <FadeIn
            delay={0.08}
            className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-center gap-2 border-b border-[var(--border-soft)] pb-4">
              <span className="flex size-7 items-center justify-center rounded-full bg-[var(--accent)] text-xs text-white">
                →
              </span>
              <h2 className="text-xl font-bold text-[var(--fg)]">
                Tahapan Seleksi &amp; Pendidikan
              </h2>
            </div>
            <ol className="mt-6 list-decimal space-y-3.5 pl-6 text-sm leading-relaxed text-[var(--fg-2)] sm:text-base">
              <li>
                <strong>Pendaftaran &amp; Berkas:</strong> Pengisian formulir online dan pengunggahan kelengkapan data diri.
              </li>
              <li>
                <strong>Screening &amp; Wawancara:</strong> Verifikasi komitmen, minat departemen, dan peninjauan riwayat kesehatan.
              </li>
              <li>
                <strong>Materi Ruang (Indoor):</strong> Pelatihan teori dasar pertolongan pertama, kepalangmerahan, dan etika relawan.
              </li>
              <li>
                <strong>Gladi Lapangan (Outdoor):</strong> Simulasi navigasi darat, penanganan darurat medan terbuka, dan kerja sama tim.
              </li>
              <li>
                <strong>Pelantikan Anggota:</strong> Pengukuhan resmi sebagai Anggota Muda KSR PMI Unit Universitas Telkom.
              </li>
            </ol>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-8">
            <span className="font-mono text-xs font-bold tracking-wider text-[var(--accent)] uppercase">
              Tanya Jawab
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-[var(--fg)] sm:text-3xl">
              Pertanyaan yang Sering Diajukan (FAQ)
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
        </div>
      </section>
    </div>
  );
}
