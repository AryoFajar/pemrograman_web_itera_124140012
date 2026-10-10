// =====================================================
// Latihan Loop & Fungsi
// Aryo Fajar Pratomo - 124140012
// Jalankan: node latihan-loop-fungsi.js
// =====================================================

// ---------- 1. Tabel perkalian 1 sampai 10 ----------
function tabelPerkalian(angka) {
  console.log("Tabel perkalian " + angka);
  for (let i = 1; i <= 10; i++) {
    console.log(angka + " x " + i + " = " + (angka * i));
  }
}

console.log("=== 1. Tabel Perkalian ===");
tabelPerkalian(3);

// ---------- 2. Faktorial ----------
// n! = n x (n-1) x ... x 1, dengan 0! = 1
function faktorial(n) {
  if (!Number.isInteger(n) || n < 0) {
    return "Masukkan bilangan bulat >= 0";
  }
  let hasil = 1;
  for (let i = 2; i <= n; i++) {
    hasil *= i;
  }
  return hasil;
}

console.log("\n=== 2. Faktorial ===");
console.log("5! =", faktorial(5));
console.log("0! =", faktorial(0));
console.log("3! =", faktorial(3));