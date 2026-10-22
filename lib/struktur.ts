export type OrgLeader = {
  role: string;
  scope: string;
};

export type OrgDepartment = {
  slug: string;
  name: string;
  abbr: string;
  field: string;
  summary: string;
  duties: string[];
};

export type OrgOversight = {
  role: string;
  scope: string;
  note: string;
};

/**
 * Susunan fungsi organisasi KSR PMI Unit Universitas Telkom.
 * Tanpa nama personel: nama pengurus aktif hanya dimuat pada halaman Kabinet
 * agar bagan ini tetap berlaku lintas periode.
 */
export const ORG_LEADERS: OrgLeader[] = [
  {
    role: 'Komandan',
    scope: 'Pimpinan unit: menetapkan arah kebijakan, mewakili organisasi, dan memegang keputusan akhir.',
  },
  {
    role: 'Wakil Komandan',
    scope: 'Menggantikan komandan saat berhalangan dan mengawal koordinasi harian antar divisi.',
  },
  {
    role: 'Sekretaris',
    scope: 'Mengelola administrasi, surat-menyurat, arsip, serta dokumentasi resmi organisasi.',
  },
  {
    role: 'Bendahara',
    scope: 'Mengelola keuangan, inventaris, dan pertanggungjawaban anggaran setiap kegiatan.',
  },
];

export const ORG_OVERSIGHT: OrgOversight = {
  role: 'Badan Pengawas',
  scope:
    'Mengawasi inti (komandan, wakil komandan, sekretaris, bendahara) dan seluruh divisi: menjaga kepatuhan AD/ART, menilai kinerja, serta menampung aspirasi anggota.',
  note: 'Satu wakil dari setiap divisi',
};

export const ORG_DEPARTMENTS: OrgDepartment[] = [
  {
    slug: 'diklat',
    name: 'Pendidikan & Pelatihan',
    abbr: 'Diklat',
    field: 'Kaderisasi & kompetensi',
    summary:
      'Menyiapkan relawan baru dan menjaga standar keterampilan kepalangmerahan seluruh anggota.',
    duties: [
      'Menyelenggarakan Diklat Dasar dan pelatihan medis secara berkala.',
      'Menyusun materi, jadwal, serta evaluasi setiap pelatihan.',
      'Membina kader dan mendampingi uji keterampilan anggota.',
    ],
  },
  {
    slug: 'humas',
    name: 'Hubungan Masyarakat',
    abbr: 'Humas',
    field: 'Relasi & publikasi',
    summary:
      'Menjadi wajah unit di ruang publik dan menjalin kerja sama dengan pihak di dalam maupun luar kampus.',
    duties: [
      'Mengelola kanal media sosial dan publikasi kegiatan.',
      'Menghubungkan unit dengan mitra, sponsor, dan organisasi lain.',
      'Mendokumentasikan kegiatan serta menyusun laporan publikasi.',
    ],
  },
  {
    slug: 'pengmas',
    name: 'Pengabdian Masyarakat',
    abbr: 'Pengmas',
    field: 'Layanan & edukasi publik',
    summary:
      'Membawa layanan kemanusiaan ke luar kampus melalui kegiatan sosial dan edukasi kesehatan.',
    duties: [
      'Menyelenggarakan donor darah dan penyuluhan kesehatan.',
      'Mendampingi kegiatan bakti sosial bersama masyarakat.',
      'Menyediakan siaga medis pada acara kampus dan warga sekitar.',
    ],
  },
  {
    slug: 'orgata',
    name: 'Organisasi & Keanggotaan',
    abbr: 'Orgata',
    field: 'Kaderisasi & tata kelola',
    summary:
      'Menjaga tertib organisasi dan administrasi keanggotaan, dari perekrutan hingga pembinaan kader.',
    duties: [
      'Mengelola basis data anggota dan status keaktifan relawan.',
      'Menyiapkan musyawarah, rapat kerja, dan evaluasi kepengurusan.',
      'Menyusun tata tertib serta mendampingi proses regenerasi pengurus.',
    ],
  },
  {
    slug: 'kominfo',
    name: 'Komunikasi & Informasi',
    abbr: 'Kominfo',
    field: 'Media & sistem informasi',
    summary:
      'Mengelola kanal informasi digital unit, mulai dari desain publikasi hingga data kegiatan.',
    duties: [
      'Memproduksi materi visual, dokumentasi, dan konten informasi.',
      'Merawat situs serta kanal digital resmi organisasi.',
      'Mengolah data kegiatan menjadi laporan yang mudah dibaca.',
    ],
  },
  {
    slug: 'wirlog',
    name: 'Wiralogi & Usaha',
    abbr: 'Wirlog',
    field: 'Logistik & unit usaha',
    summary:
      'Mengelola perlengkapan organisasi sekaligus menggerakkan unit usaha untuk menopang kegiatan.',
    duties: [
      'Mengelola inventaris, perlengkapan, dan kebutuhan operasional.',
      'Mengembangkan unit usaha serta merchandise unit.',
      'Menyusun pengadaan dan penggalangan dana kegiatan.',
    ],
  },
];
