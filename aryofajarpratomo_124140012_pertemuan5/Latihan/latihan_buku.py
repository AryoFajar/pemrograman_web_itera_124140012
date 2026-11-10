"""Latihan mandiri Class & Object: class Buku dengan __str__ dan __len__."""


class Buku:
    def __init__(self, judul, penulis, harga_asli, jumlah_halaman):
        self.judul = judul
        self.penulis = penulis
        self.harga_asli = harga_asli
        self.jumlah_halaman = jumlah_halaman

    def hitung_harga_diskon(self, persen):
        """Mengembalikan harga setelah diskon persen tertentu."""
        if not 0 <= persen <= 100:
            raise ValueError("Persen diskon harus 0 - 100")
        return self.harga_asli * (100 - persen) / 100

    def __str__(self):
        garis = "+" + "-" * 40 + "+"
        harga = f"Rp {self.harga_asli:,} | {self.jumlah_halaman} halaman"
        return "\n".join([
            garis,
            f"| {self.judul:<38} |",
            f"| oleh {self.penulis:<33} |",
            f"| {harga:<38} |",
            garis,
        ])

    def __len__(self):
        return self.jumlah_halaman


if __name__ == "__main__":
    buku = Buku("Python Crash Course", "Eric Matthes", 250_000, 544)
    print(buku)
    print("len(buku)     :", len(buku))
    print("Diskon 20%    : Rp {:,.0f}".format(buku.hitung_harga_diskon(20)))
