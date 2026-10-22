# Peta Arsitektur Graphify (Engram) — KSR PMI Unit Universitas Telkom

Dokumen panduan pemetaan keterkaitan kode, relasi dependensi AST, dan operasi alat Graphify / Engram pada repositori KSR PMI Unit Universitas Telkom.

## 1. Apa Ini

Graphify kini diterbitkan dan dikelola dengan nama resmi **Engram** (`@sentropic/engram@0.21.1`). Pustaka ini menyediakan biner utama `engram` serta alias kompatibilitas `graphify`.

Alat ini bekerja melalui analisis pohon sintaksis abstrak (AST) deterministik berbasis *tree-sitter*. Proses pemetaan berjalan 100% lokal pada mesin pengembang, tidak mengirimkan kode atau metadata ke server luar, dan tidak membutuhkan API key LLM.

## 2. Instalasi & Prasyarat Lingkungan

Pustaka Engram dipasang sebagai dependensi pengembangan (`devDependencies`):
```bash
bun add -d @sentropic/engram@0.21.1
```
Prasyarat lingkungan:
- Node.js ≥ 20.9.0 (lingkungan mesin terverifikasi saat ini: Node.js `24.21.0`).
- Bun `1.4.3`.
- Tidak perlu instalasi global (`npm i -g`). Panggil melalui `bunx engram` atau `bunx graphify`.
- *Catatan Penting*: Paket npm bernama `graphifyy` (dengan dua huruf y) adalah shim usang (*deprecated*) — DILARANG memasang atau menggunakan paket tersebut.

## 3. Konfigurasi Penelusuran

Pengecualian berkas diatur melalui berkas `.graphifyignore` pada root repositori:
```
node_modules/
.next/
out/
.engram/
design/prototypes/
public/media/
public/og/
```
Pengaturan cakupan default menggunakan mode `auto` yang mendeteksi berkas proyek secara otomatis. Direktori output `.engram/` dikecualikan dari Git dan tidak boleh di-commit.

## 4. Ekstraksi AST (Extraction)

Perintah ekstraksi AST dijalankan dengan:
```bash
bunx graphify extract .
# atau
bunx engram extract .
```

### Tabel Flag CLI Terverifikasi
| Flag | Parameter | Deskripsi & Penggunaan |
|---|---|---|
| `--out` | `<path>` | Menentukan direktori output (default: `.engram`). |
| `--no-cluster` | — | Menonaktifkan pengelompokan modul otomatis. |
| `--no-description` | — | Melewati pembuatan deskripsi teks otomatis pada node. |
| `--no-label` | — | Menonaktifkan pelabelan kategori modul. |
| `--scope` | `auto \| tracked \| all` | Menentukan cakupan berkas yang dipindai (default: `auto`). |
| `--semantic` | `<path>` | Menambahkan jalur semantik tambahan untuk analisis lanjutan. |
| `--backend` | `<name>` | Memilih backend analisis semantik khusus. |

Jika dijalankan tanpa opsi `--backend`, Engram murni melakukan ekstraksi pohon AST deterministik yang sangat cepat dan stabil.

## 5. Struktur Berkas Keluaran

Hasil pemindaian disimpan di dalam direktori `.engram/`:
- `.engram/graph.json` — Struktur data graf lengkap yang berisi daftar simpul (node), relasi (edge), dan metadata tipe.
- `.engram/GRAPH_REPORT.md` — Laporan ringkasan analisis dependensi, rasio pengelompokan, dan keterkaitan modul.
- `.engram/studio/` — Antarmuka web visualisasi graf lokal interaktif.
- `.engram/cache/` — Cache pohon sintaksis bertahap untuk mempercepat analisis berikutnya. Berkas cache ini dilarang diedit secara manual.
- `.engram/wiki/` — Dokumentasi keterkaitan arsitektur yang dihasilkan secara otomatis.

## 6. Mode Pemantau Berkelanjutan (Watch Mode)

