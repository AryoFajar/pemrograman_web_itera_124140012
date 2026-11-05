# ===================================================
# Berkas : math_operations.py
# Soal   : 3 - Modul Matematika (bangun datar & konversi suhu)
# Nama   : Aryo Fajar Pratomo
# NIM    : 124140012
# Kelas  : RA
# ===================================================
"""Modul kustom berisi konstanta, fungsi luas dan keliling bangun datar,
serta fungsi konversi temperatur. Dipakai oleh main.py.
"""

# Konstanta
PI = 3.14159


def luas_persegi(sisi: float) -> float:
    """Menghitung luas persegi.

    Parameter:
        sisi (float): panjang sisi persegi.

    Return:
        float: luas persegi (sisi * sisi).
    """
    return sisi * sisi


def keliling_persegi(sisi: float) -> float:
    """Menghitung keliling persegi.

    Parameter:
        sisi (float): panjang sisi persegi.

    Return:
        float: keliling persegi (4 * sisi).
    """
    return 4 * sisi


def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """Menghitung luas persegi panjang.

    Parameter:
        panjang (float): panjang persegi panjang.
        lebar (float): lebar persegi panjang.

    Return:
        float: luas persegi panjang (panjang * lebar).
    """
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """Menghitung keliling persegi panjang.

    Parameter:
        panjang (float): panjang persegi panjang.
        lebar (float): lebar persegi panjang.

    Return:
        float: keliling persegi panjang (2 * (panjang + lebar)).
    """
    return 2 * (panjang + lebar)


def luas_lingkaran(r: float) -> float:
    """Menghitung luas lingkaran.

    Parameter:
        r (float): jari-jari lingkaran.

    Return:
        float: luas lingkaran (PI * r * r).
    """
    return PI * r * r


def keliling_lingkaran(r: float) -> float:
    """Menghitung keliling lingkaran.

    Parameter:
        r (float): jari-jari lingkaran.

    Return:
        float: keliling lingkaran (2 * PI * r).
    """
    return 2 * PI * r


def celsius_ke_fahrenheit(celsius: float) -> float:
    """Mengonversi suhu dari Celsius ke Fahrenheit.

    Parameter:
        celsius (float): suhu dalam derajat Celsius.

    Return:
        float: suhu dalam derajat Fahrenheit (C * 9/5 + 32).
    """
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius: float) -> float:
    """Mengonversi suhu dari Celsius ke Kelvin.

    Parameter:
        celsius (float): suhu dalam derajat Celsius.

    Return:
        float: suhu dalam Kelvin (C + 273.15).
    """
    return celsius + 273.15


# Blok uji mandiri: hanya berjalan saat file dijalankan langsung
if __name__ == "__main__":
    print("[TEST MODUL] Uji coba math_operations:")
    print("Luas persegi (sisi 5)      :", luas_persegi(5))
    print("Luas lingkaran (r 7)       :", round(luas_lingkaran(7), 2))
    print("100 Celsius ke Fahrenheit  :", celsius_ke_fahrenheit(100))
