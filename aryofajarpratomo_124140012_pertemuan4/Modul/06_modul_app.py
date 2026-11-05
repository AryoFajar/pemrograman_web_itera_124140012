# 06_modul_app.py
# Memakai modul bawaan (math, random, datetime) dan modul kustom
# kalkulator_lib.

import math
import random
from datetime import datetime

import kalkulator_lib as calc

print("math.sqrt(64)     :", math.sqrt(64))
print("math.hypot(6, 8)  :", math.hypot(6, 8))
print("math.pi           :", round(math.pi, 5))

print("\nLempar dadu       :", random.randint(1, 6))
print("Pemenang giveaway :", random.choice(["Budi", "Siti", "Andi", "Dewi"]))

sekarang = datetime.now()
print("Waktu sekarang    :", sekarang.strftime("%d-%m-%Y %H:%M:%S"))

angka1 = 20
angka2 = 4
print(f"\n{angka1} + {angka2} = {calc.tambah(angka1, angka2)}")
print(f"{angka1} - {angka2} = {calc.kurang(angka1, angka2)}")
print(f"{angka1} x {angka2} = {calc.kali(angka1, angka2)}")
print(f"{angka1} / {angka2} = {calc.bagi(angka1, angka2)}")
print(f"{angka1} / 0 = {calc.bagi(angka1, 0)}")
