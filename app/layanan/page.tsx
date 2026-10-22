import Image from 'next/image';
import { getLayananList, getSiteConfig } from '@/lib/content';
import { FadeIn } from '@/components/motion/FadeIn';
import { PageHero } from '@/components/layout/PageHero';
import { PriceListGallery } from '@/components/media/Lightbox';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Layanan & Permohonan Bantuan',
  description:
    'Call center medis darurat, pengajuan siaga medis dan pelatihan medis, donor darah, serta kerja sama kemanusiaan.',
};

export default function LayananPage() {
  const layanans = getLayananList();
  const services = layanans.filter((layanan) => !layanan.rental);
  const rental = layanans.find((layanan) => layanan.rental);
  const site = getSiteConfig();
  const instagramHandle = site.socials.find((social) => social.platform === 'instagram')?.handle;

  return (
    <div className="flex w-full flex-col">
      <PageHero
        eyebrow="Kemanusiaan & Medis"
        title="Layanan KSR PMI Telkom University"
        lead="Akses call center darurat, pengajuan kerja sama donor darah, permohonan siaga dan pelatihan medis, serta peminjaman peralatan medis dan kegiatan."
        ambulance
      />
      <nav
        aria-label="Pintasan Layanan"
        className="sticky top-[var(--header-h)] z-20 w-full border-y border-[var(--border)] bg-[var(--surface)]/90 px-[clamp(20px,2.8vw,56px)] py-3 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1440px] items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="shrink-0 font-mono text-[11px] font-bold tracking-wider text-[var(--muted)] uppercase">
            Layanan:
          </span>
          {services.map((lay) => (
            <a
              key={lay.slug}
              href={`#${lay.slug}`}
              className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface-warm)] px-3 py-1 text-xs font-semibold text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {lay.nama}
            </a>
          ))}
          {rental && (
            <a
              href={`#${rental.slug}`}
              className="shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface-warm)] px-3 py-1 text-xs font-semibold text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {rental.nama}
            </a>
          )}
        </div>
      </nav>

      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
          {services.map((lay, idx) => {
            const hasPhoneInDesc = Boolean(lay.phone && lay.deskripsi.includes(lay.phone.label));
            const [descBefore, descAfter] = hasPhoneInDesc
              ? lay.deskripsi.split(lay.phone!.label)
              : [lay.deskripsi, null];

            return (
              <FadeIn
                key={lay.slug}
                id={lay.slug}
                delay={idx * 0.05}
                className={`flex scroll-mt-28 flex-col rounded-[var(--radius-lg)] border bg-[var(--surface)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--accent)]/40 hover:shadow-lg sm:p-6 ${
                  lay.coverage || lay.submission
                    ? 'border-[var(--accent)]/25 xl:col-span-2 xl:p-8'
                    : 'border-[var(--border)]'
                }`}
              >
                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-extrabold text-[var(--fg)] sm:text-2xl">
                    {lay.nama}
                  </h2>
                  <p className="mt-1 text-lg leading-relaxed font-semibold text-[var(--fg-2)]">
                    {lay.ringkas}
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-[var(--muted)]">
                    {descAfter !== null ? (
                      <>
                        {descBefore}
                        <a
                          href={lay.phone?.href}
                          className="font-semibold text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-2 hover:decoration-[var(--accent)]"
                        >
                          {lay.phone?.label}
                        </a>
                        {descAfter}
                      </>
                    ) : (
                      lay.deskripsi
                    )}
                  </p>
                </div>

                {lay.qr && (
                  <div className="mt-7 grid gap-4 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
                    {/* QR besar ke WhatsApp layanan darurat */}
                    <div className="mx-auto flex w-full max-w-[300px] flex-col items-center justify-center gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-warm)]/60 p-3 text-center md:mx-0 md:max-w-none">
                      <a
                        href={lay.qr.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={lay.qr.label}
                        className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-white p-2 shadow-sm transition-colors hover:border-[var(--accent)]"
                      >
                        <Image
                          src={lay.qr.src}
                          alt={`QR ${lay.qr.label}`}
                          width={232}
                          height={232}
                          className="h-[232px] w-[232px]"
                        />
                      </a>
                      <div className="min-w-0">
                        <span className="font-mono text-xs font-bold tracking-[0.14em] text-[var(--accent)] uppercase">
                          WhatsApp
                        </span>
                        {lay.phone && (
                          <a
                            href={lay.phone.href}
                            className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--fg)] underline decoration-[var(--border)] underline-offset-2 hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
                          >
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="size-3.5"
                            >
                              <path d="M4.5 5.5c0 7.5 6.5 14 14 14l2-2.5-4-2-1.8 1.8a12.5 12.5 0 0 1-5.5-5.5L11 9.5l-2-4z" />
                            </svg>
                            <span>
                              {lay.phone.label}
                              {lay.phone.contact ? ` (${lay.phone.contact})` : ''}
                            </span>
                          </a>
                        )}
                        <p className="mt-1 text-xs leading-relaxed text-[var(--fg-2)]">
                          {lay.qr.caption}
                        </p>
                        <a
                          href={lay.qr.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
                        >
                          Buka WhatsApp →
                        </a>
                        {lay.instagram && (
                          <a
                            href={lay.instagram.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 block text-[11px] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                          >
                            {instagramHandle ?? 'Instagram'} · Lihat poster →
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Peta jangkauan; cincin adalah ilustrasi, bukan batas resmi */}
                    <div className="flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]">
                      <div className="relative">
                        <iframe
                          title={`Peta jangkauan layanan ${lay.nama}`}
                          src={`https://www.google.com/maps?q=${encodeURIComponent(
                            lay.coverage?.mapQuery ?? 'Telkom University Bandung',
                          )}&z=13&output=embed`}
                          className="pointer-events-none h-56 w-full border-0"
                          loading="lazy"
                          tabIndex={-1}
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 flex items-center justify-center"
                        >
                          <span className="absolute size-[208px] rounded-full border border-dashed border-[var(--accent)]/20" />
                          <span className="absolute size-[104px] rounded-full border border-dashed border-[var(--accent)]/35" />
                          <span className="absolute size-[52px] rounded-full border border-[var(--accent)]/45 bg-[var(--accent)]/10" />
                          <span className="relative flex size-3 items-center justify-center">
                            <span className="absolute size-6 rounded-full bg-[var(--accent)]/15" />
                            <span className="relative size-2.5 rounded-full bg-[var(--accent)] ring-2 ring-[var(--bg)]" />
                          </span>
                        </div>
                        <span className="absolute top-3 left-3 rounded-full border border-[var(--border)] bg-[var(--bg)]/95 px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-[var(--fg-2)] uppercase">
                          Ilustrasi jangkauan · ±{lay.coverage?.radiusKm ?? 2} km
                        </span>
                      </div>

                      <div className="flex flex-col gap-3 p-4">
                        <div className="flex flex-wrap gap-1.5">
                          {lay.coverage?.radiusKm && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-2.5 py-1 text-xs font-semibold text-[var(--accent)]">
                              <span className="size-1.5 rounded-full bg-[var(--accent)]" />
                              Radius ±{lay.coverage.radiusKm} km
                            </span>
                          )}
                          {(lay.coverage?.areas ?? []).map((area) => (
                            <span
                              key={area}
                              className="rounded-full border border-[var(--border)] bg-[var(--surface-warm)] px-2.5 py-1 text-xs font-medium text-[var(--fg-2)]"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-end justify-between gap-2">
                          <p className="max-w-[52ch] text-xs leading-relaxed text-[var(--muted)]">
                            Radius layanan maksimal ±{lay.coverage?.radiusKm ?? 2} km dari Telkom
                            University. Peta dikunci agar radius tetap akurat — buka peta untuk
                            menjelajah, lalu konfirmasi lokasi via WhatsApp.
                          </p>
                          <a
                            href={`https://www.google.com/maps?q=${encodeURIComponent(
                              lay.coverage?.mapQuery ?? 'Telkom University Bandung',
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
                          >
                            Buka peta ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 grid grid-cols-1 gap-6 border-t border-[var(--border-soft)] pt-7 md:grid-cols-2">
                  <div className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--surface-warm)]/40 p-5">
                    <div className="mb-4 flex items-center justify-between border-b border-[var(--border-soft)] pb-2.5">
                      <h3 className="text-sm font-bold tracking-wider text-[var(--fg)] uppercase">
                        Ketentuan Layanan
                      </h3>
                      <span className="font-mono text-[10px] font-bold tracking-wider text-[var(--muted)] uppercase">
                        {lay.syarat.length} Poin
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {lay.syarat.map((s, sIdx) => (
                        <li
                          key={sIdx}
                          className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--fg-2)]"
                        >
                          <span
                            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                            aria-hidden="true"
                          />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--surface-warm)]/40 p-5">
                    <div className="mb-4 flex items-center justify-between border-b border-[var(--border-soft)] pb-2.5">
                      <h3 className="text-sm font-bold tracking-wider text-[var(--fg)] uppercase">
                        Alur Layanan · Roadmap
                      </h3>
                      <span className="font-mono text-[10px] font-bold tracking-wider text-[var(--accent)] uppercase">
                        {lay.alur.length} Tahapan
                      </span>
                    </div>
                    <div className="relative pl-7 before:absolute before:top-3 before:bottom-3 before:left-3 before:w-px before:bg-gradient-to-b before:from-[var(--accent)] before:via-[var(--border)] before:to-[var(--accent)]">
                      <div className="flex flex-col gap-3.5">
                        {lay.alur.map((a, aIdx) => (
                          <div key={aIdx} className="group/step relative">
                            <span
                              className="absolute top-0.5 -left-7 flex size-6 items-center justify-center rounded-full border border-[var(--surface)] bg-[var(--accent)] font-mono text-[11px] font-bold text-white shadow-xs transition-transform group-hover/step:scale-110"
                              aria-hidden="true"
                            >
                              {aIdx + 1}
                            </span>
                            <div className="rounded-[var(--radius-sm)] border border-transparent p-1 transition-colors hover:border-[var(--border-soft)] hover:bg-[var(--surface)]">
                              <span className="font-mono text-[10px] font-bold tracking-wider text-[var(--accent)] uppercase">
                                Tahap {String(aIdx + 1).padStart(2, '0')}
                              </span>
                              <p className="mt-0.5 text-sm leading-relaxed text-[var(--fg-2)]">
                                {a}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {lay.submission && (
                  <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    {/* Dokumen & formulir pengajuan */}
                    <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-warm)]/40 p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-3 border-b border-[var(--border-soft)] pb-3">
                        <h3 className="text-sm font-bold text-[var(--fg)]">
                          Dokumen &amp; formulir pengajuan
                        </h3>
                        <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--muted)] uppercase">
                          SOP resmi
                        </span>
                      </div>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {[
                          {
                            label: 'Jadwal Kegiatan',
                            desc: 'Cek tanggal yang tersedia sebelum mengajukan.',
                            href: lay.submission.scheduleUrl,
                          },
                          {
                            label: 'Format Surat Siaga Medis',
                            desc: 'Template surat permohonan siaga medis.',
                            href: lay.submission.siagaLetterUrl,
                          },
                          {
                            label: 'Format Surat Pelatihan Medis',
                            desc: 'Template surat permohonan pelatihan medis.',
                            href: lay.submission.trainingLetterUrl,
                          },
                          {
                            label: 'Format Surat Permohonan',
                            desc: 'Template surat permohonan kerja sama donor darah.',
                            href: lay.submission.donorLetterUrl,
                          },
                          {
                            label: 'Formulir Pengajuan',
                            desc: 'Unggah surat permohonan dan data kegiatan.',
                            href: lay.submission.formUrl,
                          },
                          {
                            label: 'Form Feedback',
                            desc: 'Diisi setelah kegiatan selesai dilaksanakan.',
                            href: lay.submission.feedbackUrl,
                          },
                          {
                            label: 'SOP Lengkap',
                            desc:
                              lay.slug === 'donor-darah'
                                ? 'Alur & SOP kerja sama donor darah.'
                                : 'Alur kerja sama siaga medis & pelatihan medis.',
                            href: lay.submission.sopUrl,
                          },
                        ]
                          .filter((item) => item.href)
                          .map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              target="_blank"
                              rel="noreferrer"
                              className="group flex items-start justify-between gap-3 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-3 transition-colors hover:border-[var(--accent)]"
                            >
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                                  {item.label}
                                </span>
                                <span className="mt-0.5 block text-[11px] leading-relaxed text-[var(--muted)]">
                                  {item.desc}
                                </span>
                              </span>
                              <span
                                aria-hidden="true"
                                className="shrink-0 text-xs text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]"
                              >
                                ↗
                              </span>
                            </a>
                          ))}
                      </div>
                    </div>

                    {/* QR kontak admin (OA LINE & WhatsApp) */}
                    <div className="flex flex-col justify-between rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-warm)]/40 p-4 sm:p-5">
                      <div>
                        <div className="flex items-center justify-between gap-3 border-b border-[var(--border-soft)] pb-3">
                          <h3 className="text-sm font-bold text-[var(--fg)]">
                            Kontak admin pengajuan
                          </h3>
                          <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--muted)] uppercase">
                            Pindai / klik
                          </span>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-3">
                          {lay.submission.lineQr && (
                            <a
                              href={lay.submission.lineHref}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Buka OA LINE ${lay.submission.lineId}`}
                              className="flex flex-col items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-2.5 text-center transition-colors hover:border-[var(--accent)]"
                            >
                              <div className="relative size-[116px] shrink-0 overflow-hidden rounded-[8px] border border-[var(--border)] bg-white p-1">
                                <Image
                                  src={lay.submission.lineQr}
                                  alt={`QR OA LINE ${lay.submission.lineId}`}
                                  fill
                                  sizes="116px"
                                  className="object-contain"
                                />
                              </div>
                              <div className="min-w-0">
                                <span className="block text-xs font-semibold text-[var(--fg)]">
                                  OA LINE
                                </span>
                                <span className="font-mono text-[11px] text-[var(--muted)]">
                                  {lay.submission.lineId}
                                </span>
                              </div>
                            </a>
                          )}

                          {lay.submission.whatsappQr && (
                            <a
                              href={lay.submission.whatsappHref}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Buka WhatsApp admin ${lay.submission.whatsapp}`}
                              className="flex flex-col items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] p-2.5 text-center transition-colors hover:border-[var(--accent)]"
                            >
                              <div className="relative size-[116px] shrink-0 overflow-hidden rounded-[8px] border border-[var(--border)] bg-white p-1">
                                <Image
                                  src={lay.submission.whatsappQr}
                                  alt={`QR WhatsApp admin ${lay.submission.whatsapp}`}
                                  fill
                                  sizes="116px"
                                  className="object-contain"
                                />
                              </div>
                              <div className="min-w-0">
                                <span className="block text-xs font-semibold text-[var(--fg)]">
                                  WhatsApp
                                </span>
                                <span className="font-mono text-[11px] text-[var(--muted)]">
                                  {lay.submission.whatsapp}
                                  {lay.submission.contact ? ` (${lay.submission.contact})` : ''}
                                </span>
                              </div>
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
                        Pindai QR atau klik kartu untuk menghubungi admin
                        {lay.submission.contact ? ` (${lay.submission.contact})` : ''} guna
                        konfirmasi jadwal dan SOP.
                      </p>
                    </div>
                  </div>
                )}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-soft)] pt-6">
                  {lay.phone ? (
                    <a
                      href={lay.phone.href}
                      className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-[var(--fg)] underline decoration-[var(--border)] underline-offset-2 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                      >
                        <path d="M4.5 5.5c0 7.5 6.5 14 14 14l2-2.5-4-2-1.8 1.8a12.5 12.5 0 0 1-5.5-5.5L11 9.5l-2-4z" />
                      </svg>
                      <span>
                        {lay.phone.label}
                        {lay.phone.contact ? ` (${lay.phone.contact})` : ''}
                      </span>
                    </a>
                  ) : (
                    <span className="font-mono text-sm font-medium text-[var(--meta)]">
                      Tindak lanjut dikonfirmasi oleh admin
                    </span>
                  )}
                  <a
                    href={lay.cta.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-95"
                  >
                    {lay.cta.label}
                  </a>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {rental && rental.rental && (
        <section
          id={rental.slug}
          className="w-full scroll-mt-28 border-t border-[var(--border)] bg-[var(--surface-warm)]/50 px-[clamp(20px,2.8vw,56px)] py-10 lg:py-14"
        >
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[72ch]">
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--fg)] sm:text-3xl">
                  {rental.nama}
                </h2>
                <p className="mt-2 text-base leading-relaxed font-semibold text-[var(--fg-2)]">
                  {rental.ringkas}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {rental.deskripsi}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {rental.phone && (
                  <a
                    href={rental.phone.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-semibold text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    WhatsApp {rental.phone.label}
                    {rental.phone.contact ? ` (${rental.phone.contact})` : ''}
                  </a>
                )}
                <a
                  href={rental.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-on)] shadow-sm transition-all hover:shadow-md hover:brightness-95"
                >
                  {rental.cta.label} →
                </a>
              </div>
            </div>

            <div className="mt-8 grid items-start gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 border-b border-[var(--border-soft)] pb-3">
                  <h3 className="text-lg font-bold text-[var(--fg)]">Daftar Harga</h3>
                  <span className="font-mono text-xs tracking-[0.12em] text-[var(--muted)] uppercase">
                    Per hari
                  </span>
                </div>

                <div className="mt-4 grid gap-x-8 gap-y-6 md:grid-cols-2">
                  {rental.rental.catalog.map((group) => (
                    <div key={group.group}>
                      <h4 className="font-mono text-xs font-bold tracking-[0.12em] text-[var(--accent)] uppercase">
                        {group.group}
                      </h4>
                      <ul className="mt-2">
                        {group.items.map((item) => (
                          <li
                            key={item.nama}
                            className="flex items-baseline justify-between gap-3 border-b border-[var(--border-soft)] py-1.5 text-[15px] last:border-0"
                          >
                            <span className="text-[var(--fg-2)]">{item.nama}</span>
                            <span className="shrink-0 font-mono text-sm font-semibold text-[var(--fg)]">
                              {item.harga}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {rental.rental.packages.map((pkg) => (
                    <div
                      key={pkg.nama}
                      className="rounded-[var(--radius-md)] border border-[var(--border-soft)] bg-[var(--surface-warm)]/60 p-3"
                    >
                      <span className="font-mono text-[10px] font-bold tracking-[0.12em] text-[var(--muted)] uppercase">
                        Paket
                      </span>
                      <h5 className="mt-1 text-sm font-bold text-[var(--fg)]">{pkg.nama}</h5>
                      <p className="mt-0.5 text-xs leading-relaxed text-[var(--muted)]">
                        {pkg.isi.join(' + ')}
                      </p>
                      <p className="mt-2 font-mono text-sm font-bold text-[var(--accent)]">
                        {pkg.harga}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-[var(--fg)]">Foto &amp; poster harga</h3>
                    <span className="font-mono text-xs text-[var(--muted)]">Dari formulir</span>
                  </div>
                  <div className="mt-3">
                    <PriceListGallery images={rental.rental.priceListImages} />
                  </div>
                </div>

                <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <h4 className="font-mono text-xs font-bold tracking-[0.12em] text-[var(--accent)] uppercase">
                        Syarat
                      </h4>
                      <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-[var(--fg-2)]">
                        {rental.syarat.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="mb-3 flex items-center justify-between border-b border-[var(--border-soft)] pb-2">
                        <h4 className="font-mono text-xs font-bold tracking-[0.12em] text-[var(--accent)] uppercase">
                          Alur · Roadmap
                        </h4>
                        <span className="font-mono text-[10px] font-bold text-[var(--muted)] uppercase">
                          {rental.alur.length} Tahap
                        </span>
                      </div>
                      <div className="relative pl-6 before:absolute before:top-2 before:bottom-2 before:left-2.5 before:w-px before:bg-gradient-to-b before:from-[var(--accent)] before:via-[var(--border)] before:to-[var(--accent)]">
                        <div className="flex flex-col gap-2.5">
                          {rental.alur.map((a, aIdx) => (
                            <div key={aIdx} className="group/step relative">
                              <span
                                className="absolute top-0.5 -left-6 flex size-5 items-center justify-center rounded-full border border-[var(--surface)] bg-[var(--accent)] font-mono text-[10px] font-bold text-white shadow-xs transition-transform group-hover/step:scale-110"
                                aria-hidden="true"
                              >
                                {aIdx + 1}
                              </span>
                              <div className="rounded-[var(--radius-sm)] p-1 transition-colors hover:bg-[var(--surface-warm)]">
                                <span className="font-mono text-[9px] font-bold tracking-wider text-[var(--accent)] uppercase">
                                  Langkah {String(aIdx + 1).padStart(2, '0')}
                                </span>
                                <p className="text-xs leading-relaxed text-[var(--fg-2)]">{a}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
