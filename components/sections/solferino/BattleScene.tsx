import React from 'react';

/**
 * Babak 1 — Pertempuran Solferino (24 Juni 1859).
 * Tanpa palang/lambang Palang Merah (belum ada pada 1859).
 */

function Soldier({
  x,
  y,
  scale = 1,
  flip = false,
  opacity = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
  opacity?: number;
}) {
  const transform = `translate(${x}, ${y}) scale(${flip ? -scale : scale}, ${scale})`;
  return (
    <g transform={transform} opacity={opacity}>
      {/* Bayonet & musket */}
      <line
        x1={3}
        y1={-12}
        x2={3}
        y2={10}
        stroke="var(--sc-rim)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1={3}
        y1={-12}
        x2={3}
        y2={-4}
        stroke="var(--sc-ink)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Kepala & topi shako */}
      <circle cx={0} cy={-8} r={3} fill="var(--sc-ink)" stroke="var(--sc-rim)" strokeWidth="0.8" />
      <rect x={-3} y={-14} width={5} height={5} rx={0.5} fill="var(--sc-ink)" />
      {/* Torso berjas */}
      <path
        d="M -4 -5 L 4 -5 L 3 5 L -3 5 Z"
        fill="var(--sc-ink)"
        stroke="var(--sc-rim)"
        strokeWidth="0.8"
      />
      {/* Lengan pegang senjata */}
      <line
        x1={0}
        y1={-2}
        x2={3}
        y2={3}
        stroke="var(--sc-ink)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Dua kaki */}
      <line
        x1={-2}
        y1={5}
        x2={-3}
        y2={15}
        stroke="var(--sc-ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1={2}
        y1={5}
        x2={3}
        y2={15}
        stroke="var(--sc-ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </g>
  );
}

