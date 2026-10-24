import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm';

describe('Komponen BookForm', () => {
  test('menampilkan pesan error dan tidak mengirim data jika form kosong', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    expect(screen.getByText('Judul buku wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Pilih status buku')).toBeInTheDocument();
    expect(screen.getByLabelText('Judul Buku *')).toHaveClass('input-error');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('mengirim data dan mengosongkan form jika input valid', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Judul Buku *'), { target: { value: 'Laskar Pelangi' } });
    fireEvent.change(screen.getByLabelText('Penulis *'), { target: { value: 'Andrea Hirata' } });
    fireEvent.change(screen.getByLabelText('Status *'), { target: { value: 'milik' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      status: 'milik',
    });
    expect(screen.getByLabelText('Judul Buku *')).toHaveValue('');
  });

  test('mode edit mengisi form dengan data buku dan menampilkan tombol Batal', () => {
    const onCancel = vi.fn();
    const buku = { id: 7, title: 'Bumi Manusia', author: 'Pramoedya', status: 'baca' };
    render(<BookForm initialData={buku} onSubmit={vi.fn()} onCancel={onCancel} />);

    expect(screen.getByText('Edit Buku')).toBeInTheDocument();
    expect(screen.getByLabelText('Judul Buku *')).toHaveValue('Bumi Manusia');
    expect(screen.getByLabelText('Status *')).toHaveValue('baca');

    fireEvent.click(screen.getByRole('button', { name: 'Batal' }));
    expect(onCancel).toHaveBeenCalled();
  });
});
