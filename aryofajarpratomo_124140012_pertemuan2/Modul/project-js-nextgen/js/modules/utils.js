// Fungsi bantuan yang di-export agar bisa di-import file lain (ES Modules).

/** Format angka ke Rupiah, contoh: 15000 -> "Rp 15.000" */
export const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka);

/** Huruf pertama kapital, sisanya kecil: "jAvAsCrIpT" -> "Javascript" */
export const capitalize = (teks) =>
  teks ? teks.charAt(0).toUpperCase() + teks.slice(1).toLowerCase() : '';

/** Promise yang selesai setelah ms milidetik dan mengembalikan value. */
export const delay = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));
