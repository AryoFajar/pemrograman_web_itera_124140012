"""Class Library untuk menyimpan dan mengelola koleksi perpustakaan."""
from library_item import LibraryItem, format_rupiah
from member import Member


class Library:
    """Mengelola koleksi item dan anggota perpustakaan."""

    def __init__(self, nama):
        self.nama = nama
        self.__koleksi = {}   # private: {item_id: LibraryItem}
        self.__anggota = {}   # private: {id_anggota: Member}

    # ------------------------------------------------------------ property
    @property
    def jumlah_koleksi(self):
        return len(self.__koleksi)

    @property
    def jumlah_tersedia(self):
        return sum(1 for item in self.__koleksi.values() if item.tersedia)

    # ------------------------------------------------------------- koleksi
    def tambah_item(self, item):
        """Menambahkan item; hanya objek turunan LibraryItem yang diterima."""
        if not isinstance(item, LibraryItem):
            raise TypeError("Item harus turunan LibraryItem")
        if item.item_id in self.__koleksi:
            raise ValueError(f"ID {item.item_id} sudah terdaftar")
        self.__koleksi[item.item_id] = item
        print(f"  [+] {item.jenis} '{item.judul}' ditambahkan "
              f"dengan ID {item.item_id}")

    def daftar_item(self, hanya_tersedia=False):
        items = list(self.__koleksi.values())
        if hanya_tersedia:
            items = [item for item in items if item.tersedia]
        return items

    def cari_item(self, kata_kunci):
        """Mencari berdasarkan ID (persis) atau sebagian judul."""
        return [item for item in self.__koleksi.values()
                if item.cocok_dengan(kata_kunci)]

    def cari_berdasarkan_id(self, item_id):
        return self.__koleksi.get(str(item_id).upper())

    def tampilkan_katalog(self, hanya_tersedia=False):
        """Menampilkan katalog; detail diambil secara polymorphic."""
        items = self.daftar_item(hanya_tersedia)
        judul = "ITEM TERSEDIA" if hanya_tersedia else "KATALOG LENGKAP"
        print(f"\n{judul} - {self.nama} ({len(items)} item)")
        print("-" * 78)
        if not items:
            print("  (kosong)")
        for item in items:
            print(f"  {item}")
            print(f"      {item.get_detail()} | maks pinjam "
                  f"{item.lama_pinjam()} hari")
        print("-" * 78)

    # ------------------------------------------------------------- anggota
    def daftarkan_anggota(self, anggota):
        if not isinstance(anggota, Member):
            raise TypeError("Anggota harus objek Member")
        self.__anggota[anggota.id_anggota] = anggota
        print(f"  [+] Anggota {anggota.nama} terdaftar ({anggota.id_anggota})")

    def cari_anggota(self, id_anggota):
        return self.__anggota.get(str(id_anggota).upper())

    def daftar_anggota(self):
        return list(self.__anggota.values())

    # ---------------------------------------------------------- transaksi
    def pinjam_item(self, item_id, id_anggota, tanggal):
        item = self.cari_berdasarkan_id(item_id)
        anggota = self.cari_anggota(id_anggota)
        if item is None:
            raise ValueError(f"Item {item_id} tidak ditemukan")
        if anggota is None:
            raise ValueError(f"Anggota {id_anggota} tidak ditemukan")
        if not anggota.bisa_meminjam():
            raise ValueError(f"{anggota.nama} sudah mencapai batas pinjaman")
        item.pinjamkan(anggota.nama, tanggal)
        anggota.tambah_pinjaman(item)
        print(f"  [>] {anggota.nama} meminjam '{item.judul}' pada "
              f"{tanggal:%d-%m-%Y} (maks {item.lama_pinjam()} hari)")

    def kembalikan_item(self, item_id, id_anggota, tanggal):
        item = self.cari_berdasarkan_id(item_id)
        anggota = self.cari_anggota(id_anggota)
        if item is None or anggota is None:
            raise ValueError("Item atau anggota tidak ditemukan")
        if item not in anggota.daftar_pinjaman():
            raise ValueError(f"{anggota.nama} tidak meminjam '{item.judul}'")
        lama, terlambat, denda = item.kembalikan(tanggal)
        anggota.hapus_pinjaman(item)
        anggota.catat_denda(denda)
        print(f"  [<] '{item.judul}' dikembalikan setelah {lama} hari, "
              f"terlambat {terlambat} hari, denda {format_rupiah(denda)}")
        return denda

    def __len__(self):
        return len(self.__koleksi)

    def __contains__(self, item_id):
        return str(item_id).upper() in self.__koleksi
