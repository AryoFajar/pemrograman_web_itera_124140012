/**
 * Konstanta dan fungsi bantu murni (tanpa React) untuk data buku.
 * Dipisah dari komponen supaya mudah diuji dan dipakai ulang.
 */

// Tiga status buku sesuai ketentuan tugas
export const STATUS_OPTIONS = [
  { value: 'milik', label: 'Dimiliki' },
  { value: 'baca', label: 'Sedang Dibaca' },
  { value: 'beli', label: 'Ingin Dibeli' },
];

export const STATUS_LABEL = Object.fromEntries(
  STATUS_OPTIONS.map((opt) => [opt.value, opt.label])
);

/**
 * Menyaring buku berdasarkan status dan kata kunci (judul atau penulis).
 * Pencarian tidak membedakan huruf besar/kecil.
 */
export function filterBooks(books, { status = 'semua', query = '' } = {}) {
  const keyword = query.trim().toLowerCase();

  return books.filter((book) => {
    const cocokStatus = status === 'semua' || book.status === status;
    const cocokKata =
      keyword === '' ||
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword);
    return cocokStatus && cocokKata;
  });
}

/** Validasi isian form. Mengembalikan objek error (kosong berarti valid). */
export function validateBook({ title = '', author = '', status = '' }) {
  const errors = {};
  if (!title.trim()) errors.title = 'Judul buku wajib diisi';
  if (!author.trim()) errors.author = 'Nama penulis wajib diisi';
  if (!STATUS_LABEL[status]) errors.status = 'Pilih status buku';
  return errors;
}
