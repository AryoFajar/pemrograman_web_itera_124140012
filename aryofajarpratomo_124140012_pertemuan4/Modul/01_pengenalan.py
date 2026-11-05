# 01_pengenalan.py
# Pengenalan Python: print(), sep & end, escape character, dan indentasi.

print("Hello, World!")
print("Selamat datang di Praktikum Pemrograman Web - Python Dasar")

# Menampilkan beberapa nilai sekaligus
nama_praktikan = "Aryo Fajar Pratomo"
nim_praktikan = 124140012
print("Nama:", nama_praktikan, "| NIM:", nim_praktikan)

# Parameter sep: pemisah antar nilai
print("Teknik", "Informatika", "ITERA", sep=" -> ")

# Parameter end: karakter di akhir baris (default "\n")
print("Memuat data", end="... ")
print("Selesai!")

# Escape character \n (baris baru) dan \t (tab)
print("Mata kuliah semester ini:\n\t1. Pemrograman Web\n\t2. Basis Data")

# Indentasi: Python memakai 4 spasi per tingkat blok
angka = 10
if angka > 5:
    print("Angka lebih besar dari 5")
    if angka == 10:
        print("Angka tepat bernilai 10")

# Contoh indentasi yang SALAH (dibiarkan sebagai komentar karena akan
# menghasilkan IndentationError jika dijalankan):
# if angka > 5:
#   print("indentasi 2 spasi")
#     print("lalu 4 spasi")   # IndentationError: unexpected indent

# The Zen of Python
import this  # noqa: E402,F401
