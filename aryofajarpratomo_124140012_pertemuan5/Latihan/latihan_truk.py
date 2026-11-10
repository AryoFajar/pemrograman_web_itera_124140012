"""Latihan mandiri Inheritance: Truk sebagai subclass Kendaraan."""
import importlib

# Nama file hands-on diawali angka, sehingga diimpor dengan importlib
Kendaraan = importlib.import_module("03_inheritance").Kendaraan


class Truk(Kendaraan):
    def __init__(self, merek, model, tahun, kapasitas_maks_ton):
        super().__init__(merek, model, tahun)
        self.kapasitas_maks_ton = kapasitas_maks_ton
        self.muatan_ton = 0

    def muat_barang(self, berat_ton):
        """Menambah muatan; ditolak bila melebihi kapasitas maksimum."""
        if self.muatan_ton + berat_ton > self.kapasitas_maks_ton:
            print(f"  Ditolak: {berat_ton} ton melebihi kapasitas "
                  f"(sisa {self.kapasitas_maks_ton - self.muatan_ton} ton)")
            return False
        self.muatan_ton += berat_ton
        print(f"  Dimuat {berat_ton} ton")
        return True

    def deskripsi(self):  # overriding
        return (f"Truk {super().deskripsi()} | muatan "
                f"{self.muatan_ton}/{self.kapasitas_maks_ton} ton")


if __name__ == "__main__":
    truk = Truk("Hino", "Dutro", 2021, 8)
    print(truk.deskripsi())
    truk.muat_barang(5)
    truk.muat_barang(4)
    truk.muat_barang(3)
    print(truk.deskripsi())
