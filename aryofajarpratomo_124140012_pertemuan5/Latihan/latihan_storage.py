"""Latihan mandiri Abstract Class: kontrak FileStorage."""
from abc import ABC, abstractmethod


class FileStorage(ABC):
    @abstractmethod
    def upload_file(self, nama_file, data_bytes):
        pass

    @abstractmethod
    def download_file(self, nama_file):
        pass


class LocalDiskStorage(FileStorage):
    """Simulasi penyimpanan ke folder lokal (disimpan di dictionary)."""

    def __init__(self, folder):
        self.folder = folder
        self._berkas = {}

    def upload_file(self, nama_file, data_bytes):
        self._berkas[nama_file] = data_bytes
        print(f"[Local] {len(data_bytes)} byte disimpan di "
              f"{self.folder}/{nama_file}")

    def download_file(self, nama_file):
        return self._berkas.get(nama_file)


class CloudStorage(FileStorage):
    """Simulasi penyimpanan ke server cloud."""

    def __init__(self, bucket):
        self.bucket = bucket
        self._objek = {}

    def upload_file(self, nama_file, data_bytes):
        self._objek[nama_file] = data_bytes
        print(f"[Cloud] Upload ke https://{self.bucket}.storage.cloud/"
              f"{nama_file} selesai")

    def download_file(self, nama_file):
        return self._objek.get(nama_file)


if __name__ == "__main__":
    for storage in (LocalDiskStorage("./uploads"),
                    CloudStorage("itera-paw")):
        storage.upload_file("tugas5.txt", b"Laporan OOP Python")
        print("   Unduh:", storage.download_file("tugas5.txt"))
    try:
        FileStorage()
    except TypeError as e:
        print("TypeError:", e)
