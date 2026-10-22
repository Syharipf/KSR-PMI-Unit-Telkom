# Design Assets Directory

Direktori ini digunakan untuk menampung, mengorganisasikan, dan mengurasi seluruh aset media visual mentah sebelum dioptimasi dan dipromosikan ke dalam direktori publik produksi (`public/media/`).

## Struktur Bucket Aset

Seluruh aset dikelompokkan ke dalam 5 kategori (*bucket*) terpisah:

```
design/assets/
  README.md
  brand/        # Logo resmi PMI, lambang palang merah, identitas Telkom University
  photo/        # Dokumentasi foto kegiatan relawan, diklat, aksi kemanusiaan
  video/        # Rekaman klip video dokumenter untuk wallpaper hero
  icons/        # Berkas ikon SVG monokromatik
  references/   # Tangkapan layar referensi inspirasi editorial atau panduan visual
```

## Konvensi Standar Penamaan Berkas

Seluruh berkas aset wajib menggunakan format penamaan standar dengan pola:
```
ksr-<bucket>-<deskripsi-singkat>-<lebar-piksel>.<ekstensi>
```
Contoh penamaan yang benar:
- `ksr-brand-logo-pmi-resmi-400w.svg`
- `ksr-photo-donor-darah-kampus-1920w.webp`
- `ksr-video-hero-loop-siaga-1280w.mp4`
- `ksr-icons-first-aid-kit-24w.svg`

## Matriks Atribusi & Kredit Aset

Setiap aset yang dimasukkan ke dalam repositori wajib didokumentasikan hak cipta dan izin penggunaannya pada tabel berikut:

| Berkas Aset | Sumber / Asal Media | Lisensi | Status Izin Penggunaan |
|---|---|---|---|
| `ksr-brand-logo-pmi-resmi-*.svg` | Markas Pusat PMI / CID Manual | Merek Resmi Terdaftar | Penggunaan resmi unit relawan KSR PMI |
| `ksr-video-hero-loop-*.mp4` | Dokumentasi KSR Tel-U / Kurasi Bebas Lisensi | Pexels / Creative Commons Zero | Bebas royalti komersial & non-komersial |
| `ksr-photo-*-placeholder-*.webp` | Tim Dokumentasi Desain | Internal Repositori | Khusus aset dummy contoh pengujian |

## Ringkasan Aturan Lambang Palang Merah

Sesuai Konvensi Jenewa dan Buku Pedoman Identitas Korporat (CID Manual) PMI:
- Lambang Palang Merah wajib selalu berada di atas bidang latar belakang **putih murni**.
- DILARANG menaruh lambang Palang Merah langsung di atas foto berwarna, tekstur gradasi, atau latar transparan tanpa plat putih.
- Warna merah lambang wajib mengacu pada Pantone 185 C (`#E4002B`).
- Pertahankan ruang kosong aman (*clear space*) di sekeliling logo minimum 50% dari tinggi lambang.
- Dilarang memutar, meregangkan, memotong, atau menggunakan bentuk palang sebagai motif dekoratif berulang.

## Target Kompresi & Spesifikasi Teknis Optimasi

Sebelum dipromosikan ke direktori publik (`public/media/`), setiap berkas media wajib melalui proses optimasi dengan batas target:
- **Foto Dokumentasi**: Format WebP, kompresi kualitas q80, dimensi terpanjang maksimal 2400px, ukuran berkas maksimal **300 KB** per foto.
- **Poster Video Hero**: Format JPEG atau WebP, resolusi 1600×900px, ukuran berkas maksimal **250 KB**.
- **Klip Video Hero**: Format MP4 (H.264) dan WebM (VP9), resolusi 1280×720px, rasio 16:9, durasi tepat 12 detik, tanpa audio track, ukuran berkas maksimal **8 MB**.
- **Ikon Antarmuka**: Format SVG terkompresi (tanpa metadata editor grafis seperti Illustrator/Figma), garis stroke `1.75px`, `currentColor`.

*Aturan Promosi*: Aset hanya boleh dipindahkan ke `public/media/` setelah dinyatakan memenuhi standar resolusi, rasio kontras, dan batas ukuran di atas.
