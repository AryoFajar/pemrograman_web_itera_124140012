# latihan2_suhu.py
# Latihan 2: konversi suhu Celcius ke Fahrenheit dan Kelvin.

celcius = float(input("Masukkan suhu dalam Celcius: "))

fahrenheit = celcius * 9 / 5 + 32
kelvin = celcius + 273.15

print(f"{celcius:.2f} °C = {fahrenheit:.2f} °F")
print(f"{celcius:.2f} °C = {kelvin:.2f} K")
