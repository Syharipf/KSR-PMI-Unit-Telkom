import React from 'react';
import { BattleScene } from './solferino/BattleScene';
import { CastiglioneScene } from './solferino/CastiglioneScene';
import { GenevaScene } from './solferino/GenevaScene';
import { StoryAudio } from '@/components/audio/StoryAudio';

/**
 * Film tiga babak asal-usul Gerakan Palang Merah:
 * 1) Pertempuran Solferino, 24 Juni 1859
 * 2) Malam pertolongan di Castiglione delle Stiviere
 * 3) Komite Lima di Jenewa, 17 Februari 1863
 *
 * Adegan berganti otomatis lewat CSS (36 detik per siklus) dan berhenti
 * pada prefers-reduced-motion. Tidak ada JavaScript klien.
 */

const SCENE_DELAYS = ['0s', '-24s', '-12s'] as const;
const SCENE_CAMERA = [
  ['-10px', '-4px'],
  ['8px', '-2px'],
  ['0px', '-6px'],
] as const;

const SCENES = [BattleScene, CastiglioneScene, GenevaScene];

const CHAPTERS = [
  { year: '24 Juni 1859', title: 'Pertempuran Solferino' },
  { year: '24–25 Juni 1859', title: 'Pertolongan di Castiglione' },
  { year: '17 Februari 1863', title: 'Komite Lima di Jenewa' },
];

export function SolferinoScene({ className = '' }: { className?: string }) {
  return (
    <div className={`solferino-scene w-full ${className}`}>
      <div aria-hidden="true">
        <div className="mb-3 flex items-end justify-between gap-4">
          <p className="font-mono text-xs font-bold tracking-[0.16em] text-[var(--accent)] uppercase">
            Film tiga babak · 1859—1863
          </p>
          <p className="hidden font-mono text-xs tracking-[0.12em] text-[var(--muted)] uppercase sm:block">
            Solferino → Castiglione → Jenewa
          </p>
        </div>

        <div className="scene-stage rounded-[var(--radius-lg)] border border-[var(--border)]">
          {SCENES.map((Scene, i) => (
            <div
              key={i}
              className="scene-layer"
              style={
                {
                  '--scene-delay': SCENE_DELAYS[i] ?? '0s',
                  '--cam-x': SCENE_CAMERA[i]?.[0] ?? '0px',
                  '--cam-y': SCENE_CAMERA[i]?.[1] ?? '0px',
                } as React.CSSProperties
              }
            >
              <Scene />
            </div>
          ))}
          <div className="scene-vignette" />
          <div className="scene-progress">
            {CHAPTERS.map((c, i) => (
              <span
                key={c.year}
                style={{ '--scene-delay': SCENE_DELAYS[i] ?? '0s' } as React.CSSProperties}
              />
            ))}
          </div>
        </div>

        <div className="scene-chapters mt-3 grid">
          {CHAPTERS.map((c, i) => (
            <p
              key={c.year}
              className="scene-caption flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm"
              style={{ '--scene-delay': SCENE_DELAYS[i] ?? '0s' } as React.CSSProperties}
            >
              <span className="text-[var(--muted)]">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-bold tracking-wider text-[var(--accent)] uppercase">
                {c.year}
              </span>
              <span className="text-[var(--muted)]">{c.title}</span>
            </p>
          ))}
        </div>
      </div>

      <StoryAudio />
    </div>
  );
}

const MILESTONES = [
  {
    year: '1859',
    title: 'Pertempuran Solferino',
    body: '24 Juni, sekitar 40.000 tentara Prancis dan Austria tewas atau terluka di Italia utara.',
  },
  {
    year: '1862',
    title: 'A Memory of Solferino',
    body: 'Henry Dunant menerbitkan buku yang mengusulkan komite relawan dan perjanjian internasional.',
  },
  {
    year: '1863',
    title: 'Komite Lima',
    body: '17 Februari di Jenewa, lima warga mendirikan komite yang menjadi cikal bakal ICRC.',
  },
  {
    year: '1864',
    title: 'Konvensi Jenewa I',
    body: 'Delegasi dari belasan negara mengadopsi lambang palang merah di atas dasar putih.',
  },
  {
    year: '1945',
    title: 'PMI berdiri',
    body: '17 September, Palang Merah Indonesia dibentuk satu bulan setelah proklamasi kemerdekaan.',
  },
  {
    year: '1950',
    title: 'Badan hukum PMI',
    body: 'Keputusan Presiden Nomor 25 Tahun 1950 menetapkan PMI sebagai organisasi palang merah tunggal.',
  },
  {
    year: '1997',
    title: 'KSR STT Telkom',
    body: '23 November, KSR PMI Unit STT Telkom lahir sebagai cikal bakal unit di kampus Telkom.',
  },
  {
    year: '2012',
    title: 'KSR PMI Unit TCIS',
    body: 'Unit ketiga terbentuk setelah STISI Telkom meminta bantuan tim medis saat ospek.',
  },
];

export function SolferinoTimeline() {
  return (
    <ol className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {MILESTONES.map((m, idx) => (
        <li key={m.year} className="flex flex-col">
          <span className="flex items-center gap-3">
            <span
              className={`size-3 shrink-0 rounded-full ring-4 ring-[var(--bg)] ${
                idx === MILESTONES.length - 1 ? 'animate-heartbeat bg-[var(--accent)]' : 'bg-[var(--fg)]/30'
              }`}
            />
            <span className="font-mono text-sm font-bold tracking-wider text-[var(--accent)]">{m.year}</span>
          </span>
          <div className="mt-3 flex h-full flex-col rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-md">
            <p className="text-base leading-snug font-bold text-[var(--fg)]">{m.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{m.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
