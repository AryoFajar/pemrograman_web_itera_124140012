// Kumpulan demo fitur JavaScript Next Gen (ES6+).
// Setiap fungsi mengembalikan objek hasil; main.js yang menampilkannya ke layar.
import { users, products, fetchUserById } from './modules/data.js';
import { formatRupiah, capitalize, delay } from './modules/utils.js';

// ============================================================
// 1. Let, Const & Scope
// ============================================================
export function demoVariables() {
  const hasil = {};

  // var: function-scoped, nilai di luar blok ikut tertimpa
  var a = 'luar';
  {
    var a = 'dalam';
  }
  hasil.varBocor = a; // 'dalam'

  // let: block-scoped, nilai di luar blok aman
  let b = 'luar';
  {
    let b = 'dalam';
  }
  hasil.letAman = b; // 'luar'

  // const: referensi tetap, isi objek tetap boleh diubah
  const mahasiswa = { nama: 'Aryo', nim: '124140012' };
  mahasiswa.nama = 'Aryo Fajar Pratomo';
  hasil.constUbahProperti = mahasiswa;

  try {
    mahasiswa = {}; // reassignment -> error
  } catch (error) {
    hasil.constReassign = `${error.name}: ${error.message}`;
  }

  // Temporal Dead Zone: let/const tidak bisa diakses sebelum dideklarasikan
  try {
    void belumAda;
    let belumAda = 1;
  } catch (error) {
    hasil.tdz = `${error.name}: ${error.message}`;
  }

  return hasil;
}

// ============================================================
// 2. Arrow Functions
// ============================================================
export function demoArrowFunctions() {
  // Fungsi biasa
  function regularSum(x, y) {
    return x + y;
  }

  // Variasi arrow function
  const arrowSum = (x, y) => {
    return x + y;
  };
  const shortArrowSum = (x, y) => x + y; // implicit return
  const sayHello = (nama) => `Halo, ${nama}!`;
  const square = (n) => n * n; // tanpa kurung jika satu parameter
  const buatObjek = (nama) => ({ nama }); // objek literal wajib dibungkus ( )

  // Arrow function mewarisi `this` dari scope luar
  const penghitung = {
    nilai: 0,
    tambahTiga() {
      [1, 2, 3].forEach(() => this.nilai++); // this = penghitung
      return this.nilai;
    },
  };

  return {
    regularSum: regularSum(2, 3),
    arrowSum: arrowSum(2, 3),
    shortArrowSum: shortArrowSum(2, 3),
    sayHello: sayHello('Aryo'),
    square: square(7),
    buatObjek: buatObjek('Aryo'),
    thisDariScopeLuar: penghitung.tambahTiga(),
  };
}

// ============================================================
// 3. Template Literals
// ============================================================
export function demoTemplateLiterals() {
  const nama = 'Aryo Fajar Pratomo';
  const nim = '124140012';
  const tahunMasuk = 2024;

  // Tagged template: menandai nilai yang disisipkan dengan [ ]
  const sorot = (strings, ...nilai) =>
    strings.reduce((hasil, str, i) => hasil + str + (i < nilai.length ? `[${nilai[i]}]` : ''), '');

  return {
    oldWay: 'Nama: ' + nama + ', NIM: ' + nim + '.',
    newWay: `Nama: ${nama}, NIM: ${nim}.`,
    multiLine: `Praktikum Pemrograman Aplikasi Web
Nama : ${nama}
NIM  : ${nim}`,
    expression: `Masuk ${tahunMasuk}, estimasi lulus ${tahunMasuk + 4} (${tahunMasuk + 4 > 2027 ? 'masih lama' : 'segera'})`,
    formatRupiah: `Harga laptop: ${formatRupiah(products[0].price)}`,
    tagged: sorot`Halo ${nama}, NIM ${nim}`,
  };
}

// ============================================================
// 4a. Destructuring
// ============================================================
export function demoDestructuring() {
  const user = {
    id: 1,
    name: 'Aryo',
    email: 'aryo@itera.ac.id',
    address: { city: 'Bandar Lampung', geo: { lat: -5.36, lng: 105.31 } },
  };

  // Objek dasar, rename, default, nested
  const { name, email } = user;
  const { name: namaPengguna } = user; // rename
  const { phone = 'tidak ada' } = user; // nilai default
  const {
    address: {
      city,
      geo: { lat },
    },
  } = user; // nested

  // Array: urut berdasarkan indeks, skip, rest, swap
  const warna = ['merah', 'hijau', 'biru', 'kuning'];
  const [pertama, kedua] = warna;
  const [, , ketiga] = warna; // skip dua elemen pertama
  const [kepala, ...sisa] = warna; // rest

  let x = 1;
  let y = 2;
  [x, y] = [y, x]; // swap tanpa variabel sementara

  // Destructuring di parameter fungsi
  const sapa = ({ name, address: { city } }) => `${name} dari ${city}`;

  return {
    objekDasar: { name, email },
    rename: namaPengguna,
    nilaiDefault: phone,
    nested: { city, lat },
    arrayDasar: { pertama, kedua },
    arraySkip: ketiga,
    arrayRest: { kepala, sisa },
    swap: { x, y },
    diParameter: sapa(user),
  };
}

