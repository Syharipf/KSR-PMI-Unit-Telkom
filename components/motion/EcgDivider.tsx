import React from 'react';

const BEAT = 'h64 l7 -4 l5 -16 l8 32 l6 -12 h60';

function buildPath(beats = 7) {
  let d = 'M0 30';
  for (let i = 0; i < beats; i += 1) d += ` ${BEAT}`;
  return d;
}

const TRACE = buildPath();

/**
 * Garis EKG yang denyutnya menyapu dari kiri ke kanan.
 * Dipakai sebagai pembatas tipis antar seksi agar halaman terasa "hidup"
 * tanpa menambah aset gambar.
 */
export function EcgDivider({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-full overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        role="presentation"
        className="h-10 w-full sm:h-12"
      >
        <path
          d={TRACE}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--border)]"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={TRACE}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ecg-glow"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={TRACE}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ecg-trace"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