export function BattleScene() {
  // Pasukan kiri: 3 baris x 8 tentara (x: 280-520, y: 320-380)
  const leftRows = [
    { count: 8, startX: 290, stepX: 30, y: 325, scale: 0.85, opacity: 0.45 },
    { count: 8, startX: 280, stepX: 31, y: 348, scale: 0.95, opacity: 0.65 },
    { count: 8, startX: 285, stepX: 32, y: 372, scale: 1.05, opacity: 0.85 },
  ];

  // Pasukan kanan: 3 baris x 8 tentara menghadap kiri (x: 700-920, y: 320-380)
  const rightRows = [
    { count: 8, startX: 720, stepX: 28, y: 325, scale: 0.85, opacity: 0.45 },
    { count: 8, startX: 710, stepX: 29, y: 348, scale: 0.95, opacity: 0.65 },
    { count: 8, startX: 715, stepX: 30, y: 372, scale: 1.05, opacity: 0.85 },
  ];

  // Garis serbu condong ke kanan (x: 520-700, y: 350-390)
  const chargeSoldiers = [
    { x: 530, y: 360, scale: 1.05 },
    { x: 565, y: 368, scale: 1.1 },
    { x: 600, y: 362, scale: 1.1 },
    { x: 635, y: 375, scale: 1.15 },
    { x: 665, y: 366, scale: 1.1 },
    { x: 695, y: 378, scale: 1.15 },
  ];

  // Asap pertempuran
  const smokePuffs = [
    { cx: 640, cy: 340, rx: 22, ry: 14, delay: '0s' },
    { cx: 680, cy: 320, rx: 28, ry: 18, delay: '-2.4s' },
    { cx: 720, cy: 335, rx: 24, ry: 15, delay: '-4.8s' },
    { cx: 760, cy: 315, rx: 30, ry: 20, delay: '-7.2s' },
    { cx: 800, cy: 330, rx: 26, ry: 16, delay: '-9.6s' },
  ];

  return (
    <svg
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      role="presentation"
    >
      <defs>
        <linearGradient id="bs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sc-sky-top)" />
          <stop offset="100%" stopColor="var(--sc-sky-bottom)" />
        </linearGradient>

        <radialGradient id="bs-sun">
          <stop offset="0%" stopColor="var(--sc-sun)" stopOpacity="0.5" />
          <stop offset="35%" stopColor="var(--sc-sun)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--sc-sun)" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="bs-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sc-ground)" />
          <stop offset="100%" stopColor="var(--sc-ground-deep)" />
        </linearGradient>
      </defs>

      {/* Langit luas */}
      <rect width="1200" height="520" fill="url(#bs-sky)" />

      {/* Matahari terik Solferino */}
      <circle cx="880" cy="150" r="180" fill="url(#bs-sun)" />
      <circle cx="880" cy="150" r="46" fill="var(--sc-sun)" opacity="0.5" />

      {/* Awan tipis berarak */}
      <path
        d="M260 80 Q380 68 520 80 T800 74 T1040 82"
        stroke="var(--sc-hill-far)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
        className="bs-cloud"
      />
      <path
        d="M180 122 Q340 110 500 124 T840 116 T1120 122"
        stroke="var(--sc-hill-far)"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
        className="bs-cloud"
        style={{ animationDelay: '-15s' }}
      />
      <path
        d="M320 170 Q480 158 660 170 T980 164"
        stroke="var(--sc-hill-far)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        opacity="0.25"
        className="bs-cloud"
        style={{ animationDelay: '-28s' }}
      />

      {/* Burung beterbangan di atas medan */}
      <g className="bs-birds">
        {(
          [
            [340, 130],
            [365, 122],
            [390, 135],
            [780, 160],
            [810, 148],
            [840, 166],
          ] as const
        ).map(([bx, by], idx) => (
          <path
            key={idx}
            d={`M${bx - 7} ${by + 3} Q${bx - 3} ${by - 4} ${bx} ${by} Q${bx + 3} ${by - 4} ${bx + 7} ${by + 3}`}
            fill="none"
            stroke="var(--sc-ink)"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.35"
          />
        ))}
      </g>

      {/* Bukit jauh */}
      <path
        d="M0 330 Q220 250 480 295 T940 265 Q1080 280 1200 270 L1200 520 L0 520 Z"
        fill="var(--sc-hill-far)"
        opacity="0.7"
      />

      {/* Pemandangan Solferino: menara Spia d'Italia + atap rumah + cemara */}
      <g opacity="0.4" fill="var(--sc-ink)">
        {/* Menara Solferino */}
        <rect x="360" y="228" width="22" height="66" />
        <polygon points="360,228 371,210 382,228" />
        <rect x="367" y="244" width="8" height="12" fill="var(--sc-sky-bottom)" />
        {/* Rumah-rumah di kaki bukit */}
        <polygon points="330,285 342,274 354,285" />
        <rect x="332" y="285" width="20" height="16" />
        <polygon points="388,282 402,270 416,282" />
        <rect x="390" y="282" width="24" height="18" />
        <polygon points="424,288 436,278 448,288" />
        <rect x="426" y="288" width="20" height="14" />
        {/* Pohon cemara */}
        <polygon points="320,296 314,272 326,272" />
        <polygon points="458,298 452,270 464,270" />
      </g>

      {/* Bukit tengah */}
      <path
        d="M0 380 Q260 325 540 355 T1020 335 Q1120 345 1200 340 L1200 520 L0 520 Z"
        fill="var(--sc-hill-mid)"
      />

      {/* Medan tanah bergelombang */}
      <path
        d="M0 420 Q280 375 600 405 T1200 395 L1200 520 L0 520 Z"
        fill="url(#bs-ground)"
      />

      {/* Pasukan kiri berbaris */}
      <g className="bs-march">
        {/* Panji pasukan kiri */}
        <g
          className="bs-flag"
          style={{ transformOrigin: 'left center', transformBox: 'fill-box' }}
        >
          <line x1="390" y1="310" x2="390" y2="370" stroke="var(--sc-ink)" strokeWidth="2" />
          <polygon points="390,312 422,320 390,332" fill="var(--sc-ink)" opacity="0.8" />
        </g>
        {leftRows.map((row, rIdx) => (
          <g key={rIdx}>
            {Array.from({ length: row.count }).map((_, sIdx) => (
              <Soldier
                key={sIdx}
                x={row.startX + sIdx * row.stepX}
                y={row.y}
                scale={row.scale}
                opacity={row.opacity}
              />
            ))}
          </g>
        ))}
      </g>

      {/* Pasukan kanan bersiap */}
      <g className="bs-march" style={{ animationDirection: 'reverse' }}>
        {/* Panji pasukan kanan */}
        <g
          className="bs-flag"
          style={{ transformOrigin: 'left center', transformBox: 'fill-box' }}
        >
          <line x1="810" y1="310" x2="810" y2="370" stroke="var(--sc-ink)" strokeWidth="2" />
          <polygon points="810,312 778,320 810,332" fill="var(--sc-ink)" opacity="0.8" />
        </g>
        {rightRows.map((row, rIdx) => (
          <g key={rIdx}>
            {Array.from({ length: row.count }).map((_, sIdx) => (
              <Soldier
                key={sIdx}
                x={row.startX + sIdx * row.stepX}
                y={row.y}
                scale={row.scale}
                flip
                opacity={row.opacity}
              />
            ))}
          </g>
        ))}
      </g>

      {/* Garis serbu maju ke tengah */}
      <g>
        {chargeSoldiers.map((soldier, idx) => (
          <g key={idx} transform="skewX(-8)">
            <Soldier x={soldier.x} y={soldier.y} scale={soldier.scale} opacity={0.95} />
          </g>
        ))}
      </g>

      {/* Posisi meriam & trang artileri */}
      <g>
        {/* Meriam sekunder (jauh) */}
        <g transform="translate(760, 325) scale(0.75)" opacity="0.85">
          <circle cx="20" cy="20" r="14" fill="none" stroke="var(--sc-ink-soft)" strokeWidth="3" />
          <line x1="20" y1="6" x2="20" y2="34" stroke="var(--sc-ink-soft)" strokeWidth="1.5" />
          <line x1="6" y1="20" x2="34" y2="20" stroke="var(--sc-ink-soft)" strokeWidth="1.5" />
          {/* Laras meriam */}
          <path
            d="M -12 12 L 28 8 L 28 16 L -12 16 Z"
            fill="var(--sc-ink)"
            stroke="var(--sc-rim)"
            strokeWidth="0.8"
          />
        </g>

        {/* Meriam utama */}
        <g transform="translate(630, 350)">
          {/* Roda meriam berjari */}
          <circle cx="24" cy="24" r="18" fill="none" stroke="var(--sc-ink-soft)" strokeWidth="3.5" />
          <circle cx="24" cy="24" r="4" fill="var(--sc-ink)" />
          {[0, 45, 90, 135].map((deg) => (
            <line
              key={deg}
              x1={24 + 18 * Math.cos((deg * Math.PI) / 180)}
              y1={24 + 18 * Math.sin((deg * Math.PI) / 180)}
              x2={24 - 18 * Math.cos((deg * Math.PI) / 180)}
              y2={24 - 18 * Math.sin((deg * Math.PI) / 180)}
              stroke="var(--sc-ink-soft)"
              strokeWidth="1.8"
            />
          ))}
          {/* Trang kayu penopang */}
          <line x1="24" y1="24" x2="-14" y2="34" stroke="var(--sc-ink)" strokeWidth="4.5" />
          {/* Laras meriam menghadap kiri-atas */}
          <path
            d="M -4 20 L 46 10 L 46 22 L -4 26 Z"
            fill="var(--sc-ink)"
            stroke="var(--sc-rim)"
            strokeWidth="1"
          />
        </g>
      </g>

      {/* Kilatan tembakan meriam */}
      <circle cx="700" cy="330" r="18" fill="var(--sc-lamp)" className="bs-flash" />
      <circle
        cx="790"
        cy="315"
        r="14"
        fill="var(--sc-lamp)"
        className="bs-flash"
        style={{ animationDelay: '-3.2s' }}
      />

      {/* Kepulan asap pertempuran */}
      <g>
        {smokePuffs.map((puff, idx) => (
          <ellipse
            key={idx}
            cx={puff.cx}
            cy={puff.cy}
            rx={puff.rx}
            ry={puff.ry}
            fill="var(--sc-smoke)"
            className="bs-smoke"
            style={{
              animationDelay: puff.delay,
              transformOrigin: 'center',
              transformBox: 'fill-box',
            }}
          />
        ))}
      </g>

      {/* Bekas pertempuran: dinding batu rusak, pagar patah, drum, ransel */}
      <g fill="var(--sc-ink-soft)" stroke="var(--sc-ink)" strokeWidth="1">
        {/* Tembok batu runtuh kiri (x: 300-420, y: 440-490) */}
        <path d="M 310 480 L 330 455 L 360 460 L 380 445 L 410 470 L 415 488 Z" />
        <rect x="325" y="475" width="18" height="8" rx="1" />
        <rect x="350" y="470" width="22" height="9" rx="1" />
        <rect x="375" y="476" width="16" height="7" rx="1" />
        {/* Pagar patah & musket terjatuh */}
        <line x1="330" y1="440" x2="350" y2="480" stroke="var(--sc-ink)" strokeWidth="3" />
        <line x1="355" y1="445" x2="385" y2="485" stroke="var(--sc-ink)" strokeWidth="2.5" />
        <line x1="320" y1="485" x2="365" y2="495" stroke="var(--sc-rim)" strokeWidth="1.6" />

        {/* Drum militer rusak & ransel kanan (x: 820-900, y: 440-500) */}
        <ellipse cx="845" cy="470" rx="14" ry="8" fill="var(--sc-ink)" />
        <path d="M 831 470 L 831 484 L 859 484 L 859 470 Z" fill="var(--sc-ink-soft)" />
        <line x1="835" y1="472" x2="855" y2="482" stroke="var(--sc-rim)" strokeWidth="1.2" />
        <rect x="870" y="465" width="22" height="16" rx="2" fill="var(--sc-ink)" />
        <line x1="865" y1="490" x2="910" y2="480" stroke="var(--sc-rim)" strokeWidth="1.8" />
      </g>

      {/* Korban perang terbaring */}
      {/* Korban 1 di kiri dengan arm sling / selimut darurat */}
      <g transform="translate(430, 455)">
        <ellipse
          cx="30"
          cy="16"
          rx="28"
          ry="10"
          fill="var(--sc-ink)"
          stroke="var(--sc-rim)"
          strokeWidth="0.8"
        />
        <circle cx="8" cy="12" r="5" fill="var(--sc-ink)" />
        {/* Kain penutup / sash darurat */}
        <path
          d="M 18 10 Q 34 8 50 14 Q 36 22 18 10 Z"
          fill="var(--accent)"
          opacity="0.85"
        />
      </g>

      {/* Korban 2 di kanan terbaring di samping drum */}
      <g transform="translate(765, 460)">
        <ellipse
          cx="26"
          cy="14"
          rx="26"
          ry="9"
          fill="var(--sc-ink)"
          stroke="var(--sc-rim)"
          strokeWidth="0.8"
        />
        <circle cx="48" cy="11" r="5" fill="var(--sc-ink)" />
        <rect x="10" y="9" width="24" height="8" rx="2" fill="var(--sc-ink-soft)" />
      </g>

      {/* Tekstur rumput garis depan yang berayun pelan */}
      <g className="bs-grass" style={{ transformOrigin: 'bottom center', transformBox: 'fill-box' }}>
        {(
          [
            [310, 505],
            [340, 510],
            [460, 508],
            [520, 512],
            [650, 506],
            [720, 514],
            [830, 508],
            [880, 512],
          ] as const
        ).map(([gx, gy], idx) => (
          <path
            key={idx}
            d={`M${gx} ${gy} L${gx - 4} ${gy - 14} M${gx} ${gy} L${gx + 2} ${gy - 18} M${gx} ${gy} L${gx + 6} ${gy - 12}`}
            stroke="var(--sc-ground-deep)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  );
}
