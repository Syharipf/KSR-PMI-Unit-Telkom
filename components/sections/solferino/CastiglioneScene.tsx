import React from 'react';

/**
 * Babak 2 — Castiglione delle Stiviere (24–25 Juni 1859).
 * Suasana gereja Chiesa Maggiore malam hari. Tetap malam di tema terang maupun gelap.
 */

export function CastiglioneScene() {
  // 14 bintang di luar bukaan jendela
  const stars = [
    { cx: 775, cy: 110, r: 1.6, delay: '0s' },
    { cx: 792, cy: 95, r: 1.2, delay: '-0.7s' },
    { cx: 815, cy: 105, r: 1.5, delay: '-1.4s' },
    { cx: 835, cy: 92, r: 1.1, delay: '-2.1s' },
    { cx: 848, cy: 118, r: 1.4, delay: '-2.8s' },
    { cx: 780, cy: 135, r: 1.2, delay: '-3.5s' },
    { cx: 805, cy: 128, r: 1.8, delay: '-4.2s' },
    { cx: 828, cy: 142, r: 1.3, delay: '-0.9s' },
    { cx: 845, cy: 155, r: 1.1, delay: '-1.8s' },
    { cx: 772, cy: 165, r: 1.4, delay: '-2.7s' },
    { cx: 795, cy: 175, r: 1.3, delay: '-3.6s' },
    { cx: 818, cy: 168, r: 1.6, delay: '-4.5s' },
    { cx: 838, cy: 190, r: 1.2, delay: '-1.2s' },
    { cx: 810, cy: 205, r: 1.5, delay: '-2.4s' },
  ];

  // 9 figur korban luka terbaring 2 baris (belakang & depan)
  // Belakang: y ~425-445, Depan: y ~465-495 (tinggi >= 70px di viewBox)
  const woundedBack = [
    { x: 335, y: 430, rx: 32, ry: 10, headX: 310, headY: 428, delay: '0s' },
    { x: 440, y: 432, rx: 34, ry: 11, headX: 415, headY: 430, delay: '-0.9s' },
    { x: 550, y: 435, rx: 32, ry: 10, headX: 525, headY: 433, delay: '-1.8s' },
    { x: 655, y: 434, rx: 35, ry: 11, headX: 630, headY: 432, delay: '-2.7s' },
  ];

  const woundedFront = [
    { x: 340, y: 475, rx: 42, ry: 14, headX: 305, headY: 470, headR: 9, delay: '-3.6s' },
    { x: 450, y: 480, rx: 44, ry: 15, headX: 415, headY: 475, headR: 9.5, delay: '-0.8s' },
    { x: 560, y: 482, rx: 45, ry: 15, headX: 525, headY: 477, headR: 9.5, delay: '-1.7s' },
    { x: 670, y: 480, rx: 43, ry: 14, headX: 635, headY: 475, headR: 9, delay: '-2.6s' },
    { x: 775, y: 476, rx: 40, ry: 13, headX: 742, headY: 472, headR: 8.5, delay: '-3.5s' },
  ];

  return (
    <svg
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      role="presentation"
    >
      <defs>
        {/* Latar malam gereja */}
        <linearGradient id="cs-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sc-night-top)" />
          <stop offset="100%" stopColor="var(--sc-night-bottom)" />
        </linearGradient>

        {/* Clip bukaan jendela lengkung gereja */}
        <clipPath id="cs-window-clip">
          <path d="M 760 125 A 45 45 0 0 1 850 125 L 850 230 L 760 230 Z" />
        </clipPath>

        {/* Halo lentera 1, 2, 3 */}
        <radialGradient id="cs-lamp-glow">
          <stop offset="0%" stopColor="var(--sc-lamp)" stopOpacity="0.8" />
          <stop offset="40%" stopColor="var(--sc-lamp-soft)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--sc-lamp-soft)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Latar interior malam */}
      <rect width="1200" height="520" fill="url(#cs-night)" />

      {/* Dinding batu gereja: 3 lengkung kubah & 4 kolom batu */}
      <g stroke="var(--sc-stone-lit)" strokeWidth="2.5" fill="none">
        {/* Kolom batu vertikal (x: 270, 480, 690, 920) */}
        <line x1="270" y1="40" x2="270" y2="420" stroke="var(--sc-stone)" strokeWidth="28" />
        <line x1="480" y1="40" x2="480" y2="420" stroke="var(--sc-stone)" strokeWidth="28" />
        <line x1="690" y1="40" x2="690" y2="420" stroke="var(--sc-stone)" strokeWidth="28" />
        <line x1="920" y1="40" x2="920" y2="420" stroke="var(--sc-stone)" strokeWidth="28" />

        {/* Garis lis kapital kolom */}
        <line x1="250" y1="80" x2="290" y2="80" stroke="var(--sc-stone-lit)" strokeWidth="4" />
        <line x1="460" y1="80" x2="500" y2="80" stroke="var(--sc-stone-lit)" strokeWidth="4" />
        <line x1="670" y1="80" x2="710" y2="80" stroke="var(--sc-stone-lit)" strokeWidth="4" />
        <line x1="900" y1="80" x2="940" y2="80" stroke="var(--sc-stone-lit)" strokeWidth="4" />

        {/* Lengkung kubah gereja */}
        <path d="M 270 80 Q 375 20 480 80" />
        <path d="M 480 80 Q 585 20 690 80" />
        <path d="M 690 80 Q 805 20 920 80" />

        {/* Garis bata/dinding horizontal halus */}
        {[130, 190, 260, 330, 390].map((ly) => (
          <line
            key={ly}
            x1="260"
            y1={ly}
            x2="940"
            y2={ly}
            stroke="var(--sc-stone)"
            strokeWidth="1.2"
            opacity="0.6"
          />
        ))}
      </g>

      {/* Jendela malam lengkung dengan langit bertabur bintang & bulan */}
      <g>
        {/* Isi langit malam di dalam jendela */}
        <g clipPath="url(#cs-window-clip)">
          <rect x="760" y="80" width="90" height="150" fill="var(--sc-night-top)" />
          {/* Bintang berkelip */}
          {stars.map((star, idx) => (
            <circle
              key={idx}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="var(--sc-star)"
              className="cs-star"
              style={{ animationDelay: star.delay }}
            />
          ))}
          {/* Bulan sabit kecil */}
          <path
            d="M 825 110 A 10 10 0 1 0 838 124 A 12 12 0 1 1 825 110 Z"
            fill="var(--sc-star)"
            opacity="0.85"
          />
          {/* Panel kaca berembun tipis */}
          <rect
            x="760"
            y="80"
            width="90"
            height="150"
            fill="var(--sc-window)"
            opacity="0.22"
          />
        </g>

        {/* Kusen & mullion jendela */}
        <path
          d="M 760 125 A 45 45 0 0 1 850 125 L 850 230 L 760 230 Z"
          fill="none"
          stroke="var(--sc-stone-lit)"
          strokeWidth="3.5"
        />
        <line x1="805" y1="80" x2="805" y2="230" stroke="var(--sc-stone)" strokeWidth="2" />
        <line x1="760" y1="150" x2="850" y2="150" stroke="var(--sc-stone)" strokeWidth="2" />
        <line x1="760" y1="190" x2="850" y2="190" stroke="var(--sc-stone)" strokeWidth="2" />
      </g>

      {/* Berkas cahaya bulan dari jendela ke lantai gereja */}
      <polygon
        points="760,210 850,225 640,490 480,480"
        fill="var(--sc-window)"
        className="cs-beam"
      />

      {/* Altar samping gereja dengan salib merah */}
      <g>
        {/* Tangga altar */}
        <rect x="850" y="380" width="80" height="12" fill="var(--sc-stone)" stroke="var(--sc-stone-lit)" strokeWidth="1" />
        <rect x="860" y="365" width="65" height="15" fill="var(--sc-stone)" stroke="var(--sc-stone-lit)" strokeWidth="1" />
        {/* Meja altar */}
        <rect x="870" y="330" width="50" height="35" fill="var(--sc-stone-lit)" />
        {/* Lilin altar */}
        <rect x="880" y="318" width="4" height="12" fill="var(--sc-document)" />
        <circle cx="882" cy="315" r="3" fill="var(--sc-lamp)" className="cs-candle" />
        <rect x="906" y="318" width="4" height="12" fill="var(--sc-document)" />
        <circle cx="908" cy="315" r="3" fill="var(--sc-lamp)" className="cs-candle" style={{ animationDelay: '-1.4s' }} />

        {/* Salib altar — aksen merah */}
        <rect x="891" y="260" width="6" height="52" fill="var(--accent)" />
        <rect x="879" y="274" width="30" height="6" fill="var(--accent)" />
      </g>

      {/* Lantai gereja berhampar jerami */}
      <rect x="0" y="400" width="1200" height="120" fill="var(--sc-wood-deep)" />
      {/* Garis perspektif ubin batu lantai menuju (600, 360) */}
      <g stroke="var(--sc-wood)" strokeWidth="1" opacity="0.45">
        <line x1="120" y1="520" x2="520" y2="400" />
        <line x1="300" y1="520" x2="560" y2="400" />
        <line x1="480" y1="520" x2="590" y2="400" />
        <line x1="720" y1="520" x2="610" y2="400" />
        <line x1="900" y1="520" x2="640" y2="400" />
        <line x1="1080" y1="520" x2="680" y2="400" />
      </g>
      {/* Taburan jerami */}
      <g stroke="var(--sc-wood)" strokeWidth="1.2" opacity="0.5">
        {(
          [
            [310, 440], [360, 460], [420, 435], [490, 465],
            [580, 445], [640, 470], [710, 450], [780, 480],
            [330, 495], [520, 500], [680, 505], [820, 495],
          ] as const
        ).map(([jx, jy], idx) => (
          <path
            key={idx}
            d={`M${jx} ${jy} L${jx + 12} ${jy - 4} M${jx + 4} ${jy + 2} L${jx + 16} ${jy + 8}`}
          />
        ))}
      </g>

      {/* Korban terbaring baris belakang */}
      <g>
        {woundedBack.map((w, idx) => (
          <g
            key={idx}
            className="cs-wounded"
            style={{
              animationDelay: w.delay,
              transformOrigin: 'center',
              transformBox: 'fill-box',
            }}
          >
            {/* Selimut */}
            <ellipse
              cx={w.x}
              cy={w.y}
              rx={w.rx}
              ry={w.ry}
              fill="var(--sc-cloth)"
              stroke="var(--sc-ink)"
              strokeWidth="1.2"
            />
            {/* Bantal / buntelan kain */}
            <ellipse cx={w.headX} cy={w.headY + 2} rx="10" ry="6" fill="var(--sc-wood)" />
            {/* Kepala korban */}
            <circle cx={w.headX} cy={w.headY} r="7" fill="var(--sc-skin)" />
            {/* Lengan di atas selimut */}
            <path
              d={`M ${w.x - 12} ${w.y - 2} Q ${w.x} ${w.y + 4} ${w.x + 14} ${w.y - 1}`}
              stroke="var(--sc-skin)"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ))}
      </g>

      {/* Korban terbaring baris depan (lebih besar, jelas terbaca di ponsel) */}
      <g>
        {woundedFront.map((w, idx) => (
          <g
            key={idx}
            className="cs-wounded"
            style={{
              animationDelay: w.delay,
              transformOrigin: 'center',
              transformBox: 'fill-box',
            }}
          >
            {/* Selimut tebal */}
            <ellipse
              cx={w.x}
              cy={w.y}
              rx={w.rx}
              ry={w.ry}
              fill="var(--sc-cloth)"
              stroke="var(--sc-ink)"
              strokeWidth="1.6"
            />
            {/* Lipatan kain selimut */}
            <path
              d={`M ${w.x - 24} ${w.y - 2} Q ${w.x} ${w.y + 6} ${w.x + 28} ${w.y - 3}`}
              stroke="var(--sc-ink)"
              strokeWidth="1.2"
              fill="none"
              opacity="0.4"
            />
            {/* Bantal jerami */}
            <ellipse cx={w.headX} cy={w.headY + 3} rx="12" ry="7" fill="var(--sc-wood)" />
            {/* Kepala korban */}
            <circle
              cx={w.headX}
              cy={w.headY}
              r={w.headR}
              fill="var(--sc-skin)"
              stroke="var(--sc-rim)"
              strokeWidth="0.8"
            />
            {/* Lengan lemas keluar dari selimut */}
            <path
              d={`M ${w.x - 16} ${w.y} Q ${w.x - 2} ${w.y + 7} ${w.x + 18} ${w.y + 2}`}
              stroke="var(--sc-skin)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ))}
      </g>

      {/* Meja persediaan obat & perban darurat */}
      <g transform="translate(300, 365)">
        {/* Meja kayu rendah */}
        <rect x="0" y="32" width="75" height="6" fill="var(--sc-wood)" stroke="var(--sc-ink)" strokeWidth="1" />
        <rect x="6" y="38" width="5" height="32" fill="var(--sc-wood-deep)" />
        <rect x="64" y="38" width="5" height="32" fill="var(--sc-wood-deep)" />
        {/* Baskom air */}
        <ellipse cx="22" cy="28" rx="14" ry="5" fill="var(--sc-stone-lit)" stroke="var(--sc-ink)" strokeWidth="1" />
        <path d="M 8 28 Q 22 42 36 28 Z" fill="var(--sc-stone-lit)" stroke="var(--sc-ink)" strokeWidth="1" />
        {/* 3 gulungan balutan perban */}
        <rect x="42" y="24" width="10" height="8" rx="2" fill="var(--sc-document)" stroke="var(--sc-ink)" strokeWidth="0.8" />
        <rect x="54" y="22" width="11" height="10" rx="2" fill="var(--sc-document)" stroke="var(--sc-ink)" strokeWidth="0.8" />
        <rect x="47" y="16" width="10" height="8" rx="2" fill="var(--sc-document)" stroke="var(--sc-ink)" strokeWidth="0.8" />
        {/* Botol obat kaca & lilin */}
        <rect x="68" y="20" width="5" height="12" rx="1" fill="var(--sc-window)" opacity="0.8" />
      </g>

      {/* Tiga Relawan Castiglione ("Tutti fratelli") */}
      {/* Relawan 1: Berlutut memberi minum dari canteen (depan meja) */}
      <g transform="translate(365, 385)">
        {/* Kerudung/veil & kepala */}
        <ellipse cx="22" cy="14" rx="9" ry="11" fill="var(--sc-cloth)" />
        <circle cx="24" cy="15" r="7" fill="var(--sc-skin)" stroke="var(--sc-rim)" strokeWidth="0.8" />
        {/* Tubuh & gaun berlutut */}
        <path
          d="M 16 26 C 10 38 6 60 4 85 L 42 85 C 40 68 34 38 28 26 Z"
          fill="var(--sc-ink)"
          stroke="var(--sc-rim)"
          strokeWidth="0.8"
        />
        {/* Selendang putih penolong */}
        <path d="M 18 26 Q 26 42 22 62" stroke="var(--sc-document)" strokeWidth="2.5" fill="none" opacity="0.8" />
        {/* Lengan terulur menuang minum */}
        <path
          d="M 28 36 L 46 44 L 56 46"
          stroke="var(--sc-skin)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Canteen minum */}
        <ellipse cx="58" cy="48" rx="5" ry="7" fill="var(--sc-wood)" stroke="var(--sc-ink)" strokeWidth="1" />
      </g>

      {/* Relawan 2: Pria berdiri mengangkat lentera memeriksa korban (tengah) */}
      <g transform="translate(540, 325)">
        {/* Topi & kepala */}
        <ellipse cx="24" cy="18" rx="9" ry="11" fill="var(--sc-ink)" stroke="var(--sc-rim)" strokeWidth="0.8" />
        <circle cx="24" cy="20" r="7" fill="var(--sc-skin)" />
        {/* Mantel & jas panjang pria abad 19 */}
        <path
          d="M 14 30 L 8 85 L 14 140 L 34 140 L 40 85 L 34 30 Z"
          fill="var(--sc-ink)"
          stroke="var(--sc-rim)"
          strokeWidth="1"
        />
        {/* Kerah putih */}
        <polygon points="20,30 24,36 28,30" fill="var(--sc-document)" />
        {/* Lengan kanan terangkat menjinjing lentera */}
        <path
          d="M 30 36 L 44 26 L 42 8"
          stroke="var(--sc-ink)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Tali gantungan lentera */}
        <line x1="42" y1="8" x2="42" y2="18" stroke="var(--sc-rim)" strokeWidth="1.5" />
        {/* Lengan kiri mengarah ke korban */}
        <path
          d="M 14 38 L 4 58 L -8 72"
          stroke="var(--sc-ink)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Relawan 3: Wanita membawa baskom & balutan kain berjalan ke kanan */}
      <g transform="translate(700, 345)">
        {/* Kerudung & kepala */}
        <ellipse cx="20" cy="16" rx="9" ry="11" fill="var(--sc-cloth)" />
        <circle cx="18" cy="17" r="7" fill="var(--sc-skin)" stroke="var(--sc-rim)" strokeWidth="0.8" />
        {/* Gaun panjang */}
        <path
          d="M 12 28 C 6 48 2 82 0 120 L 40 120 C 38 88 34 48 28 28 Z"
          fill="var(--sc-ink)"
          stroke="var(--sc-rim)"
          strokeWidth="1"
        />
        {/* Lengan menggendong baskom perban */}
        <path
          d="M 16 38 L 26 50 L 36 46"
          stroke="var(--sc-skin)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Baskom perban kayu */}
        <ellipse cx="34" cy="50" rx="12" ry="5" fill="var(--sc-wood)" stroke="var(--sc-ink)" strokeWidth="1" />
        <rect x="28" y="44" width="12" height="6" rx="1.5" fill="var(--sc-document)" />
      </g>

      {/* Tiga Lentera bercahaya hangat & berdenyut */}
      {/* Lentera 1: Di atas meja persediaan (390, 360) */}
      <g transform="translate(390, 360)">
        <circle
          cx="0"
          cy="0"
          r="80"
          fill="url(#cs-lamp-glow)"
          className="cs-lantern-glow"
        />
        <g
          className="cs-lantern"
          style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
        >
          <rect x="-8" y="-14" width="16" height="24" rx="3" fill="var(--sc-lamp)" stroke="var(--sc-ink)" strokeWidth="1.5" />
          <polygon points="-8,-14 0,-22 8,-14" fill="var(--sc-wood-deep)" />
          <circle cx="0" cy="-2" r="3" fill="var(--sc-lamp-soft)" />
        </g>
      </g>

      {/* Lentera 2: Di tangan relawan pria tengah (582, 342) */}
      <g transform="translate(582, 342)">
        <circle
          cx="0"
          cy="0"
          r="100"
          fill="url(#cs-lamp-glow)"
          className="cs-lantern-glow"
          style={{ animationDelay: '-1.1s' }}
        />
        <g
          className="cs-lantern"
          style={{
            animationDelay: '-1.1s',
            transformOrigin: 'center',
            transformBox: 'fill-box',
          }}
        >
          <rect x="-9" y="-15" width="18" height="26" rx="3" fill="var(--sc-lamp)" stroke="var(--sc-ink)" strokeWidth="1.5" />
          <polygon points="-9,-15 0,-24 9,-15" fill="var(--sc-wood-deep)" />
          <circle cx="0" cy="-2" r="3.5" fill="var(--sc-lamp-soft)" />
        </g>
      </g>

      {/* Lentera 3: Di dekat relawan kanan (735, 340) */}
      <g transform="translate(735, 340)">
        <circle
          cx="0"
          cy="0"
          r="75"
          fill="url(#cs-lamp-glow)"
          className="cs-lantern-glow"
          style={{ animationDelay: '-2.2s' }}
        />
        <g
          className="cs-lantern"
          style={{
            animationDelay: '-2.2s',
            transformOrigin: 'center',
            transformBox: 'fill-box',
          }}
        >
          <rect x="-7" y="-12" width="14" height="20" rx="2.5" fill="var(--sc-lamp)" stroke="var(--sc-ink)" strokeWidth="1.2" />
          <polygon points="-7,-12 0,-18 7,-12" fill="var(--sc-wood-deep)" />
          <circle cx="0" cy="-2" r="2.5" fill="var(--sc-lamp-soft)" />
        </g>
      </g>
    </svg>
  );
}