// ============================================================
// 4b. Spread & Rest
// ============================================================
export function demoSpreadRest() {
  // Spread array
  const a = [1, 2, 3];
  const b = [4, 5];
  const salinan = [...a];
  salinan.push(99); // array asli tidak berubah
  const gabungan = [...a, ...b];
  const disisipi = [0, ...a, 3.5, ...b];

  // Spread objek (menggabung dan menimpa)
  const dasar = { nama: 'Aryo', kota: 'Lampung', tahun: 2024 };
  const tambahan = { tahun: 2025, hobi: 'coding' };
  const objekGabungan = { ...dasar, ...tambahan }; // tahun tertimpa

  // Rest parameter: menampung sisa argumen menjadi array
  const jumlahkan = (label, ...angka) =>
    `${label}: ${angka.join(' + ')} = ${angka.reduce((total, n) => total + n, 0)}`;

  // Spread adalah shallow copy
  const asli = { nama: 'A', alamat: { kota: 'Metro' } };
  const dangkal = { ...asli };
  dangkal.alamat.kota = 'Pringsewu'; // ikut mengubah objek asli
  const dalam = structuredClone({ nama: 'A', alamat: { kota: 'Metro' } });

  return {
    salinanBerubah: salinan,
    asliTidakBerubah: a,
    gabungan,
    disisipi,
    objekGabungan,
    restParameter: jumlahkan('Total', 10, 20, 30, 40),
    shallowCopy: { asliSetelahUbahSalinan: asli.alamat.kota },
    deepCopy: dalam.alamat.kota,
  };
}

// ============================================================
// 5a. Default Parameters
// ============================================================
export function demoDefaultParams() {
  // Cara lama (ES5): operator || menimpa nilai falsy seperti 0
  function hitungLama(nilai) {
    nilai = nilai || 10;
    return nilai;
  }
  // ES6: default hanya dipakai jika argumen undefined
  const hitungBaru = (nilai = 10) => nilai;

  const greet = (nama = 'Tamu') => `Halo, ${nama}!`;

  const createUser = (name, role = 'mahasiswa', createdAt = '2026-10-16') => ({
    name,
    role,
    createdAt,
  });

  // Default bisa berupa ekspresi dan merujuk parameter sebelumnya
  const createOrder = (price, quantity = 1, total = price * quantity) => ({
    price,
    quantity,
    total,
  });

  // Kombinasi default parameter + destructuring
  const buatProfil = ({ nama = 'Anonim', angkatan = 2024 } = {}) => `${nama} (${angkatan})`;

  return {
    es5_nol: hitungLama(0), // 10 -> salah
    es6_nol: hitungBaru(0), // 0  -> benar
    greetTanpaArgumen: greet(),
    greetDenganArgumen: greet('Aryo'),
    createUser: createUser('Aryo'),
    createOrder: createOrder(15000, 3),
    profilKosong: buatProfil(),
    profilSebagian: buatProfil({ nama: 'Aryo' }),
  };
}

// ============================================================
// 5b. ES6 Classes
// ============================================================
class User {
  static jumlah = 0; // static property
  #password; // private field

  constructor(name, email, password = 'rahasia') {
    this.name = name;
    this.email = email;
    this.#password = password;
    User.jumlah++;
  }

  get inisial() {
    return this.name
      .split(' ')
      .map((kata) => kata[0])
      .join('')
      .toUpperCase();
  }

  set namaBaru(nilai) {
    this.name = capitalize(nilai.trim());
  }

  cekPassword(coba) {
    return coba === this.#password;
  }

  describe() {
    return `${this.name} <${this.email}>`;
  }

  static banding(a, b) {
    return a.name.localeCompare(b.name);
  }
}

class Admin extends User {
  constructor(name, email, level = 1) {
    super(name, email); // wajib dipanggil sebelum memakai this
    this.level = level;
  }

  describe() {
    return `${super.describe()} [admin level ${this.level}]`;
  }
}

export function demoClasses() {
  User.jumlah = 0; // reset agar hasil sama setiap kali Run Demo diklik
  const user = new User('Budi Santoso', 'budi@itera.ac.id');
  const admin = new Admin('Aryo Fajar', 'aryo@itera.ac.id', 2);
  user.namaBaru = '  BUDI  ';

  return {
    userDescribe: user.describe(),
    adminDescribe: admin.describe(),
    inisialAdmin: admin.inisial, // getter
    setterNamaBaru: user.name, // setelah setter
    passwordBenar: user.cekPassword('rahasia'),
    passwordSalah: user.cekPassword('salah'),
    jumlahInstance: User.jumlah, // static
    urutNama: [admin, user].sort(User.banding).map((u) => u.name),
    adminInstanceOfUser: admin instanceof User,
    userInstanceOfAdmin: user instanceof Admin,
    tipeClass: typeof User, // 'function' -> class = syntactic sugar
  };
}

