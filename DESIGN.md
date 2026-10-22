---
name: 'KSR PMI Unit Universitas Telkom'
category: 'Brands'
surface: 'web'
description: 'Sistem desain resmi profil KSR PMI Unit Universitas Telkom — hangat, siaga, sinematik, dengan palet korporat PMI dan wallpaper dokumenter.'
colors:
  bg: '#faf7f3'
  surface: '#ffffff'
  fg: '#15171a'
  accent: '#e4002b'
---

# Design Specification — KSR PMI Unit Universitas Telkom

Dokumen spesifikasi desain antarmuka web profil KSR PMI Unit Universitas Telkom. Menjadi acuan tunggal implementasi komponen UI, layout, animasi, dan aset media, serta panduan kerja OpenDesign di repositori ini. Seluruh nilai token dikompilasi dari `design/tokens.css`.

## 1. Arah Visual

Identitas visual KSR PMI Unit Universitas Telkom bertumpu pada tiga kata kunci utama: **Siaga, Tulus, Terlatih**.

- **Ruang Siaga (Watch Room)**: Antarmuka menghadirkan suasana posko siaga kemanusiaan yang teratur, tenang, dan sigap. Pengguna disambut dengan keterbacaan data tinggi, tipografi tegas, dan batasan struktural yang bersih.
- **Sinematik Dokumenter, Bukan SaaS**: Visual menghindari estetika software/dashboard (tidak ada gradien neon, kartu melayang berlebihan, atau ilustrasi 3D generik). Pendekatan visual mengadopsi editorial dokumenter lapangan: foto nyata, kontras natural, dan wallpaper foto bergilir yang tenang sebagai latar belakang atmosferik.
- **Wallpaper Latar Pasif**: Foto atau video hero beroperasi pasif di belakang scrim dengan `--wallpaper-opacity: 0.55` (55%) pada tema terang dan `0.3` (30%) pada tema gelap. Teks di atasnya selalu memiliki kontras absolut terhadap background `--bg`.

## 2. Palet Warna

Merah PMI mengacu pada aproksimasi sRGB resmi Pantone 185 C yaitu `#E4002B`. Lambang Palang Merah wajib diletakkan di atas dasar putih murni sesuai petunjuk identitas PMI. Accent merah dibatasi ketat: maksimum 2 kemunculan elemen interaktif primer per layar (misalnya 1 tombol CTA + 1 status tag aktif).

### Light Theme (Default: `data-theme="light"`)

| Token             | Hex / Nilai                                     | Peran Antarmuka                          | Pasangan Kontras Teruji                     |
| ----------------- | ----------------------------------------------- | ---------------------------------------- | ------------------------------------------- |
| `--bg`            | `#faf7f3`                                       | Latar kanvas utama (warm paper)          | `--fg` (15.5:1), `--muted` (4.6:1)          |
| `--surface`       | `#ffffff`                                       | Kartu konten, kontainer, panel           | `--fg` (17.3:1)                             |
| `--surface-warm`  | `#f2e9de`                                       | Latar sekunder, strip statistik, callout | `--fg` (13.8:1)                             |
| `--fg`            | `#15171a`                                       | Teks judul dan body utama                | Di atas `--bg` & `--surface`                |
| `--fg-2`          | `#3a3f45`                                       | Teks pendukung, deskripsi kartu          | Di atas `--surface` (10.2:1)                |
| `--muted`         | `#6b6f75`                                       | Label form, caption, placeholder         | Di atas `--bg` (4.6:1), `--surface` (5.1:1) |
| `--meta`          | `#8a8d92`                                       | Timestamp, metadata sekunder             | Di atas `--bg` (3.0:1)                      |
| `--border`        | `#e2d9cf`                                       | Garis batas struktural kartu & sekat     | Border kontras netral                       |
| `--border-soft`   | `#efe8e0`                                       | Garis pemisah internal list              | Border halus                                |
| `--accent`        | `#e4002b`                                       | Aksi primer, status darurat/siaga        | Di atas `--accent-on` `#ffffff` (4.8:1)     |
| `--accent-on`     | `#ffffff`                                       | Teks di atas tombol aksen merah          | Di atas `#e4002b` (4.8:1)                   |
| `--accent-hover`  | `color-mix(in oklab, var(--accent), black 8%)`  | State hover aksi primer                  | Interaktif                                  |
| `--accent-active` | `color-mix(in oklab, var(--accent), black 14%)` | State aktif/klik aksi primer             | Interaktif                                  |
| `--success`       | `#16794a`                                       | Status selesai, pendaftaran dibuka       | Di atas `--surface` (5.2:1)                 |
| `--warn`          | `#a96000`                                       | Peringatan, batas pendaftaran            | Di atas `--surface` (4.7:1)                 |
| `--danger`        | `#b3261e`                                       | Status darurat penuh, error              | Di atas `--surface` (6.0:1)                 |

