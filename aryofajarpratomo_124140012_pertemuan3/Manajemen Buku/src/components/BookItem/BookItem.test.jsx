import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookItem from './BookItem';

describe('Komponen BookItem', () => {
  const buku = { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' };

  test('menampilkan judul, penulis, dan label status', () => {
    render(<BookItem book={buku} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.getByText('Andrea Hirata')).toBeInTheDocument();
    expect(screen.getByText('Dimiliki')).toBeInTheDocument();
  });

  test('memanggil onEdit dan onDelete dengan data buku', () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(<BookItem book={buku} onEdit={onEdit} onDelete={onDelete} />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit Laskar Pelangi' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hapus Laskar Pelangi' }));

    expect(onEdit).toHaveBeenCalledWith(buku);
    expect(onDelete).toHaveBeenCalledWith(buku);
  });
});
