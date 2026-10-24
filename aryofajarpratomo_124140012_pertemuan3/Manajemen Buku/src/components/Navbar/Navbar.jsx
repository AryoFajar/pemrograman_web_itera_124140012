import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import './Navbar.css';

function Navbar() {
  const { books } = useBooks();

  // NavLink memberi class "active" otomatis pada menu halaman yang sedang dibuka
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-icon" aria-hidden="true">📚</span>
          Manajemen Buku
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Koleksi <span className="nav-count">{books.length}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/stats">Statistik</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
