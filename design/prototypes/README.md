# Design Prototypes Directory

Direktori ini digunakan untuk menyimpan prototipe antarmuka mandiri yang dihasilkan melalui kakas OpenDesign atau eksperimen kode statis sebelum diimplementasikan ke dalam kode produksi Next.js.

## Struktur Direktori Prototipe

Setiap prototipe disimpan dalam subfolder terpisah dengan format penamaan berbasis tanggal dan slug deskriptif:

```
design/prototypes/
  README.md
  <YYYY-MM-DD>-<slug>/
    index.html
    notes.md
    assets/
```

### Rincian Berkas dalam Setiap Folder Prototipe:
- `index.html`: Berkas prototipe antarmuka mandiri (*self-contained*) yang dihasilkan dari OpenDesign atau kode HTML/CSS statis. Prototipe ini harus dapat dijalankan langsung di peramban tanpa memerlukan peladen Node.js atau bundler.
- `notes.md`: Dokumen catatan pengujian yang **wajib** mencantumkan:
  1. **Hipotesis Desain**: Masalah interaksi atau visual apa yang sedang diuji.
  2. **Keputusan Kunci**: Pilihan tata letak, waktu animasi, atau hierarki informasi yang diputuskan.
  3. **Verdict**: Hasil evaluasi (diterima untuk dipromosikan ke komponen produksi, atau ditolak/diarsipkan).
- `assets/`: Berkas pendukung lokal (gambar dummy, ikon khusus) yang hanya digunakan untuk prototipe tersebut.

## Aturan Batasan Teknis Prototipe

1. **Prototipe Bukan Kode Produksi**: Berkas di dalam folder ini berfungsi murni sebagai alat eksplorasi dan bukti konsep antarmuka.
2. **Larangan Impor Modul Produksi**: Prototipe dilarang keras mengimpor kode, fungsi pustaka, atau komponen dari direktori aplikasi produksi (`app/`, `components/`, atau `lib/`).
3. **Kekekalan Setelah Promosi (Immutable)**: Begitu sebuah prototipe dinyatakan selesai dan ditranslasikan ke dalam komponen produksi di `components/`, isi folder prototipe tersebut tidak boleh dimodifikasi lagi agar menjadi rekam jejak keputusan desain yang valid.
