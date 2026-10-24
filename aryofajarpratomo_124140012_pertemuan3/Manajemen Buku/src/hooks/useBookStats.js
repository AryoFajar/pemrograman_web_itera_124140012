import { useMemo } from 'react';
import { STATUS_OPTIONS } from '../utils/bookUtils';

/**
 * Custom hook 2: menghitung statistik koleksi buku.
 * useMemo membuat perhitungan hanya diulang saat daftar buku berubah.
 */
function useBookStats(books) {
  return useMemo(() => {
    const total = books.length;

    // Jumlah dan persentase per status: { milik: {count, percent}, ... }
    const byStatus = {};
    STATUS_OPTIONS.forEach(({ value }) => {
      const count = books.filter((b) => b.status === value).length;
      byStatus[value] = {
        count,
        percent: total > 0 ? Math.round((count / total) * 100) : 0,
      };
    });

    // Penulis dengan buku terbanyak (maksimal 3)
    const perPenulis = books.reduce((acc, b) => {
      const nama = b.author.trim();
      acc[nama] = (acc[nama] || 0) + 1;
      return acc;
    }, {});
    const topAuthors = Object.entries(perPenulis)
      .map(([author, count]) => ({ author, count }))
      .sort((a, b) => b.count - a.count || a.author.localeCompare(b.author))
      .slice(0, 3);

    // Buku yang paling baru ditambahkan
    const latest = [...books].sort((a, b) => b.createdAt - a.createdAt)[0] || null;

    return { total, byStatus, topAuthors, latest };
  }, [books]);
}

export default useBookStats;
