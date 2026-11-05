# main.py
# Latihan 6: menguji modul password_gen.

from password_gen import buat_password_acak

print("Password 8 karakter :", buat_password_acak())
print("Password 12 karakter:", buat_password_acak(12))
print("Password 16 karakter:", buat_password_acak(16))
