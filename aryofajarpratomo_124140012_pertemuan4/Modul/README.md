# Modul Pertemuan 4 – Python Dasar

**Nama:** Aryo Fajar Pratomo  
**NIM:** 124140012

Folder ini berisi contoh kode dan latihan mandiri dari modul praktikum pertemuan 4.

| No | Materi | Contoh modul | Latihan mandiri |
|----|--------|--------------|-----------------|
| 1 | Pengenalan & eksekusi Python | `01_pengenalan.py` | `latihan1.py` – kartu identitas berbingkai `#` |
| 2 | Variabel & tipe data | `02_variabel.py` | `latihan2_suhu.py` – konversi Celcius ke Fahrenheit dan Kelvin |
| 3 | Struktur kendali | `03_kendali.py` | `latihan3_tebak.py` – permainan tebak angka |
| 4 | Fungsi | `04_fungsi.py` | `latihan4_validasi.py` – validasi password |
| 5 | Struktur data | `05_struktur_data.py` | `latihan5_kontak.py` – katalog kontak |
| 6 | Modul & package | `kalkulator_lib.py`, `06_modul_app.py` | `password_gen.py` + `main.py` – pembuat password acak |

## Cara Menjalankan

```bash
cd Modul
python 01_pengenalan.py
python latihan1.py
# dan seterusnya untuk file lain
```

File `02_variabel.py`, `latihan2_suhu.py`, dan `latihan3_tebak.py` meminta input dari keyboard.

## Virtual Environment (opsional)

```bash
python -m venv venv
# Windows
.\venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install requests
pip freeze > requirements.txt
```

Folder `venv/` dan `__pycache__/` tidak diunggah (sudah ada di `.gitignore`).
