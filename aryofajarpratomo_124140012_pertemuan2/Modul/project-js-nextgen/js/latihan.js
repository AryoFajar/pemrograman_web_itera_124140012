// Latihan mandiri Pertemuan 2 (destructuring, spread/rest, class, array methods, async).
import { users, products, fetchUserById } from './modules/data.js';
import { delay, formatRupiah } from './modules/utils.js';

// ------------------------------------------------------------
// Latihan Destructuring & Spread/Rest
// ------------------------------------------------------------
export function latihanDestructuring() {
  // 1. Destructure objek dengan properti bertingkat minimal 3 level
  const kampus = {
    nama: 'ITERA',
    fakultas: {
      nama: 'FTI',
      prodi: { nama: 'Teknik Informatika', akreditasi: 'Unggul' },
    },
  };
  const {
    fakultas: {
      prodi: { nama: namaProdi, akreditasi },
    },
  } = kampus;

  // 2. Fungsi dengan rest parameter: min, max, rata-rata
  const statistik = (...angka) => ({
    min: Math.min(...angka),
    max: Math.max(...angka),
    rata: angka.reduce((t, n) => t + n, 0) / angka.length,
  });

  // 3. Gabungkan 3 objek dengan spread, lalu timpa beberapa properti
  const identitas = { nama: 'Aryo', nim: '124140012' };
  const akademik = { prodi: 'Teknik Informatika', semester: 5 };
  const kontak = { email: 'aryo@itera.ac.id', kota: 'Lampung' };
  const profil = { ...identitas, ...akademik, ...kontak, semester: 7, kota: 'Bandar Lampung' };

  // 4. Destructuring di dalam for...of
  const daftar = [];
  for (const { name, role } of users) {
    daftar.push(`${name} (${role})`);
  }

  return { namaProdi, akreditasi, statistik: statistik(4, 8, 15, 16, 23, 42), profil, daftar };
}

// ------------------------------------------------------------
// Latihan Classes & Object Literals
// ------------------------------------------------------------
class Product {
  #harga;

  constructor(nama, harga) {
    this.nama = nama;
    this.harga = harga; // memakai setter
  }

  get harga() {
    return this.#harga;
  }

  set harga(nilai) {
    if (nilai < 0) throw new RangeError('Harga tidak boleh negatif');
    this.#harga = nilai;
  }

  info() {
    return `${this.nama} - ${formatRupiah(this.harga)}`;
  }
}

class DigitalProduct extends Product {
  constructor(nama, harga, ukuranMB) {
    super(nama, harga);
    this.ukuranMB = ukuranMB;
  }
  info() {
    return `${super.info()} (digital, ${this.ukuranMB} MB)`;
  }
}

class PhysicalProduct extends Product {
  constructor(nama, harga, beratGram) {
    super(nama, harga);
    this.beratGram = beratGram;
  }
  info() {
    return `${super.info()} (fisik, ${this.beratGram} gram)`;
  }
}

export function latihanClasses() {
  const ebook = new DigitalProduct('E-book JavaScript', 75000, 12);
  const buku = new PhysicalProduct('Buku Tulis', 8000, 150);

  let pesanError = '';
  try {
    buku.harga = -1;
  } catch (e) {
    pesanError = `${e.name}: ${e.message}`;
  }
  buku.harga = 9000;

  // Computed property names + default parameter + destructuring parameter
  const buatObjek = (kunci, nilai) => ({ [kunci]: nilai, [`${kunci}Upper`]: String(nilai).toUpperCase() });
  const buatKartu = ({ nama = 'Tanpa nama', harga = 0 } = {}) => `${nama}: ${formatRupiah(harga)}`;

  return {
    ebook: ebook.info(),
    buku: buku.info(),
    setterMenolak: pesanError,
    ebookInstanceOfProduct: ebook instanceof Product,
    computed: buatObjek('warna', 'biru'),
    kartuDefault: buatKartu(),
    kartuSebagian: buatKartu({ nama: 'Pulpen' }),
  };
}

// ------------------------------------------------------------
// Latihan Modern Array Methods
// ------------------------------------------------------------
export const groupBy = (array, kunci) =>
  array.reduce((hasil, item) => {
    const k = typeof kunci === 'function' ? kunci(item) : item[kunci];
    (hasil[k] ??= []).push(item);
    return hasil;
  }, {});

export const rataRata = (array, properti) =>
  array.length === 0 ? 0 : array.reduce((total, item) => total + item[properti], 0) / array.length;

export function latihanArray() {
  const bersarang = [1, [2, 3], [4, [5, [6]]]];

  // filter + map + reduce: total nilai stok produk elektronik yang tersedia
  const totalStokElektronik = products
    .filter((p) => p.category === 'elektronik' && p.stock > 0)
    .map((p) => p.price * p.stock)
    .reduce((total, n) => total + n, 0);

  const perKategori = groupBy(products, 'category');

  return {
    groupByRole: Object.fromEntries(
      Object.entries(groupBy(users, 'role')).map(([role, anggota]) => [role, anggota.map((u) => u.name)]),
    ),
    jumlahPerKategori: Object.fromEntries(Object.entries(perKategori).map(([k, v]) => [k, v.length])),
    rataRataUmur: rataRata(users, 'age'),
    rataRataHarga: formatRupiah(rataRata(products, 'price')),
    flat: bersarang.flat(Infinity),
    totalStokElektronik: formatRupiah(totalStokElektronik),
  };
}

// ------------------------------------------------------------
// Latihan Async Programming
// ------------------------------------------------------------

/** Mengambil beberapa "endpoint" lalu menggabungkan hasilnya. */
export async function ambilGabungan() {
  const [user, daftarUser, ringkasanProduk] = await Promise.all([
    fetchUserById(1),
    Promise.all([2, 3].map((id) => fetchUserById(id))),
    delay(100, { jumlahProduk: products.length }),
  ]);
  return { user: user.name, rekan: daftarUser.map((u) => u.name), ...ringkasanProduk };
}

/** Retry dengan exponential backoff: jeda 50ms, 100ms, 200ms, ... */
export async function retry(fungsi, { percobaan = 4, jedaAwal = 50 } = {}) {
  const log = [];
  for (let i = 0; i < percobaan; i++) {
    try {
      const hasil = await fungsi(i);
      log.push(`percobaan ${i + 1}: berhasil`);
      return { hasil, log };
    } catch (error) {
      const jeda = jedaAwal * 2 ** i;
      log.push(`percobaan ${i + 1}: gagal (${error.message}), tunggu ${jeda} ms`);
      if (i === percobaan - 1) throw Object.assign(error, { log });
      await delay(jeda);
    }
  }
}

/** Pagination sederhana dengan async/await. */
export async function ambilHalaman(halaman, ukuran = 2) {
  await delay(100);
  const mulai = (halaman - 1) * ukuran;
  const data = users.slice(mulai, mulai + ukuran).map((u) => u.name);
  return { halaman, ukuran, data, adaBerikutnya: mulai + ukuran < users.length };
}

export async function latihanAsync() {
  const gabungan = await ambilGabungan();

  // Fungsi yang gagal 2 kali pertama lalu berhasil
  const takStabil = async (i) => {
    if (i < 2) throw new Error('server sibuk');
    return 'data diterima';
  };
  const dengarRetry = await retry(takStabil);

  const halaman = [];
  for (let p = 1, ada = true; ada; p++) {
    const res = await ambilHalaman(p);
    halaman.push(`halaman ${res.halaman}: ${res.data.join(', ')}`);
    ada = res.adaBerikutnya;
  }

  return { gabungan, retry: dengarRetry, pagination: halaman };
}
