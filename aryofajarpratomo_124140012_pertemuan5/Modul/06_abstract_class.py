"""Hands-on 7: Abstract class dan interface dengan modul abc."""
import math
from abc import ABC, abstractmethod


class Shape(ABC):
    """Kontrak untuk semua bangun datar."""

    @abstractmethod
    def luas(self):
        pass

    @abstractmethod
    def keliling(self):
        pass

    def cetak_laporan(self):  # method konkret yang memakai method abstrak
        print(f"{type(self).__name__:<15} luas = {self.luas():8.2f} | "
              f"keliling = {self.keliling():6.2f}")


class PersegiPanjang(Shape):
    def __init__(self, panjang, lebar):
        self.panjang = panjang
        self.lebar = lebar

    def luas(self):
        return self.panjang * self.lebar

    def keliling(self):
        return 2 * (self.panjang + self.lebar)


class Lingkaran(Shape):
    def __init__(self, jari_jari):
        self.jari_jari = jari_jari

    def luas(self):
        return math.pi * self.jari_jari ** 2

    def keliling(self):
        return 2 * math.pi * self.jari_jari


class DatabaseConnector(ABC):
    """Interface konektor database."""

    @property
    @abstractmethod
    def driver_name(self):
        pass

    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def execute_query(self, sql):
        pass

    @abstractmethod
    def disconnect(self):
        pass


class PostgreSQLConnector(DatabaseConnector):
    @property
    def driver_name(self):
        return "psycopg2"

    def connect(self):
        print(f"Terhubung ke PostgreSQL via {self.driver_name}")

    def execute_query(self, sql):
        print(f"Menjalankan: {sql}")
        return [(1, "Aryo"), (2, "Fajar")]

    def disconnect(self):
        print("Koneksi PostgreSQL ditutup")


if __name__ == "__main__":
    for bangun in (PersegiPanjang(8, 5), Lingkaran(7)):
        bangun.cetak_laporan()

    try:
        Shape()
    except TypeError as e:
        print("TypeError:", e)

    class Segitiga(Shape):  # lupa mengimplementasikan keliling()
        def luas(self):
            return 0

    try:
        Segitiga()
    except TypeError as e:
        print("TypeError:", e)

    db = PostgreSQLConnector()
    db.connect()
    print("Hasil:", db.execute_query("SELECT id, nama FROM mahasiswa"))
    db.disconnect()
