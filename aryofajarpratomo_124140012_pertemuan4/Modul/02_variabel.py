# 02_variabel.py
# Variabel, tipe data, f-string, operasi string, type casting, dan input().

nama_produk = "Mechanical Keyboard RGB"   # str
stok = 25                                 # int
harga_satuan = 450000.75                  # float
sedang_diskon = True                      # bool
catatan_khusus = None                     # NoneType

print("Tipe data stok        :", type(stok))
print("Tipe data harga_satuan:", type(harga_satuan))
print("Tipe data diskon      :", type(sedang_diskon))
print("Tipe data catatan     :", type(catatan_khusus))

# Perhitungan diskon dan f-string dengan format angka
diskon_persen = 0.10
harga_setelah_diskon = harga_satuan * (1 - diskon_persen)
print(f"\nProduk         : {nama_produk}")
print(f"Harga normal   : Rp {harga_satuan:,.2f}")
print(f"Harga diskon   : Rp {harga_setelah_diskon:,.2f}")

# Operasi string
kata = "Teknik Informatika"
print(f"\nPanjang string : {len(kata)}")
print(f"Karakter awal  : {kata[0]}")
print(f"Slicing [0:6]  : {kata[0:6]}")
print(f"Huruf besar    : {kata.upper()}")
print(f"Replace        : {kata.replace('Informatika', 'Komputer')}")

# Type casting
angka_str = "150"
angka_int = int(angka_str)
print(f"\n'{angka_str}' (str) -> {angka_int} (int), "
      f"ditambah 50 = {angka_int + 50}")

# Input dari pengguna (input() selalu menghasilkan str)
nama_pembeli = input("\nMasukkan nama pembeli : ")
jumlah_beli = int(input("Masukkan jumlah beli  : "))
total = harga_setelah_diskon * jumlah_beli
print(f"Halo {nama_pembeli}, total tagihan Anda: Rp {total:,.2f}")

# Ringkasan operator
a, b = 10, 3
print(f"\nAritmatika : {a} + {b} = {a + b}, {a} // {b} = {a // b}, "
      f"{a} % {b} = {a % b}, {a} ** {b} = {a ** b}")
print(f"Perbandingan: {a} > {b} -> {a > b}, {a} == {b} -> {a == b}")
print(f"Logika     : (a > 5) and (b > 5) -> {(a > 5) and (b > 5)}")
print(f"Keanggotaan: 'Teknik' in kata -> {'Teknik' in kata}")
print(f"Identitas  : catatan_khusus is None -> {catatan_khusus is None}")
