import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './App';

// Uji integrasi: alur lengkap pengguna di aplikasi
describe('Aplikasi Manajemen Buku (integrasi)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  const tambahBuku = (judul, penulis, status) => {
    fireEvent.change(screen.getByLabelText('Judul Buku *'), { target: { value: judul } });
    fireEvent.change(screen.getByLabelText('Penulis *'), { target: { value: penulis } });
    fireEvent.change(screen.getByLabelText('Status *'), { target: { value: status } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));
  };

  test('menambah buku lalu memfilter dan mencarinya', () => {
    render(<App />);
    tambahBuku('Laskar Pelangi', 'Andrea Hirata', 'milik');
    tambahBuku('Bumi Manusia', 'Pramoedya Ananta Toer', 'baca');

    expect(screen.getByText('Menampilkan 2 dari 2 buku')).toBeInTheDocument();

    const filter = screen.getByRole('group', { name: 'Filter status' });
    fireEvent.click(within(filter).getByRole('button', { name: /Sedang Dibaca/ }));
    expect(screen.getByText('Bumi Manusia')).toBeInTheDocument();
    expect(screen.queryByText('Laskar Pelangi')).not.toBeInTheDocument();

    fireEvent.click(within(filter).getByRole('button', { name: /Semua/ }));
    fireEvent.change(screen.getByLabelText('Cari buku'), { target: { value: 'hirata' } });
    expect(screen.getByText('Menampilkan 1 dari 2 buku')).toBeInTheDocument();
  });

  test('menghapus buku setelah konfirmasi', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<App />);
    tambahBuku('Sang Pemimpi', 'Andrea Hirata', 'beli');

    fireEvent.click(screen.getByRole('button', { name: 'Hapus Sang Pemimpi' }));
    expect(window.confirm).toHaveBeenCalled();
    expect(screen.getByText(/Koleksi masih kosong/)).toBeInTheDocument();
  });

  test('navigasi ke halaman Statistik menampilkan jumlah buku', () => {
    render(<App />);
    tambahBuku('Laskar Pelangi', 'Andrea Hirata', 'milik');
    fireEvent.click(screen.getByRole('link', { name: 'Statistik' }));
    expect(screen.getByRole('heading', { name: 'Statistik Koleksi' })).toBeInTheDocument();
    expect(screen.getByText('Penulis Terbanyak')).toBeInTheDocument();
  });
});
