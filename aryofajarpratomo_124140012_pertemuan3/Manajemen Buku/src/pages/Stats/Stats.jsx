import React from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/StatCard/StatCard';
import StatusBadge from '../../components/StatusBadge/StatusBadge';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import { STATUS_OPTIONS } from '../../utils/bookUtils';
import './Stats.css';

/** Halaman statistik: membaca data dari context lalu mengolahnya dengan useBookStats. */
function Stats() {
  const { books } = useBooks();
  const { total, byStatus, topAuthors, latest } = useBookStats(books);

  return (
    <div className="page stats">
      <header className="page-header">
        <h1>Statistik Koleksi</h1>
        <p>Ringkasan buku berdasarkan status dan penulis.</p>
      </header>

      <div className="stat-grid">
        <StatCard label="Total Buku" value={total} />
        {STATUS_OPTIONS.map((opt) => (
          <StatCard
            key={opt.value}
            label={opt.label}
            value={byStatus[opt.value].count}
            percent={byStatus[opt.value].percent}
            variant={opt.value}
          />
        ))}
      </div>

      {total === 0 ? (
        <div className="stats-empty">
          Belum ada data. <Link to="/">Tambahkan buku</Link> untuk melihat statistik.
        </div>
      ) : (
        <div className="stats-panels">
          <section className="panel">
            <h2>Penulis Terbanyak</h2>
            <ol className="author-list">
              {topAuthors.map((item) => (
                <li key={item.author}>
                  <span>{item.author}</span>
                  <strong>{item.count} buku</strong>
                </li>
              ))}
            </ol>
          </section>

          <section className="panel">
            <h2>Terakhir Ditambahkan</h2>
            {latest && (
              <div className="latest-book">
                <p className="latest-title">{latest.title}</p>
                <p className="latest-author">{latest.author}</p>
                <StatusBadge status={latest.status} />
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default Stats;
