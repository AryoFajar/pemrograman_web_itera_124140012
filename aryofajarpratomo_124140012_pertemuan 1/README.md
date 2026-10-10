# Mini POS – Kasir & Keranjang Belanja Sederhana

## Identitas

| | |
|---|---|
| **Nama Lengkap** | Aryo Fajar Pratomo |
| **NIM** | 124140012 |
| **Kelas Praktikum** | RA |
| **Mata Kuliah** | Pemrograman Web – Teknik Informatika, Institut Teknologi Sumatera |

## Deskripsi Aplikasi

**Mini POS** adalah aplikasi web kasir untuk **kantin atau toko kampus**. Kasir memasukkan barang
yang dibeli (nama, harga satuan, jumlah), aplikasi langsung menghitung subtotal, total belanja,
diskon, total akhir, dan kembalian. Isi keranjang disimpan di browser sehingga tidak hilang saat
halaman di-refresh.

**Tujuan pembuatan:** menyatukan tiga kompetensi dasar praktikum dalam satu studi kasus:

1. validasi input form,
2. perhitungan kalkulator otomatis,
3. manajemen keranjang (list) berbasis `localStorage`.

Dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework maupun library).

## Panduan Menjalankan

**Cara 1 – Live Server (VS Code)**

1. Buka folder `aryofajarpratomo_124140012_pertemuan1` di VS Code.
2. Pasang ekstensi **Live Server** (Ritwick Dey) bila belum ada.
3. Klik kanan `index.html`, pilih **Open with Live Server**.
4. Aplikasi terbuka otomatis di `http://127.0.0.1:5500`.

**Cara 2 – Tanpa server:** klik dua kali `index.html` agar terbuka di browser (Chrome, Edge, atau Firefox).

## Struktur Folder

```
aryofajarpratomo_124140012_pertemuan1/
├── index.html      # Struktur HTML aplikasi
├── style.css       # Styling antarmuka (responsif)
├── script.js       # Logika JavaScript
├── README.md       # Dokumentasi
└── screenshots/    # Tangkapan layar untuk README
```

## Daftar Fitur

**Validasi form input barang**
- [x] Nama barang wajib diisi, minimal 3 karakter (spasi di awal/akhir diabaikan)
- [x] Harga satuan wajib angka bulat positif, minimal Rp 500 (0, negatif, desimal, dan kosong ditolak)
- [x] Qty wajib bilangan bulat minimal 1
- [x] Pesan error berwarna merah di bawah input yang salah, barang tidak masuk keranjang
- [x] Form otomatis di-reset setelah barang berhasil ditambahkan

**Kalkulator & perhitungan otomatis**
- [x] Subtotal per baris = harga satuan × qty
- [x] Total belanja = jumlah seluruh subtotal
- [x] Diskon 10% otomatis jika total belanja ≥ Rp 50.000
- [x] Kode promo `HEMAT10` (diskon 10% walau belanja di bawah Rp 50.000; tidak ditumpuk dengan diskon otomatis)
- [x] Menampilkan nominal diskon dan total akhir
- [x] Input "Uang Bayar" dengan kembalian otomatis = uang bayar − total akhir
- [x] Keterangan "Uang belum mencukupi" beserta nominal kekurangan
- [x] Format Rupiah (`Rp 50.000`)

**Keranjang & localStorage**
- [x] Tabel keranjang: No, Nama Barang, Harga Satuan, Qty, Subtotal, Aksi
- [x] Tombol Hapus per baris, total dan diskon terhitung ulang otomatis
- [x] Keranjang disimpan dengan `JSON.stringify()` dan dimuat dengan `JSON.parse()`
- [x] Tombol **Transaksi Baru / Reset** mengosongkan keranjang dan membersihkan localStorage

**Tambahan**
- [x] Tampilan responsif (tabel berubah menjadi kartu pada layar ponsel)
- [x] Tombol nominal cepat (Uang pas, 20.000, 50.000, 100.000)
- [x] Nama barang ditampilkan sebagai teks (aman dari injeksi HTML)
- [x] Data localStorage yang rusak/tidak valid disaring, aplikasi tidak error

## Tangkapan Layar

**1. Tampilan form input utama**

<img width="1920" height="1078" alt="Form Input Pertama" src="https://github.com/user-attachments/assets/20bd9b71-cf03-4f6b-b74c-e5befc5d3f8c" />

**2. Tampilan saat validasi error muncul**

<img width="1920" height="1078" alt="Validasi Erorr" src="https://github.com/user-attachments/assets/d24afe37-058b-4ade-9a37-9e963955dcfc" />

**3. Hasil perhitungan kalkulator dan tabel keranjang**

<img width="1920" height="1078" alt="Hasil Perhitungan Kalkulator" src="https://github.com/user-attachments/assets/364ef175-52f0-4955-94ec-26b9c9b075a9" />

**4. Uang bayar kurang → "Uang belum mencukupi"**

<img width="1920" height="1078" alt="Uang Kurang" src="https://github.com/user-attachments/assets/78bd800e-b4bd-42ad-b727-5675057a2dd7" />

## Penjelasan Teknis Singkat

### 1. Penanganan validasi input

Setiap field punya fungsi validator sendiri (`validasiNama`, `validasiHarga`, `validasiQty`) yang
mengembalikan **pesan error** (string kosong bila valid). Semuanya didaftarkan di array `FIELD_FORM`.

Saat form di-submit, `tambahBarang()` memanggil `validateForm()` yang menjalankan seluruh validator.
Pesan ditampilkan di bawah input lewat `tampilkanError()` (border merah + teks merah). Jika ada
satu saja yang salah, fungsi berhenti (`return`) dan fokus dipindah ke field yang salah, sehingga
barang **tidak** masuk ke keranjang. Jika semua valid, barang di-`push` ke array `keranjang` dan
form di-reset. Form memakai atribut `novalidate` agar pesan error berasal dari JavaScript, bukan
bawaan browser.

### 2. Algoritma kalkulator

```text
subtotal    = harga × qty                       (hitungSubtotal)
total       = Σ subtotal seluruh item           (hitungTotal, memakai reduce)
diskon      = 10% × total  jika total ≥ 50.000 atau kode HEMAT10 aktif, selain itu 0   (hitungDiskon)
total akhir = total − diskon
kembalian   = uang bayar − total akhir          (hitungKembalian)
```

Jika kembalian negatif, tampilan berubah menjadi merah dengan keterangan *"Uang belum mencukupi"*
dan nominal kekurangan. Semua tampilan angka dibuat ulang dari state oleh `renderSemua()`
(`renderKeranjang` → `renderRingkasan` → `renderPembayaran`), jadi setiap tambah, hapus, atau ubah
uang bayar otomatis menghitung ulang. Format Rupiah memakai `Intl.NumberFormat('id-ID')`.

### 3. Mekanisme serialisasi localStorage

- **Menyimpan:** setiap keranjang berubah, `simpanKeranjang()` memanggil
  `localStorage.setItem('miniPos.keranjang', JSON.stringify(keranjang))`. Array objek
  `{ id, nama, harga, qty }` diubah menjadi string JSON karena localStorage hanya menyimpan string.
- **Memuat:** saat halaman dibuka, `muatKeranjang()` memanggil `JSON.parse(localStorage.getItem(...))`,
  memastikan hasilnya array, lalu menyaring item dengan `itemValid()`. Blok `try/catch` mencegah
  error bila data rusak.
- **Reset:** `resetTransaksi()` mengosongkan array dan memanggil `localStorage.removeItem(...)`.

Setelah dimuat, `renderSemua()` menggambar tabel dan menghitung total dari data yang tersimpan.