### Dark Theme (`data-theme="dark"`)

| Token             | Hex / Nilai                                     | Peran Antarmuka                    | Pasangan Kontras Teruji                 |
| ----------------- | ----------------------------------------------- | ---------------------------------- | --------------------------------------- |
| `--bg`            | `#0b0b0d`                                       | Latar gelap sinematik (near-black) | `--fg` (18.1:1), `--muted` (8.3:1)      |
| `--surface`       | `#141417`                                       | Kartu elevated, modal              | `--fg` (16.4:1)                         |
| `--surface-warm`  | `#1d1d22`                                       | Strip kontras, panel kontrol       | `--fg` (14.2:1)                         |
| `--fg`            | `#f7f4ef`                                       | Teks judul dan body utama          | Di atas `--bg` & `--surface`            |
| `--fg-2`          | `#d5d0c9`                                       | Teks pendukung sekunder            | Di atas `--surface` (12.3:1)            |
| `--muted`         | `#a29c94`                                       | Label, metadata                    | Di atas `--bg` (8.3:1)                  |
| `--meta`          | `#7c7770`                                       | Informasi pendukung teknis         | Di atas `--bg` (5.2:1)                  |
| `--border`        | `#2b2b31`                                       | Batas kartu dan pembatas           | Border netral gelap                     |
| `--border-soft`   | `#202025`                                       | Batas halus komponen               | Border halus gelap                      |
| `--accent`        | `#ff3b47`                                       | Aksi primer dark mode (vivid red)  | Di atas `--accent-on` `#0b0b0d` (8.1:1) |
| `--accent-on`     | `#0b0b0d`                                       | Teks kontras di atas aksen dark    | Di atas `#ff3b47` (8.1:1)               |
| `--accent-hover`  | `color-mix(in oklab, var(--accent), white 8%)`  | State hover dark mode              | Interaktif                              |
| `--accent-active` | `color-mix(in oklab, var(--accent), white 14%)` | State klik dark mode               | Interaktif                              |
| `--success`       | `#4ade80`                                       | Status sukses                      | Di atas `--surface` (10.1:1)            |
| `--warn`          | `#fbbf24`                                       | Status peringatan                  | Di atas `--surface` (11.8:1)            |
| `--danger`        | `#f87171`                                       | Status bahaya                      | Di atas `--surface` (8.4:1)             |

## 3. Tipografi

Sistem tipografi menggunakan dua keluarga font swahosting:

- **Display & Body**: `"Plus Jakarta Sans Variable", ui-sans-serif, system-ui, sans-serif`
  - Display: Weight 700 (Bold) dan 800 (ExtraBold) untuk headline, hero, dan judul seksi.
  - Body: Weight 400 (Regular), 500 (Medium), 600 (SemiBold) untuk teks alur panjang, navigasi, dan tombol.
- **Statistik & Label**: `"JetBrains Mono Variable", ui-monospace, SFMono-Regular, monospace`
  - Digunakan khusus untuk angka statistik, badge kategori teknis, penanggalan ISO, dan koordinat.

### Skala Tipografi

| Token         | Ukuran | Line Height                | Tracking                         | Penggunaan                           |
| ------------- | ------ | -------------------------- | -------------------------------- | ------------------------------------ |
| `--text-4xl`  | `80px` | `1.05` (`--leading-tight`) | `-0.03em` (`--tracking-display`) | Hero headline desktop utama          |
| `--text-3xl`  | `56px` | `1.05` (`--leading-tight`) | `-0.03em` (`--tracking-display`) | Judul seksi utama (H1 halaman dalam) |
| `--text-2xl`  | `40px` | `1.15`                     | `-0.02em`                        | Sub-seksi besar, H2 halaman dalam    |
| `--text-xl`   | `28px` | `1.25`                     | `-0.01em`                        | Judul kartu unggulan, H3             |
| `--text-lg`   | `20px` | `1.4`                      | `0`                              | Lead paragraph, intro ringkas        |
| `--text-base` | `17px` | `1.6` (`--leading-body`)   | `0`                              | Body copy standar (measure ≤ 68ch)   |
| `--text-sm`   | `14px` | `1.5`                      | `0`                              | Deskripsi form, metadata kartu       |
| `--text-xs`   | `12px` | `1.4`                      | `0.08em`                         | Eyebrow text, badge kategori, tagar  |

