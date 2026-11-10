"""Hands-on 2: Perbandingan paradigma prosedural dan OOP."""

# ---------------- Paradigma Prosedural ----------------
mahasiswa = {
    "nama": "Budi Santoso",
    "nim": "121140001",
    "prodi": "Teknik Informatika",
    "ipk": 3.45,
}


def tampilkan_profil(data):
    """Mencetak profil mahasiswa yang disimpan dalam dictionary."""
    print(f"[Prosedural] {data['nama']} ({data['nim']}) - "
          f"{data['prodi']} | IPK: {data['ipk']}")


def update_ipk(data, ipk_baru):
    """Mengubah IPK jika berada pada rentang 0.0 - 4.0."""
    if 0.0 <= ipk_baru <= 4.0:
        data["ipk"] = ipk_baru
    else:
        print("IPK tidak valid!")


tampilkan_profil(mahasiswa)
update_ipk(mahasiswa, 3.75)
tampilkan_profil(mahasiswa)


# ---------------- Paradigma OOP ----------------
class Mahasiswa:
    """Data dan perilaku mahasiswa dibungkus dalam satu class."""

    def __init__(self, nama, nim, prodi, ipk):
        self.nama = nama
        self.nim = nim
        self.prodi = prodi
        self.ipk = ipk

    def tampilkan_profil(self):
        """Mencetak profil mahasiswa."""
        print(f"[OOP] {self.nama} ({self.nim}) - {self.prodi} "
              f"| IPK: {self.ipk}")

    def update_ipk(self, ipk_baru):
        """Mengubah IPK dengan validasi rentang."""
        if 0.0 <= ipk_baru <= 4.0:
            self.ipk = ipk_baru
            print(f"IPK {self.nama} berhasil diperbarui.")
        else:
            print("IPK tidak valid!")


print("\n--- Eksekusi Paradigma OOP ---")
siti = Mahasiswa("Siti Rahma", "121140002", "Teknik Informatika", 3.80)
siti.tampilkan_profil()
siti.update_ipk(3.92)
siti.tampilkan_profil()
