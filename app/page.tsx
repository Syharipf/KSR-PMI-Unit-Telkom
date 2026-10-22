import Link from 'next/link';
import Image from 'next/image';
import { getSiteConfig, getProgramList, getKegiatanList } from '@/lib/content';
import { CinematicWallpaper } from '@/components/media/CinematicWallpaper';
import { FilmstripBackdrop } from '@/components/media/FilmstripBackdrop';
import { CountUp } from '@/components/sections/CountUp';
import { FadeIn } from '@/components/motion/FadeIn';
import { AmbulancePass } from '@/components/motion/AmbulancePass';
import { EcgDivider } from '@/components/motion/EcgDivider';

const HERO_POSTER = '/media/hero/1.webp';
const HERO_STILLS = [
  '/media/hero/1.webp',
  '/media/hero/2.webp',
  '/media/hero/3.webp',
  '/media/hero/4.webp',
];

export default function HomePage() {
  const config = getSiteConfig();
  const programs = getProgramList().slice(0, 3);
  const kegiatans = getKegiatanList()
    .filter((k) => k.unggulan)
    .slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative isolate w-full overflow-hidden">
        <CinematicWallpaper sources={{ poster: HERO_POSTER }} stills={HERO_STILLS} opacity={0.88} />

        <div className="relative z-10 flex min-h-[min(calc(100svh/var(--ui-zoom)-var(--header-h)),calc(820px/var(--ui-zoom)))] w-full flex-col justify-between px-[clamp(20px,2.8vw,56px)] py-[clamp(16px,2.4vw,36px)]">
          {/* Top Bar Meta */}
          <FadeIn className="flex items-center justify-between gap-4 border-b border-[var(--fg)]/15 pb-4 font-mono text-xs tracking-[0.16em] text-[var(--fg-2)] uppercase">
            <span className="flex items-center gap-2.5">
              <span className="animate-heartbeat size-2 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
              Siamo tutti fratelli
            </span>
            <span className="hidden font-medium lg:block">
              {config.shortName} — Periode {config.period}
            </span>
            <span className="hidden text-right font-medium sm:block">
              {config.address.city}, ID · 6°58′S 107°37′E
            </span>
          </FadeIn>

          <div className="relative flex flex-1 flex-col justify-center py-[clamp(12px,2vh,32px)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 -right-[10vw] hidden aspect-square w-[38vw] max-w-[620px] -translate-y-1/2 md:block"
            >
              <div className="absolute inset-0 rounded-full border border-[var(--fg)]/10" />
              <div className="absolute inset-[14%] rounded-full border border-[var(--fg)]/10" />
              <div className="absolute inset-[28%] rounded-full border border-[var(--fg)]/10" />
              <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--fg)]/10" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-[var(--fg)]/10" />
            </div>

            <FadeIn delay={0.08} className="relative">
              <span className="block font-mono text-xs tracking-[0.24em] text-[var(--fg-2)] uppercase md:pl-[10vw]">
                01 — Siamo tutti fratelli
              </span>
              <h1 className="mt-3 text-[clamp(2rem,min(4.4vw,7.5vh),4.25rem)] leading-[0.94] font-extrabold tracking-[-0.04em] text-[var(--fg)] uppercase drop-shadow-sm">
                <span className="block">Siamo</span>
                <span className="block md:pl-[10vw]">tutti</span>
                <span className="block">fratelli</span>
              </h1>
              <p className="mt-[clamp(0.5rem,1.2vw,1rem)] text-right text-[clamp(0.95rem,1.2vw,1.15rem)] leading-none font-light tracking-[0.08em] text-[var(--fg-2)]">
                KSR PMI Unit Telkom.
              </p>
            </FadeIn>
          </div>

          {/* Bottom Bar: Keterangan & Tindakan Utama */}
          <div className="border-t border-[var(--fg)]/15 pt-4">
            <div className="grid grid-cols-1 items-end gap-5 md:grid-cols-12">
              <p className="max-w-[52ch] text-sm leading-relaxed text-[var(--fg-2)] md:col-span-5">
                Siamo tutti fratelli — kita semua bersaudara. KSR PMI Unit Universitas Telkom hadir
                untuk siaga medis, pelayanan kemanusiaan, dan pengembangan relawan mahasiswa.
              </p>
              <div className="flex flex-wrap items-center gap-3 md:col-span-4">
                <Link
                  href="/gabung"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-on)] shadow-sm transition-[filter] duration-[var(--motion-fast)] hover:brightness-95 focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none"
                >
                  Gabung Relawan
                </Link>
                <Link
                  href="/tentang/sejarah"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--fg)]/20 bg-[var(--bg)]/50 px-5 py-2.5 text-sm font-semibold text-[var(--fg)] backdrop-blur-sm transition-colors duration-[var(--motion-fast)] hover:bg-[var(--surface)] focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none"
                >
                  Kenali Sejarah Kami
                </Link>
              </div>
              <div className="flex items-end justify-between gap-4 font-mono text-xs tracking-[0.18em] text-[var(--muted)] uppercase md:col-span-3 md:flex-col md:items-end">
                <span>Sejak {config.foundedAt.slice(0, 4)}</span>
                <span>Gulir untuk menelusuri ↓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Stats Band langsung di bawah Hero (bersih, tenang, grounded) */}
      <section className="w-full border-b border-[var(--border)] bg-[var(--surface-warm)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-10">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-6 md:grid-cols-4">
          {config.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <span className="font-mono text-xl font-extrabold tracking-tight text-[var(--accent)] sm:text-3xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-1.5 text-xs font-semibold text-[var(--muted)] sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Program Unggulan */}
      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="mb-8 flex flex-col items-start gap-2">
            <span className="font-mono text-xs font-bold tracking-wider text-[var(--accent)] uppercase">
              Aksi Berkelanjutan
            </span>
            <h2 className="text-xl font-bold tracking-tight text-[var(--fg)] sm:text-2xl">
              Program Kerja Unggulan
            </h2>
          </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((prog) => (
              <div
                key={prog.slug}
                className="group flex flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:shadow-xl"
              >
                <div>
                  <span className="rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface-warm)] px-2.5 py-0.5 font-mono text-xs font-bold tracking-wider text-[var(--fg-2)] uppercase">
                    {prog.frekuensi}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                    {prog.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg-2)]">{prog.ringkas}</p>
                </div>
                <div className="mt-5 border-t border-[var(--border-soft)] pt-3">
                  <span className="font-mono text-xs font-medium text-[var(--meta)]">
                    Jadwal: {prog.jadwal}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/program"
              className="inline-flex items-center text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              Lihat Seluruh Katalog Program Kerja →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Divider EKG halus antara Program dan Kegiatan */}
      <EcgDivider />

      {/* 4. Kegiatan Terbaru */}
      <section className="relative isolate w-full overflow-hidden border-t border-[var(--border)] bg-[var(--surface-warm)]/50 px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <FilmstripBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-[1440px]">
          <div className="mb-8 flex flex-col items-start gap-2">
            <span className="font-mono text-xs font-bold tracking-wider text-[var(--accent)] uppercase">
              Dokumentasi Aksi
            </span>
            <h2 className="text-xl font-bold tracking-tight text-[var(--fg)] sm:text-2xl">
              Kegiatan &amp; Liputan Terbaru
            </h2>
          </div>

          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {kegiatans.map((k) => (
              <article
                key={k.slug}
                className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:shadow-xl"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface-warm)]">
                  <Image
                    src={k.cover.src}
                    alt={k.cover.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="font-mono text-xs font-medium text-[var(--meta)]">
                    {new Intl.DateTimeFormat('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }).format(new Date(k.date))}
                  </span>
                  <h3 className="mt-1.5 text-base font-bold text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                    <Link href={`/kegiatan/${k.slug}`}>{k.title}</Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--fg-2)]">
                    {k.ringkas}
                  </p>
                  <div className="mt-auto pt-4">
                    <Link
                      href={`/kegiatan/${k.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
                    >
                      Baca Liputan →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/kegiatan"
              className="inline-flex items-center text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              Telusuri Arsip Dokumentasi Berita Kegiatan →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Jalur ambulans bergerak sebagai transisi dinamis sebelum ajakan gabung */}
      <section
        aria-hidden="true"
        className="w-full overflow-hidden border-t border-[var(--border)] bg-[var(--surface-warm)]"
      >
        <AmbulancePass />
      </section>

      {/* 6. CTA Gabung Relawan */}
      <section className="w-full border-t border-[var(--border)] bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="mx-auto w-full max-w-[1440px] rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 text-center shadow-md sm:p-8">
          <span className="font-mono text-xs font-bold tracking-wider text-[var(--accent)] uppercase">
            Panggilan Kemanusiaan
          </span>
          <h2 className="mt-2 text-xl font-extrabold text-[var(--fg)] sm:text-2xl">
            Siap Menjadi Bagian dari Korps Sukarela?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--fg-2)] sm:text-base">
            Bergabunglah bersama keluarga besar KSR PMI Unit Universitas Telkom. Kembangkan
            keterampilan pertolongan pertama, asah kepemimpinan, dan wujudkan kepedulian nyata
            bagi sesama.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/gabung"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-95"
            >
              Informasi Pendaftaran (Coming Soon)
            </Link>
            <Link
              href="/kontak"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-warm)] px-6 py-2.5 text-sm font-semibold text-[var(--fg)] transition-all hover:bg-[var(--border)]"
            >
              Hubungi Sekretariat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