Aturan pengetikan:

- Panjang baris bacaan (measure) dibatasi maksimum `68ch`.
- Eyebrow text selalu berukuran `--text-xs: 12px`, uppercase, dengan tracking `0.08em`.

## 4. Spasial & Layout

Grid menggunakan sistem 12 kolom responsif dengan batasan kontainer yang kokoh.

### Layout Tokens

- `--container-max: 1200px` (lebar batas maksimal konten)
- Gutter kontainer:
  - Desktop (≥1024px): `--container-gutter-desktop: 40px`
  - Tablet (768px–1023px): `--container-gutter-tablet: 32px`
  - Mobile (<768px): `--container-gutter-phone: 20px`
- Section Vertical Spacing (Padding Y):
  - Desktop: `--section-y-desktop: 96px`
  - Tablet: `--section-y-tablet: 72px`
  - Mobile: `--section-y-phone: 48px`
- Header Chrome:
  - Tinggi bilah navigasi: `--header-h: 72px`

### Aturan Spasi (Space Scale)

- `--space-1: 4px` (micro gap)
- `--space-2: 8px` (icon spacing, tag padding Y)
- `--space-3: 12px` (input padding Y, compact stack)
- `--space-4: 16px` (card inner padding mobile, button padding Y)
- `--space-5: 20px` (layout gap mobile)
- `--space-6: 24px` (card inner padding desktop, grid gap)
- `--space-8: 32px` (sub-section gap)
- `--space-12: 48px` (section gap minor)

### Komposisi Hero Beranda

- Tinggi minimum: `calc(100svh - var(--header-h))`, dengan konten utama memenuhi lebar layar secara penuh (_full-bleed_) tanpa kontainer `--container-max`.
- Latar: foto bergilir (_still_) dengan `--wallpaper-opacity: 0.55` pada tema terang dan `0.3` pada tema gelap, ditumpuk scrim gradien vertikal warna `--bg` dari 55% di atas, 20% di tengah, hingga solid di bawah.
- Headline: tipografi display raksasa `clamp(3.25rem, min(11vw, 19vh), 11rem)`, rata kiri, dengan indentasi asimetris pada baris kedua dan baris penutup rata kanan.
- Ornamen abstrak: cincin konsentris dan garis silang tipis di sisi kanan, dibuat dari `--fg` dengan opasitas 10%; dilarang memakai motif palang merah dekoratif.
- Rel informasi: label mono di tepi atas dan strip tiga kolom di tepi bawah (deskripsi, dua CTA, metadata) yang membentang dari tepi ke tepi.
- Tombol aksi: tepat 2 CTA: satu primer "Gabung Relawan" (mengarah ke `/gabung`) dan satu sekunder "Kenali Sejarah Kami" (mengarah ke `/tentang/sejarah`).
- Strip Statistik: Diletakkan tepat di bawah fold/hero dengan kontainer `--surface-warm` untuk menonjolkan data capaian KSR.

## 5. Radius, Elevasi & Border

Sistem batas mengedepankan presisi geometris tanpa efek blur yang berlebihan.

### Nilai Token Radius

- `--radius-sm: 10px` (Badge, input text, dropdown menu)
- `--radius-md: 16px` (Tombol standar, kartu kecil, dialog)
- `--radius-lg: 24px` (Kartu unggulan, kontainer modal besar, panel hero)
- `--radius-pill: 9999px` (Tag filter, tombol bulat, indikator status)

### Elevasi & Shadow

