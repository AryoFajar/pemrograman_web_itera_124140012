# 04_fungsi.py
# Fungsi: docstring, default parameter, return banyak nilai, *args,
# **kwargs, scope, dan lambda.


def hitung_luas_persegi_panjang(panjang, lebar=1.0):
    """Menghitung luas persegi panjang.

    Args:
        panjang (float): panjang bangun.
        lebar (float): lebar bangun, bawaan 1.0.

    Returns:
        float: luas persegi panjang.
    """
    return panjang * lebar


def hitung_statistik_dasar(data):
    """Mengembalikan nilai minimum, maksimum, dan rata-rata sebagai tuple."""
    return min(data), max(data), sum(data) / len(data)


def cetak_rekap_pesanan(nomor_meja, *menu, **info):
    """Mencetak rekap pesanan dengan jumlah menu dan info yang fleksibel."""
    print(f"\nRekap pesanan meja {nomor_meja}")
    for i, item in enumerate(menu, start=1):
        print(f"  {i}. {item}")
    for kunci, nilai in info.items():
        print(f"  {kunci.replace('_', ' ').title()}: {nilai}")


print("Luas (10.0 x 5.0)  :", hitung_luas_persegi_panjang(10.0, 5.0))
print("Luas (8.0, default):", hitung_luas_persegi_panjang(8.0))

nilai_mhs = [75, 88, 92, 60, 85, 90]
minimum, maksimum, rata = hitung_statistik_dasar(nilai_mhs)
print(f"\nMin: {minimum}, Maks: {maksimum}, Rata-rata: {rata:.2f}")

cetak_rekap_pesanan(4, "Nasi Goreng Spesial", "Es Teh Manis", "Ayam Bakar",
                    pelanggan="Budi Santoso", metode_bayar="QRIS",
                    catatan="Tanpa cabai (tidak pedas)")

# Scope lokal vs global
pesan = "global"


def ubah_pesan():
    """Contoh variabel lokal yang tidak mengubah variabel global."""
    pesan = "lokal"
    return pesan


print(f"\nDi dalam fungsi: {ubah_pesan()}, di luar fungsi: {pesan}")

# Lambda
kuadrat = lambda x: x ** 2  # noqa: E731 (contoh lambda sesuai modul)
print("Kuadrat 7:", kuadrat(7))

mahasiswa = [
    {"nama": "Siti", "umur": 21},
    {"nama": "Andi", "umur": 19},
    {"nama": "Budi", "umur": 22},
    {"nama": "Dewi", "umur": 20},
]
urut_umur = sorted(mahasiswa, key=lambda m: m["umur"])
print("Urut umur:", [m["nama"] for m in urut_umur])
print("map  kuadrat :", list(map(lambda x: x ** 2, [1, 2, 3, 4])))
print("filter genap :", list(filter(lambda x: x % 2 == 0, range(1, 11))))
