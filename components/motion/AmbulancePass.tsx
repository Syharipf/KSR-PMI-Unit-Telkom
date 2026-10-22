import React from 'react';

/** Roda motor: ban, pelek, dan jari-jari yang ikut berputar. */
function BikeWheel({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="var(--amb-tire)" />
      <circle cx={cx} cy={cy} r={r * 0.58} fill="var(--amb-rim)" />
      <circle cx={cx} cy={cy} r={r * 0.2} fill="var(--amb-tire)" />
      <g
        className="ambulance-wheel"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        {[0, 72, 144, 216, 288].map((angle) => (
          <line
            key={angle}
            x1={cx}
            y1={cy}
            x2={cx + r * 0.58 * Math.cos((angle * Math.PI) / 180)}
            y2={cy + r * 0.58 * Math.sin((angle * Math.PI) / 180)}
            stroke="var(--amb-spoke)"
            strokeWidth="1.4"
          />
        ))}
      </g>
    </g>
  );
}

/** Pengawal sport bike: fairing merah, rompi PMI, helm, dan tas PP di buritan. */
function SportBike() {
  return (
    <svg viewBox="0 0 130 86" role="presentation" className="h-auto w-full">
      <ellipse cx="65" cy="84" rx="60" ry="3" fill="var(--amb-ink)" opacity="0.16" />
      <BikeWheel cx={28} cy={70} r={13} />
      <BikeWheel cx={104} cy={70} r={13} />

      <g className="ambulance-suspension">
        {/* Knalpot */}
        <path
          d="M17 62 H35 L40 68 H22 Z"
          fill="var(--amb-rim)"
          stroke="var(--amb-ink)"
          strokeWidth="1.5"
        />

        {/* Buritan & jok belakang */}
        <path
          d="M14 56 L25 47 H43 L52 55 L46 62 H22 Z"
          fill="var(--accent)"
          stroke="var(--amb-ink)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="12" y="53" width="3" height="7" rx="1" fill="#fff" opacity="0.7" />

        {/* Tas PP di atas buritan */}
        <rect
          x="18"
          y="36"
          width="24"
          height="17"
          rx="3"
          fill="var(--accent)"
          stroke="var(--amb-ink)"
          strokeWidth="1.8"
        />
        <path
          d="M23 36 V33 Q23 30 26 30 H34 Q37 30 37 33 V36"
          fill="none"
          stroke="var(--amb-ink)"
          strokeWidth="1.6"
        />
        <rect x="25" y="40" width="10" height="9" rx="1.5" fill="#fff" opacity="0.95" />
        <rect x="28.8" y="41.5" width="2.4" height="6" fill="var(--accent)" />
        <rect x="26.5" y="43.7" width="7" height="2.4" fill="var(--accent)" />

        {/* Fairing bawah */}
        <path
          d="M40 60 Q54 51 70 48 L90 43 L108 45 L116 53 L108 60 Q86 65 62 65 Z"
          fill="var(--accent)"
          stroke="var(--amb-ink)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M52 53 L72 48 L80 58 L58 61 Z" fill="var(--amb-body)" opacity="0.92" />

        {/* Tangki */}
        <path
          d="M60 44 Q70 35 83 38 L88 45 L70 50 Z"
          fill="var(--amb-body)"
          stroke="var(--amb-ink)"
          strokeWidth="1.8"
        />
        <path d="M36 45 H60 L56 52 H40 Z" fill="var(--amb-ink)" opacity="0.9" />

        {/* Kaki & sepatu pembalap */}
        <path
          d="M54 48 Q45 54 43 62 L52 65 Q57 56 64 52 Z"
          fill="var(--amb-glass)"
          stroke="var(--amb-ink)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <rect x="38" y="62" width="12" height="4" rx="1.5" fill="var(--amb-ink)" />

        {/* Torso berompi PMI */}
        <path
          d="M71 30 Q64 39 59 47 L67 52 Q75 42 82 33 Z"
          fill="var(--accent)"
          stroke="var(--amb-ink)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M41 39 Q56 33 74 34"
          fill="none"
          stroke="var(--amb-ink)"
          strokeWidth="1.8"
          opacity="0.4"
        />
        <rect x="55" y="34.5" width="4" height="2.5" rx="0.8" fill="var(--amb-ink)" opacity="0.5" />
        <rect x="66.5" y="37" width="7" height="7" rx="1" fill="#fff" opacity="0.95" />
        <rect x="69" y="38.5" width="2" height="4" fill="var(--accent)" />
        <rect x="68" y="39.5" width="4" height="2" fill="var(--accent)" />
        <path
          d="M67 34 Q74 35 79 37"
          fill="none"
          stroke="var(--amb-ink)"
          strokeWidth="1.1"
          opacity="0.35"
        />

        {/* Lengan */}
        <path
          d="M78 33 Q92 35 100 41"
          fill="none"
          stroke="var(--amb-ink)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M78 33 Q92 35 100 41"
          fill="none"
          stroke="var(--amb-body)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Helm putih dengan stiker palang */}
        <circle
          cx="83"
          cy="22"
          r="9"
          fill="var(--amb-body)"
          stroke="var(--amb-ink)"
          strokeWidth="1.8"
        />
        <path d="M85 16 Q93 18 92 24 L85 26 Z" fill="var(--amb-glass)" />
        <path
          d="M76 17 Q82 13 89 15"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <rect x="78.5" y="20" width="4" height="1.3" fill="var(--accent)" />
        <rect x="79.7" y="18.8" width="1.3" height="3.7" fill="var(--accent)" />

        {/* Kaca depan & cowl */}
        <path
          d="M94 40 L106 24 L115 32 L110 42 Z"
          fill="var(--amb-glass)"
          stroke="var(--amb-ink)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M98 40 L110 30" stroke="var(--amb-rim)" strokeWidth="1.2" opacity="0.6" />
        <path
          d="M92 43 L109 38 Q117 39 118 47 L114 54 L98 57 Z"
          fill="var(--accent)"
          stroke="var(--amb-ink)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="111" y="47" width="5" height="5" rx="1.5" fill="var(--amb-beam)" />
        <path d="M101 56 L104 62" stroke="var(--amb-ink)" strokeWidth="3" strokeLinecap="round" />

        {/* Setang & spion */}
        <path d="M92 41 L101 37" stroke="var(--amb-ink)" strokeWidth="2" strokeLinecap="round" />
        <path d="M90 34 L96 33" stroke="var(--amb-ink)" strokeWidth="2" strokeLinecap="round" />
        <rect x="95" y="31" width="5" height="3.5" rx="1" fill="var(--amb-ink)" />

        {/* Strobo merah-biru */}
        <ellipse
          cx="112"
          cy="41"
          rx="10"
          ry="7"
          fill="var(--accent)"
          opacity="0.3"
          className="ambulance-beacon-glow"
        />
        <rect x="104" y="37.5" width="15" height="4" rx="1.5" fill="var(--amb-ink)" />
        <rect
          x="105.5"
          y="38.7"
          width="5.5"
          height="1.8"
          rx="0.9"
          fill="var(--amb-strobe-blue)"
          className="ambulance-beacon-lens"
        />
        <rect
          x="112.5"
          y="38.7"
          width="5"
          height="1.8"
          rx="0.9"
          fill="var(--accent)"
          className="ambulance-beacon-lens"
          style={{ animationDelay: '-320ms' }}
        />
      </g>
    </svg>
  );
}

