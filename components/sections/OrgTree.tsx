import React from 'react';
import Link from 'next/link';
import { ORG_DEPARTMENTS, ORG_LEADERS, ORG_OVERSIGHT } from '@/lib/struktur';

/** Divisi dibagi tiga per baris; CSS menyatukannya jadi satu baris penuh di layar lebar. */
const DEPT_ROWS = [ORG_DEPARTMENTS.slice(0, 3), ORG_DEPARTMENTS.slice(3, 6)];

/**
 * Bagan organisasi bergaya pohon keluarga: badan pengawas di puncak,
 * inti (komandan, wakom, sekre, benda) di jalur komando, lalu enam divisi
 * sebagai cabang. Rincian tugas tiap divisi dipisah ke daftar di bawah
 * bagan agar kartu cabang tetap ringkas di semua lebar layar.
 */
export function OrgTree() {
  const [lead] = ORG_LEADERS;
  const staff = ORG_LEADERS.slice(1);

  return (
    <section className="w-full border-b border-[var(--border)] bg-[var(--surface-warm)]/60 px-[clamp(20px,2.8vw,56px)] py-10 lg:py-14">
      <div className="mx-auto w-full max-w-[1640px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold tracking-[0.18em] text-[var(--accent)] uppercase">
              Bagan Organisasi
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--fg)] sm:text-3xl">
              Pohon koordinasi unit
            </h2>
          </div>
          <p className="max-w-[42ch] text-sm leading-relaxed text-[var(--muted)]">
            Bagan ini menjelaskan fungsi tiap simpul, bukan nama personel. Nama pengurus yang sedang
            menjabat ada di{' '}
            <Link
              href="/kepengurusan"
              className="font-semibold text-[var(--accent)] hover:underline"
            >
              halaman Kabinet
            </Link>
            .
          </p>
        </div>

        <div className="org-chart mt-10">
          <div className="org-tier org-tier--oversight">
            <article className="org-card org-card--oversight">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="org-card__role">{ORG_OVERSIGHT.role}</span>
                <span className="org-card__pill">{ORG_OVERSIGHT.note}</span>
              </div>
              <p className="org-card__scope">{ORG_OVERSIGHT.scope}</p>
            </article>
          </div>

          <div className="org-stem org-stem--oversight" aria-hidden="true" />

          <p className="org-tier-label">Inti</p>

          <div className="org-tier">
            <article className="org-card org-card--lead">
              <span className="org-card__role">{lead?.role}</span>
              <p className="org-card__scope">{lead?.scope}</p>
            </article>
          </div>

          <div className="org-stem" aria-hidden="true" />

          <div className="org-tier org-tier--staff">
            {staff.map((leader) => (
              <article key={leader.role} className="org-card">
                <span className="org-card__role">{leader.role}</span>
                <p className="org-card__scope">{leader.scope}</p>
              </article>
            ))}
          </div>

          <div className="org-stem org-stem--dept" aria-hidden="true" />

          <div className="org-tier org-tier--dept org-branch">
            {DEPT_ROWS.map((row, rowIndex) => (
              <div key={rowIndex} className="org-branch__row">
                {row.map((dept, index) => (
                  <article key={dept.slug} className="org-card org-card--dept">
                    <div className="flex items-start justify-between gap-3">
                      <span className="org-card__abbr">{dept.abbr}</span>
                      <span className="org-card__index">
                        {String(rowIndex * 3 + index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="org-card__role org-card__role--dept">{dept.name}</span>
                    <p className="org-card__scope">{dept.summary}</p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="org-details mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-lg font-bold tracking-tight text-[var(--fg)] sm:text-xl">
              Rincian tugas setiap divisi
            </h3>
            <span className="font-mono text-xs tracking-[0.14em] text-[var(--muted)] uppercase">
              06 divisi
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ORG_DEPARTMENTS.map((dept) => (
              <article key={dept.slug} className="org-detail">
                <div className="flex items-baseline gap-2">
                  <span className="org-card__abbr">{dept.abbr}</span>
                  <span className="org-card__field">{dept.field}</span>
                </div>
                <h4 className="mt-1 text-base font-bold text-[var(--fg)]">{dept.name}</h4>
                <ul className="org-card__duties">
                  {dept.duties.map((duty) => (
                    <li key={duty}>{duty}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
