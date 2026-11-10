"""Sistem Manajemen Perpustakaan Sederhana - Tugas Praktikum Pertemuan 5.

Nama  : Aryo Fajar Pratomo
NIM   : 124140012
Kelas : RA

Cara menjalankan:
    python main.py          -> demo lengkap seluruh fitur
    python main.py --menu   -> mode menu interaktif
"""
import sys
from datetime import date, timedelta

from library import Library
from library_item import Book, LibraryItem, Magazine, format_rupiah
from member import Member


def judul_bagian(nomor, teks):
    print("\n" + "=" * 78)
    print(f" {nomor}. {teks}")
    print("=" * 78)


def siapkan_perpustakaan():
    """Membuat perpustakaan berisi beberapa buku, majalah, dan anggota."""
    perpus = Library("Perpustakaan ITERA")
    koleksi = [
        Book("BK-001", "Python Crash Course", 2023, "Eric Matthes",
             "978-1718502703", 552),
        Book("BK-002", "Clean Code", 2008, "Robert C. Martin",
             "978-0132350884", 464),
        Book("BK-003", "Fluent Python", 2022, "Luciano Ramalho",
             "978-1492056355", 1012),
        Magazine("MJ-001", "National Geographic Indonesia", 2026,
                 "Oktober 2026", "Kompas Gramedia"),
        Magazine("MJ-002", "Majalah Info Komputer", 2026,
                 "November 2026", "InfoKomputer"),
    ]
    for item in koleksi:
        perpus.tambah_item(item)
    perpus.daftarkan_anggota(Member("A01", "aryo fajar pratomo"))
    perpus.daftarkan_anggota(Member("A02", "nabila putri"))
    return perpus


def demo():
    print("SISTEM MANAJEMEN PERPUSTAKAAN SEDERHANA")
    print("Aryo Fajar Pratomo | 124140012 | RA")

    judul_bagian(1, "MENAMBAHKAN ITEM DAN ANGGOTA")
    perpus = siapkan_perpustakaan()
    print(f"\n  Total koleksi: {perpus.jumlah_koleksi} item "
          f"| tersedia: {perpus.jumlah_tersedia}")
    try:
        perpus.tambah_item(Book("BK-001", "Duplikat", 2020, "-", "-", 10))
    except ValueError as e:
        print(f"  [!] Gagal menambah item: {e}")

    judul_bagian(2, "MENAMPILKAN KATALOG (POLYMORPHISM)")
    perpus.tampilkan_katalog()

    judul_bagian(3, "MENCARI ITEM BERDASARKAN JUDUL ATAU ID")
    for kunci in ("python", "MJ-002", "bk-003", "Harry Potter"):
        hasil = perpus.cari_item(kunci)
        print(f"\n  Kata kunci '{kunci}' -> {len(hasil)} hasil")
        for item in hasil:
            print(f"    {item}")
        if not hasil:
            print("    Item tidak ditemukan.")

    judul_bagian(4, "PEMINJAMAN, PENGEMBALIAN, DAN DENDA")
    tgl = date(2026, 11, 2)
    perpus.pinjam_item("BK-001", "A01", tgl)
    perpus.pinjam_item("MJ-001", "A01", tgl)
    perpus.pinjam_item("BK-002", "A02", tgl)
    try:
        perpus.pinjam_item("BK-001", "A02", tgl)
    except ValueError as e:
        print(f"  [!] {e}")
    perpus.tampilkan_katalog(hanya_tersedia=True)
    print()
    # hitung_denda() dipanggil dengan cara sama, hasilnya berbeda per jenis
    perpus.kembalikan_item("BK-001", "A01", tgl + timedelta(days=11))
    perpus.kembalikan_item("MJ-001", "A01", tgl + timedelta(days=15))
    perpus.kembalikan_item("BK-002", "A02", tgl + timedelta(days=5))
    print()
    for anggota in perpus.daftar_anggota():
        print(f"  {anggota}")

    judul_bagian(5, "ENCAPSULATION DAN ABSTRACT CLASS")
    buku = perpus.cari_berdasarkan_id("BK-003")
    print(f"  Akses lewat property  : {buku.judul} / {buku.isbn}")
    uji = [
        ("buku.tahun_terbit = 2099", lambda: setattr(buku,
                                                     "tahun_terbit", 2099)),
        ("buku.jumlah_halaman = -5", lambda: setattr(buku,
                                                     "jumlah_halaman", -5)),
        ("buku.tersedia = False", lambda: setattr(buku, "tersedia", False)),
        ("buku.__isbn", lambda: buku.__isbn),
        ("LibraryItem('X', 'Y', 2020)", lambda: LibraryItem("X", "Y", 2020)),
    ]
    for kode, aksi in uji:
        try:
            aksi()
            print(f"  {kode:<28}: berhasil")
        except (ValueError, AttributeError, TypeError) as e:
            pesan = str(e)
            if len(pesan) > 60:
                pesan = pesan[:57] + "..."
            print(f"  {kode:<28}: {type(e).__name__} - {pesan}")
    print(f"  isinstance(buku, LibraryItem): {isinstance(buku, LibraryItem)}")
    print(f"  Book.__mro__: "
          f"{' -> '.join(c.__name__ for c in Book.__mro__)}")
    print("\nDemo selesai.")


