import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext(null);

/** Hook untuk membaca context. Error jika dipakai di luar BookProvider. */
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

/**
 * Menyediakan state buku global + aksi CRUD ke seluruh aplikasi,
 * sehingga halaman Home dan Stats tidak perlu oper props (prop drilling).
 */
export function BookProvider({ children, storageKey = 'books_data' }) {
  const [books, setBooks] = useLocalStorage(storageKey, []);

  const addBook = ({ title, author, status }) => {
    const now = Date.now();
    const newBook = {
      id: now + Math.floor(Math.random() * 1000), // id unik sederhana
      title: title.trim(),
      author: author.trim(),
      status,
      createdAt: now,
      updatedAt: now,
    };
    // Bentuk fungsi (prev => ...) supaya aman jika dipanggil berturut-turut
    setBooks((prev) => [newBook, ...prev]);
    return newBook;
  };

  const updateBook = (id, changes) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id
          ? {
              ...book,
              title: changes.title.trim(),
              author: changes.author.trim(),
              status: changes.status,
              updatedAt: Date.now(),
            }
          : book
      )
    );
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const value = { books, addBook, updateBook, deleteBook };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
  storageKey: PropTypes.string,
};
