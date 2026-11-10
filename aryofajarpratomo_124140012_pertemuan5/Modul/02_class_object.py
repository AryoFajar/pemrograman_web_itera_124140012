"""Hands-on 3: Class, object, atribut class/instance, dan dunder method."""


class Mahasiswa:
    """Representasi mahasiswa ITERA."""

    # Atribut class: dimiliki bersama oleh semua instance
    universitas = "Institut Teknologi Sumatera"
    prodi = "Teknik Informatika"
    jumlah_terdaftar = 0

    def __init__(self, nama, nim, ipk=0.0):
        # Atribut instance: unik untuk setiap objek
        self.nama = nama
        self.nim = nim
        self.ipk = ipk
        self.mata_kuliah = []
        Mahasiswa.jumlah_terdaftar += 1

    def tambah_matkul(self, matkul):
        """Menambahkan mata kuliah ke daftar milik mahasiswa."""
        self.mata_kuliah.append(matkul)
        print(f"  + {matkul} ditambahkan untuk {self.nama}")

    def update_ipk(self, ipk_baru):
        """Mengubah IPK jika berada pada rentang 0.0 - 4.0."""
        if 0.0 <= ipk_baru <= 4.0:
            self.ipk = ipk_baru
        else:
            print(f"  IPK {ipk_baru} tidak valid!")

    def evaluasi_status(self):
        """Mengembalikan predikat akademik berdasarkan IPK."""
        if self.ipk >= 3.50:
            return "Cumlaude / Sangat Memuaskan"
        if self.ipk >= 3.00:
            return "Memuaskan"
        if self.ipk >= 2.00:
            return "Cukup"
        return "Perlu Bimbingan Khusus"

    def __str__(self):
        return (f"{self.nama} ({self.nim}) - IPK {self.ipk:.2f} "
                f"- {self.universitas}")

    def __repr__(self):
        return (f"Mahasiswa(nama={self.nama!r}, nim={self.nim!r}, "
                f"ipk={self.ipk})")


if __name__ == "__main__":
    print("Jumlah terdaftar awal:", Mahasiswa.jumlah_terdaftar)
    ahmad = Mahasiswa("Ahmad Fadhil", "121140001", 3.72)
    nabila = Mahasiswa("Nabila Putri", "121140002", 3.40)
    print("Jumlah terdaftar sekarang:", Mahasiswa.jumlah_terdaftar)

    ahmad.tambah_matkul("Pemrograman Web")
    ahmad.tambah_matkul("Basis Data")
    nabila.tambah_matkul("Jaringan Komputer")

    print("Matkul Ahmad :", ahmad.mata_kuliah)
    print("Matkul Nabila:", nabila.mata_kuliah)
    print("Status Ahmad :", ahmad.evaluasi_status())
    print("Status Nabila:", nabila.evaluasi_status())

    print(ahmad)          # memanggil __str__
    print(repr(nabila))   # memanggil __repr__

    # Mengubah atribut class berdampak ke semua instance
    Mahasiswa.universitas = "ITERA Lampung Selatan"
    print(ahmad.universitas, "|", nabila.universitas)
