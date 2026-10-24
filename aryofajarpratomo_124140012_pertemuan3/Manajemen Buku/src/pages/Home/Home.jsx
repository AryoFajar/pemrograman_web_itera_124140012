import React, { useState, useEffect } from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import { filterBooks } from '../../utils/bookUtils';
import './Home.css';

function Home() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const { total, byStatus } = useBookStats(books);

  // State lokal halaman: filter, pencarian, buku yang sedang diedit, dan notifikasi
  const [statusFilter, setStatusFilter] = useState('semua');
  const [query, setQuery] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [notice, setNotice] = useState('');

  // useEffect 1: judul tab browser ikut menampilkan jumlah buku
  useEffect(() => {
    document.title = `Manajemen Buku (${total})`;
  }, [total]);

  // useEffect 2: notifikasi hilang otomatis setelah 2,5 detik (timer dibersihkan saat berubah)
  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(''), 2500);
    return () => clearTimeout(timer);
  }, [notice]);

  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
      setNotice(`Perubahan "${data.title.trim()}" disimpan`);
      setEditingBook(null);
    } else {
      addBook(data);
      setNotice(`"${data.title.trim()}" ditambahkan ke koleksi`);
    }
  };

  const handleDelete = (book) => {
    if (window.confirm(`Hapus buku "${book.title}"?`)) {
      deleteBook(book.id);
      if (editingBook?.id === book.id) setEditingBook(null);
      setNotice(`"${book.title}" dihapus`);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  };

  const visibleBooks = filterBooks(books, { status: statusFilter, query });
  const counts = {
    semua: total,
    milik: byStatus.milik.count,
    baca: byStatus.baca.count,
    beli: byStatus.beli.count,
  };

  const emptyMessage =
    books.length === 0
      ? 'Koleksi masih kosong. Tambahkan buku pertama Anda lewat form.'
      : 'Tidak ada buku yang cocok dengan filter atau pencarian.';

  return (
    <div className="page home">
      <header className="page-header">
        <h1>Koleksi Buku Saya</h1>
        <p>Catat buku yang dimiliki, sedang dibaca, atau ingin dibeli.</p>
      </header>

      {notice && (
        <div className="notice" role="status">
          {notice}
        </div>
      )}

      <div className="home-layout">
        <aside className="home-form">
          <BookForm
            key={editingBook ? editingBook.id : 'baru'}
            initialData={editingBook}
            onSubmit={handleSubmit}
            onCancel={() => setEditingBook(null)}
          />
        </aside>

        <section className="home-list">
          <BookFilter
            status={statusFilter}
            query={query}
            counts={counts}
            onStatusChange={setStatusFilter}
            onQueryChange={setQuery}
          />
          <p className="result-info">
            Menampilkan {visibleBooks.length} dari {total} buku
          </p>
          <BookList
            books={visibleBooks}
            editingId={editingBook?.id ?? null}
            emptyMessage={emptyMessage}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </div>
  );
}

export default Home;
