# latihan4_validasi.py
# Latihan 4: validasi password minimal 8 karakter dan mengandung angka.


def validasi_password(password):
    """Memeriksa kekuatan password.

    Args:
        password (str): password yang diperiksa.

    Returns:
        bool: True jika panjang minimal 8 karakter dan mengandung
        minimal satu angka.
    """
    ada_angka = any(karakter.isdigit() for karakter in password)
    return len(password) >= 8 and ada_angka


contoh_password = [
    "rahasia", "rahasia123", "12345678", "passwordku", "Itera2026",
]
for pw in contoh_password:
    status = "VALID" if validasi_password(pw) else "TIDAK VALID"
    print(f"{pw:<12} -> {status}")