Untuk memperbarui graf secara otomatis saat menulis kode, jalankan mode pemantau:
```bash
bunx engram watch .
```
Mode ini memantau perubahan sistem berkas dan secara instan memperbarui graf AST setiap kali berkas disimpan. Perubahan pada berkas dokumentasi Markdown akan menandai status graf menjadi *stale* dan memicu rekalkulasi relasi.

## 7. Kueri & Eksplorasi Dependensi Modul

Pengembang dan agen AI dapat memanfaatkan antarmuka baris perintah Engram untuk menelusuri arsitektur tanpa harus membuka seluruh berkas secara manual:

```bash
# 1. Menampilkan ringkasan menyeluruh kesehatan graf kode
bunx engram summary --graph .engram/graph.json

# 2. Menanyakan relasi aliran fungsional antar komponen
bunx engram query "bagaimana kegiatan mengalir ke halaman detail" --graph .engram/graph.json

# 3. Menjelaskan deklarasi fungsi, pengimpor, dan yang diimpor oleh modul tertentu
bunx engram explain "getKegiatanList" --graph .engram/graph.json

# 4. Mencari jalur dependensi terpendek antara dua modul
bunx engram path "getSiteConfig" "app/page.tsx" --graph .engram/graph.json

# 5. Menelusuri seluruh aliran proses build
bunx engram flows build --graph .engram/graph.json
```

## 8. Integrasi Model Context Protocol (MCP)

Engram menyediakan peladen protokol konteks model (MCP Server) tersemat berstatus baca-saja (*read-only*):
```bash
bunx engram serve .engram/graph.json
```
Perintah di atas membuka kanal IPC/stdio yang menyediakan alat (tools) MCP berikut untuk asisten AI:
- `query_graph`: Melakukan penelusuran semantik pada node dan relasi dalam graf.
- `get_node`: Mengambil rincian definisi, jenis, dan lokasi kode dari sebuah simpul.
- `get_neighbors`: Menampilkan daftar modul yang terhubung langsung (impor/ekspor) dengan modul target.
- `shortest_path`: Menghitung rute dependensi langsung antara dua modul untuk melacak siklus ketergantungan.

## 9. Sinkronisasi dengan Dokumentasi Arsitektur

Bagian "Module Dependency Map" pada dokumen `docs/architecture.md` adalah kontrak dependensi manual tingkat tinggi.
- Setiap simpul yang terdaftar pada tabel Simbol & Jalur di `docs/architecture.md` wajib tercermin secara akurat dalam graf hasil ekstraksi Engram (`.engram/graph.json`).
- Setiap kali ada penambahan halaman rute baru atau pemisahan komponen utilitas di masa implementasi, jalankan `bun run graph` untuk memastikan graf lokal tetap mutakhir dan perbarui tabel pada dokumen arsitektur bila terjadi pergeseran struktural.

## 10. Pemecahan Masalah (Troubleshooting)

- **Pemberitahuan Deprecasi Alias**: Saat memanggil perintah via alias `graphify`, terminal mungkin memunculkan pesan peringatan pengalihan ke `engram`. Untuk membisukan pesan tersebut, setel variabel lingkungan: `export ENGRAM_QUIET_DEPRECATION=1`.
- **Dukungan Tata Bahasa (Tree-sitter Grammars)**: Engram mengunduh grammar parser bahasa secara otomatis pada eksekusi pertama. Pastikan izin tulis pada direktori cache peramban atau folder pengguna tersedia.
- **Graf Menjadi Usang (Stale Graph)**: Bila terjadi anomali kueri setelah perpindahan branch Git besar, hapus folder `.engram/` lalu jalankan ekstraksi ulang:
  ```bash
  rm -rf .engram && bunx engram extract .
  ```
- **Jalur Ekstraksi Bawaan**: Jika perintah dijalankan tanpa parameter direktori, Engram akan secara otomatis menggunakan target direktori aktif saat ini (`.`) dan menempatkan output di `.engram/`.
