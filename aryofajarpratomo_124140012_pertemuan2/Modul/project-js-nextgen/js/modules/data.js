import { delay } from './utils.js';

// Data contoh pengguna dan produk
export const users = [
  { id: 1, name: 'Aryo Fajar', age: 20, role: 'admin', city: 'Bandar Lampung' },
  { id: 2, name: 'Budi Santoso', age: 22, role: 'mahasiswa', city: 'Metro' },
  { id: 3, name: 'Citra Lestari', age: 19, role: 'mahasiswa', city: 'Pringsewu' },
  { id: 4, name: 'Dewi Anggraini', age: 24, role: 'dosen', city: 'Bandar Lampung' },
  { id: 5, name: 'Eko Prasetyo', age: 21, role: 'mahasiswa', city: 'Kalianda' },
];

export const products = [
  { id: 101, name: 'Laptop', price: 8500000, category: 'elektronik', stock: 5 },
  { id: 102, name: 'Mouse', price: 120000, category: 'elektronik', stock: 40 },
  { id: 103, name: 'Buku Tulis', price: 8000, category: 'alat tulis', stock: 200 },
  { id: 104, name: 'Pulpen', price: 3500, category: 'alat tulis', stock: 0 },
  { id: 105, name: 'Headset', price: 250000, category: 'elektronik', stock: 12 },
  { id: 106, name: 'Penggaris', price: 5000, category: 'alat tulis', stock: 75 },
];

/**
 * Simulasi pemanggilan API: mengembalikan Promise yang selesai setelah 300 ms.
 * Resolve dengan data user, atau reject jika id tidak ditemukan.
 */
export const fetchUserById = async (id, waktu = 300) => {
  await delay(waktu);
  const user = users.find((u) => u.id === id);
  if (!user) throw new Error(`User dengan id ${id} tidak ditemukan`);
  return user;
};