/** Pengawal skuter PCX: apron tinggi, kaca depan, rompi PMI, dan tas PP. */
function PcxScooter() {
  return (
    <svg viewBox="0 0 130 88" role="presentation" className="h-auto w-full">
      <ellipse cx="65" cy="85" rx="58" ry="3" fill="var(--amb-ink)" opacity="0.16" />
      <BikeWheel cx={30} cy={71} r={13} />
      <BikeWheel cx={112} cy={71} r={13.5} />

      <g className="ambulance-suspension">
        {/* Knalpot krom */}
        <path
          d="M16 63 H42 L48 69 H20 Z"
          fill="var(--amb-rim)"
          stroke="var(--amb-ink)"
          strokeWidth="1.4"
        />

        {/* Bodi belakang yang gemuk khas PCX */}
        <path
          d="M12 70 L12 56 Q12 47 20 45 L24 44 L26 40 L54 40 L58 46 L58 56 L54 66 L50 70 Z"
          fill="var(--amb-body)"
          stroke="var(--amb-ink)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M22 51 H54 L56 56 H24 Z" fill="var(--accent)" opacity="0.9" />
        <rect x="9" y="47" width="4" height="8" rx="1" fill="var(--accent)" />

        {/* Mesin & rumah CVT di balik dek */}
        <path d="M40 62 H68 Q76 64 76 69 Q76 72 68 72 H44 Z" fill="var(--amb-ink)" opacity="0.85" />
        <circle cx="58" cy="66" r="7" fill="var(--amb-rim)" opacity="0.35" />

        {/* Rel pegangan krom */}
        <path d="M14 42 H32" stroke="var(--amb-rim)" strokeWidth="2.6" strokeLinecap="round" />

        {/* Jok panjang */}
        <path
          d="M20 44 Q22 39 30 38 L44 38 L47 41 L58 41 Q63 42 62 46 L56 49 L22 49 Z"
          fill="var(--amb-ink)"
          opacity="0.92"
        />

        <path
          d="M38 48 H62"
          stroke="var(--amb-ink)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* Tas PP di rak belakang */}
        <rect
          x="9"
          y="26"
          width="24"
          height="17"
          rx="3"
          fill="var(--accent)"
          stroke="var(--amb-ink)"
          strokeWidth="1.8"
        />
        <path
          d="M14 26 V23 Q14 20 17 20 H26 Q29 20 29 23 V26"
          fill="none"
          stroke="var(--amb-ink)"
          strokeWidth="1.6"
        />
        <rect x="15.5" y="30" width="11" height="9" rx="1.5" fill="#fff" opacity="0.95" />
        <rect x="19.6" y="31.5" width="2.4" height="6" fill="var(--accent)" />
        <rect x="17.2" y="33.7" width="7" height="2.4" fill="var(--accent)" />

        {/* Pijakan kaki & skirt samping */}
        <path d="M54 64 H92 L100 69 H56 Z" fill="var(--amb-ink)" opacity="0.92" />
        <path
          d="M52 69 H96 L102 74 H56 Z"
          fill="var(--amb-body)"
          stroke="var(--amb-ink)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Apron depan PCX: bidang tinggi dari dek ke setang */}
        <path
          d="M86 67 L88 46 Q88 32 98 29 L106 28 Q112 31 112 41 L109 51 Q107 57 102 61 L96 66 L92 68 Z"
          fill="var(--amb-body)"
          stroke="var(--amb-ink)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M93 65 L95 48 Q95 39 100 37 L104 37 L105 56 Q104 62 99 65 Z"
          fill="var(--amb-glass)"
          opacity="0.25"
        />
        <path
          d="M94 61 Q101 64 109 59"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M96 55 L108 52 L105 61 L99 65 Z" fill="var(--amb-ink)" opacity="0.18" />
        <path
          d="M104 42 L111 40 L113 48 L106 52 Z"
          fill="var(--amb-beam)"
          stroke="var(--amb-ink)"
          strokeWidth="0.8"
        />

        {/* Fender depan melengkung di atas roda */}
        <path
          d="M96 63 Q109 54 127 61 L124 66 Q109 58 99 68 Z"
          fill="var(--amb-body)"
          stroke="var(--amb-ink)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M104 57 L112 66" stroke="var(--amb-ink)" strokeWidth="3.5" strokeLinecap="round" />

        {/* Kaki & sepatu pengendara */}
        <path
          d="M54 48 Q64 51 70 59 L78 65 L87 67 L87 64 L77 57 Q67 47 60 45 Z"
          fill="var(--amb-glass)"
          stroke="var(--amb-ink)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <rect x="84" y="63" width="10" height="4" rx="1.5" fill="var(--amb-ink)" />

        {/* Torso berompi PMI */}
        <path
          d="M50 45 Q54 34 62 30 L69 32 Q69 41 65 48 Q58 51 52 49 Z"
          fill="var(--accent)"
          stroke="var(--amb-ink)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M32 33 Q44 34 56 36"
          fill="none"
          stroke="var(--amb-ink)"
          strokeWidth="1.8"
          opacity="0.4"
        />
        <rect x="42" y="33" width="4" height="2.5" rx="0.8" fill="var(--amb-ink)" opacity="0.5" />
        <rect x="56" y="37.5" width="7.5" height="7.5" rx="1" fill="#fff" opacity="0.95" />
        <rect x="58.8" y="39" width="2.4" height="4.5" fill="var(--accent)" />
        <rect x="57.3" y="41.1" width="5.4" height="2.4" fill="var(--accent)" />

        {/* Lengan ke setang */}
        <path
          d="M65 33 Q80 34 96 39"
          fill="none"
          stroke="var(--amb-ink)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M65 33 Q80 34 96 39"
          fill="none"
          stroke="var(--amb-body)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <circle cx="96" cy="39" r="2.6" fill="var(--amb-ink)" />

        {/* Helm putih dengan stiker palang */}
        <rect x="63" y="26" width="4" height="4" fill="var(--amb-body)" />
        <circle
          cx="66"
          cy="18"
          r="9.5"
          fill="var(--amb-body)"
          stroke="var(--amb-ink)"
          strokeWidth="1.8"
        />
        <path d="M68 11 Q77 14 75 21 L68 23 Z" fill="var(--amb-glass)" />
        <path
          d="M58 13 Q65 8 73 12"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <rect x="61.5" y="15.5" width="4.2" height="1.3" fill="var(--accent)" />
        <rect x="62.8" y="14.2" width="1.3" height="3.9" fill="var(--accent)" />

        {/* Cowl setang, kaca tinggi, dan spion */}
        <path
          d="M90 36 Q94 30 102 29 L110 31 L112 37 L103 40 L91 39 Z"
          fill="var(--amb-body)"
          stroke="var(--amb-ink)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M94 33 Q96 18 99 9 Q100 6 103 8 L110 16 Q113 19 112 24 L108 34 L100 37 Z"
          fill="var(--amb-glass)"
          stroke="var(--amb-ink)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M99 30 L101 15" stroke="var(--amb-rim)" strokeWidth="1.2" opacity="0.6" />
        <path d="M91 36 L100 34" stroke="var(--amb-ink)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M90 29 L97 28" stroke="var(--amb-ink)" strokeWidth="2" strokeLinecap="round" />
        <rect x="96" y="25.5" width="5" height="3.5" rx="1" fill="var(--amb-ink)" />

        {/* Strobo merah-biru di apron depan */}
        <ellipse
          cx="110"
          cy="56"
          rx="9"
          ry="6"
          fill="var(--accent)"
          opacity="0.3"
          className="ambulance-beacon-glow"
        />
        <rect x="102" y="53" width="14" height="4" rx="1.5" fill="var(--amb-ink)" />
        <rect
          x="103.5"
          y="54.2"
          width="5.5"
          height="1.8"
          rx="0.9"
          fill="var(--amb-strobe-blue)"
          className="ambulance-beacon-lens"
        />
        <rect
          x="110"
          y="54.2"
          width="5"
          height="1.8"
          rx="0.9"
          fill="var(--accent)"
          className="ambulance-beacon-lens"
          style={{ animationDelay: '-320ms' }}
        />
      </g>
    </svg>
  );
}

