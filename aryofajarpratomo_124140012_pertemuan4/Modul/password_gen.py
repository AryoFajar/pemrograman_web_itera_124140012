# password_gen.py
# Latihan 6: modul pembuat password acak.

import random
import string


def buat_password_acak(panjang=8):
    """Membuat password acak dari huruf dan angka.

    Args:
        panjang (int): jumlah karakter password, bawaan 8.

    Returns:
        str: password acak.
    """
    karakter = string.ascii_letters + string.digits
    return "".join(random.choice(karakter) for _ in range(panjang))


if __name__ == "__main__":
    print(buat_password_acak())
