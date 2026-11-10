"""Hands-on 1: Di Python, semua nilai adalah objek."""

angka = 42
teks = "Selamat datang di Praktikum Pemrograman Web ITERA"
nilai = [85, 90, 78]

# Setiap nilai memiliki class (tipe) sendiri
print(type(angka), angka.__class__)
print(type(teks), teks.__class__)
print(type(nilai), nilai.__class__)

# Karena berupa objek, nilai bawaan juga memiliki method
print(teks.upper())
print(teks.split(" ")[:4])


def salam(nama):
    """Mengembalikan kalimat sapaan."""
    return f"Halo, {nama}!"


# Fungsi pun merupakan objek yang bisa diperiksa tipenya
print(type(salam))
print(hex(id(salam)))
print(salam("Aryo"))
