# kalkulator_lib.py
# Modul kustom berisi operasi aritmatika dasar.


def tambah(a, b):
    """Mengembalikan hasil a + b."""
    return a + b


def kurang(a, b):
    """Mengembalikan hasil a - b."""
    return a - b


def kali(a, b):
    """Mengembalikan hasil a * b."""
    return a * b


def bagi(a, b):
    """Mengembalikan hasil a / b, atau pesan error jika b bernilai 0."""
    if b == 0:
        return "Error: pembagian dengan nol tidak diperbolehkan"
    return a / b


if __name__ == "__main__":
    # Hanya berjalan jika file ini dijalankan langsung, bukan saat di-import
    print("Uji tambah(10, 5):", tambah(10, 5))
    print("Uji bagi(10, 0)  :", bagi(10, 0))
