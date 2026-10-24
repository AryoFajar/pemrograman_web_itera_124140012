import React from 'react';
import PropTypes from 'prop-types';
import StatusBadge from '../StatusBadge/StatusBadge';
import './BookItem.css';

/** Satu kartu buku dengan tombol Edit dan Hapus. */
function BookItem({ book, isEditing, onEdit, onDelete }) {
  // Inisial judul sebagai "sampul" sederhana
  const inisial = book.title.trim().charAt(0).toUpperCase();

  return (
    <article className={`book-item ${isEditing ? 'editing' : ''}`}>
      <div className={`book-cover cover-${book.status}`} aria-hidden="true">
        {inisial}
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <StatusBadge status={book.status} />
      </div>
      <div className="book-actions">
        <button
          type="button"
          className="btn btn-small btn-edit"
          onClick={() => onEdit(book)}
          aria-label={`Edit ${book.title}`}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-small btn-danger"
          onClick={() => onDelete(book)}
          aria-label={`Hapus ${book.title}`}
        >
          Hapus
        </button>
      </div>
    </article>
  );
}

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }).isRequired,
  isEditing: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookItem;
