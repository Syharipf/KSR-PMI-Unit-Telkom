# KSR PMI Unit Universitas Telkom

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.1-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.2-fbf0df?style=flat&logo=bun)](https://bun.sh/)
[![License](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)

Situs profil resmi dan portal layanan terpadu Korps Sukarela Palang Merah Indonesia (KSR PMI) Unit Universitas Telkom.

> **"Siamo Tutti Fratelli"** — Kita semua bersaudara.

---

## 🚑 Fitur Utama

- **Call Center Medis Darurat**: Layanan pertolongan pertama siaga darurat dalam radius ±2 km dari kawasan Telkom University (07.00–22.00 WIB).
- **Pengajuan Kerja Sama Donor Darah**: Prosedur resmi kerja sama mobile unit bersama Unit Transfusi Darah (UTD) PMI, lengkap dengan jadwal kegiatan, format surat permohonan, formulir pengajuan, dan form feedback.
- **Siaga Medis & Pelatihan Medis**: Permohonan tim pertolongan pertama untuk acara kampus (wisuda, turnamen olahraga, kaderisasi) dan pelatihan PMR sekolah mitra.
- **Peminjaman Peralatan**: Katalog peminjaman peralatan medis, tandu, tabung oksigen, dan tenda kegiatan.
- **Katalog Program Kerja**: Rincian program terencana dari 6 departemen:
  - **Diklat**: Diklatsar, Dikjut, Pelatihan Anggota, KSR Mengajar, PKM, LKKD.
  - **Pengmas**: SMPM, Tanggap Darurat, Donor Darah, Bina Desa, Charity.
  - **Humas**: OA LINE, Undangan Eksternal, Kolaborasi, Studi Banding, Piket Markas PMI.
  - **Kominfo**: VOTM, Media Partner, Feeds Edukasi Bencana, Pusdatin, Live Report.
  - **Orgata**: Pengadaan Seragam/Identitas, Jumat Bersih, Pelantikan ALB/PCAB, Ruang Bicara, Makrab & HUT.
  - **Wirlog**: Manajemen Obat, Inventarisasi Alat Medis, Wirausaha Logistik.
- **Susunan Kepengurusan**: Bagan struktur organisasi hierarkis dan profil kepengurusan aktif periode 2026–2027.
- **Dokumentasi & Galeri**: Berita liputan kegiatan dan album dokumentasi lapangan interaktif.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Static Site Generation - SSG)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/), [clsx](https://github.com/lukeed/clsx)
- **Type Safety & Schema**: [TypeScript](https://www.typescriptlang.org/), [Zod](https://zod.dev/)
- **Animation**: [Motion](https://motion.dev/) (Framer Motion)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) (Dark & Light Mode)
- **Content Management**: MDX & JSON berbasis schema terstruktur (`/content/`)
- **Package Manager & Runtime**: [Bun](https://bun.sh/)

---

## 🚀 Memulai Proyek

### Prasyarat

Pastikan telah menginstal [Bun](https://bun.sh/) di workstation Anda.

### Instalasi Dependensi

```bash
bun install
```

### Jalankan Development Server

```bash
bun run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

### Cek Tipe Data

```bash
bun run typecheck
```

### Build Produksi (Static Export / SSG)

```bash
bun run build
```

---

## 📂 Struktur Direktori

```text
├── app/                  # Rute Next.js App Router (Halaman & Layout)
│   ├── gabung/           # Pendaftaran Calon Anggota (Diklatsar)
│   ├── galeri/           # Dokumentasi album foto
│   ├── kegiatan/         # Liputan berita kegiatan
│   ├── kepengurusan/     # Struktur organisasi & kabinet aktif
│   ├── kontak/           # Lokasi sekretariat & narahubung
│   ├── layanan/          # Portal pengajuan layanan publik
│   ├── prestasi/         # Rekam jejak prestasi unit
│   ├── program/          # Katalog program kerja per divisi
│   └── tentang/          # Sejarah, lambang, prinsip, visi misi
├── components/           # Komponen UI modular, layout, media, motion
├── content/              # Sumber konten statis (MDX & JSON)
│   ├── divisi/           # Profil 6 departemen KSR
│   ├── galeri/           # Data album foto
│   ├── kegiatan/         # Data artikel liputan kegiatan
│   ├── kepengurusan/     # Struktur kabinet periode berjalan
│   ├── program/          # Rincian program kerja
│   ├── layanan.json      # Data SOP, kontak admin, dan form pengajuan
│   └── site.json         # Konfigurasi metadata global situs
├── lib/                  # Helper fungsi & validasi skema zod
└── public/               # Aset statis media, logo, QR code, dan foto hero
```

---

## 📞 Kontak & Sekretariat

- **Markas**: Gedung Student Center Lt. 1, Universitas Telkom, Jl. Telekomunikasi No. 1, Terusan Buahbatu, Sukapura, Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257
- **Call Center Darurat**: [0851-2151-1120](https://wa.me/6285121511120)
- **OA LINE**: `@965hrhof`
- **Email**: `ksrpmi@telkomuniversity.ac.id`
- **Instagram**: [@ksrpmiunit_tel-u](https://instagram.com/ksrpmiunittelkom)

---

## 📄 Lisensi

Hak Cipta © 2026 KSR PMI Unit Universitas Telkom. Dilisensikan di bawah lisensi [MIT](LICENSE).
