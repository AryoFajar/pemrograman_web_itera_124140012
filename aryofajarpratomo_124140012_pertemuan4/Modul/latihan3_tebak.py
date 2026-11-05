# latihan3_tebak.py
# Latihan 3: permainan tebak angka. Angka rahasia = 7.

ANGKA_RAHASIA = 7

while True:
    tebakan = int(input("Tebak angka (1-10): "))
    if tebakan < ANGKA_RAHASIA:
        print("Terlalu kecil!")
    elif tebakan > ANGKA_RAHASIA:
        print("Terlalu besar!")
    else:
        print("Selamat, tebakan benar!")
        break