- `--elev-flat: none` (Default kartu: mengandalkan border 1px solid `--border`)
- `--elev-ring: 0 0 0 1px var(--border)` (Border presisi tanpa layout-shift)
- `--elev-raised: 0 24px 64px rgb(21 23 26 / 0.14)` (Light mode: hanya untuk modal aktif, dropdown terbuka, atau kartu melayang saat hover terangkat)
  - Dark mode `--elev-raised: 0 24px 64px rgb(0 0 0 / 0.5)`
- Focus Ring Aksesibilitas:
  - Light mode: `--focus-ring: 0 0 0 4px color-mix(in oklab, var(--accent), transparent 72%)`
  - Dark mode: `--focus-ring: 0 0 0 4px color-mix(in oklab, var(--accent), transparent 64%)`

Aturan desain: Kartu default TIDAK menggunakan drop-shadow. Struktur dibangun dengan garis tepi 1px `--border` dan perbedaan latar `--surface`.

## 6. Komponen

Spesifikasi anatomi, state, dan batasan implementasi komponen inti:

| Komponen              | Anatomi & Varian                                                                         | State Terkelola                                           | Token Terpakai                                                            | Do & Don't                                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Button**            | Primary (solid accent), Secondary (outline border), Ghost (text only). Tinggi min 44px.  | Default, Hover, Active, Focus-visible, Disabled.          | `--accent`, `--accent-on`, `--radius-md`, `--focus-ring`, `--motion-fast` | **Do**: Jaga touch target ≥44px. **Don't**: Jangan beri border gradien atau efek emboss glossy.                         |
| **Card**              | Default Card, Feature Card, Media Card. Border 1px netral.                               | Rest, Hover (naik 2px, border `--border-soft`), Focus.    | `--surface`, `--border`, `--radius-md`, `--radius-lg`, `--space-6`        | **Do**: Letakkan padding konsisten 24px. **Don't**: DILARANG membuat border kiri tebal berwarna warni.                  |
| **Nav Header**        | Logo KSR PMI + Tel-U, tautan navigasi, tombol toggle tema, CTA Gabung. Fixed/Sticky.     | Scrolled (scrim blur `--bg`/85%), Active route indicator. | `--header-h`, `--bg`, `--border-soft`, `--fg`, `--accent`                 | **Do**: Tampilkan navigasi ringkas dan rapi. **Don't**: Jangan sembunyikan toggle tema di dalam submenu tersembunyi.    |
| **Badge / Tag**       | Kategori kegiatan, status diklat, tipe divisi. Ukuran font 12px mono/sans.               | Default, Active (filter terpilih).                        | `--radius-pill`, `--text-xs`, `--surface-warm`, `--fg-2`                  | **Do**: Pakai teks singkat padat. **Don't**: Jangan beri ikon emoji di dalam badge.                                     |
| **Stat Band**         | Angka monospaced besar (JetBrains Mono) + label deskripsi di bawah.                      | Rest, Counter animated (saat viewport masuk).             | `--font-mono`, `--text-2xl`, `--text-sm`, `--muted`, `--accent`           | **Do**: Format angka sesuai locale `id-ID`. **Don't**: Jangan buat angka fiksi tanpa label status dummy.                |
| **Accordion**         | Tanya-Jawab (FAQ), rincian kurikulum diklat. Header + Chevron + Body.                    | Expanded, Collapsed, Focus-visible.                       | `--border`, `--space-4`, `--motion-base`, `--ease-standard`               | **Do**: Transisi halus tinggi konten. **Don't**: Jangan gunakan animasi pegas lambat yang bergetar.                     |
| **Dialog / Lightbox** | Kontainer backdrop gelap, tombol tutup (min 44px), media gambar resolusi penuh, caption. | Opening (fade + scale 0.98→1), Opened, Closing.           | `--surface`, `--elev-raised`, `--radius-lg`, `--motion-fast`              | **Do**: Tangkap fokus keyboard (ESC untuk keluar). **Don't**: Jangan tampilkan scrollbar ganda pada browser saat aktif. |
| **GalleryItem**       | Thumbnail gambar aspek 4:3 atau 16:9, label judul tersembunyi/overlay saat hover.        | Rest, Hover (zoom foto 1.03x halus).                      | `--radius-md`, `--border`, `--motion-base`, `--ease-cinematic`            | **Do**: Sediakan alt text lengkap. **Don't**: Jangan pangkas gambar tanpa rasio aspek terencana.                        |

## 7. Motion & Sinematografi

