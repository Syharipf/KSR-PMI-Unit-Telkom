# AI Agents & Engineering Guidelines — KSR PMI Unit Universitas Telkom

Dokumen panduan rekayasa perangkat lunak, aturan kerja, dan batasan operasional bagi asisten pengembang cerdas (AI agents) dan pengembang manusia di repositori KSR PMI Unit Universitas Telkom.

## Boundaries

Setiap direktori di dalam repositori ini memiliki batasan tanggung jawab yang jelas. Patuhi tabel batasan modifikasi berkas di bawah ini:

| Path / Direktori | Boleh Diubah? | Aturan & Batasan Kerja |
|---|---|---|
| `app/` | Ya | Berisi shell halaman Next.js App Router. Seluruh halaman default menggunakan Server Components (`RSC`). Dilarang menulis teks salinan (*copy*) yang di-hardcode; semua teks konten wajib dimuat dari berkas loader `lib/content/`. |
| `components/` | Ya | Berisi komponen antarmuka yang bersifat murni presentasional. Semua props wajib didefinisikan dengan tipe TypeScript yang jelas. Hanya komponen interaktif tertentu yang diizinkan memiliki direktif `'use client'`. |
| `lib/content/` | Ya | Berisi modul pembaca sistem berkas (`node:fs`) dan skema Zod. Wajib diawali `import 'server-only'`. Tidak boleh diimpor oleh Client Component. |
| `content/` | Ya (Hati-hati) | Berisi data isi situs dalam format JSON dan MDX. Murni data; dilarang keras menyisipkan kode executable atau logika pemrograman di dalam berkas konten. |
| `design/` | Ya | Berisi token kanonikal `tokens.css`, spesifikasi desain, serta prototipe antarmuka. Berkas di `design/prototypes/` bersifat *immutable* (tidak boleh diubah lagi) setelah fitur dipromosikan ke kode produksi. |
| `docs/` | Ya | Dokumentasi arsitektur, PRD, dan panduan kerja. Wajib selalu sinkron dengan kondisi aktual sistem. |
| `public/media/` | Ya | Berisi aset media statis yang telah dikompresi dan lolos optimasi ukuran (WebP, MP4 12s, SVG). Dilarang memasukkan aset biner mentah yang belum teroptimasi. |
| `.engram/` | **TIDAK** | Direktori graf pengetahuan yang dihasilkan secara otomatis oleh alat Engram / Graphify. DILARANG mengedit berkas di dalam folder ini secara manual. |

### Aturan Batasan Impor Antarmuka
- `app/` hanya boleh mengimpor dari `components/` dan `lib/`.
- `components/` hanya boleh mengimpor dari sesama `components/`, `lib/format.ts`, dan `lib/contact.ts`.
- `lib/` hanya boleh mengakses dependensi internalnya dan sistem berkas `content/`.
- DILARANG mengimpor kode `app/` dari dalam `lib/` atau `components/`.
- DILARANG membaca langsung berkas `content/` dari komponen antarmuka tanpa melewati `lib/content/index.ts`.

### Daftar Client Component yang Diizinkan (`'use client'`)
Untuk mempertahankan performa LCP dan meminimalkan ukuran bundel JavaScript, hanya komponen-komponen berikut yang diizinkan menggunakan direktif `'use client'`:
1. `components/layout/SiteHeader.tsx` (pengelolaan state menu mobile dan efek scroll)
2. `components/layout/ThemeToggle.tsx` (interaksi toggle tema dengan `next-themes`)
3. `components/media/CinematicWallpaper.tsx` (pemantauan status video, observer viewport, dan event listener)
4. `components/media/Lightbox.tsx` (pengendalian jendela modal gambar layar penuh dan event keyboard)
5. `components/motion/*` (komponen pembungkus animasi berbasis Motion)
6. `components/sections/CountUp.tsx` (animasi penghitung angka saat elemen terlihat)
7. `components/sections/KegiatanFilter.tsx` (pengelolaan state filter kategori kegiatan di sisi peramban)

Komponen lainnya wajib beroperasi sebagai React Server Component (RSC).

## Coding Rules

Standar pemrograman yang wajib dipatuhi tanpa pengecualian:

- **Konfigurasi TypeScript Ketat**: Wajib mematuhi aturan compiler `strict: true`, `noUncheckedIndexedAccess: true`, dan `verbatimModuleSyntax: true`. DILARANG menggunakan tipe `any` atau `unknown` tanpa penyempitan tipe (*type narrowing*) yang eksplisit.
- **Ekspor Bernama (Named Exports)**: Seluruh fungsi, komponen, dan utilitas wajib diekspor menggunakan *named export*. Ekspor bawaan (*default export*) HANYA diizinkan pada berkas-berkas konvensi rute Next.js: `page.tsx`, `layout.tsx`, `not-found.tsx`, `error.tsx`, `sitemap.ts`, dan `robots.ts`.
- **Pengambilan Data di Tingkat Server**: Seluruh pemanggilan fungsi loader data (`lib/content/`) wajib dieksekusi di Server Components (`app/**/page.tsx` atau `app/layout.tsx`). Data disalurkan ke komponen anak melalui props bertipe.
- **Penanganan Slug Tidak Ditemukan**: Pada rute dinamis berkas MDX atau JSON, bila parameter slug tidak cocok dengan data apapun, komponen wajib langsung memanggil fungsi `notFound()` dari `next/navigation`.
- **Rute Statis Terkunci**: Gunakan `export const dynamicParams = false;` pada seluruh rute dinamis untuk menjamin bahwa seluruh halaman dikompilasi secara statis saat proses build.
- **Format Tanggal & Angka Baku**: Seluruh format penanggalan wajib menggunakan standar ISO 8601 (`YYYY-MM-DD`) dan diformat untuk tampilan pengguna melalui `Intl.DateTimeFormat('id-ID', ...)`. Seluruh angka statistik diformat menggunakan `Intl.NumberFormat('id-ID')`.
- **Keamanan Manipulasi HTML**: DILARANG menggunakan properti `dangerouslySetInnerHTML` di luar pipa rendering konten MDX terkurasi.
- **Disiplin Penataan Gaya**:
  - DILARANG menggunakan deklarasi `!important` pada berkas CSS.
  - DILARANG menggunakan kode heksadesimal arbitrer (seperti `bg-[#123456]`) di dalam kelas komponen Tailwind; gunakan token semantik yang tersedia.
  - DILARANG menggunakan hook `useEffect` untuk hal-hal yang dapat diselesaikan murni menggunakan selektor CSS atau transisi CSS standar.
  - DILARANG menambahkan paket dependensi baru ke dalam repositori tanpa persetujuan eksplisit.

## Style Guide

- **Format Prettier**:
  - Lebar baris (`printWidth`): `100` karakter.
  - Tanda petik tunggal (`singleQuote`): `true`.
  - Titik koma (`semi`): `true`.
  - Koma penutup (`trailingComma`): `"all"`.
  - Pengurutan kelas Tailwind otomatis menggunakan `prettier-plugin-tailwindcss`.
- **Aturan ESLint**: Menggunakan ESLint Flat Config (`eslint.config.mjs`) yang menggabungkan `next/core-web-vitals`, `next/typescript`, dan `eslint-config-prettier`.
- **Konvensi Penamaan Berkas**:
  - Berkas konten (`content/`) dan berkas aset media (`public/media/`): format `kebab-case` (contoh: `siaga-medis.mdx`, `ksr-hero-poster.webp`).
  - Berkas komponen React: format `PascalCase` (contoh: `SiteHeader.tsx`, `KegiatanFilter.tsx`).
  - Berkas hook kustom: diawali `use-` dengan format `kebab-case` (contoh: `use-media-query.ts`).
  - Berkas utilitas dan skema: format `kebab-case` (contoh: `schema.ts`, `format.ts`).
- **Pedoman Bahasa & Salinan (Copywriting)**:
  - Antarmuka pengguna dan artikel menggunakan Bahasa Indonesia formal sesuai Pedoman Umum Ejaan Bahasa Indonesia (EYD).
  - Kata sapaan menggunakan nada hormat, terpercaya, dan bersahaja khas relawan kepalangmerahan.
  - DILARANG menyematkan emoji Unicode dekoratif di dalam salinan antarmuka pengguna.
  - DILARANG menggunakan bahasa hiperbolis, bombastis, atau gaya bahasa pemasaran berlebihan.
  - Seluruh gambar wajib memiliki atribut teks alternatif (`alt`) yang mendeskripsikan konteks dokumentasi secara faktual.

## Workflow

Alur kerja rekayasa berbasis graf dan berorientasi konten dummy:

### 1. Graph-First Development
Sebelum memodifikasi atau membuat keterkaitan modul baru:
1. Periksa ringkasan dependensi yang ada menggunakan alat Engram:
   ```bash
   bunx engram summary --graph .engram/graph.json
   ```
2. Telusuri jalur aliran modul sebelum mengubah deklarasi ekspor atau impor:
   ```bash
   bunx engram query "bagaimana kegiatan mengalir ke halaman detail" --graph .engram/graph.json
   bunx engram explain "getKegiatanList" --graph .engram/graph.json
   ```
3. Setelah melakukan perubahan pada ekspor/impor antar berkas, jalankan pemutakhiran graf:
   ```bash
   bun run graph
   ```

### 2. Dummy-First Policy
- Selama properti `site.json.contentStatus` bernilai `"dummy"`, seluruh data nama pengurus, nomor kontak narahubung, dan capaian kegiatan adalah data fiksi sampel yang koheren.
- Agen dan pengembang dilarang keras menambahkan data pribadi asli mahasiswa atau mengarang fakta sejarah baru di luar fakta bersitasi.
- JANGAN PERNAH mengubah nilai `contentStatus` menjadi `"final"` sebelum ada instruksi langsung dari pengguna pemilik repositori.

### 3. Siklus Verifikasi Bertahap
Setelah menyelesaikan modifikasi kode, lakukan pemeriksaan wajib:
1. `bun run typecheck` (harus bebas dari galat tipe).
2. `bun run lint` (harus bebas dari pelanggaran aturan lint).
3. `bun run build` (harus berhasil mengekspor HTML statis ke folder `out/`).
4. Uji tampilan visual (smoke testing): periksa tampilan dalam tema terang dan gelap, pada lebar layar sempit (360px), menggunakan navigasi keyboard, dan dengan mode simulasi `prefers-reduced-motion`.

### 4. Larangan Tegas
- DILARANG meng-commit direktori `.engram/` ke dalam repositori Git.
- DILARANG meninggalkan kode mati (*dead code*) atau fungsi yang tidak pernah dipanggil.
- DILARANG membuat lapisan adaptasi mundur (*compatibility shims*) untuk pustaka lama.
- DILARANG menyisipkan komentar penunda tugas atau placeholder implementasi yang belum selesai di dalam berkas produksi.
- DILARANG menyajikan data dummy seolah-olah sebagai data arsip resmi organisasi.

## Graphify

Graf arsitektur dikelola oleh pustaka `@sentropic/engram` (bin `engram` + alias `graphify`).
- Pustaka ini memanfaatkan parser AST pohon sintaksis *tree-sitter* deterministik secara lokal.
- Analisis kode tidak mengirimkan berkas apapun ke peladen luar dan tidak memerlukan kunci API LLM.
- Dokumentasi konfigurasi dan perintah lengkap Graphify tertera pada berkas `GRAPHIFY.md`.

## OpenDesign

Desain antarmuka merujuk pada standar OpenDesign:
- Spesifikasi desain kanonikal tercantum pada berkas `DESIGN.md`.
- Token warna, tipografi, spasi, dan elevasi dikompilasi dari `design/tokens.css`.
- Lingkungan kerja prototipe tersimpan pada folder `design/prototypes/`. Setiap prototipe baru dibuat dalam folder bernomor tanggal (`design/prototypes/<YYYY-MM-DD>-<slug>/`).
- Panduan pengelolaan prototipe dan sinkronisasi aset desain tertera pada berkas `design/README.md`.

## Definition of Done

Sebuah tugas atau fitur dianggap selesai (*Done*) HANYA jika memenuhi seluruh kriteria berikut:
1. Seluruh rute yang terpengaruh berhasil dikompilasi dan menghasilkan berkas HTML statis di dalam direktori `out/`.
2. Seluruh skema konten MDX dan JSON berhasil lolos validasi Zod tanpa galat atau kompensasi fallback palsu.
3. Tidak ada pesan galat atau peringatan yang muncul di konsol peramban saat antarmuka dijalankan.
4. Aksesibilitas navigasi keyboard (fokus visual, urutan tab) berfungsi sempurna pada semua elemen interaktif.
5. Performa halaman memenuhi anggaran Core Web Vitals (LCP, CLS, INP) pada pengetesan perangkat mobile.
6. Bila terjadi penyesuaian atau penambahan variabel token desain baru, berkas `DESIGN.md` dan `design/tokens.css` wajib diperbarui secara sinkron.
