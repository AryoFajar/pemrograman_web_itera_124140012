"""Item perpustakaan: abstract class LibraryItem dan subclass-nya.

Berkas ini menerapkan:
- Abstraction  : LibraryItem(ABC) dengan abstract method dan abstract property.
- Inheritance  : Book dan Magazine mewarisi LibraryItem.
- Encapsulation: atribut protected (_) dan private (__) diakses lewat
                 @property beserta validasi pada setter.
- Polymorphism : get_detail(), hitung_denda(), dan lama_pinjam() memiliki
                 perilaku berbeda pada setiap subclass.
"""
from abc import ABC, abstractmethod
from datetime import date


def format_rupiah(nominal):
    """Mengubah angka menjadi format rupiah, contoh 12500 -> 'Rp 12.500'."""
    return "Rp " + f"{nominal:,.0f}".replace(",", ".")


class LibraryItem(ABC):
    """Kelas dasar abstrak untuk semua item di perpustakaan."""

    _total_item_dibuat = 0  # atribut class (protected) penghitung item

    def __init__(self, item_id, judul, tahun_terbit):
        self._item_id = str(item_id).upper()   # protected
        self._judul = ""                       # protected, diisi via setter
        self._tahun_terbit = 0
        self.judul = judul                     # divalidasi oleh setter
        self.tahun_terbit = tahun_terbit
        self.__tersedia = True                 # private
        self.__peminjam = None                 # private
        self.__tanggal_pinjam = None           # private
        LibraryItem._total_item_dibuat += 1

    # ------------------------------------------------------------ property
    @property
    def item_id(self):
        """ID item bersifat read-only (tidak memiliki setter)."""
        return self._item_id

    @property
    def judul(self):
        return self._judul

    @judul.setter
    def judul(self, nilai):
        if not isinstance(nilai, str) or not nilai.strip():
            raise ValueError("Judul tidak boleh kosong")
        self._judul = nilai.strip()

    @property
    def tahun_terbit(self):
        return self._tahun_terbit

    @tahun_terbit.setter
    def tahun_terbit(self, nilai):
        tahun_ini = date.today().year
        if not isinstance(nilai, int) or not 1450 <= nilai <= tahun_ini:
            raise ValueError(f"Tahun terbit harus 1450 - {tahun_ini}")
        self._tahun_terbit = nilai

    @property
    def tersedia(self):
        """Status ketersediaan hanya bisa diubah lewat pinjam/kembalikan."""
        return self.__tersedia

    @property
    def peminjam(self):
        return self.__peminjam

    # ------------------------------------------------------ abstract member
    @property
    @abstractmethod
    def jenis(self):
        """Nama jenis item, misalnya 'Buku' atau 'Majalah'."""

    @abstractmethod
    def get_detail(self):
        """Mengembalikan keterangan khusus sesuai jenis item."""

    @abstractmethod
    def lama_pinjam(self):
        """Batas lama peminjaman dalam hari."""

    @abstractmethod
    def hitung_denda(self, hari_terlambat):
        """Menghitung denda keterlambatan dalam rupiah."""

    # ------------------------------------------------------ method konkret
    def pinjamkan(self, nama_peminjam, tanggal_pinjam):
        """Menandai item sedang dipinjam."""
        if not self.__tersedia:
            raise ValueError(f"'{self.judul}' sedang dipinjam "
                             f"oleh {self.__peminjam}")
        self.__tersedia = False
        self.__peminjam = nama_peminjam
        self.__tanggal_pinjam = tanggal_pinjam

    def kembalikan(self, tanggal_kembali):
        """Mengembalikan item dan menghitung denda (polymorphic)."""
        if self.__tersedia:
            raise ValueError(f"'{self.judul}' tidak sedang dipinjam")
        lama = (tanggal_kembali - self.__tanggal_pinjam).days
        terlambat = max(0, lama - self.lama_pinjam())
        denda = self.hitung_denda(terlambat)
        self.__tersedia = True
        self.__peminjam = None
        self.__tanggal_pinjam = None
        return lama, terlambat, denda

    def cocok_dengan(self, kata_kunci):
        """True jika kata kunci sama dengan ID atau ada di dalam judul."""
        kunci = kata_kunci.strip().lower()
        return kunci == self._item_id.lower() or kunci in self._judul.lower()

    def __str__(self):
        status = "Tersedia" if self.__tersedia else "Dipinjam"
        return (f"[{self._item_id}] {self.jenis:<7} | "
                f"{self._judul} ({self._tahun_terbit}) | {status}")

    def __repr__(self):
        return (f"{type(self).__name__}(item_id={self._item_id!r}, "
                f"judul={self._judul!r})")


class Book(LibraryItem):
    """Buku: dipinjam maksimal 7 hari, denda Rp 1.000 per hari."""

    DENDA_PER_HARI = 1_000

    def __init__(self, item_id, judul, tahun_terbit, penulis, isbn,
                 jumlah_halaman):
        super().__init__(item_id, judul, tahun_terbit)
        self.penulis = penulis
        self.__isbn = isbn                 # private
        self._jumlah_halaman = 0
        self.jumlah_halaman = jumlah_halaman

    @property
    def isbn(self):
        return self.__isbn

    @property
    def jumlah_halaman(self):
        return self._jumlah_halaman

    @jumlah_halaman.setter
    def jumlah_halaman(self, nilai):
        if not isinstance(nilai, int) or nilai <= 0:
            raise ValueError("Jumlah halaman harus bilangan bulat positif")
        self._jumlah_halaman = nilai

    @property
    def jenis(self):
        return "Buku"

    def get_detail(self):
        return (f"Penulis {self.penulis}, {self._jumlah_halaman} hlm, "
                f"ISBN {self.__isbn}")

    def lama_pinjam(self):
        return 7

    def hitung_denda(self, hari_terlambat):
        return hari_terlambat * self.DENDA_PER_HARI


class Magazine(LibraryItem):
    """Majalah: dipinjam maksimal 3 hari, denda Rp 500/hari (maks Rp 5.000)."""

    DENDA_PER_HARI = 500
    DENDA_MAKSIMUM = 5_000

    def __init__(self, item_id, judul, tahun_terbit, edisi, penerbit):
        super().__init__(item_id, judul, tahun_terbit)
        self._edisi = edisi
        self.penerbit = penerbit

    @property
    def edisi(self):
        return self._edisi

    @property
    def jenis(self):
        return "Majalah"

    def get_detail(self):
        return f"Edisi {self._edisi}, penerbit {self.penerbit}"

    def lama_pinjam(self):
        return 3

    def hitung_denda(self, hari_terlambat):
        return min(hari_terlambat * self.DENDA_PER_HARI, self.DENDA_MAKSIMUM)
