import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_OPTIONS } from '../../utils/bookUtils';
import './BookFilter.css';

/** Kotak pencarian + tombol filter status. Tidak menyimpan state sendiri (controlled). */
function BookFilter({ status, query, counts, onStatusChange, onQueryChange }) {
  const pilihan = [{ value: 'semua', label: 'Semua' }, ...STATUS_OPTIONS];

  return (
    <div className="book-filter">
      <input
        type="search"
        className="search-input"
        placeholder="Cari judul atau penulis..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label="Cari buku"
      />
      <div className="filter-buttons" role="group" aria-label="Filter status">
        {pilihan.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`filter-btn ${status === opt.value ? 'active' : ''}`}
            aria-pressed={status === opt.value}
            onClick={() => onStatusChange(opt.value)}
          >
            {opt.label}
            <span className="filter-count">{counts[opt.value] ?? 0}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  status: PropTypes.oneOf(['semua', 'milik', 'baca', 'beli']).isRequired,
  query: PropTypes.string.isRequired,
  counts: PropTypes.objectOf(PropTypes.number).isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};

export default BookFilter;