# ------------------------------------------------------------- menu
def input_int(prompt):
    while True:
        teks = input(prompt).strip()
        if teks.lstrip("-").isdigit():
            return int(teks)
        print("  Masukkan angka yang valid.")


def menu():
    perpus = siapkan_perpustakaan()
    pilihan_menu = {
        "1": "Katalog",
        "2": "Item tersedia",
        "3": "Tambah buku",
        "4": "Tambah majalah",
        "5": "Cari (judul/ID)",
        "6": "Pinjam",
        "7": "Kembalikan",
        "0": "Keluar",
    }
    daftar = [f"[{kode}] {teks}" for kode, teks in pilihan_menu.items()]
    while True:
        print("\n=== MENU PERPUSTAKAAN ===")
        print("  " + "  ".join(daftar[:4]))
        print("  " + "  ".join(daftar[4:]))
        pilih = input("Pilih menu: ").strip()
        try:
            if pilih == "1":
                perpus.tampilkan_katalog()
            elif pilih == "2":
                perpus.tampilkan_katalog(hanya_tersedia=True)
            elif pilih == "3":
                perpus.tambah_item(Book(
                    input("ID buku       : "), input("Judul         : "),
                    input_int("Tahun terbit  : "), input("Penulis       : "),
                    input("ISBN          : "), input_int("Jumlah halaman: ")))
            elif pilih == "4":
                perpus.tambah_item(Magazine(
                    input("ID majalah    : "), input("Judul         : "),
                    input_int("Tahun terbit  : "), input("Edisi         : "),
                    input("Penerbit      : ")))
            elif pilih == "5":
                hasil = perpus.cari_item(input("Kata kunci    : "))
                print(f"  {len(hasil)} hasil ditemukan")
                for item in hasil:
                    print(f"    {item}")
            elif pilih == "6":
                perpus.pinjam_item(input("ID item       : "),
                                   input("ID anggota    : "), date.today())
            elif pilih == "7":
                item_id = input("ID item       : ")
                id_anggota = input("ID anggota    : ")
                hari = input_int("Lama dipinjam (hari): ")
                denda = perpus.kembalikan_item(
                    item_id, id_anggota, date.today() + timedelta(days=hari))
                print(f"  Total denda transaksi: {format_rupiah(denda)}")
            elif pilih == "0":
                print("Terima kasih telah menggunakan sistem perpustakaan.")
                break
            else:
                print("  Pilihan tidak tersedia.")
        except (ValueError, TypeError) as e:
            print(f"  [!] {e}")


if __name__ == "__main__":
    if "--menu" in sys.argv:
        menu()
    else:
        demo()
