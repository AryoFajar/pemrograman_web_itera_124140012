# 05_struktur_data.py
# Struktur data: list, tuple, dictionary, dan set.

# List
hobi = ["Membaca", "Ngoding", "Bermain Game"]
hobi.append("Sepak Bola")
hobi.insert(1, "Berenang")
hobi.remove("Membaca")
dipop = hobi.pop()
print("List hobi :", hobi)
print("Item pop  :", dipop)

# List comprehension: kuadrat bilangan genap 1-10
kuadrat_genap = [x ** 2 for x in range(1, 11) if x % 2 == 0]
print("Kuadrat genap:", kuadrat_genap)

# Tuple (immutable)
titik_koordinat = (-5.3644, 105.3175)  # koordinat ITERA
print("\nKoordinat ITERA:", titik_koordinat)
# titik_koordinat[0] = 0
# -> TypeError: 'tuple' object does not support item assignment

# Dictionary
profil_mahasiswa = {
    "nim": "124140012",
    "nama": "Aryo Fajar Pratomo",
    "program_studi": "Teknik Informatika",
    "ipk": 3.85,
    "matkul_diambil": ["Pemrograman Web", "Basis Data", "Jaringan Komputer"],
}
profil_mahasiswa["ipk"] = 3.90
profil_mahasiswa["semester"] = 5
print("\nProfil mahasiswa:")
for kunci, nilai in profil_mahasiswa.items():
    print(f"  {kunci:<15}: {nilai}")
print("Beasiswa:", profil_mahasiswa.get("beasiswa", "Tidak Menerima"))

# Set
kode_matkul = set(["IF01", "IF02", "IF01", "IF03", "IF02", "IF04"])
print("\nSet kode matkul (unik):", sorted(kode_matkul))

mahasiswa_web = {"Budi", "Siti", "Andi", "Dewi"}
mahasiswa_ai = {"Andi", "Dewi", "Rian", "Eko"}
print("Union        :", sorted(mahasiswa_web | mahasiswa_ai))
print("Intersection :", sorted(mahasiswa_web & mahasiswa_ai))
print("Difference   :", sorted(mahasiswa_web - mahasiswa_ai))
