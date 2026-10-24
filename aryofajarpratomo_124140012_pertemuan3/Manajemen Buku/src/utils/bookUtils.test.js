import { filterBooks, validateBook } from './bookUtils';

const books = [
  { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' },
  { id: 2, title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', status: 'baca' },
  { id: 3, title: 'Sang Pemimpi', author: 'Andrea Hirata', status: 'beli' },
];

describe('filterBooks', () => {
  test('memfilter berdasarkan status', () => {
    const hasil = filterBooks(books, { status: 'baca' });
    expect(hasil.map((b) => b.id)).toEqual([2]);
  });

  test('mencari berdasarkan nama penulis tanpa membedakan huruf besar/kecil', () => {
    const hasil = filterBooks(books, { query: 'andrea' });
    expect(hasil.map((b) => b.id)).toEqual([1, 3]);
  });

  test('menggabungkan filter status dan pencarian judul', () => {
    const hasil = filterBooks(books, { status: 'beli', query: 'pemimpi' });
    expect(hasil.map((b) => b.id)).toEqual([3]);
  });
});

describe('validateBook', () => {
  test('mengembalikan error untuk semua kolom yang kosong', () => {
    expect(validateBook({ title: '  ', author: '', status: '' })).toEqual({
      title: 'Judul buku wajib diisi',
      author: 'Nama penulis wajib diisi',
      status: 'Pilih status buku',
    });
  });

  test('tidak mengembalikan error jika data lengkap', () => {
    expect(validateBook({ title: 'Ronggeng', author: 'Ahmad Tohari', status: 'milik' })).toEqual({});
  });
});
