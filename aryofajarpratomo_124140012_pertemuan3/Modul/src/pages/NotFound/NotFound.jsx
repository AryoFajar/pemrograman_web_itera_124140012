import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

// Latihan Mandiri (Routing): halaman fallback untuk URL yang tidak terdaftar
function NotFound() {
  return (
    <main className="container not-found">
      <h1>404</h1>
      <p>Halaman yang Anda cari tidak ditemukan.</p>
      <Link to="/" className="back-link">Kembali ke Beranda</Link>
    </main>
  );
}

export default NotFound;