Sistem gerak dirancang untuk memberikan kedalaman dokumenter yang tenang, berdisiplin, dan menghormati kenyamanan vestibular pengguna.

### Durasi & Kurva Easing

- Kecepatan Cepat (Mikrointeraksi hover/tap): `--motion-fast: 150ms`
- Kecepatan Standar (Perubahan layout, accordion, filter): `--motion-base: 240ms` dengan `--ease-standard: cubic-bezier(0.22, 1, 0.36, 1)`
- Kecepatan Sinematik (Scroll reveal, transisi halaman, hero enter): `--motion-slow: 600ms` dengan `--ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1)`

### Aturan Disiplin Animasi (OpenDesign Alignment)

1. **Mikrointeraksi**: Perubahan state (hover, focus, pressed) wajib selesai dalam `--motion-fast: 150ms`.
2. **Entri Elemen**: Transisi elemen masuk berdurasi 200–300 ms (atau 600 ms untuk hero reveal bergradasi). Dilarang memakai kurva akselerasi `ease-in` yang terasa lamban merespons aksi pengguna.
3. **Sifat Properti**: Hanya animasikan properti GPU-accelerated: `transform` dan `opacity`. Hindari menganimasikan `width`, `height`, `top`, atau `margin`.
4. **Cinematic Wallpaper Hero**:
   - Beroperasi dengan `--wallpaper-opacity: 0.55` pada tema terang dan `0.3` pada tema gelap.
   - Foto bergilir berganti setiap 7000 ms dengan crossfade 1800 ms dan dorongan zoom (`scale 1 → 1.07`) selama 9000 ms.
   - Ditimpa scrim gradien warna `--bg` untuk menjaga kontras WCAG; area strip bawah dibuat solid `--bg`.
   - Rotasi foto berhenti saat tab browser tidak aktif (`document.hidden`). Video otomatis dihentikan (`pause()`) saat tab tidak aktif.
   - Pada preferensi gerak berkurang (`prefers-reduced-motion: reduce`), rotasi dan zoom dinonaktifkan; hanya foto pertama yang ditampilkan statis.
5. **Aksesibilitas Gerak (`prefers-reduced-motion: reduce`)**:
   - Seluruh translasi posisi (`translateY`, parallax) dinonaktifkan (`transform: none`).
   - Durasi transisi dipangkas atau diganti dengan perubahan opasitas langsung (fade 0.05s).
   - Angka counter animasi langsung memunculkan nilai akhir seketika.

## 8. Fotografi, Video & Lambang

### Panduan Fotografi & Video

- **Nuansa Lapangan**: Foto wajib mendokumentasikan aksi relawan nyata: pertolongan pertama, donor darah, simulasi bencana, dan kegiatan diklat.
- **Pencahayaan Natural**: Hindari filter warna dramatis, gradien duotone berlebihan, atau foto stok studio yang kaku.
- **Spesifikasi Video**: Video hero berdurasi loop 12 detik, rasio 16:9 (1280×720), kompresi H.264 MP4 dan VP9 WebM, tanpa trek audio (mute permanen), ukuran berkas maksimal 8 MB. Poster statis format JPEG ukuran maksimal 250 KB.
- **Spesifikasi Gambar**: Format WebP kualitas q80, dimensi terpanjang maksimal 2400px, ukuran berkas maksimal 300 KB.
- **Fase Dummy**: Hero memakai tiga still placeholder SVG di `public/media/hero/hero-dummy-01.svg` sampai `hero-dummy-03.svg`. Ketiganya wajib diganti dengan foto dokumentasi asli berformat WebP sebelum `contentStatus` diubah menjadi `final`.

### Aturan Ketat Lambang Palang Merah (PMI)

Sesuai Buku Pedoman Identitas Korporat Palang Merah Indonesia (CID Manual PMI) dan Konvensi Jenewa:

