import { renderHook } from '@testing-library/react';
import useBookStats from './useBookStats';

describe('Custom hook useBookStats', () => {
  test('menghitung total, jumlah, dan persentase per status', () => {
    const books = [
      { id: 1, title: 'A', author: 'Andrea Hirata', status: 'milik', createdAt: 1 },
      { id: 2, title: 'B', author: 'Andrea Hirata', status: 'milik', createdAt: 2 },
      { id: 3, title: 'C', author: 'Tere Liye', status: 'baca', createdAt: 3 },
      { id: 4, title: 'D', author: 'Dee Lestari', status: 'beli', createdAt: 4 },
    ];
    const { result } = renderHook(() => useBookStats(books));

    expect(result.current.total).toBe(4);
    expect(result.current.byStatus.milik).toEqual({ count: 2, percent: 50 });
    expect(result.current.byStatus.baca).toEqual({ count: 1, percent: 25 });
    expect(result.current.topAuthors[0]).toEqual({ author: 'Andrea Hirata', count: 2 });
    expect(result.current.latest.id).toBe(4);
  });

  test('menghasilkan nol tanpa error jika daftar kosong', () => {
    const { result } = renderHook(() => useBookStats([]));
    expect(result.current.total).toBe(0);
    expect(result.current.byStatus.beli).toEqual({ count: 0, percent: 0 });
    expect(result.current.latest).toBeNull();
  });
});
