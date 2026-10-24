# Modul Pertemuan 3 – React Task Manager

Latihan praktikum yang mengikuti modul pertemuan 3, disusun sebagai satu proyek React (Vite).

## Cara Menjalankan (VS Code)

1. Buka folder `Modul` di VS Code, lalu buka terminal (**Ctrl + `**).
2. Pasang dependensi: `npm install`
3. Jalankan aplikasi: `npm run dev`, lalu buka alamat yang muncul (biasanya `http://localhost:5173`).
4. Jalankan unit test: `npm test`

## Materi yang Dikerjakan

| No | Materi | Berkas |
|----|--------|--------|
| 1 | Setup React (Vite) + latihan warna header `#0d9488` | `vite.config.js`, `src/App.css` |
| 2 | Components & Props: Header, TaskItem, TaskForm | `src/components/*` |
| 3 | State & Hooks: Uji Coba Counter dan Array State | `src/pages/Latihan/Latihan.jsx` (rute `/latihan`) |
| 4 | Routing: Navbar, halaman Beranda dan Tentang | `src/components/Navbar`, `src/pages/About`, `src/App.jsx` |
| 5 | Custom Hook: `useLocalStorage`, `useWindowSize` | `src/hooks/*` |
| 6 | Context API: `TaskContext` + `useTasks()` | `src/context/TaskContext.jsx` |
| 7 | Testing: 3 unit test untuk TaskItem | `src/components/TaskItem/TaskItem.test.jsx` |

## Latihan Mandiri

| Materi | Latihan | Lokasi |
|--------|---------|--------|
| Components & Props | Komponen `Card` dengan `props.children` membungkus `TaskForm` | `src/components/Card/`, `src/pages/Home/Home.jsx` |
| State & Hooks | Tombol **Hapus Semua Tugas** dengan `window.confirm()` | `src/pages/Home/Home.jsx` |
| Routing | Halaman 404 dengan rute `path="*"` (coba buka `/halaman-salah`) | `src/pages/NotFound/` |
| Custom Hook | Badge **Mode Layar Mobile / Desktop** dari `useWindowSize()` | `src/pages/Home/Home.jsx` |
| Context API | Kalimat jumlah tugas di halaman Tentang memakai `useTasks()` | `src/pages/About/About.jsx` |
