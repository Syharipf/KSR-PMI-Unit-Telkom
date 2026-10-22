# Design Workspace — KSR PMI Unit Universitas Telkom

Direktori ini merupakan ruang kerja perancangan sistem visual, spesifikasi desain, prototipe antarmuka, dan manajemen aset media untuk situs profil resmi KSR PMI Unit Universitas Telkom.

## 1. Tujuan Workspace

Workspace desain ini bertujuan untuk:
1. Menyimpan spesifikasi visual kanonikal (`DESIGN.md`) dan variabel token desain CSS murni (`tokens.css`).
2. Menyediakan lingkungan eksperimen pembuatan prototipe antarmuka interaktif yang terisolasi (`prototypes/`) sebelum kode dipromosikan ke komponen produksi (`app/` dan `components/`).
3. Mengatur katalog dan kurasi aset media mentah maupun teroptimasi (`assets/`) dengan standar lisensi dan kepatuhan merek Palang Merah Indonesia.

## 2. Tabel Perjalanan Visual Pengguna (Visual Journey)

Karakter visual dan intensitas animasi dipetakan berdasarkan 5 alur pengguna inti yang ditetapkan pada PRD:

| Alur Pengguna | Halaman Masuk & Tujuan | Intensitas Motion | Karakter & Prioritas Visual |
|---|---|---|---|
| **1. Pendaftaran Anggota Baru** | `/` → `/gabung` | Sedang (Hero Enter 600ms, Accordion FAQ 240ms) | Hangat, informatif, membangkitkan empati relawan, fokus kemudahan membaca syarat dan formulir. |
| **2. Pengajuan Siaga Medis** | `/layanan` (`#siaga-medis`) | Rendah / Fungsional (Micro-interaction 150ms) | Cepat, tanggap, berdisiplin tinggi, penekanan pada waktu respons siaga dan tombol WhatsApp yang mencolok. |
| **3. Permohonan Pelatihan PMR** | `/layanan` (`#pelatihan`) | Rendah / Fungsional (150ms) | Edukatif, rapi, kurikulum pelatihan terstruktur, memudahkan narahubung sekolah mitra. |
| **4. Informasi Donor Darah** | `/kegiatan` (filter `donor-darah`) → `/kegiatan/[slug]` | Sedang (Filter animasi 240ms, Hero detail 400ms) | Tegas, kontras jelas pada jadwal dan lokasi, instruksi syarat fisik pendonor darah yang menonjol. |
| **5. Penelusuran Arsip Alumni** | `/kepengurusan` → `/kepengurusan/arsip` | Halus / Nostalgis (Fade-in 400ms, Lightbox 200ms) | Menghormati rekam jejak pengabdian relawan, tata letak foto kabinet bersejarah yang berwibawa. |

## 3. Storyboard Hero Beranda (0 – 2 Detik)

Seksi pembuka Beranda (`/`) dirancang dengan koreografi waktu mikro yang terukur:

- **Detik 0.0 – 0.4 (Entri Latar Belakang)**:
  - Video loop latar belakang atau poster hero memudar masuk (*fade-in*) dengan opasitas dasar 30% (`--wallpaper-opacity: 0.3`).
  - Lapisan penutup (*scrim*) gradien warna `--bg` aktif melindungi seluruh area keterbacaan teks.
- **Detik 0.4 – 1.0 (Pengungkapan Pesan Kemanusiaan / Headline Reveal)**:
  - Teks lencana kategori (*eyebrow*) muncul terlebih dahulu disusul judul utama (*Hero Headline*) berukuran `--text-4xl` menggunakan transisi `--ease-cinematic` (durasi 600ms).
  - Paragraf pengantar bergerak halus naik 15px bersamaan dengan peningkatan opasitas dari 0 ke 1.
- **Detik 1.0 – 1.4 (Penyajian Tombol Tindakan / CTA Reveal)**:
  - Tombol primer "Gabung Sekarang" dan tombol sekunder "Kenali Kami" muncul berdampingan dengan penekanan kontras penuh.
- **Detik 1.4 – 2.0 (Pengungkapan Strip Statistik / Stat Band)**:
  - Tepat di bawah batas lipatan layar (*fold*), kontainer strip statistik `--surface-warm` mulai menjalankan penghitungan angka dinamis (*count-up*) selama 1200ms menggunakan tipografi monospaced JetBrains Mono.

## 4. Sinkronisasi dengan OpenDesign

Untuk mengembangkan dan menguji coba desain menggunakan OpenDesign:
1. Pastikan kakas OpenDesign terpasang pada direktori `~/open-design`.
2. Jalankan server OpenDesign melalui baris perintah:
   ```bash
   opendesign start
   # atau melalui direktori ~/open-design: pnpm exec tools-dev start web
   ```
3. Buat atau buka proyek pada antarmuka OpenDesign dengan mengarahkan *working directory* ke root repositori ini (`/home/syharipf/Projects/Profile KSR PMI unit Universitas Telkom`).
4. Berkas `DESIGN.md` pada root repositori akan secara otomatis dibaca oleh OpenDesign sebagai spesifikasi acuan desain kanonikal.
5. Gunakan templat perancangan resmi yang tersedia di OpenDesign:
   - `design-templates/web-prototype` (prototipe antarmuka web umum).
   - `web-prototype-taste-editorial` (tampilan kurasi editorial foto dokumenter).
   - `wireframe-mobile-flow` (rancangan alur interaksi layar sempit ponsel).
6. Simpan seluruh artefak prototipe yang dihasilkan ke dalam folder:
   ```
   design/prototypes/<YYYY-MM-DD>-<slug>/
   ```

## 5. Aturan Promosi Prototipe ke Produksi

1. **Kemandirian Berkas**: Prototipe di `design/prototypes/` harus dapat dibuka langsung sebagai berkas HTML/CSS mandiri tanpa ketergantungan pada runtime Next.js.
2. **Kekekalan Prototipe (Immutability)**: Setelah sebuah konsep prototipe disetujui dan ditranslasikan menjadi komponen React di `app/` atau `components/`, folder prototipe tersebut DILARANG diubah lagi. Prototipe berfungsi sebagai artefak catatan keputusan historis.
3. **Pemberian Nama Folder**: Folder prototipe wajib menggunakan format penanggalan ISO diikuti deskripsi singkat, contoh: `design/prototypes/2025-05-10-hero-cinematic/`.

## 6. Kebijakan Integritas Data Prototipe

- Prototipe yang dibangun wajib menggunakan struktur data dummy fiktif yang koheren, selaras dengan rencana konten pada PRD dan skema `content/`.
- DILARANG menggunakan teks acak `lorem ipsum` yang tidak mencerminkan volume teks sesungguhnya.
- DILARANG memasukkan data pribadi riil (nomor identitas mahasiswa, nomor handphone pribadi, alamat rumah) ke dalam prototipe.
- Seluruh prototipe wajib mencantumkan label visual atau catatan kaki penanda dummy selama fase eksperimen.

## 7. Tautan Rujukan Terkait

- [Spesifikasi Desain Kanonikal (`DESIGN.md`)](../DESIGN.md)
- [Variabel Token Desain (`design/tokens.css`)](./tokens.css)
- [Product Requirements Document (`docs/prd.md`)](../docs/prd.md)
- [Arsitektur Teknis (`docs/architecture.md`)](../docs/architecture.md)
- [Peta Arsitektur Graphify (`GRAPHIFY.md`)](../GRAPHIFY.md)
