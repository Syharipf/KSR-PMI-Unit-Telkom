import React from 'react';

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
          <ellipse
            cx="6"
            cy="96"
            rx="5"
            ry="2"
            fill="var(--amb-ink)"
            className="ambulance-wake"
          />
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
