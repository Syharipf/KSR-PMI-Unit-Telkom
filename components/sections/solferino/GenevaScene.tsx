import React from 'react';

/**
 * Babak 3 — Komite Lima di Jenewa (17 Februari 1863).
 * Pertemuan pendirian Komite Internasional Palang Merah (ICRC):
 * Henry Dunant, Gustave Moynier, Guillaume-Henri Dufour, Louis Appia, Théodore Maunoir.
 */

export function GenevaScene() {
  // Butiran debu menari di berkas jendela
  const dustParticles = [
    { cx: 510, cy: 220, r: 1.5, delay: '0s' },
    { cx: 560, cy: 190, r: 1.8, delay: '-1.5s' },
    { cx: 615, cy: 240, r: 1.4, delay: '-3s' },
    { cx: 670, cy: 210, r: 2, delay: '-4.5s' },
    { cx: 720, cy: 250, r: 1.6, delay: '-6s' },
    { cx: 535, cy: 280, r: 1.7, delay: '-7.5s' },
    { cx: 640, cy: 295, r: 1.5, delay: '-9s' },
    { cx: 690, cy: 310, r: 1.8, delay: '-10.5s' },
  ];

  // 18 buku di rak
  const books = [
    { x: 910, y: 135, w: 10, h: 32, fill: 'var(--sc-cloth)' },
    { x: 922, y: 138, w: 8, h: 29, fill: 'var(--sc-ink)' },
    { x: 932, y: 133, w: 12, h: 34, fill: 'var(--sc-cloth)' },
    { x: 946, y: 140, w: 9, h: 27, fill: 'var(--sc-ink)' },
    { x: 910, y: 180, w: 11, h: 30, fill: 'var(--sc-ink)' },
    { x: 923, y: 175, w: 9, h: 35, fill: 'var(--sc-cloth)' },
    { x: 934, y: 178, w: 12, h: 32, fill: 'var(--sc-wood)' },
    { x: 948, y: 182, w: 10, h: 28, fill: 'var(--sc-cloth)' },
    { x: 910, y: 222, w: 14, h: 31, fill: 'var(--sc-cloth)' },
    { x: 926, y: 225, w: 8, h: 28, fill: 'var(--sc-ink)' },
    { x: 936, y: 220, w: 11, h: 33, fill: 'var(--sc-wood)' },
    { x: 949, y: 224, w: 9, h: 29, fill: 'var(--sc-cloth)' },
    { x: 910, y: 265, w: 9, h: 31, fill: 'var(--sc-ink)' },
    { x: 921, y: 268, w: 12, h: 28, fill: 'var(--sc-cloth)' },
    { x: 935, y: 263, w: 10, h: 33, fill: 'var(--sc-wood)' },
    { x: 947, y: 266, w: 11, h: 30, fill: 'var(--sc-ink)' },
    { x: 920, y: 307, w: 16, h: 25, fill: 'var(--sc-cloth)' },
    { x: 938, y: 305, w: 18, h: 27, fill: 'var(--sc-wood)' },
  ];

  return (
    <svg
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      role="presentation"
    >
      <defs>
        {/* Clip lengkung jendela besar */}
        <clipPath id="gs-window-clip">
          <path d="M 430 180 A 170 140 0 0 1 770 180 L 770 290 L 430 290 Z" />
        </clipPath>

        {/* Gradasi cahaya siang Danau Jenewa */}
        <linearGradient id="gs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sc-window)" />
          <stop offset="60%" stopColor="var(--sc-paper)" />
          <stop offset="100%" stopColor="var(--sc-alp)" />
        </linearGradient>
      </defs>

      {/* Dinding ruangan berpanel kayu */}
      <rect width="1200" height="380" fill="var(--sc-wall)" />
      {/* Garis-garis panel kayu horizontal */}
      {[70, 115, 160, 205, 250, 295, 340].map((py) => (
        <line
          key={py}
          x1="0"
          y1={py}
          x2="1200"
          y2={py}
          stroke="var(--sc-wood)"
          strokeWidth="1.2"
          opacity="0.45"
        />
      ))}
      {/* Plint bawah dinding */}
      <rect x="0" y="365" width="1200" height="15" fill="var(--sc-wood-deep)" />

      {/* Jendela lengkung besar menghadap Danau Jenewa & Pegunungan Alpen */}
      <g>
        {/* Pemandangan di dalam jendela */}
        <g clipPath="url(#gs-window-clip)">
          <rect x="430" y="40" width="340" height="250" fill="url(#gs-sky)" />
          {/* Siluet Pegunungan Alpen kejauhan */}
          <polygon
            points="430,220 490,165 540,195 590,140 640,185 710,130 770,190 770,290 430,290"
            fill="var(--sc-alp)"
            opacity="0.55"
          />
          {/* Danau Jenewa */}
          <rect x="430" y="240" width="340" height="50" fill="var(--sc-window)" opacity="0.45" />
          <line x1="430" y1="250" x2="770" y2="250" stroke="var(--sc-document)" strokeWidth="1" opacity="0.3" />
        </g>

        {/* Kusen jendela luar */}
        <path
          d="M 430 180 A 170 140 0 0 1 770 180 L 770 290 L 430 290 Z"
          fill="none"
          stroke="var(--sc-ink)"
          strokeWidth="4"
        />
        {/* Mullion jendela (3x4 panel kaca) */}
        <line x1="515" y1="55" x2="515" y2="290" stroke="var(--sc-ink)" strokeWidth="2.5" />
        <line x1="600" y1="40" x2="600" y2="290" stroke="var(--sc-ink)" strokeWidth="2.8" />
        <line x1="685" y1="55" x2="685" y2="290" stroke="var(--sc-ink)" strokeWidth="2.5" />
        <line x1="430" y1="120" x2="770" y2="120" stroke="var(--sc-ink)" strokeWidth="2.5" />
        <line x1="430" y1="180" x2="770" y2="180" stroke="var(--sc-ink)" strokeWidth="2.5" />
        <line x1="430" y1="235" x2="770" y2="235" stroke="var(--sc-ink)" strokeWidth="2.5" />
      </g>

      {/* Tirai kain di samping kiri dan kanan jendela */}
      <g>
        <path
          d="M 405 50 Q 425 160 410 280 L 435 280 Q 430 160 435 50 Z"
          fill="var(--sc-cloth)"
          stroke="var(--sc-wood-deep)"
          strokeWidth="1.2"
          className="gs-curtain"
          style={{ transformOrigin: 'top center', transformBox: 'fill-box' }}
        />
        <path
          d="M 765 50 Q 770 160 765 280 L 790 280 Q 775 160 795 50 Z"
          fill="var(--sc-cloth)"
          stroke="var(--sc-wood-deep)"
          strokeWidth="1.2"
          className="gs-curtain"
          style={{
            animationDelay: '-4s',
            transformOrigin: 'top center',
            transformBox: 'fill-box',
          }}
        />
      </g>

      {/* Butiran debu melayang dalam berkas cahaya siang */}
      <g>
        {dustParticles.map((d, idx) => (
          <circle
            key={idx}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill="var(--sc-lamp-soft)"
            className="gs-dust"
            style={{ animationDelay: d.delay }}
          />
        ))}
      </g>

      {/* Bingkai foto & peta di dinding ruangan */}
      {/* Bingkai kiri: Peta Eropa (x: 305-385, y: 100-210) */}
      <g>
        <rect x="305" y="100" width="80" height="110" rx="3" fill="var(--sc-wood)" stroke="var(--sc-ink)" strokeWidth="2" />
        <rect x="312" y="107" width="66" height="96" fill="var(--sc-document)" />
        {/* Kontur benua sederhana */}
        <path d="M 320 130 Q 345 118 365 135 T 350 180" fill="none" stroke="var(--sc-alp)" strokeWidth="2" opacity="0.6" />
        <circle cx="342" cy="155" r="2.5" fill="var(--accent)" />
      </g>

      {/* Bingkai kanan: Piagam / lambang Jenewa (x: 820-890, y: 95-195) */}
      <g>
        <rect x="820" y="95" width="70" height="100" rx="3" fill="var(--sc-wood)" stroke="var(--sc-ink)" strokeWidth="2" />
        <rect x="826" y="101" width="58" height="88" fill="var(--sc-document)" />
        <path d="M 836 125 L 874 125 M 836 140 L 874 140 M 836 155 L 864 155" stroke="var(--sc-ink)" strokeWidth="1.4" opacity="0.45" />
      </g>

      {/* Rak buku jati (x: 900-970, y: 110-330) */}
      <g>
        <rect x="902" y="115" width="65" height="225" fill="var(--sc-wood-deep)" stroke="var(--sc-ink)" strokeWidth="2" />
        {/* Papan rak horizontal */}
        {[168, 212, 256, 300].map((sy) => (
          <rect key={sy} x="904" y={sy} width="61" height="5" fill="var(--sc-wood)" />
        ))}
        {/* Buku-buku berbaris */}
        {books.map((b, idx) => (
          <rect
            key={idx}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx="1"
            fill={b.fill}
            stroke="var(--sc-ink)"
            strokeWidth="0.8"
          />
        ))}
      </g>

      {/* Lantai papan kayu berperspektif */}
      <rect x="0" y="380" width="1200" height="140" fill="var(--sc-floor)" />
      <g stroke="var(--sc-wood-deep)" strokeWidth="1.8" opacity="0.6">
        <line x1="80" y1="520" x2="400" y2="380" />
        <line x1="280" y1="520" x2="500" y2="380" />
        <line x1="500" y1="520" x2="590" y2="380" />
        <line x1="700" y1="520" x2="610" y2="380" />
        <line x1="920" y1="520" x2="700" y2="380" />
        <line x1="1120" y1="520" x2="800" y2="380" />
        {/* Sambungan papan lantai */}
        <line x1="180" y1="440" x2="330" y2="440" />
        <line x1="450" y1="470" x2="620" y2="470" />
        <line x1="750" y1="430" x2="900" y2="430" />
      </g>

      {/* Sandaran kursi kayu berukir di belakang anggota komite */}
      <g fill="var(--sc-wood-deep)" stroke="var(--sc-ink)" strokeWidth="1.5">
        <rect x="340" y="270" width="30" height="65" rx="3" />
        <rect x="440" y="270" width="30" height="65" rx="3" />
        <rect x="750" y="270" width="30" height="65" rx="3" />
        <rect x="850" y="270" width="30" height="65" rx="3" />
      </g>

      {/* Kelima Anggota Komite Lima (ICRC) */}
      {/* 1) Kiri 1 (x=355): Duduk menghadap kanan */}
      <g transform="translate(355, 260)">
        {/* Kepala & rambut */}
        <ellipse cx="0" cy="0" rx="10" ry="12" fill="var(--sc-skin)" stroke="var(--sc-rim)" strokeWidth="0.8" />
        <path d="M -10 -4 Q 0 -14 10 -4 L 8 -11 Q 0 -16 -8 -11 Z" fill="var(--sc-ink)" />
        {/* Jas & bahu */}
        <path
          d="M -22 14 L 22 14 L 24 80 L -24 80 Z"
          fill="var(--sc-ink)"
          stroke="var(--sc-rim)"
          strokeWidth="0.8"
        />
        {/* Kerah kemeja putih */}
        <polygon points="-8,14 0,22 8,14" fill="var(--sc-document)" />
        <polygon points="-3,22 0,36 3,22" fill="var(--sc-ink)" />
      </g>

      {/* 2) Kiri 2 (x=455): Duduk condong ke meja */}
      <g transform="translate(455, 260)">
        {/* Kepala & janggut */}
        <ellipse cx="0" cy="0" rx="10" ry="12" fill="var(--sc-skin)" stroke="var(--sc-rim)" strokeWidth="0.8" />
        <path d="M -10 -4 Q 0 -14 10 -4 L 8 -11 Q 0 -16 -8 -11 Z" fill="var(--sc-ink)" />
        <path d="M -8 3 Q 4 15 8 3 Z" fill="var(--sc-ink)" opacity="0.85" />
        {/* Jas */}
        <path
          d="M -22 14 L 22 14 L 24 80 L -24 80 Z"
          fill="var(--sc-ink)"
          stroke="var(--sc-rim)"
          strokeWidth="0.8"
        />
        <polygon points="-8,14 0,22 8,14" fill="var(--sc-document)" />
      </g>

      {/* 3) Tokoh Utama: Berdiri di ujung meja menunjuk map dokumen (x=600) */}
      <g transform="translate(600, 205)">
        {/* Kepala Henry Dunant / Jenderal Dufour */}
        <ellipse cx="0" cy="0" rx="11" ry="13" fill="var(--sc-skin)" stroke="var(--sc-rim)" strokeWidth="0.8" />
        {/* Rambut bergelombang & janggut khas abad 19 */}
        <path d="M -11 -4 Q 0 -15 11 -4 L 10 -13 Q 0 -18 -10 -13 Z" fill="var(--sc-ink)" />
        <path d="M -10 2 Q 0 16 10 2 L 6 12 Q 0 16 -6 12 Z" fill="var(--sc-ink)" />
        {/* Jas mantel resmi panjang (120px) */}
        <path
          d="M -26 15 L 26 15 L 28 135 L -28 135 Z"
          fill="var(--sc-ink)"
          stroke="var(--sc-rim)"
          strokeWidth="1"
        />
        {/* Dasi & kerah putih */}
        <polygon points="-10,15 0,26 10,15" fill="var(--sc-document)" />
        <polygon points="-4,26 0,44 4,26" fill="var(--sc-ink)" />
      </g>

      {/* 4) Kanan 1 (x=765): Duduk menghadap kiri menyimak */}
      <g transform="translate(765, 260)">
        <ellipse cx="0" cy="0" rx="10" ry="12" fill="var(--sc-skin)" stroke="var(--sc-rim)" strokeWidth="0.8" />
        <path d="M -10 -4 Q 0 -14 10 -4 L 8 -11 Q 0 -16 -8 -11 Z" fill="var(--sc-ink)" />
        <path
          d="M -22 14 L 22 14 L 24 80 L -24 80 Z"
          fill="var(--sc-ink)"
          stroke="var(--sc-rim)"
          strokeWidth="0.8"
        />
        <polygon points="-8,14 0,22 8,14" fill="var(--sc-document)" />
      </g>

      {/* 5) Kanan 2 (x=865): Duduk mencatat */}
      <g transform="translate(865, 260)">
        <ellipse cx="0" cy="0" rx="10" ry="12" fill="var(--sc-skin)" stroke="var(--sc-rim)" strokeWidth="0.8" />
        <path d="M -10 -4 Q 0 -14 10 -4 L 8 -11 Q 0 -16 -8 -11 Z" fill="var(--sc-ink)" />
        <path
          d="M -22 14 L 22 14 L 24 80 L -24 80 Z"
          fill="var(--sc-ink)"
          stroke="var(--sc-rim)"
          strokeWidth="0.8"
        />
        <polygon points="-8,14 0,22 8,14" fill="var(--sc-document)" />
      </g>

      {/* Meja Konferensi Panjang Kayu Mahoni (x: 290-910, y: 330-410) */}
      <g>
        {/* Kaki-kaki meja berukir */}
        <rect x="310" y="352" width="12" height="70" fill="var(--sc-wood-deep)" stroke="var(--sc-ink)" strokeWidth="1" />
        <rect x="490" y="352" width="10" height="70" fill="var(--sc-wood-deep)" stroke="var(--sc-ink)" strokeWidth="1" />
        <rect x="710" y="352" width="10" height="70" fill="var(--sc-wood-deep)" stroke="var(--sc-ink)" strokeWidth="1" />
        <rect x="880" y="352" width="12" height="70" fill="var(--sc-wood-deep)" stroke="var(--sc-ink)" strokeWidth="1" />
        {/* Daun meja utama */}
        <polygon points="280,352 920,352 900,335 300,335" fill="var(--sc-wood)" stroke="var(--sc-ink)" strokeWidth="1.5" />
        <rect x="280" y="352" width="640" height="12" fill="var(--sc-wood-deep)" stroke="var(--sc-ink)" strokeWidth="1" />
        {/* Taplak runner hijau zaitun / kain meja */}
        <polygon points="380,352 820,352 805,335 395,335" fill="var(--sc-cloth)" opacity="0.85" />
      </g>

      {/* Cincin emblem Palang Merah memancar dari map dokumen */}
      <g className="gs-rings">
        <circle
          cx="660"
          cy="335"
          r="34"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
        />
        <circle
          cx="660"
          cy="335"
          r="34"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          style={{
            animationDelay: '3s',
            transformOrigin: 'center',
            transformBox: 'fill-box',
          }}
        />
        <circle
          cx="660"
          cy="335"
          r="34"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          style={{
            animationDelay: '6s',
            transformOrigin: 'center',
            transformBox: 'fill-box',
          }}
        />
      </g>

      {/* Dokumen-dokumen di atas meja */}
      <g>
        {/* Lembar kertas 1 */}
        <polygon points="560,344 610,342 615,354 565,356" fill="var(--sc-document)" stroke="var(--sc-ink)" strokeWidth="0.8" />
        {/* Lembar kertas 2 */}
        <polygon points="720,342 770,344 766,356 716,354" fill="var(--sc-document)" stroke="var(--sc-ink)" strokeWidth="0.8" />

        {/* Map putih dengan stempel Palang Merah (Resolusi ICRC 1863) */}
        <g transform="translate(620, 328)">
          <rect
            x="0"
            y="0"
            width="64"
            height="24"
            rx="2"
            fill="var(--sc-document)"
            stroke="var(--sc-ink)"
            strokeWidth="1.2"
          />
          {/* Lambang Palang Merah — palang simetris di atas kertas */}
          <rect x="28" y="4" width="8" height="16" fill="var(--accent)" />
          <rect x="24" y="8" width="16" height="8" fill="var(--accent)" />
          {/* Baris teks perjanjian / tanda tangan komite */}
          <line x1="6" y1="6" x2="20" y2="6" stroke="var(--sc-ink)" strokeWidth="1" opacity="0.6" />
          <line x1="6" y1="11" x2="20" y2="11" stroke="var(--sc-ink)" strokeWidth="1" opacity="0.6" />
          <line x1="48" y1="6" x2="58" y2="6" stroke="var(--sc-ink)" strokeWidth="1" opacity="0.6" />
          <line x1="48" y1="11" x2="58" y2="11" stroke="var(--sc-ink)" strokeWidth="1" opacity="0.6" />
        </g>
      </g>

      {/* Tangan tokoh berdiri menunjuk ke dokumen di meja (layer setelah dokumen) */}
      <g transform="translate(600, 205)">
        <path
          d="M 18 60 L 32 95 L 45 125"
          stroke="var(--sc-ink)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Tangan dan telunjuk mengarah ke map */}
        <circle cx="46" cy="126" r="4" fill="var(--sc-skin)" />
        <line x1="46" y1="126" x2="54" y2="130" stroke="var(--sc-skin)" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Alat tulis di atas meja: inkwell, buku, lilin, pena bulu */}
      <g>
        {/* Buku tebal & stempel resmi */}
        <rect x="525" y="340" width="30" height="14" rx="2" fill="var(--sc-wood-deep)" stroke="var(--sc-ink)" strokeWidth="1" />
        <rect x="530" y="337" width="26" height="4" fill="var(--sc-document)" />
        <rect x="700" y="342" width="12" height="10" rx="2" fill="var(--sc-wood)" stroke="var(--sc-ink)" strokeWidth="1" />

        {/* Lilin meja */}
        <rect x="505" y="335" width="4" height="16" fill="var(--sc-document)" stroke="var(--sc-ink)" strokeWidth="0.8" />
        <circle cx="507" cy="331" r="3" fill="var(--sc-lamp)" className="gs-candle" />

        {/* Inkwell (tempat tinta) */}
        <rect x="735" y="344" width="10" height="9" rx="1.5" fill="var(--sc-ink)" />

        {/* Kertas catatan & 4 goresan tinta bertahap */}
        <rect x="755" y="344" width="44" height="16" rx="1" fill="var(--sc-document)" stroke="var(--sc-ink)" strokeWidth="0.8" />
        <line x1="760" y1="348" x2="774" y2="348" stroke="var(--sc-ink)" strokeWidth="1.2" strokeLinecap="round" className="gs-ink" style={{ animationDelay: '0s' }} />
        <line x1="778" y1="348" x2="792" y2="348" stroke="var(--sc-ink)" strokeWidth="1.2" strokeLinecap="round" className="gs-ink" style={{ animationDelay: '0.35s' }} />
        <line x1="760" y1="354" x2="776" y2="354" stroke="var(--sc-ink)" strokeWidth="1.2" strokeLinecap="round" className="gs-ink" style={{ animationDelay: '0.7s' }} />
        <line x1="780" y1="354" x2="794" y2="354" stroke="var(--sc-ink)" strokeWidth="1.2" strokeLinecap="round" className="gs-ink" style={{ animationDelay: '1.05s' }} />

        {/* Pena bulu (quill) yang bergerak menulis */}
        <g className="gs-quill" style={{ transformOrigin: '768px 346px' }}>
          <line x1="768" y1="346" x2="784" y2="318" stroke="var(--sc-document)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 780 326 Q 788 316 794 308 Q 784 316 776 332 Z" fill="var(--sc-document)" opacity="0.8" />
        </g>
      </g>
    </svg>
  );
}
