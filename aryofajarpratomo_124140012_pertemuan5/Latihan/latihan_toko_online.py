"""Latihan mandiri Pengenalan OOP: identifikasi entitas toko online.

Setiap entitas memiliki minimal 3 atribut data dan 2 method perilaku.
"""


class Produk:
    # Atribut: id_produk, nama, harga, stok
    def __init__(self, id_produk, nama, harga, stok):
        self.id_produk = id_produk
        self.nama = nama
        self.harga = harga
        self.stok = stok

    def kurangi_stok(self, jumlah):
        """Perilaku: mengurangi stok saat produk dibeli."""
        if jumlah > self.stok:
            raise ValueError(f"Stok {self.nama} tidak cukup")
        self.stok -= jumlah

    def info(self):
        """Perilaku: menampilkan ringkasan produk."""
        return f"{self.nama} - Rp {self.harga:,} (stok {self.stok})"


class Keranjang:
    # Atribut: pemilik, daftar item, kode_voucher
    def __init__(self, pemilik):
        self.pemilik = pemilik
        self.item = {}
        self.kode_voucher = None

    def tambah(self, produk, jumlah=1):
        """Perilaku: memasukkan produk ke keranjang."""
        self.item[produk] = self.item.get(produk, 0) + jumlah

    def total(self):
        """Perilaku: menghitung total belanja."""
        return sum(p.harga * n for p, n in self.item.items())


class Pengguna:
    # Atribut: username, email, alamat, keranjang
    def __init__(self, username, email, alamat):
        self.username = username
        self.email = email
        self.alamat = alamat
        self.keranjang = Keranjang(self)

    def checkout(self):
        """Perilaku: membayar seluruh isi keranjang."""
        for produk, jumlah in self.keranjang.item.items():
            produk.kurangi_stok(jumlah)
        total = self.keranjang.total()
        self.keranjang = Keranjang(self)
        return total

    def ubah_alamat(self, alamat_baru):
        """Perilaku: memperbarui alamat pengiriman."""
        self.alamat = alamat_baru


if __name__ == "__main__":
    kaos = Produk("P01", "Kaos ITERA", 85_000, 10)
    tumbler = Produk("P02", "Tumbler", 60_000, 5)
    user = Pengguna("aryofajar", "aryo@example.com", "Lampung Selatan")
    user.keranjang.tambah(kaos, 2)
    user.keranjang.tambah(tumbler)
    print(f"Total checkout {user.username}: Rp {user.checkout():,}")
    print(kaos.info())
    print(tumbler.info())
