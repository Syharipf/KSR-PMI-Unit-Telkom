import React from 'react';

/**
 * Jejak unit KSR di kampus Telkom: tonggak 1995-2013 dan diagram tiga akar
 * yang menyatu. Animasi hanya CSS (lihat app/globals.css).
 */

const UNIT_MILESTONES = [
  {
    year: '1995',
    title: 'Kerja sama Mendikbud–PMI',
    body: 'Pendirian KSR Perguruan Tinggi menjamur di Indonesia, membuka jalan bagi unit di kampus Telkom.',
  },
  {
    year: '1997',
    title: 'KSR PMI Unit STT Telkom',
    body: '23 November, lahir melalui upacara dengan kepengurusan sementara dikomandani Arief Wibowo.',
  },
  {
    year: '1998',
    title: 'Kepengurusan tetap pertama',
    body: 'Ading Fardhiansyah memimpin hingga Juni 2000, dilanjutkan periode-periode berikutnya.',
  },
  {
    year: '2008',
    title: 'KSR Politeknik Telkom',
    body: '22 April, dibentuk tujuh mahasiswa dengan komandan pertama Biyan Septyan.',
  },
  {
    year: '2012',
    title: 'Tim medis ospek STISI',
    body: 'STISI Telkom meminta bantuan tim medis, memicu pembentukan unit KSR baru.',
  },
  {
    year: '2013',
    title: 'KSR PMI Unit TCIS',
    body: '29 September, sembilan anggota perintis dilantik setelah DIKLATSAR dan PPD perintis.',
  },
];

export function UnitTimeline() {
  return (
    <ol className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {UNIT_MILESTONES.map((m, idx) => (
        <li key={m.year} className="flex flex-col">
          <span className="flex items-center gap-3">
            <span
              className={`size-3 shrink-0 rounded-full ring-4 ring-[var(--bg)] ${
                idx === UNIT_MILESTONES.length - 1
                  ? 'animate-heartbeat bg-[var(--accent)]'
                  : 'bg-[var(--fg)]/30'
              }`}
            />
            <span className="font-mono text-sm font-bold tracking-wider text-[var(--accent)]">
              {m.year}
            </span>
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

const ROOTS = [
  {
    year: '1997',
    name: 'KSR PMI Unit STT Telkom',
    note: 'Berganti nama menjadi KSR PMI Unit IT Telkom pada Musyawarah Anggota ke-10.',
  },
  {
    year: '2008',
    name: 'KSR Politeknik Telkom',
    note: 'Tujuh mahasiswa, komandan pertama Biyan Septyan.',
  },
  {
    year: '2013',
    name: 'KSR PMI Unit TCIS',
    note: 'Sembilan anggota perintis, dilantik 29 September 2013.',
  },
];

export function UnitRoots() {
  return (
    <div className="grid w-full grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {ROOTS.map((root, idx) => (
          <div
            key={root.year}
            className="group rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-md"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm font-bold text-[var(--accent)]">{root.year}</span>
              <span className="font-mono text-xs tracking-wider text-[var(--meta)] uppercase">
                Akar {idx + 1}
              </span>
            </div>
            <p className="mt-2 text-base leading-snug font-bold text-[var(--fg)]">{root.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{root.note}</p>
          </div>
        ))}
      </div>

      {/* Alur penggabungan */}
      <div aria-hidden="true" className="hidden flex-col items-center gap-2 lg:flex">
        <span className="merge-flow h-0.5 w-20" />
        <span className="font-mono text-xs tracking-wider text-[var(--meta)] uppercase">menyatu</span>
        <span className="merge-flow h-0.5 w-20" />
      </div>

      <div className="rounded-[var(--radius-lg)] border border-[var(--accent)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-2">
          <span className="animate-heartbeat size-2 rounded-full bg-[var(--accent)]" />
          <span className="font-mono text-sm font-bold tracking-wider text-[var(--accent)] uppercase">
            Kini
          </span>
        </div>
        <p className="mt-3 text-xl font-extrabold text-[var(--fg)]">
          KSR PMI Unit Universitas Telkom
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          Satu unit kemahasiswaan dengan tiga akar sejarah: STT Telkom, Politeknik Telkom, dan TCIS.
        </p>
      </div>
    </div>
  );
}
