import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('Custom hook useLocalStorage', () => {
  beforeEach(() => window.localStorage.clear());

  test('menyimpan nilai baru ke localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('uji', []));
    act(() => result.current[1](['buku']));
    expect(JSON.parse(window.localStorage.getItem('uji'))).toEqual(['buku']);
  });

  test('membaca nilai yang sudah tersimpan sebelumnya', () => {
    window.localStorage.setItem('uji', JSON.stringify([{ id: 1 }]));
    const { result } = renderHook(() => useLocalStorage('uji', []));
    expect(result.current[0]).toEqual([{ id: 1 }]);
  });

  test('memakai nilai awal jika isi localStorage rusak', () => {
    window.localStorage.setItem('uji', '{bukan json');
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useLocalStorage('uji', []));
    expect(result.current[0]).toEqual([]);
    spy.mockRestore();
  });
});
