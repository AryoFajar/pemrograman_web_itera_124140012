import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { STATUS_OPTIONS, validateBook } from '../../utils/bookUtils';
import './BookForm.css';

const EMPTY_FORM = { title: '', author: '', status: '' };

/**
 * Form tambah dan edit buku (reusable).
 * - Mode tambah: initialData = null
 * - Mode edit: initialData berisi buku yang sedang diedit (pakai `key` agar form di-reset)
 */
function BookForm({ initialData, onSubmit, onCancel }) {
  // State awal diambil dari buku yang diedit (mode edit) atau form kosong (mode tambah).
  // Home memberi `key` berbeda untuk setiap buku, jadi form dibuat ulang saat target edit berganti.
  const [form, setForm] = useState(() =>
    initialData
      ? { title: initialData.title, author: initialData.author, status: initialData.status }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});
  const isEdit = Boolean(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Hapus pesan error kolom yang sedang diperbaiki
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateBook(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // tampilkan feedback visual
      return;
    }
    onSubmit(form);
    if (!isEdit) setForm(EMPTY_FORM);
  };

  return (
    <form className={`book-form ${isEdit ? 'is-edit' : ''}`} onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">{isEdit ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>

      <div className="form-group">
        <label htmlFor="title">Judul Buku *</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Contoh: Laskar Pelangi"
          value={form.title}
          onChange={handleChange}
          className={errors.title ? 'input-error' : ''}
          aria-invalid={Boolean(errors.title)}
        />
        {errors.title && <p className="error-text" role="alert">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="author">Penulis *</label>
        <input
          id="author"
          name="author"
          type="text"
          placeholder="Contoh: Andrea Hirata"
          value={form.author}
          onChange={handleChange}
          className={errors.author ? 'input-error' : ''}
          aria-invalid={Boolean(errors.author)}
        />
        {errors.author && <p className="error-text" role="alert">{errors.author}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Status *</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
          className={errors.status ? 'input-error' : ''}
          aria-invalid={Boolean(errors.status)}
        >
          <option value="">-- Pilih status --</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.status && <p className="error-text" role="alert">{errors.status}</p>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        {isEdit && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Batal
          </button>
        )}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  initialData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};


export default BookForm;
