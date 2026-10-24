import React from 'react';
import PropTypes from 'prop-types';
import BookItem from '../BookItem/BookItem';
import './BookList.css';

/** Daftar buku. Menampilkan pesan kosong jika tidak ada data. */
function BookList({ books, editingId = null, emptyMessage = 'Belum ada buku.', onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">📖</span>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          isEditing={book.id === editingId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  editingId: PropTypes.number,
  emptyMessage: PropTypes.string,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
