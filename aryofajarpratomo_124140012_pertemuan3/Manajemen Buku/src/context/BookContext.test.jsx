import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { BookProvider, useBooks } from './BookContext';

const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>;

describe('BookContext', () => {
  beforeEach(() => window.localStorage.clear());

  test('menambah, mengedit, dan menghapus buku', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });

    act(() => {
      result.current.addBook({ title: ' Laskar Pelangi ', author: 'Andrea Hirata', status: 'beli' });
    });
    expect(result.current.books).toHaveLength(1);
    expect(result.current.books[0].title).toBe('Laskar Pelangi'); // spasi dipangkas
    const id = result.current.books[0].id;

    act(() => {
      result.current.updateBook(id, { title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' });
    });
    expect(result.current.books[0].status).toBe('milik');

    act(() => result.current.deleteBook(id));
    expect(result.current.books).toHaveLength(0);
  });

  test('data buku tersimpan di localStorage', () => {
    const { result } = renderHook(() => useBooks(), { wrapper });
    act(() => {
      result.current.addBook({ title: 'Bumi Manusia', author: 'Pramoedya', status: 'baca' });
    });
    const tersimpan = JSON.parse(window.localStorage.getItem('books_data'));
    expect(tersimpan[0].title).toBe('Bumi Manusia');
  });

  test('melempar error jika useBooks dipakai di luar BookProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useBooks())).toThrow('useBooks harus digunakan di dalam BookProvider');
    spy.mockRestore();
  });
});