/**
 * Pita jalan dengan ambulans KSR yang melintas berkala.
 * Animasi murni CSS (lihat app/globals.css) — tanpa JS klien,
 * otomatis berhenti pada prefers-reduced-motion.
 */
export function AmbulancePass({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`ambulance-road w-full ${className}`}>
      {/* Bukit statis di latar belakang */}
      <svg
        className="ambulance-hills"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        role="presentation"
      >
        <path
          d="M0 60 L0 32 Q200 12 420 30 T860 22 Q1040 34 1200 24 L1200 60 Z"
          fill="currentColor"
          color="var(--amb-shoulder)"
          opacity="0.45"
        />
        <path
          d="M0 60 L0 40 Q160 26 340 38 T760 32 Q960 42 1200 34 L1200 60 Z"
          fill="currentColor"
          color="var(--amb-shoulder)"
          opacity="0.75"
        />
      </svg>

      {/* Tiang & pepohonan berulang untuk efek pemandangan meluncur */}
      <svg
        className="ambulance-scenery"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        role="presentation"
      >
        {[0, 600].map((offset) => (
          <g key={offset} transform={`translate(${offset}, 0)`}>
            {/* Kabel listrik antar tiang melengkung alami */}
            <path
              d="M70 18 Q235 27 400 18"
              stroke="var(--amb-pole)"
              strokeWidth="0.9"
              fill="none"
              opacity="0.35"
            />

            {/* Tiang listrik 1 (x=70) */}
            <line x1="70" y1="12" x2="70" y2="80" stroke="var(--amb-pole)" strokeWidth="2.8" />
            <line x1="58" y1="18" x2="82" y2="18" stroke="var(--amb-pole)" strokeWidth="2.2" />
            <circle cx="60" cy="17" r="1.5" fill="var(--amb-pole)" />
            <circle cx="80" cy="17" r="1.5" fill="var(--amb-pole)" />

            {/* Pohon cemara runcing ramping (x=160) */}
            <polygon points="160,18 148,34 172,34" fill="var(--amb-pole)" opacity="0.5" />
            <polygon points="160,28 144,48 176,48" fill="var(--amb-pole)" opacity="0.65" />
            <polygon points="160,40 138,65 182,65" fill="var(--amb-pole)" opacity="0.8" />
            <rect x="158" y="65" width="4" height="15" fill="var(--amb-pole)" opacity="0.85" />

            {/* Pohon rimbun bulat alami (x=240) */}
            <circle cx="240" cy="38" r="18" fill="var(--amb-pole)" opacity="0.5" />
            <circle cx="228" cy="46" r="15" fill="var(--amb-pole)" opacity="0.65" />
            <circle cx="252" cy="46" r="15" fill="var(--amb-pole)" opacity="0.65" />
            <circle cx="240" cy="50" r="14" fill="var(--amb-pole)" opacity="0.75" />
            <rect x="238" y="56" width="4" height="24" fill="var(--amb-pole)" opacity="0.85" />

            {/* Pohon kecil pelengkap (x=320) */}
            <circle cx="320" cy="48" r="13" fill="var(--amb-pole)" opacity="0.45" />
            <circle cx="312" cy="54" r="10" fill="var(--amb-pole)" opacity="0.6" />
            <circle cx="328" cy="54" r="10" fill="var(--amb-pole)" opacity="0.6" />
            <rect x="318" y="60" width="4" height="20" fill="var(--amb-pole)" opacity="0.8" />

            {/* Tiang listrik 2 (x=400) */}
            <line x1="400" y1="12" x2="400" y2="80" stroke="var(--amb-pole)" strokeWidth="2.8" />
            <line x1="388" y1="18" x2="412" y2="18" stroke="var(--amb-pole)" strokeWidth="2.2" />
            <circle cx="390" cy="17" r="1.5" fill="var(--amb-pole)" />
            <circle cx="410" cy="17" r="1.5" fill="var(--amb-pole)" />

            {/* Pohon cemara tinggi (x=500) */}
            <polygon points="500,14 489,32 511,32" fill="var(--amb-pole)" opacity="0.5" />
            <polygon points="500,26 484,48 516,48" fill="var(--amb-pole)" opacity="0.65" />
            <polygon points="500,38 478,66 522,66" fill="var(--amb-pole)" opacity="0.8" />
            <rect x="498" y="66" width="4" height="14" fill="var(--amb-pole)" opacity="0.85" />
          </g>
        ))}
      </svg>

      {/* Marka putus-putus lajur jalan */}
      <div className="ambulance-lane" />

      {/* Pengawal motor: PCX paling belakang, lalu sport bike, ambulans di depan */}
      <div className="ambulance-bike ambulance-bike--pcx">
        <PcxScooter />
      </div>
      <div className="ambulance-bike ambulance-bike--sport">
        <SportBike />
      </div>

      {/* Kendaraan ambulans */}
      <div className="ambulance-vehicle">
        <svg viewBox="0 0 280 108" role="presentation" className="h-auto w-full">
          <defs>
            <clipPath id="amb-body-clip">
              <path d="M16 86 V34 Q16 26 24 26 H166 Q174 26 174 34 V38 H184 Q195 38 201 47 L216 68 Q220 74 220 80 V86 Q220 92 214 92 H22 Q16 92 16 86 Z" />
            </clipPath>

            <filter id="amb-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" />
            </filter>

            <linearGradient id="amb-beam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--amb-beam)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--amb-beam)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Bayangan kendaraan */}
          <ellipse cx="122" cy="103" rx="104" ry="5" fill="var(--amb-ink)" opacity="0.16" />

          {/* Elips wake di belakang bawah roda */}
          <ellipse cx="6" cy="96" rx="5" ry="2" fill="var(--amb-ink)" className="ambulance-wake" />
          <ellipse
            cx="2"
            cy="99"
            rx="3"
            ry="1.5"
            fill="var(--amb-ink)"
            className="ambulance-wake"
            style={{ animationDelay: '-350ms' }}
          />

          {/* Bagian yang memantul dengan suspensi */}
          <g className="ambulance-suspension">
            {/* Goresan kecepatan (digambar sebelum bodi agar tidak menimpa cat) */}
            <path
              d="M2 44 H20"
              stroke="var(--amb-ink)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="ambulance-streak"
            />
            <path
              d="M0 58 H18"
              stroke="var(--amb-ink)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="ambulance-streak"
              style={{ animationDelay: '-300ms' }}
            />
            <path
              d="M6 72 H20"
              stroke="var(--amb-ink)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="ambulance-streak"
              style={{ animationDelay: '-600ms' }}
            />

            {/* Bodi utama */}
            <path
              d="M16 86 V34 Q16 26 24 26 H166 Q174 26 174 34 V38 H184 Q195 38 201 47 L216 68 Q220 74 220 80 V86 Q220 92 214 92 H22 Q16 92 16 86 Z"
              fill="var(--amb-body)"
              stroke="var(--amb-ink)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Strip merah (dibatasi bentuk bodi) */}
            <g clipPath="url(#amb-body-clip)">
              <rect x="14" y="64" width="208" height="10" fill="var(--accent)" />
            </g>

            {/* Seam pintu belakang */}
            <path d="M72 30 V88" stroke="var(--amb-ink)" strokeWidth="1.2" opacity="0.18" />
            <path d="M112 30 V88" stroke="var(--amb-ink)" strokeWidth="1.2" opacity="0.18" />

            {/* Palang kemanusiaan merah */}
            <rect x="38" y="32" width="9" height="34" rx="1.5" fill="var(--accent)" />
            <rect x="25" y="44" width="35" height="9" rx="1.5" fill="var(--accent)" />

            {/* Jendela bak */}
            <rect x="124" y="38" width="30" height="20" rx="2" fill="var(--amb-glass)" />
            <path
              d="M127 41 H151"
              stroke="var(--amb-rim)"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Jendela kabin */}
            <path d="M181 42 H194 L208 61 H181 Z" fill="var(--amb-glass)" />
            <path
              d="M184 45 H193 L203 59"
              stroke="var(--amb-rim)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />

            {/* Spion samping */}
            <path d="M174 40 L183 34" stroke="var(--amb-ink)" strokeWidth="1.5" />
            <rect x="182" y="32" width="5" height="4" rx="1" fill="var(--amb-ink)" />

            {/* Glow sirine */}
            <ellipse
              cx="116"
              cy="20"
              rx="22"
              ry="12"
              fill="var(--accent)"
              filter="url(#amb-glow)"
              className="ambulance-beacon-glow"
            />

            {/* Light bar */}
            <rect x="104" y="18" width="52" height="7" rx="3" fill="var(--amb-ink)" />
            <rect
              x="108"
              y="20"
              width="20"
              height="3"
              rx="1.5"
              fill="var(--accent)"
              className="ambulance-beacon-lens"
            />
            <rect
              x="132"
              y="20"
              width="20"
              height="3"
              rx="1.5"
              fill="var(--accent)"
              className="ambulance-beacon-lens"
              style={{ animationDelay: '-320ms' }}
            />

            {/* Berkas & lampu depan */}
            <path d="M221 67 L276 54 L276 94 L221 79 Z" fill="url(#amb-beam)" />
            <rect x="215" y="66" width="6" height="7" rx="1" fill="var(--amb-beam)" />

            {/* Lampu belakang */}
            <rect x="15" y="66" width="4" height="8" rx="1" fill="var(--accent)" opacity="0.9" />

            {/* Teks bodi AMBULANS */}
            <text
              x="88"
              y="80"
              fontSize="8"
              letterSpacing="1.4"
              fill="var(--amb-ink)"
              opacity="0.55"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              AMBULANS
            </text>
          </g>

          {/* Rumah roda (digambar setelah bodi, sebelum roda) */}
          <path d="M46 92 A16 16 0 0 1 78 92 Z" fill="var(--amb-ink)" opacity="0.9" />
          <path d="M172 92 A16 16 0 0 1 204 92 Z" fill="var(--amb-ink)" opacity="0.9" />

          {/* Roda depan & belakang (roda tetap berputar tanpa bobbing) */}
          {[62, 188].map((cx) => (
            <g key={cx}>
              {/* Ban */}
              <circle cx={cx} cy="92" r="14" fill="var(--amb-tire)" />
              {/* Pelek */}
              <circle cx={cx} cy="92" r="8" fill="var(--amb-rim)" />
              {/* Hub tengah */}
              <circle cx={cx} cy="92" r="3" fill="var(--amb-tire)" />
              {/* 5 jari-jari yang berputar */}
              <g
                className="ambulance-wheel"
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                }}
              >
                {[0, 72, 144, 216, 288].map((angle) => (
                  <line
                    key={angle}
                    x1={cx}
                    y1="92"
                    x2={cx + 8 * Math.cos((angle * Math.PI) / 180)}
                    y2={92 + 8 * Math.sin((angle * Math.PI) / 180)}
                    stroke="var(--amb-spoke)"
                    strokeWidth="1.6"
                  />
                ))}
              </g>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
