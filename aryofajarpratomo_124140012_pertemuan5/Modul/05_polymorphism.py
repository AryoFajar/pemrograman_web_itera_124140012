"""Hands-on 6: Polymorphism, duck typing, dan operator overloading."""


class MetodePembayaran:
    """Kelas dasar; subclass wajib meng-override bayar()."""

    def bayar(self, jumlah):
        raise NotImplementedError("Subclass harus mengimplementasikan bayar()")


class TransferBank(MetodePembayaran):
    BIAYA_ADMIN = 6_500

    def __init__(self, bank):
        self.bank = bank

    def bayar(self, jumlah):
        total = jumlah + self.BIAYA_ADMIN
        return (f"[{self.bank}] Transfer Rp {total:,} ke VA 8808-1234 "
                f"(termasuk admin Rp {self.BIAYA_ADMIN:,})")


class EWallet(MetodePembayaran):
    def __init__(self, nama, saldo):
        self.nama = nama
        self.saldo = saldo

    def bayar(self, jumlah):
        self.saldo -= jumlah
        cashback = int(jumlah * 0.02)
        return (f"[{self.nama}] Saldo terpotong Rp {jumlah:,}, "
                f"cashback Rp {cashback:,}")


class CryptoPayment:
    """Tidak mewarisi MetodePembayaran, tetapi punya bayar() (duck typing)."""

    KURS_USDT = 16_250

    def bayar(self, jumlah):
        return f"[Crypto] Dibayar {jumlah / self.KURS_USDT:.2f} USDT"


def proses_checkout_pesanan(daftar_metode, tagihan):
    """Memanggil bayar() pada setiap objek tanpa memeriksa tipenya."""
    print(f"Tagihan: Rp {tagihan:,}")
    for metode in daftar_metode:
        print(" ", metode.bayar(tagihan))


class Dompet:
    """Contoh operator overloading + dan ==."""

    def __init__(self, pemilik, saldo):
        self.pemilik = pemilik
        self.saldo = saldo

    def __add__(self, lain):
        return Dompet(f"{self.pemilik} & {lain.pemilik}",
                      self.saldo + lain.saldo)

    def __eq__(self, lain):
        return self.saldo == lain.saldo

    def __str__(self):
        return f"Dompet({self.pemilik}, Rp {self.saldo:,})"


if __name__ == "__main__":
    metode = [TransferBank("BSI"), EWallet("GoPay", 1_000_000),
              CryptoPayment()]
    proses_checkout_pesanan(metode, 250_000)

    d1 = Dompet("Aryo", 150_000)
    d2 = Dompet("Fajar", 90_000)
    print("\n", d1 + d2, sep="")
    print("d1 == d2 ?", d1 == d2)
