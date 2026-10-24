import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

/** Halaman fallback untuk URL yang tidak terdaftar. */
function NotFound() {
  return (
    <div className="page not-found">
      <p className="nf-code">404</p>
      <h1>Halaman tidak ditemukan</h1>
      <p>Alamat yang Anda buka tidak ada di aplikasi ini.</p>
      <Link to="/" className="btn btn-primary">Kembali ke Koleksi</Link>
    </div>
  );
}

export default NotFound;
