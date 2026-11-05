# 03_kendali.py
# Struktur kendali: if-elif-else, ternary, for, while, break, continue,
# dan nested loop.

nilai_ujian = 82
kehadiran_persen = 85

if nilai_ujian >= 80 and kehadiran_persen >= 75:
    grade = "A"
    keterangan = "Lulus dengan Pujian (Sangat Memuaskan)"
elif nilai_ujian >= 70:
    grade = "B"
    keterangan = "Lulus (Memuaskan)"
elif nilai_ujian >= 60:
    grade = "C"
    keterangan = "Lulus (Cukup)"
else:
    grade = "D"
    keterangan = "Tidak Lulus"
print(f"Grade: {grade} - {keterangan}")

# Ternary operator
status_registrasi = "Aktif" if kehadiran_persen >= 75 else "Nonaktif"
print(f"Status registrasi: {status_registrasi}")

# for + range + continue: bilangan ganjil 1-15
print("\nBilangan ganjil 1-15:", end=" ")
for angka in range(1, 16):
    if angka % 2 == 0:
        continue
    print(angka, end=" ")
print()

# enumerate
frameworks = ["Pyramid", "FastAPI", "Django", "Flask"]
print("\nFramework web Python:")
for nomor, nama in enumerate(frameworks, start=1):
    print(f"  {nomor}. {nama}")

# while + break + else
target = 7
hitung = 1
while hitung <= 10:
    if hitung == target:
        print(f"\nTarget {target} ditemukan pada iterasi ke-{hitung}")
        break
    hitung += 1
else:
    # Tidak dijalankan karena loop berhenti lewat break
    print("Target tidak ditemukan")

# Nested loop: segitiga bintang
tinggi_segitiga = 5
print("\nSegitiga bintang:")
for baris in range(1, tinggi_segitiga + 1):
    for _ in range(baris):
        print("*", end=" ")
    print()

# pass: placeholder blok kosong
for _ in range(3):
    pass
