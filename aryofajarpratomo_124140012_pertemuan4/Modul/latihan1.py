# latihan1.py
# Latihan 1: mencetak profil diri dan kartu identitas berbingkai "#".

nama = "Aryo Fajar Pratomo"
nim = "124140012"
angkatan = "2024"
minat = "Pengembangan Web dan Mobile"

# Cetak data dengan sep=' | '
print(nama, nim, angkatan, minat, sep=" | ")
print()

# Kartu identitas berbingkai karakter '#'
lebar = 46
garis = "#" * lebar
isi = (
    f"# {'KARTU IDENTITAS MAHASISWA':^{lebar - 4}} #\n"
    f"# {'':{lebar - 4}} #\n"
    f"# {'Nama':<9}: {nama:<{lebar - 15}} #\n"
    f"# {'NIM':<9}: {nim:<{lebar - 15}} #\n"
    f"# {'Angkatan':<9}: {angkatan:<{lebar - 15}} #\n"
    f"# {'Minat':<9}: {minat:<{lebar - 15}} #"
)
print(garis)
print(isi)
print(garis)
