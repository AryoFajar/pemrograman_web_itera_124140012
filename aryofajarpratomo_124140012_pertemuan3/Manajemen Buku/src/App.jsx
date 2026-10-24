import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import NotFound from './pages/NotFound/NotFound';

/**
 * Struktur aplikasi:
 * BrowserRouter (navigasi) > BookProvider (state global buku) > Navbar + halaman
 */
function App() {
  return (
    <BrowserRouter>
      <BookProvider>
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="app-footer">
          Tugas Praktikum Pemrograman Web · Pertemuan 3 · Aryo Fajar Pratomo (124140012)
        </footer>
      </BookProvider>
    </BrowserRouter>
  );
}

export default App;
