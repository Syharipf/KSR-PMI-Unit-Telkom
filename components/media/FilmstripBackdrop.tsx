import Image from 'next/image';
import type { CSSProperties } from 'react';

/**
 * Latar gulungan film untuk section dokumentasi.
 * Sumber foto masih dummy — ganti isi FRAMES dengan dokumentasi asli saat tersedia.
 */
const FRAMES = [
  '/media/filmstrip/dummy-04.svg',
  '/media/hero/hero-dummy-01.svg',
  '/media/filmstrip/dummy-05.svg',
  '/media/hero/hero-dummy-02.svg',
  '/media/filmstrip/dummy-06.svg',
  '/media/hero/hero-dummy-03.svg',
  '/media/filmstrip/dummy-07.svg',
  '/media/filmstrip/dummy-08.svg',
  '/media/filmstrip/dummy-09.svg',
];

function FilmRow({ offset = 0, reverse = false }: { offset?: number; reverse?: boolean }) {
  const sequence = [...FRAMES.slice(offset), ...FRAMES.slice(0, offset)];
  // Empat salinan: animasi menggeser 50% sehingga pola menyambung tanpa jeda.
  const loop = [...sequence, ...sequence, ...sequence, ...sequence];

  return (
    <div className="filmstrip-row">
      <div className="filmstrip-track" data-direction={reverse ? 'reverse' : 'normal'}>
        {loop.map((src, index) => (
          <div key={`${src}-${index}`} className="filmstrip-frame">
            <div className="absolute inset-[9px] overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 640px) 130px, 220px"
                className="object-cover"
                style={{ objectPosition: index % 3 === 1 ? 'center 35%' : 'center' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StripRow({
  offset,
  reverse,
  duration,
  frameHeight,
  className,
}: {
  offset: number;
  reverse?: boolean;
  duration: string;
  frameHeight: string;
  className: string;
}) {
  return (
    <div className={className}>
      <div
        className="filmstrip-row-shell"
        style={
          {
            '--filmstrip-duration': duration,
            '--filmstrip-height': frameHeight,
          } as CSSProperties
        }
      >
        <FilmRow offset={offset} reverse={reverse} />
      </div>
    </div>
  );
}

export function FilmstripBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 hidden md:block overflow-hidden select-none"
    >
      <StripRow
        offset={0}
        duration="58s"
        frameHeight="clamp(110px, 12vw, 176px)"
        className="absolute inset-x-0 top-[4%] -rotate-[1.6deg] opacity-50 grayscale"
      />
      <StripRow
        offset={3}
        reverse
        duration="74s"
        frameHeight="clamp(84px, 9vw, 132px)"
        className="absolute inset-x-0 top-[41%] rotate-[1deg] opacity-35 grayscale"
      />
      <StripRow
        offset={6}
        duration="46s"
        frameHeight="clamp(120px, 13vw, 190px)"
        className="absolute inset-x-0 bottom-[3%] -rotate-[0.8deg] opacity-45 grayscale"
      />

      {/* Jaga kontras judul, kartu, dan tautan di atas gulungan film. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-warm)]/80 via-[var(--surface-warm)]/10 to-[var(--surface-warm)]/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface-warm)]/35 via-transparent to-[var(--surface-warm)]/35" />
    </div>
  );
}