// ============================================================
// 5c. Enhanced Object Literals
// ============================================================
export function demoObjectLiterals() {
  const nama = 'Aryo';
  const nim = '124140012';
  const kunci = 'matakuliah';
  let urutan = 0;

  const objek = {
    // property shorthand
    nama,
    nim,
    // method shorthand
    sapa() {
      return `Halo, saya ${this.nama}`;
    },
    // computed property names
    [kunci]: 'PAW',
    [`field_${++urutan}`]: 'nilai dinamis 1',
    [`field_${++urutan}`]: 'nilai dinamis 2',
  };

  return { objek, sapa: objek.sapa() };
}

// ============================================================
// 6a. Modern Array Methods
// ============================================================
export function demoArrayMethods() {
  const angka = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const kuadrat = angka.map((n) => n * n);
  const genap = angka.filter((n) => n % 2 === 0);
  const pertamaLebihDari5 = angka.find((n) => n > 5);
  const jumlah = angka.reduce((total, n) => total + n, 0);
  const terbesar = angka.reduce((max, n) => (n > max ? n : max), angka[0]);

  // Pengelompokan dengan reduce
  const perRole = users.reduce((hasil, { role, name }) => {
    (hasil[role] ??= []).push(name);
    return hasil;
  }, {});

  // Pengolahan data produk dengan chaining
  const elektronikTersedia = products
    .filter((p) => p.category === 'elektronik' && p.stock > 0)
    .map(({ name, price }) => `${name} - ${formatRupiah(price)}`);
  const nilaiStok = products.reduce((total, p) => total + p.price * p.stock, 0);

  return {
    kuadrat,
    genap,
    pertamaLebihDari5,
    jumlah,
    terbesar,
    adaMahasiswaDewasa: users.some((u) => u.role === 'mahasiswa' && u.age >= 22),
    semuaBerumur17Plus: users.every((u) => u.age >= 17),
    perRole,
    elektronikTersedia,
    nilaiTotalStok: formatRupiah(nilaiStok),
  };
}

// ============================================================
// 6b. Advanced Array Features
// ============================================================
export function demoAdvancedArrays() {
  const asli = [1, 2, 3];
  const klon = [...asli];
  klon.push(4);

  return {
    clone: { asli, klon },
    arrayFrom: Array.from({ length: 5 }, (_, i) => i * 2),
    arrayFromString: Array.from('ITERA'),
    arrayOf: Array.of(7, 8, 9),
    flat: [1, [2, [3, [4]]]].flat(Infinity),
    flatMap: ['ab cd', 'ef'].flatMap((kata) => kata.split(' ')),
    includes: {
      adaDua: asli.includes(2),
      adaTujuh: asli.includes(7),
    },
  };
}

// ============================================================
// 7a. Promises
// ============================================================
export async function demoPromises() {
  // Promise dasar
  const dasar = await new Promise((resolve) => setTimeout(() => resolve('Promise dasar selesai'), 200));

  // Promise chaining
  const rantai = await Promise.resolve(2)
    .then((n) => n * 3)
    .then((n) => n + 1);

  // Promise.all: semua berjalan paralel, gagal jika salah satu gagal
  const semua = await Promise.all([fetchUserById(1), fetchUserById(2), fetchUserById(3)]);

  // Promise.race: hasil promise tercepat
  const balapan = await Promise.race([delay(300, 'lambat'), delay(100, 'cepat')]);

  // Promise.allSettled: menunggu semua, berhasil maupun gagal
  const hasilAkhir = await Promise.allSettled([fetchUserById(1), fetchUserById(99)]);

  // catch dan finally
  let catatan = '';
  await fetchUserById(99)
    .catch((e) => {
      catatan = `catch: ${e.message}`;
    })
    .finally(() => {
      catatan += ' | finally dijalankan';
    });

  return {
    dasar,
    rantai,
    all: semua.map((u) => u.name),
    race: balapan,
    allSettled: hasilAkhir.map((h) => (h.status === 'fulfilled' ? `fulfilled: ${h.value.name}` : `rejected: ${h.reason.message}`)),
    catatan,
  };
}

// ============================================================
// 7b. Async / Await
// ============================================================
export async function demoAsyncAwait() {
  const hasil = {};

  // Satu user
  const satu = await fetchUserById(1);
  hasil.satuUser = satu.name;

  // Berurutan (bergantung satu sama lain) vs paralel (independen)
  let mulai = performance.now();
  const u1 = await fetchUserById(1);
  const u2 = await fetchUserById(2);
  const u3 = await fetchUserById(3);
  hasil.berurutan = `${[u1, u2, u3].map((u) => u.name).join(', ')} (~${Math.round(performance.now() - mulai)} ms)`;

  mulai = performance.now();
  const paralel = await Promise.all([1, 2, 3].map((id) => fetchUserById(id)));
  hasil.paralel = `${paralel.map((u) => u.name).join(', ')} (~${Math.round(performance.now() - mulai)} ms)`;

  // Penanganan error dengan try/catch
  try {
    await fetchUserById(404);
  } catch (error) {
    hasil.errorDitangkap = error.message;
  }

  return hasil;
}
