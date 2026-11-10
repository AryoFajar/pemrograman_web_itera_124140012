"""Hands-on 4: Inheritance, super(), overriding, dan multiple inheritance."""


class Kendaraan:
    """Kelas dasar untuk semua kendaraan."""

    def __init__(self, merek, model, tahun):
        self.merek = merek
        self.model = model
        self.tahun = tahun
        self.odometer = 0

    def tempuh(self, km):
        """Menambah jarak tempuh pada odometer."""
        self.odometer += km
        print(f"  {self.merek} {self.model} menempuh {km} km "
              f"(odometer: {self.odometer} km)")

    def klakson(self):
        return "Tin tin!"

    def deskripsi(self):
        return f"{self.tahun} {self.merek} {self.model}"


class Mobil(Kendaraan):
    """Mobil berbahan bakar dengan kapasitas tangki."""

    def __init__(self, merek, model, tahun, kapasitas_tangki):
        super().__init__(merek, model, tahun)
        self.kapasitas_tangki = kapasitas_tangki
        self.bensin = 0

    def isi_bensin(self, liter):
        self.bensin = min(self.kapasitas_tangki, self.bensin + liter)
        print(f"  Bensin terisi {self.bensin}/{self.kapasitas_tangki} L")

    def klakson(self):  # overriding
        return "Beep beep!"

    def deskripsi(self):  # overriding + memanggil versi parent
        return (f"Mobil {super().deskripsi()} | "
                f"tangki {self.kapasitas_tangki} L")


class Motor(Kendaraan):
    """Sepeda motor dengan informasi kapasitas mesin."""

    def __init__(self, merek, model, tahun, cc):
        super().__init__(merek, model, tahun)
        self.cc = cc

    def klakson(self):
        return "Tet tet!"

    def deskripsi(self):
        return f"Motor {super().deskripsi()} | {self.cc} cc"


class KomponenBaterai:
    """Mixin untuk kendaraan yang memiliki baterai."""

    def __init__(self, kapasitas_kwh):
        self.kapasitas_kwh = kapasitas_kwh
        self.persen_baterai = 100

    def isi_daya(self):
        self.persen_baterai = 100
        print("  Baterai terisi penuh (100%)")


class MobilListrik(Mobil, KomponenBaterai):
    """Contoh multiple inheritance: Mobil + KomponenBaterai."""

    def __init__(self, merek, model, tahun, kapasitas_kwh):
        Mobil.__init__(self, merek, model, tahun, kapasitas_tangki=0)
        KomponenBaterai.__init__(self, kapasitas_kwh)

    def tempuh(self, km):
        super().tempuh(km)
        self.persen_baterai = max(0, self.persen_baterai - km // 4)
        print(f"  Sisa baterai: {self.persen_baterai}%")

    def klakson(self):
        return "Ding ding (senyap)"

    def deskripsi(self):
        return (f"Mobil Listrik {Kendaraan.deskripsi(self)} | "
                f"baterai {self.kapasitas_kwh} kWh")


if __name__ == "__main__":
    armada = [
        Mobil("Toyota", "Avanza", 2022, 45),
        Motor("Honda", "Vario", 2023, 125),
        MobilListrik("Hyundai", "Ioniq 5", 2024, 72),
    ]
    for k in armada:
        print(k.deskripsi(), "->", k.klakson())

    print("\nPerjalanan:")
    armada[0].isi_bensin(30)
    armada[0].tempuh(120)
    armada[2].tempuh(80)
    armada[2].isi_daya()

    ev = armada[2]
    print("\nisinstance(ev, Mobil)        :", isinstance(ev, Mobil))
    print("isinstance(ev, Motor)        :", isinstance(ev, Motor))
    print("issubclass(Motor, Kendaraan) :", issubclass(Motor, Kendaraan))
    print("MRO:", " -> ".join(c.__name__ for c in MobilListrik.__mro__))
