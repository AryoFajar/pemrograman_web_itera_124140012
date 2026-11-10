"""Anggota perpustakaan beserta batas pinjaman dan catatan denda."""
from library_item import format_rupiah


class Member:
    """Anggota yang dapat meminjam item perpustakaan."""

    MAKS_PINJAMAN = 3

    def __init__(self, id_anggota, nama):
        self._id_anggota = str(id_anggota).upper()   # protected
        self._nama = ""
        self.nama = nama
        self.__pinjaman = []                         # private
        self.__total_denda = 0                       # private

    @property
    def id_anggota(self):
        return self._id_anggota

    @property
    def nama(self):
        return self._nama

    @nama.setter
    def nama(self, nilai):
        if not isinstance(nilai, str) or not nilai.strip():
            raise ValueError("Nama anggota tidak boleh kosong")
        self._nama = nilai.strip().title()

    @property
    def jumlah_pinjaman(self):
        return len(self.__pinjaman)

    @property
    def total_denda(self):
        """Total denda hanya bisa dibaca; ditambah lewat catat_denda()."""
        return self.__total_denda

    def bisa_meminjam(self):
        return len(self.__pinjaman) < self.MAKS_PINJAMAN

    def tambah_pinjaman(self, item):
        if not self.bisa_meminjam():
            raise ValueError(f"{self._nama} sudah meminjam "
                             f"{self.MAKS_PINJAMAN} item (batas maksimal)")
        self.__pinjaman.append(item)

    def hapus_pinjaman(self, item):
        self.__pinjaman.remove(item)

    def catat_denda(self, nominal):
        if nominal < 0:
            raise ValueError("Denda tidak boleh negatif")
        self.__total_denda += nominal

    def daftar_pinjaman(self):
        """Mengembalikan salinan (tuple) agar list asli tidak bisa diubah."""
        return tuple(self.__pinjaman)

    def __str__(self):
        return (f"[{self._id_anggota}] {self._nama} | pinjaman "
                f"{len(self.__pinjaman)}/{self.MAKS_PINJAMAN} | denda "
                f"{format_rupiah(self.__total_denda)}")
