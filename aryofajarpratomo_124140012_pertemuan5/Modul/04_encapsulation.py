"""Hands-on 5: Encapsulation, name mangling, dan @property."""


class RekeningBank:
    """Rekening dengan saldo dan PIN yang dilindungi."""

    def __init__(self, nomor, pemilik, saldo_awal, pin):
        self.nomor = nomor            # public
        self._pemilik = pemilik       # protected (konvensi)
        self.__saldo = 0              # private (name mangling)
        self.__pin = pin
        self.__log = []
        self.saldo = saldo_awal       # lewat setter agar tervalidasi

    @property
    def saldo(self):
        """Getter saldo (read access terkontrol)."""
        return self.__saldo

    @saldo.setter
    def saldo(self, nilai):
        if not isinstance(nilai, (int, float)):
            raise TypeError("Saldo harus berupa angka")
        if nilai < 0:
            raise ValueError("Saldo tidak boleh negatif")
        self.__saldo = nilai

    def __cek_pin(self, pin):  # method private
        return pin == self.__pin

    def setor(self, jumlah):
        self.saldo = self.__saldo + jumlah
        self.__log.append(f"Setor  +{jumlah:,}")
        print(f"  Setor Rp {jumlah:,} berhasil")

    def tarik(self, jumlah, pin):
        if not self.__cek_pin(pin):
            print("  Gagal: PIN salah")
            return
        if jumlah > self.__saldo:
            print("  Gagal: saldo tidak mencukupi")
            return
        self.saldo = self.__saldo - jumlah
        self.__log.append(f"Tarik  -{jumlah:,}")
        print(f"  Tarik Rp {jumlah:,} berhasil")

    def cetak_log(self):
        print(f"Log rekening {self.nomor} a.n. {self._pemilik}:")
        for baris in self.__log:
            print("  ", baris)
        print(f"   Saldo akhir: Rp {self.saldo:,}")


if __name__ == "__main__":
    rek = RekeningBank("0012-3456", "Aryo", 500_000, "1234")
    rek.setor(250_000)
    rek.tarik(100_000, "0000")
    rek.tarik(2_000_000, "1234")
    rek.tarik(100_000, "1234")

    try:
        rek.saldo = -50_000
    except ValueError as e:
        print("ValueError:", e)

    try:
        print(rek.__saldo)
    except AttributeError as e:
        print("AttributeError:", e)

    # Name mangling: atribut private disimpan dengan nama _Class__atribut
    print("Akses lewat name mangling:", rek._RekeningBank__saldo)
    rek.cetak_log()
