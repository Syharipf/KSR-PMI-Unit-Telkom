import Link from 'next/link';
import Image from 'next/image';
import { getSiteConfig, getProgramList, getKegiatanList } from '@/lib/content';
import { CinematicWallpaper } from '@/components/media/CinematicWallpaper';
import { FilmstripBackdrop } from '@/components/media/FilmstripBackdrop';
import { CountUp } from '@/components/sections/CountUp';
import { FadeIn } from '@/components/motion/FadeIn';
import { AmbulancePass } from '@/components/motion/AmbulancePass';
import { EcgDivider } from '@/components/motion/EcgDivider';

const HERO_POSTER = '/media/hero/hero-dummy-01.svg';
const HERO_STILLS = [HERO_POSTER, '/media/hero/hero-dummy-02.svg', '/media/hero/hero-dummy-03.svg'];

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
        <CinematicWallpaper sources={{ poster: HERO_POSTER }} stills={HERO_STILLS} />

        <div className="relative z-10 flex min-h-[min(calc(100svh-var(--header-h)),880px)] w-full flex-col px-[clamp(20px,2.8vw,56px)] py-[clamp(16px,2.4vw,36px)]">
          <FadeIn className="flex items-center justify-between gap-4 border-b border-[var(--fg)]/15 pb-4 font-mono text-sm tracking-[0.16em] text-[var(--fg-2)] uppercase">
            <span className="flex items-center gap-2.5">
              <span className="size-2 shrink-0 rounded-full bg-[var(--accent)] animate-heartbeat shadow-[0_0_8px_var(--accent)]" />
              Lorem ipsum dolor sit amet
            </span>
            <span className="hidden lg:block font-medium">
              {config.shortName} — Periode {config.period}
            </span>
            <span className="hidden text-right sm:block font-medium">
              {config.address.city}, ID · 6°58′S 107°37′E
            </span>
          </FadeIn>

          <div className="relative flex flex-1 flex-col justify-center py-[clamp(12px,2vh,32px)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 -right-[10vw] hidden aspect-square w-[46vw] max-w-[760px] -translate-y-1/2 md:block"
            >
              <div className="absolute inset-0 rounded-full border border-[var(--fg)]/10" />
              <div className="absolute inset-[14%] rounded-full border border-[var(--fg)]/10" />
              <div className="absolute inset-[28%] rounded-full border border-[var(--fg)]/10" />
              <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--fg)]/10" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-[var(--fg)]/10" />
            </div>

            <FadeIn delay={0.08} className="relative">
              <span className="block font-mono text-sm tracking-[0.24em] text-[var(--fg-2)] uppercase md:pl-[10vw]">
                01 — Lorem ipsum
              </span>
              <h1 className="mt-3 text-[clamp(2.5rem,min(5.4vw,9vh),5.5rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-[var(--fg)] uppercase">
                <span className="block">Lorem,</span>
                <span className="block md:pl-[10vw]">ipsum,</span>
                <span className="block">dolor</span>
              </h1>
              <p className="mt-[clamp(0.5rem,1.4vw,1.25rem)] text-right text-[clamp(1rem,1.5vw,1.45rem)] leading-none font-light tracking-[-0.02em] text-[var(--fg-2)]">
                sit amet.
              </p>
            </FadeIn>
          </div>

          <div className="border-t border-[var(--fg)]/15 pt-5">
            <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12">
              <p className="max-w-[52ch] text-sm sm:text-base leading-relaxed text-[var(--fg-2)] md:col-span-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex flex-wrap items-center gap-3 md:col-span-4">
                <Link
                  href="/gabung"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-on)] transition-[filter] duration-[var(--motion-fast)] hover:brightness-95 focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none"
                >
                  Gabung Relawan
                </Link>
                <Link
                  href="/tentang/sejarah"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--fg)]/20 bg-[var(--bg)]/40 px-6 py-3 text-sm font-semibold text-[var(--fg)] backdrop-blur-sm transition-colors duration-[var(--motion-fast)] hover:bg-[var(--surface)]/70 focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)] focus-visible:outline-none"
                >
                  Kenali Sejarah Kami
                </Link>
              </div>
              <div className="flex items-end justify-between gap-4 font-mono text-sm tracking-[0.18em] text-[var(--muted)] uppercase md:col-span-3 md:flex-col md:items-end">
                <span>Sejak {config.foundedAt.slice(0, 4)}</span>
                <span>Gulir untuk menelusuri ↓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jalur ambulans — denyut marka jalan sebagai pembatas hero */}
      <section
        aria-hidden="true"
        className="w-full overflow-hidden border-b border-[var(--border)] bg-[var(--surface-warm)]"
      >
        <AmbulancePass />
      </section>

      {/* Stats Band */}
      <section className="w-full border-b border-[var(--border)] bg-[var(--surface-warm)] px-[clamp(20px,2.8vw,56px)] py-12">
        <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-4">
          {config.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <span className="font-mono text-2xl font-extrabold tracking-tight text-[var(--accent)] sm:text-4xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="mt-2 text-sm font-semibold text-[var(--muted)] sm:text-base">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <EcgDivider />

      {/* Program Unggulan */}
      <section className="w-full bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="w-full">
          <div className="mb-10 flex flex-col items-start gap-2">
            <span className="font-mono text-sm font-bold tracking-wider text-[var(--accent)] uppercase">
              Lorem Ipsum Dolor
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--fg)] sm:text-3xl">
              Lorem Ipsum Dolor Sit Amet
            </h2>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((prog) => (
              <div
                key={prog.slug}
                className="flex flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:shadow-xl group"
              >
                <div>
                  <span className="rounded-[var(--radius-pill)] border border-[var(--border)] bg-[var(--surface-warm)] px-3.5 py-1 font-mono text-sm font-bold tracking-wider text-[var(--fg-2)] uppercase">
                    {prog.frekuensi}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">{prog.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-[var(--fg-2)]">{prog.ringkas}</p>
                </div>
                <div className="mt-6 border-t border-[var(--border-soft)] pt-4">
                  <span className="font-mono text-sm font-medium text-[var(--meta)]">
                    Jadwal: {prog.jadwal}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/program"
              className="inline-flex items-center text-base font-semibold text-[var(--accent)] hover:underline"
            >
              Lihat Seluruh Katalog Program Kerja →
            </Link>
          </div>
        </div>
      </section>

      {/* Kegiatan Terbaru */}
      <section className="relative isolate w-full overflow-hidden border-t border-[var(--border)] bg-[var(--surface-warm)]/50 px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <FilmstripBackdrop />
        <div className="relative z-10 w-full">
          <div className="mb-10 flex flex-col items-start gap-2">
            <span className="font-mono text-sm font-bold tracking-wider text-[var(--accent)] uppercase">
              Lorem Ipsum Dolor
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--fg)] sm:text-3xl">
              Lorem Ipsum Dolor Sit Amet
            </h2>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {kegiatans.map((k) => (
              <article
                key={k.slug}
                className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:shadow-xl group"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-[var(--surface-warm)]">
                  <Image
                    src={k.cover.src}
                    alt={k.cover.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-6">
                  <span className="font-mono text-sm font-medium text-[var(--meta)]">
                    {new Intl.DateTimeFormat('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }).format(new Date(k.date))}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                    <Link href={`/kegiatan/${k.slug}`}>{k.title}</Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-base leading-relaxed text-[var(--fg-2)]">
                    {k.ringkas}
                  </p>
                  <div className="mt-auto pt-5">
                    <Link
                      href={`/kegiatan/${k.slug}`}
                      className="text-sm font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                    >
                      Baca Liputan →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/kegiatan"
              className="inline-flex items-center text-base font-semibold text-[var(--accent)] hover:underline"
            >
              Telusuri Arsip Dokumentasi Berita Kegiatan →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Gabung */}
      <section className="w-full border-t border-[var(--border)] bg-[var(--bg)] px-[clamp(20px,2.8vw,56px)] py-8 lg:py-12">
        <div className="w-full rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-6 text-center shadow-md">
          <span className="font-mono text-sm font-bold tracking-wider text-[var(--accent)] uppercase">
            Lorem Ipsum Dolor
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-[var(--fg)] sm:text-3xl">
            Lorem ipsum dolor sit amet?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--fg-2)]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/gabung"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-8 py-3.5 font-semibold text-white shadow-sm transition-all hover:brightness-95"
            >
              Daftar Sekarang (Google Form)
            </Link>
            <Link
              href="/kontak"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-warm)] px-8 py-3.5 font-semibold text-[var(--fg)] transition-all hover:bg-[var(--border)]"
            >
              Hubungi Sekretariat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
