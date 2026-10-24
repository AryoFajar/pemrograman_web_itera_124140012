import { useState, useEffect } from 'react';

/**
 * Custom hook 1: state yang otomatis tersimpan di localStorage.
 * Pemakaiannya sama seperti useState: const [nilai, setNilai] = useLocalStorage(key, awal)
 */
function useLocalStorage(key, initialValue) {
  // Lazy initializer: localStorage hanya dibaca sekali saat komponen pertama dimuat
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Data rusak / localStorage tidak tersedia: pakai nilai awal
      console.error(`Gagal membaca localStorage "${key}":`, error);
      return initialValue;
    }
  });

  // Simpan ulang setiap kali nilai berubah
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Gagal menyimpan localStorage "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
