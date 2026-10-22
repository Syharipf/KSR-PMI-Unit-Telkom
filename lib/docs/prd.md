# Product Requirements Document (PRD) — KSR PMI Unit Universitas Telkom

Dokumen persyaratan produk resmi untuk situs profil web KSR PMI Unit Universitas Telkom.

## Problem Statement

Informasi mengenai Korps Suka Rela Palang Merah Indonesia (KSR PMI) Unit Universitas Telkom saat ini tersebar di berbagai kanal tidak terpusat, antara lain akun media sosial Instagram, situs arsip lama berbasis WordPress yang tidak lagi terawat, serta rangkuman singkat pada portal direktori kemahasiswaan universitas. Kondisi ini menyulitkan calon relawan baru dalam memahami alur pendaftaran, membuat sekolah mitra kesulitan mengajukan permohonan pelatihan Palang Merah Remaja (PMR), dan memperlambat panitia kegiatan kampus dalam meminta dukungan tim siaga medis pertolongan pertama secara formal.

Ketiadaan kanal digital resmi tunggal yang mutakhir menyebabkan hilangnya rekam jejak sejarah penggabungan tiga institusi pembentuk organisasi, kaburnya struktur kepengurusan aktif beserta pembagian kerja divisi, dan minimnya ruang pamer terpercaya untuk mendokumentasikan kegiatan kemanusiaan serta capaian prestasi anggota. Ketiadaan kanal komunikasi resmi yang terstruktur juga menimbulkan ketidakpastian koordinasi pertolongan pertama dan donor darah di lingkungan kampus Telkom University.

Kondisi akhir yang dituju adalah sebuah situs web statis resmi KSR PMI Unit Universitas Telkom yang menyajikan informasi secara komprehensif, cepat diakses dari perangkat bergerak, ramah difabel, dan memiliki identitas visual kuat bercirikan semangat kemanusiaan Palang Merah. Situs ini dilengkapi visual sinematik dengan latar belakang video/foto dokumenter beropasitas 30% yang tetap mengutamakan keterbacaan teks, tanpa ketergantungan pada basis data runtime yang rumit, serta siap digunakan secara langsung melalui pendekatan arsitektur konten *dummy-first*.

## Target User

| Persona | Kebutuhan utama | Halaman masuk | Keberhasilan |
|---|---|---|---|
| **Calon Anggota** (Mahasiswa aktif Telkom University) | Mendapatkan informasi lengkap mengenai syarat pendaftaran, alur seleksi, jadwal diklat dasar, FAQ, dan tautan formulir pendaftaran resmi. | `/gabung` atau `/` | Membaca syarat dengan jelas dan mengirimkan formulir pendaftaran via Google Form resmi. |
| **Pengurus & Anggota Aktif** | Mempublikasikan program kerja divisi, portofolio kegiatan kemanusiaan, transparansi struktur kepengurusan, dan dokumentasi album foto/video kegiatan. | `/kepengurusan` atau `/kegiatan` | Dokumentasi kegiatan dan struktur divisi tampil profesional untuk laporan pertanggungjawaban. |
| **Sekolah Mitra PMR** (Fasilitator PMR Wira/Madya Bandung Raya) | Mengajukan permohonan pemateri pelatihan kepalangmerahan, juri lomba PMR, atau simulasi pertolongan pertama lapangan. | `/layanan` (`#pelatihan`) | Membaca silabus/alur dan menghubungi narahubung divisi pelatihan melalui tautan WhatsApp terstruktur. |
| **Panitia Acara Kampus** (UKM, BEM, Fakultas, Himpunan) | Mengajukan bantuan tim siaga medis resmi bersertifikat pertolongan pertama untuk acara olahraga, konser, seminar, atau kaderisasi. | `/layanan` (`#siaga-medis`) | Mengirimkan form/pesan permintaan siaga medis dengan detail waktu, lokasi, dan estimasi massa acara. |
| **Masyarakat & Calon Pendonor Darah** | Mencari jadwal pelaksanaan donor darah kampus terdekat, syarat medis donor darah, dan lokasi kegiatan donor darah rutin KSR. | `/kegiatan` (filter `donor-darah`) | Mengetahui tanggal, lokasi gedung, serta persyaratan donor darah secara akurat. |
| **Alumni Relawan KSR PMI** | Melihat arsip kepengurusan masa lampau, menelusuri sejarah pendirian organisasi, dan menjaga silaturahmi jejaring alumni lintas angkatan. | `/kepengurusan/arsip` | Menemukan arsip kabinet periode kepengurusannya dan album foto kenangan masa tugas. |
| **PMI Kabupaten Bandung & Universitas Telkom** | Memverifikasi legalitas organisasi, SK pengesahan pimpinan universitas, kesesuaian prinsip kepalangmerahan, dan integrasi kegiatan sosial kampus. | `/tentang/prinsip-lambang` atau `/tentang/struktur` | Menemukan data pengesahan organisasi yang valid dan keterikatan hierarki resmi PMI. |