1. **Dasar Putih Wajib**: Lambang Palang Merah dan logo PMI wajib selalu diletakkan di atas bidang putih murni atau plat latar putih berbingkai. DILARANG menaruh palang merah langsung di atas latar belakang abu-abu, hitam, foto berwarna, atau pola transparan.
2. **Warna Standar**: Merah lambang mengacu pada Pantone 185 C (`#E4002B`). DILARANG mengubah warna palang menjadi warna lain (emas, hitam, gradasi, atau merah muda).
3. **Ruang Kosong (Clear Space)**: Daerah bebas di sekeliling logo minimum 50% dari tinggi lambang palang. Tidak boleh ada teks, garis, atau elemen dekoratif yang menabrak batas ini.
4. **Ukuran Minimal Layar**: Tinggi logo PMI minimal 48px pada tampilan layar untuk menjamin proporsi dan keterbacaan palang serta teks.
5. **Integritas Bentuk**: DILARANG memutar lambang, meregangkan proporsi (distorsi aspek), menggunakan palang merah sebagai motif latar belakang dekoratif, atau memotong bentuk palang. Palang merah adalah tanda pelindung dan identitas kemanusiaan resmi.

## 9. Ikonografi

Sistem ikon antarmuka menggunakan prinsip visual seragam:

- **Tebal Garis (Stroke)**: Tepat `1.75px` untuk mempertahankan kejelasan di layar retina maupun layar biasa.
- **Grid Ukuran**: Berbasis grid `24px × 24px`.
- **Warna**: Menggunakan `currentColor` agar mewarisi warna teks pembungkusnya secara dinamis.
- **Karakter Ikon**: Garis tegas fungsional (Lucide / Heroicons style). DILARANG menggunakan ikon berwarna-warni atau emoji Unicode sebagai penanda antarmuka resmi.

## 10. Aksesibilitas

Standar target kepatuhan: **WCAG 2.2 Level AA**.

- **Rasio Kontras Minimum**:
  - Teks reguler (`--fg` terhadap `--bg` atau `--surface`): minimal `4.5:1` (tercapai >15:1).
  - Teks besar / display: minimal `3.0:1`.
  - Teks sekunder/muted (`--muted` terhadap `--bg`): minimal `4.5:1` (tercapai 4.6:1 light, 8.3:1 dark).
  - Tombol aksen (`--accent-on` `#ffffff` terhadap `--accent` `#e4002b`): minimal `4.5:1` (tercapai 4.8:1).
- **Target Sentuh**: Semua target interaktif (tombol, ikon menu, item filter, tautan navigasi) memiliki area sentuh minimum `44px × 44px`.
- **Fokus Terlihat**: Fokus keyboard menggunakan `--focus-ring` dengan outline tebal 4px yang tidak terpotong `overflow: hidden`.
- **Navigasi Keyboard**: Seluruh navigasi, dropdown menu, modal dialog, dan akordion dapat dioperasikan penuh melalui tombol Tab, Shift+Tab, Enter, Space, dan Escape.
- **Alternatif Gambar (Alt Text)**: Setiap elemen media grafis memiliki atribut `alt` deskriptif faktual; elemen dekoratif menggunakan `aria-hidden="true"`.

## 11. Do / Don't

Aturan anti-slop untuk menjaga keaslian dan martabat organisasi relawan:

- **DILARANG (Don't)**:
  - Dilarang menggunakan warna aksen generic SaaS seperti Indigo (`#6366f1`), Cyan, atau Ungu gradien.
  - Dilarang membuat gradien "trust corporate" biru-ke-ungu yang sering digunakan produk fintech.
  - Dilarang menggunakan emoji sebagai pengganti ikon navigasi atau penanda poin daftar.
  - Dilarang mengarang metrik statistik sembarangan tanpa label status yang jelas.
  - Dilarang memasukkan teks placeholder `lorem ipsum` di bagian manapun.
  - Dilarang menggunakan efek glassmorphism berlebihan (blur berat dengan border semi-transparan tebal).
  - Dilarang menggunakan efek parallax yang melebihi pergeseran 40px karena memicu mual vestibular.
- **DIHARUSKAN (Do)**:
  - Wajib menjaga palet warna netral berbasis warm-paper di light mode dan dark near-black di dark mode.
  - Wajib menaruh lambang palang merah di atas plat putih bersih.
  - Wajib menyediakan tombol toggle tema manual yang mudah ditemukan di bilah navigasi.
  - Pengecualian statistik dummy: Angka capaian dummy boleh ditampilkan HANYA ketika konfigurasi `contentStatus === 'dummy'` aktif dan didampingi catatan kaki "Konten contoh — situs dalam pengembangan". Begitu `contentStatus` diubah menjadi `final`, seluruh angka wajib diverifikasi dengan dokumen arsip resmi organisasi.
