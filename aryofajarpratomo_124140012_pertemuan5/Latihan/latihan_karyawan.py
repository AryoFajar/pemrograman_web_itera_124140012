"""Latihan mandiri Encapsulation: gaji pokok dilindungi dengan @property."""


class Karyawan:
    UMR = 3_200_000

    def __init__(self, nama, jabatan, gaji_pokok):
        self.nama = nama
        self.jabatan = jabatan
        self.__gaji_pokok = 0
        self.gaji_pokok = gaji_pokok  # divalidasi oleh setter

    @property
    def gaji_pokok(self):
        return self.__gaji_pokok

    @gaji_pokok.setter
    def gaji_pokok(self, nilai):
        if nilai < self.UMR:
            raise ValueError(f"Gaji pokok minimal UMR Rp {self.UMR:,}")
        self.__gaji_pokok = nilai

    def hitung_gaji_bersih(self, pajak_persen):
        """Gaji pokok dikurangi pajak dalam persen."""
        return self.__gaji_pokok * (100 - pajak_persen) / 100


if __name__ == "__main__":
    k = Karyawan("Aryo", "Backend Developer", 7_500_000)
    print(f"{k.nama} ({k.jabatan}) gaji pokok Rp {k.gaji_pokok:,}")
    print(f"Gaji bersih (pajak 5%): Rp {k.hitung_gaji_bersih(5):,.0f}")
    try:
        k.gaji_pokok = 2_500_000
    except ValueError as e:
        print("ValueError:", e)
