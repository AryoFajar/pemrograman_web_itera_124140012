// =====================================================
// Latihan Dasar JavaScript
// Aryo Fajar Pratomo - 124140012
// Jalankan: node latihan-dasar.js
// =====================================================

// ---------- 1. Variabel data diri: const dan let ----------
let nama = "Aryo Fajar Pratomo";     
const kotaAsal = "Bandar Lampung";   
let umur = 20;                       

console.log("=== 1. Data Diri ===");
console.log("Nama      :", nama);
console.log("Umur      :", umur);
console.log("Kota Asal :", kotaAsal);

umur = umur + 1;                     
console.log("Umur tahun depan:", umur);
nama = "Lain";      

// ---------- 2. Pengecekan kelulusan (nilai >= 70) ----------
function cekKelulusan(nilai) {
  if (nilai >= 70) {
    return "LULUS";
  } else {
    return "TIDAK LULUS";
  }
}

console.log("\n=== 2. Cek Kelulusan ===");
[85, 70, 69, 40].forEach(function (nilai) {
  console.log("Nilai " + nilai + " -> " + cekKelulusan(nilai));
});