## Fakta Organisasi

Data faktual resmi organisasi yang telah diverifikasi melalui rujukan resmi universitas dan dokumen identitas korporat PMI:
- **Tahun & Tanggal Berdiri**: 10 November 2013 di Bandung, Jawa Barat ([Rujukan Profil Universitas Telkom](https://telkomuniversity.ac.id/research/korps-suka-rela-pmi/)).
- **Dasar Legalitas Organisasi**: Surat Keputusan (SK) Wakil Rektor IV Bidang Kemahasiswaan dan Alumni Nomor: `KEP.010/ORG22/WR4.0/2014` ([Rujukan Profil Universitas Telkom](https://telkomuniversity.ac.id/research/korps-suka-rela-pmi/)).
- **Naungan & Afiliasi**: Bernaung di bawah Palang Merah Indonesia (PMI) Kabupaten Bandung dan Direktorat Kemahasiswaan Universitas Telkom.
- **Asal-usul Pembentukan**: Merupakan peleburan (fusi) unit-unit relawan kemahasiswaan dari tiga institusi pendiri Telkom University, yaitu KSR PMI Unit IT Telkom, KSR PMI Unit STISI Telkom, dan KSR PMI Unit Politeknik Telkom ([Rujukan Profil Universitas Telkom](https://telkomuniversity.ac.id/research/korps-suka-rela-pmi/) & [Situs Arsip KSR PMI](https://ksrpmi.orgs.telkomuniversity.ac.id/)).
- **Jumlah Anggota**: Tercatat 78 anggota per 2022 ([Rujukan Profil Universitas Telkom](https://telkomuniversity.ac.id/research/korps-suka-rela-pmi/)).
- **Aturan Warna & Lambang Organisasi**: Merah Palang Merah mengacu pada Pantone 185 C (`#E4002B`). Lambang Palang Merah wajib selalu diletakkan di atas bidang putih murni dengan daerah bebas (clear space) minimum 50% dari tinggi lambang, dilarang distorsi, dan ukuran minimal pada media layar adalah tinggi 48px ([Pedoman CID PMI](https://ksrpmi.uns.ac.id/wp-content/uploads/2019/09/CIDManual_PMI_Nov2406.pdf)).

*Catatan Penting Konten*: Angka 78 anggota merupakan data publikasi tahun 2022. Nama-nama pengurus aktual, nama komandan aktif, narahubung telepon/WhatsApp personal, rincian visi-misi kabinet periode berjalan, dan tautan formulir pendaftaran terkini **akan diisi sendiri oleh pengguna setelah implementasi**. Pada dokumen dan fase implementasi teknis, seluruh data isi tersebut menggunakan data dummy berlabel yang realistis dan terstruktur rapi.

## Arsitektur Informasi & Menu

Struktur navigasi utama situs terdiri dari 7 menu tingkat atas yang mencakup 18 rute halaman statis:

| Menu | Anak menu | Route |
|---|---|---|
| **Beranda** | — | `/` |
| **Tentang** | Sejarah | `/tentang/sejarah` |
| | Visi & Misi | `/tentang/visi-misi` |
| | Prinsip & Lambang | `/tentang/prinsip-lambang` |
| | Struktur Organisasi | `/tentang/struktur` |
| **Kepengurusan** | Kabinet Aktif | `/kepengurusan` |
| | Rincian Divisi | `/kepengurusan/divisi/[slug]` |
| | Arsip Kepengurusan | `/kepengurusan/arsip` |
| | Detail Arsip Periode | `/kepengurusan/arsip/[periode]` |
| **Kegiatan** | Program Kerja | `/program` |
| | Daftar Kegiatan | `/kegiatan` |
| | Detail Kegiatan | `/kegiatan/[slug]` |
| | Prestasi | `/prestasi` |
| | Galeri Dokumentasi | `/galeri` |
| | Detail Album Galeri | `/galeri/[slug]` |
| **Layanan** | Layanan Siaga, Donor, Pelatihan, Kerja Sama | `/layanan` |
| **Gabung** | Alur & Formulir Pendaftaran | `/gabung` |
| **Kontak** | Lokasi Sekretariat & Narahubung | `/kontak` |
| — | Halaman Tidak Ditemukan | `/404` |

### Rincian Rute Halaman

| Route | Isi Halaman |
|---|---|
| `/` | Hero sinematik video/foto 30%, statistik dampak, 3 program unggulan, 3 kegiatan terbaru, CTA gabung relawan. |
| `/tentang/sejarah` | Garis waktu perjalanan organisasi dari fusi tiga kampus 2013 hingga era modern, foto arsip tonggak sejarah. |
| `/tentang/visi-misi` | Visi jangka panjang, misi operasional organisasi, dan nilai luhur relawan KSR PMI Tel-U. |
| `/tentang/prinsip-lambang` | Penjabaran 7 Prinsip Dasar Gerakan Palang Merah & Bulan Sabit Merah Internasional, aturan lambang, ringkasan Hukum Perikemanusiaan Internasional (HPI). |
| `/tentang/struktur` | Bagan hierarki kepengurusan, dewan penasihat, dan garis koordinasi PMI Kabupaten Bandung serta Direktorat Kemahasiswaan. |
| `/kepengurusan` | Kabinet aktif berjalan: komandan, wakil komandan, pengurus harian inti, serta ringkasan divisi operasional. |
| `/kepengurusan/divisi/[slug]` | Profil divisi spesifik, deskripsi tugas pokok & fungsi (jobdesk), daftar staf relawan, dan daftar program kerja terkait. |
| `/kepengurusan/arsip` | Indeks daftar periode kepengurusan terdahulu (`YYYY-YYYY`) beserta komandan demisioner. |
| `/kepengurusan/arsip/[periode]` | Susunan lengkap kabinet masa lampau untuk arsip sejarah kepengurusan. |
| `/program` | Katalog program kerja berkala (rutin tahunan/semesteran) dan insidental per divisi. |
| `/kegiatan` | Daftar dokumentasi berita kegiatan dengan filter interaktif berbasis kategori. |
| `/kegiatan/[slug]` | Artikel liputan kegiatan lengkap, foto dokumentasi, detail waktu/lokasi, dan mitra kolaborasi. |
| `/prestasi` | Tabel linimasa penghargaan, kejuaraan pertolongan pertama, dan rekognisi lembaga. |
| `/galeri` | Kisi-kisi (grid) album kegiatan lapangan, latihan gabungan, dan bakti sosial. |
| `/galeri/[slug]` | Tampilan detail album foto dan video interaktif dilengkapi fitur lightbox layar penuh. |
| `/layanan` | Rincian 4 pilar layanan publik dengan tautan jangkar internal: `#siaga-medis`, `#donor-darah`, `#pelatihan`, `#kerja-sama`. |
| `/gabung` | Informasi penerimaan anggota baru (Diklatsar), persyaratan, timeline tahapan, 8 FAQ interaktif, dan CTA menuju Google Form. |
| `/kontak` | Alamat sekretariat, jam piket, peta interaktif embed tanpa API key, akun media sosial, nomor darurat WhatsApp. |
| `/404` | Halaman not-found yang ramah pengguna dengan tombol kembali ke Beranda. |

## Core User Flow

Lima alur pengguna utama yang memandu interaksi pengunjung situs:

### 1. Alur Pendaftaran Calon Anggota Relawan Baru
1. Pengunjung membuka halaman utama `/` lalu tertarik dengan pesan hero atau navigasi utama dan mengklik tautan **Gabung**.
2. Pengguna tiba di halaman `/gabung` dan membaca kriteria persyaratan calon anggota, tahapan seleksi (pemberkasan, wawancara, materi ruangan, diklat lapangan).
3. Pengguna meninjau daftar pertanyaan yang sering diajukan (FAQ) untuk memastikan jadwal perkuliahan tidak bentrok dengan diklat.
4. Pengguna mengklik tombol primer **Isi Formulir Pendaftaran** yang membuka tautan formulir Google Form resmi di tab baru.
5. Setelah mengirimkan formulir di Google Form, pengguna mengklik tombol sekunder **Konfirmasi Pendaftaran ke WhatsApp** untuk menyapa narahubung panitia rekruitmen dengan pesan terformat.

### 2. Alur Pengajuan Bantuan Tim Siaga Medis Acara Kampus
1. Panitia acara kampus membuka situs dan langsung memilih menu **Layanan** di bilah navigasi atas (`/layanan`).
2. Pengguna melompat ke seksi `#siaga-medis` untuk membaca cakupan bantuan pertolongan pertama, batas waktu pengajuan (minimal H-7 kegiatan), dan sarana darurat yang disediakan tim KSR.
3. Pengguna mengklik tombol aksi **Ajukan Siaga Medis via WhatsApp**.
4. Aplikasi secara otomatis membuka aplikasi WhatsApp dengan nomor resmi KSR dan pesan pembuka terstruktur: *"Halo KSR PMI Unit Universitas Telkom, saya ingin mengajukan siaga medis untuk kegiatan <nama> pada <tanggal> di <lokasi>."*
5. Panitia melengkapi draf pesan tersebut dengan data riil acara lalu mengirimkannya kepada pengurus operasional KSR.

### 3. Alur Permintaan Fasilitator / Pelatihan PMR Sekolah Mitra
1. Pengurus atau pembina PMR sekolah membuka menu **Layanan** dan memilih seksi `#pelatihan`.
2. Pengguna meninjau daftar materi pelatihan kepalangmerahan yang tersedia (Pertolongan Pertama Tingkat Dasar, Evakuasi Tandu Bencana, Dapur Umum, Perawatan Keluarga).
3. Pengguna meninjau syarat administratif (surat permohonan resmi sekolah, jumlah target peserta siswa, waktu pelaksanaan).
4. Pengguna mengklik tombol **Hubungi Divisi Pelatihan via WhatsApp** yang membuka tautan WhatsApp dengan pesan terformat: *"Halo KSR PMI Unit Universitas Telkom, saya ingin mengajukan pelatihan untuk <sekolah/instansi> dengan jumlah peserta <n>."*
5. Komunikasi teknis dilanjutkan langsung antara narahubung sekolah dan divisi pelatihan relawan.

### 4. Alur Pencarian Jadwal & Lokasi Donor Darah Kampus
1. Mahasiswa atau calon pendonor darah membuka halaman utama atau masuk ke menu **Kegiatan** (`/kegiatan`).
2. Pengguna mengklik filter kategori **Donor Darah** untuk menyaring daftar kegiatan.
3. Pengguna memilih kartu kegiatan donor darah terdekat dan masuk ke halaman rincian `/kegiatan/[slug]`.
4. Pengguna membaca informasi detail: syarat kesehatan pendonor (berat badan, kadar hemoglobin, riwayat tidur), jam operasional, dan lokasi gedung di kampus Telkom University.
5. Pengguna mengklik tautan lokasi atau embed peta untuk memandu navigasi langsung menuju lokasi kegiatan donor darah.

### 5. Alur Penelusuran Arsip Kepengurusan oleh Alumni
1. Alumni relawan KSR PMI membuka menu **Kepengurusan** (`/kepengurusan`).
2. Pengguna menelusuri halaman kabinet aktif lalu mengklik sub-menu atau tautan **Arsip Periode** (`/kepengurusan/arsip`).
3. Pengguna memilih tahun masa bakti kepengurusan yang diinginkan, misalnya `/kepengurusan/arsip/2021-2022`.
4. Halaman menampilkan susunan komandan, dewan inti, staf divisi, foto bersama kabinet masa lampau, dan tonggak sejarah program kerja yang telah diselesaikan pada masa tersebut.

## MVP Scope

### Ruang Lingkup MVP (In-Scope)
- **18 Rute Statis Lengkap**: Seluruh rute yang tercantum pada tabel Arsitektur Informasi dibangun dan dapat diakses dengan mulus.
- **Penyimpanan Konten Berkas Lokal**: Format konten terstruktur menggunakan MDX untuk artikel kaya dan JSON untuk entitas data terstruktur, divalidasi dengan Zod saat proses build.
- **Dual Theme Support**: Mode terang (default *warm-paper*) dan mode gelap (*cinematic near-black*) dengan tombol toggle manual tanpa flicker.
- **Cinematic Hero Background**: Wallpaper video loop 12 detik atau gambar sinematik beropasitas 30% (`--wallpaper-opacity: 0.3`) dengan gradien scrim pelindung kontras teks.
- **Katalog Motion Disiplin**: Transisi entri halus berbasis Motion (Framer Motion API), penghitung animasi statistik (*count-up*), penggulung linier (*marquee*), dan kepatuhan penuh terhadap `prefers-reduced-motion`.
- **Media Lightbox**: Penampil gambar resolusi penuh interaktif untuk album kegiatan dan galeri tanpa pustaka pihak ketiga yang berat.
- **Penyaring Interaktif**: Filter kategori pada halaman kegiatan tanpa reload halaman.
- **Integrasi Deep Link WhatsApp**: Generator tautan dinamis menuju nomor resmi WhatsApp pengurus dengan templat teks pesan otomatis.
- **Integrasi Pendaftaran Google Form**: Tautan pembuka form pendaftaran eksternal resmi yang aman.
- **Peta Interaktif Ringan**: Embed iframe peta sekretariat tanpa API key Google Maps berbayar, lazy loading, dan aman.
- **Optimasi SEO & Keterbacaan Mesin**: Metadata komprehensif, OpenGraph, JSON-LD Schema.org `Organization`, `sitemap.xml`, dan `robots.txt` otomatis.
- **Halaman Not Found 404 Kustom**: Desain konsisten untuk penanganan rute tidak dikenal.

### Batasan Eksplisit di Luar MVP (Out-of-Scope)
Situs MVP sengaja **TIDAK mencakup**:
- Sistem manajemen konten berbasis web (Admin CMS) atau portal login pengguna.
- Autentikasi anggota atau sistem login kepengurusan.
- Sistem transaksi pembayaran digital, sumbangan uang daring, atau gerbang pembayaran (payment gateway).
- Portal akun presensi internal anggota relawan.
- Kolom komentar publik atau sistem buku tamu dinamis.
- Mesin pencari teks bebas berbasis server di seluruh situs (full-text search engine).
- Pilihan multi-bahasa (situs MVP 100% berbahasa Indonesia formal).
- Dasbor analitik runtime internal atau skrip pelacak invasif pihak ketiga.

## Rencana Konten (Dummy-First Content Plan)

Seluruh konten data isi pada versi MVP ini **dirancang dummy-first**. Artinya, seluruh koleksi data terisi secara utuh dengan data fiksi yang realistis, beretika, dan koheren, agar seluruh halaman web, komponen, kartu, dan animasi dapat diverifikasi secara visual dan fungsional tanpa ada celah data kosong.

### 1. Benih Data Dummy (Dummy Seed)
Semua koleksi konten di bawah ini diisi dengan konten sampel berkualitas tinggi (menggunakan nama-nama orang Indonesia yang wajar, latar belakang program studi universitas yang nyata di Telkom University, tanggal linimasa yang logis, dan gambar placeholder/siluet berkualitas):
- `site.json`: Metadata situs, kontak resmi, alamat sekretariat, ringkasan statistik capaian.
- 4 Berkas MDX Halaman Tentang: `/tentang/sejarah.mdx`, `/tentang/visi-misi.mdx`, `/tentang/prinsip-lambang.mdx`, `/tentang/struktur.mdx`.
- 1 Berkas Kabinet Aktif + 1 Berkas Arsip: Berkas JSON kabinet aktif (komandan, wakil, 4 pengurus harian, 5 divisi) dan minimal 1 berkas arsip masa lampau.
- 5 Halaman Profil Divisi: Operasional & Penanggulangan Bencana, Pelatihan & PMR, Hubungan Masyarakat & Kerja Sama, Logistik & Medis, Pengembangan Sumber Daya Anggota.
- 6 Berkas Program Kerja: 3 program rutin tahunan dan 3 program kerja insidental/unggulan.
- 9–12 Berkas Liputan Kegiatan: Liputan donor darah massal, pelatihan pertolongan pertama, simulasi gempa, siaga medis konser kampus, bakti sosial, dan pendelegasian lomba.
- 6 Entri Prestasi: Rekam jejak kejuaraan pertolongan pertama tingkat universitas dan nasional.
- 3 Album Galeri: Album diklat dasar lapangan, album bakti lingkungan, dan album donor darah.
- 4 Layanan Utama: Siaga Medis, Donor Darah Kampus, Pelatihan PMR, Kemitraan Kemanusiaan.
- 8 Item Pertanyaan & Jawaban (FAQ): Seputar biaya pendaftaran (gratis), status mahasiswa aktif, beban jam diklat, dan surat izin orang tua.

*Aturan Privasi & Keamanan*: Seluruh entri dummy dilarang keras mencantumkan nomor telepon pribadi riil mahasiswa, alamat rumah tinggal, nomor identitas kependudukan, atau foto pribadi orang tanpa izin. Seluruh foto figur menggunakan grafis siluet seragam relawan atau ilustrasi tempat penampung (*placeholder*).

### 2. Saklar Penanda Dummy (`contentStatus`)
Situs dilengkapi saklar tunggal pada berkas `content/site.json`:
```json
{
  "contentStatus": "dummy"
}
```
Selama nilai properti tersebut bernilai `"dummy"`:
1. Konfigurasi `robots.txt` dan metadata root akan mengunci perayapan mesin pencari dengan direktif `noindex, nofollow`.
2. Proses kompilasi build menampilkan peringatan konsol: `[Content Status] Menggunakan data dummy contoh. Ubah ke "final" sebelum rilis publik.`
3. Bilah kaki (*footer*) situs menampilkan teks penanda transparan: *"Konten contoh — situs dalam pengembangan"*. Tidak ada lencana atau tanda pengenal yang merusak keindahan komponen kartu di dalam halaman.

### 3. Migrasi Menuju Final
Ketika pengguna telah siap memasukkan data riil pengurus, kontak WhatsApp ketua, dan foto dokumentasi resmi:
1. Pengguna hanya perlu mengubah atau menimpa berkas-berkas di folder `content/` dan folder aset media.
2. Pengguna mengubah nilai `contentStatus` pada `content/site.json` menjadi `"final"`.
3. Seluruh proteksi `noindex` dan catatan footer otomatis nonaktif tanpa mengubah satu baris pun kode pemrograman antarmuka.

### Tabel Matriks Konten MVP

| Item Konten | Berkas Sumber | Format | Lokasi Tampil | Status Awal |
|---|---|---|---|---|
| Konfigurasi & Statistik Situs | `content/site.json` | JSON | Header, Hero Stat Band, Footer | dummy (statistik) / final (SK & nama resmi) |
| Narasi Sejarah & Fusi Tiga Unit | `content/tentang/sejarah.mdx` | MDX | `/tentang/sejarah` | final (sejarah bersitasi) / dummy (foto arsip) |
| Pernyataan Visi, Misi & Nilai | `content/tentang/visi-misi.mdx` | MDX | `/tentang/visi-misi` | dummy (siap diganti kabinet aktif) |
| 7 Prinsip Palang Merah & Lambang | `content/tentang/prinsip-lambang.mdx` | MDX | `/tentang/prinsip-lambang` | final (prinsip konvensi Jenewa & aturan PMI) |
| Struktur Bagan Organisasi | `content/tentang/struktur.mdx` | MDX | `/tentang/struktur` | dummy (bagan jabatan organisasi) |
| Kabinet Aktif & Daftar Anggota | `content/kepengurusan/periode/2024-2025.json` | JSON | `/kepengurusan` | dummy (nama fiksi, jabatan standar KSR) |
| Arsip Periode Lampau | `content/kepengurusan/periode/2023-2024.json` | JSON | `/kepengurusan/arsip/[periode]` | dummy |
| Jobdesk & Profil Divisi | `content/divisi/*.mdx` | MDX | `/kepengurusan/divisi/[slug]` | dummy |
| Program Kerja Divisi | `content/program/*.mdx` | MDX | `/program` | dummy |
| Dokumentasi Kegiatan & Berita | `content/kegiatan/*.mdx` | MDX | `/kegiatan`, `/kegiatan/[slug]`, Beranda | dummy |
| Rekam Jejak Prestasi | `content/prestasi.json` | JSON | `/prestasi` | dummy |
| Album Dokumentasi Galeri | `content/galeri/*.json` | JSON | `/galeri`, `/galeri/[slug]` | dummy |
| Katalog 4 Pilar Layanan | `content/layanan.json` | JSON | `/layanan` | final (prosedur) / dummy (narahubung) |
| Daftar Pertanyaan Rekruitmen (FAQ) | `content/faq.json` | JSON | `/gabung` | final (standar umum organisasi) |
| Alamat Sekretariat & Jam Buka | `content/site.json` | JSON | `/kontak`, Footer | final (Gedung Student Center Tel-U) |
| Tautan WhatsApp Siaga & Pelatihan | `content/site.json` | JSON | Komponen CTA Layanan & Kontak | dummy (nomor pengurus contoh) |
| Tautan Formulir Rekrutmen | `content/site.json` | JSON | `/gabung` | dummy (tautan form contoh) |
| Video Hero Sinematik (12s) | `public/media/hero/ksr-hero-loop.mp4` | Video MP4/WebM | Hero Beranda (`/`) | dummy (aset bebas lisensi dokumenter) |
| Logo PMI & Lambang Palang Merah | `public/media/brand/logo-pmi-resmi.svg` | SVG | Header, Footer, Halaman Lambang | final (sesuai CID PMI) |
| Tautan Media Sosial Resmi | `content/site.json` | JSON | Header, Footer, Kontak | final (`@ksrpmitelkom` dkk.) |

## Non-Functional Requirements & Metrik Keberhasilan

### Kebutuhan Non-Fungsional (NFR)
- **Kinerja Muat Halaman (Core Web Vitals)**:
  - Largest Contentful Paint (LCP) ≤ 2.5 detik pada koneksi mobile standar 4G.
  - Cumulative Layout Shift (CLS) ≤ 0.05.
  - Interaction to Next Paint (INP) ≤ 200 milidetik.
  - Ukuran bundel JavaScript awal ≤ 150 KB gzip.
- **Batasan Bobot Media**:
  - Video hero latar: resolusi 1280×720, durasi loop 12 detik, tanpa audio, ukuran berkas ≤ 8 MB.
  - Poster video statis: ukuran berkas ≤ 250 KB format JPEG.
  - Seluruh gambar konten foto: format WebP, kompresi q80, ukuran berkas ≤ 300 KB per gambar.
- **Standar Aksesibilitas**: Kepatuhan penuh terhadap standar **WCAG 2.2 Level AA**. Seluruh elemen antarmuka dapat dinavigasikan melalui keyboard secara mandiri, rasio kontras teks terpenuhi, dan pengguna dengan sensitivitas gerak dihormati lewat dukungan `prefers-reduced-motion`.
- **Dukungan Peramban (Browser Compatibility)**: Mendukung dua versi stabil terakhir dari Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, serta iOS Safari versi 16 ke atas.

### Metrik Keberhasilan (Success Metrics)
1. **Pendaftaran Relawan Lancar**: Calon anggota dapat menyelesaikan alur dari halaman beranda hingga membuka Google Form pendaftaran dalam waktu di bawah 60 detik tanpa kendala teknis.
2. **Nol Kesalahan Konsol (Zero Console Errors)**: Tidak ada pesan kesalahan JavaScript, peringatan hidrasi React, atau kegagalan pemuatan aset media pada seluruh rute saat diinspeksi melalui peramban.
3. **Skor Audit Lighthouse Tinggi**: Meraih skor minimal `95` pada kategori Aksesibilitas (Accessibility) dan `95` pada kategori Optimasi Mesin Pencari (SEO) pada halaman Beranda dan Layanan.
