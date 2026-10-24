import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from './BookFilter';

describe('Komponen BookFilter', () => {
  const counts = { semua: 3, milik: 1, baca: 1, beli: 1 };

  test('memanggil onStatusChange saat tombol status diklik', () => {
    const onStatusChange = vi.fn();
    render(
      <BookFilter status="semua" query="" counts={counts} onStatusChange={onStatusChange} onQueryChange={vi.fn()} />
    );
    fireEvent.click(screen.getByRole('button', { name: /Sedang Dibaca/ }));
    expect(onStatusChange).toHaveBeenCalledWith('baca');
  });

  test('memanggil onQueryChange saat mengetik di kotak pencarian', () => {
    const onQueryChange = vi.fn();
    render(
      <BookFilter status="semua" query="" counts={counts} onStatusChange={vi.fn()} onQueryChange={onQueryChange} />
    );
    fireEvent.change(screen.getByLabelText('Cari buku'), { target: { value: 'andrea' } });
    expect(onQueryChange).toHaveBeenCalledWith('andrea');
  });
});
