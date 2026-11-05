# latihan5_kontak.py
# Latihan 5: katalog kontak sederhana memakai dictionary.

kontak = {
    "Budi": "081234567890",
    "Siti": "082198765432",
}


def tambah_kontak(nama, nomor):
    """Menambahkan atau memperbarui kontak."""
    kontak[nama] = nomor
    print(f"Kontak '{nama}' disimpan.")


def cari_kontak(nama):
    """Mengembalikan nomor telepon berdasarkan nama memakai .get()."""
    return kontak.get(nama, "Kontak tidak ditemukan")


def tampilkan_semua():
    """Menampilkan seluruh kontak secara berurutan."""
    print("\nDaftar kontak:")
    for i, (nama, nomor) in enumerate(sorted(kontak.items()), start=1):
        print(f"  {i}. {nama:<8} {nomor}")


tambah_kontak("Andi", "085711223344")
print("Cari 'Siti':", cari_kontak("Siti"))
print("Cari 'Rian':", cari_kontak("Rian"))
tampilkan_semua()
