'use strict';

const KUNCI_KERANJANG = 'miniPos.keranjang';
const KUNCI_PROMO = 'miniPos.promo';

const MIN_NAMA = 3;            
const MIN_HARGA = 500;         
const MIN_QTY = 1;
const BATAS_DISKON = 50000;    
const PERSEN_DISKON = 10;      
const KODE_PROMO = 'HEMAT10';  

let keranjang = [];            
let promoAktif = false;
let timerStatus = null;

const el = {
  form: document.getElementById('form-barang'),
  statusForm: document.getElementById('status-form'),
  isiKeranjang: document.getElementById('isi-keranjang'),
  infoKeranjang: document.getElementById('info-keranjang'),
  totalBelanja: document.getElementById('total-belanja'),
  nominalDiskon: document.getElementById('nominal-diskon'),
  infoDiskon: document.getElementById('info-diskon'),
  totalAkhir: document.getElementById('total-akhir'),
  kodePromo: document.getElementById('kode-promo'),
  btnPromo: document.getElementById('btn-promo'),
  statusPromo: document.getElementById('status-promo'),
  bayar: document.getElementById('bayar'),
  hintBayar: document.getElementById('hint-bayar'),
  quickBayar: document.getElementById('quick-bayar'),
  kotakKembalian: document.getElementById('kotak-kembalian'),
  labelKembalian: document.getElementById('label-kembalian'),
  nilaiKembalian: document.getElementById('nilai-kembalian'),
  catatanKembalian: document.getElementById('catatan-kembalian'),
  btnReset: document.getElementById('btn-reset')
};

function formatRupiah(angka) {
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(angka);
}

function keAngka(teks) {
  const bersih = String(teks).trim();
  if (bersih === '') return null;
  const angka = Number(bersih);
  return Number.isFinite(angka) ? angka : null;
}

function validasiNama(nilai) {
  const nama = nilai.trim();
  if (nama === '') return 'Nama barang wajib diisi.';
  if (nama.length < MIN_NAMA) return 'Nama barang minimal ' + MIN_NAMA + ' karakter.';
  return '';
}

function validasiHarga(nilai) {
  if (String(nilai).trim() === '') return 'Harga satuan wajib diisi.';
  const harga = keAngka(nilai);
  if (harga === null) return 'Harga satuan harus berupa angka.';
  if (harga <= 0) return 'Harga satuan harus angka positif (tidak boleh 0 atau negatif).';
  if (!Number.isInteger(harga)) return 'Harga satuan harus bilangan bulat (tanpa koma).';
  if (harga < MIN_HARGA) return 'Harga satuan minimal ' + formatRupiah(MIN_HARGA) + '.';
  return '';
}

function validasiQty(nilai) {
  if (String(nilai).trim() === '') return 'Jumlah (qty) wajib diisi.';
  const qty = keAngka(nilai);
  if (qty === null) return 'Jumlah (qty) harus berupa angka.';
  if (!Number.isInteger(qty)) return 'Jumlah (qty) harus bilangan bulat.';
  if (qty < MIN_QTY) return 'Jumlah (qty) minimal ' + MIN_QTY + '.';
  return '';
}

const FIELD_FORM = [
  { id: 'nama', validator: validasiNama },
  { id: 'harga', validator: validasiHarga },
  { id: 'qty', validator: validasiQty }
];

function tampilkanError(idField, pesan) {
  const input = document.getElementById(idField);
  const pesanEl = document.getElementById('error-' + idField);
  const pembungkus = input.closest('.field');

  pesanEl.textContent = pesan;
  input.classList.toggle('invalid', pesan !== '');
  pembungkus.classList.toggle('has-error', pesan !== '');
  if (pesan) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
}

function validasiField(field) {
  const pesan = field.validator(document.getElementById(field.id).value);
  tampilkanError(field.id, pesan);
  return pesan === '';
}

function validateForm() {
  let fieldSalahPertama = null;
  FIELD_FORM.forEach(function (field) {
    if (!validasiField(field) && fieldSalahPertama === null) {
      fieldSalahPertama = field.id;
    }
  });
  return fieldSalahPertama;
}

function hitungSubtotal(item) {
  return item.harga * item.qty;
}

/** Total belanja = jumlah semua subtotal. */
function hitungTotal(daftar) {
  return daftar.reduce(function (jumlah, item) {
    return jumlah + hitungSubtotal(item);
  }, 0);
}

function hitungDiskon(total, kodePromoAktif) {
  if (total <= 0) {
    return { nominal: 0, keterangan: 'Belum ada diskon' };
  }
  if (total >= BATAS_DISKON) {
    return {
      nominal: Math.round(total * PERSEN_DISKON / 100),
      keterangan: 'Diskon ' + PERSEN_DISKON + '% (belanja ≥ ' + formatRupiah(BATAS_DISKON) + ')'
    };
  }
  if (kodePromoAktif) {
    return {
      nominal: Math.round(total * PERSEN_DISKON / 100),
      keterangan: 'Diskon ' + PERSEN_DISKON + '% (kode ' + KODE_PROMO + ')'
    };
  }
  return {
    nominal: 0,
    keterangan: 'Belanja ' + formatRupiah(BATAS_DISKON - total) + ' lagi untuk diskon ' + PERSEN_DISKON + '%'
  };
}

function hitungKembalian(uangBayar, totalAkhir) {
  return uangBayar - totalAkhir;
}

function itemValid(item) {
  return item !== null &&
    typeof item === 'object' &&
    typeof item.nama === 'string' &&
    Number.isFinite(item.harga) && item.harga > 0 &&
    Number.isInteger(item.qty) && item.qty >= MIN_QTY;
}

function simpanKeranjang() {
  try {
    localStorage.setItem(KUNCI_KERANJANG, JSON.stringify(keranjang));
  } catch (err) {
    tampilkanStatusForm('Peringatan: keranjang tidak dapat disimpan di browser ini.', 'bad');
  }
}

function muatKeranjang() {
  try {
    const mentah = localStorage.getItem(KUNCI_KERANJANG);
    if (mentah === null) return [];
    const data = JSON.parse(mentah);
    if (!Array.isArray(data)) return [];
    return data.filter(itemValid).map(function (item, i) {
      return { id: item.id !== undefined ? item.id : i + 1, nama: item.nama, harga: item.harga, qty: item.qty };
    });
  } catch (err) {
    return [];   
  }
}

function simpanPromo() {
  try {
    if (promoAktif) localStorage.setItem(KUNCI_PROMO, KODE_PROMO);
    else localStorage.removeItem(KUNCI_PROMO);
  } catch (err) { /* abaikan */ }
}

function muatPromo() {
  try {
    return localStorage.getItem(KUNCI_PROMO) === KODE_PROMO;
  } catch (err) {
    return false;
  }
}

function buatSel(teks, kelas, labelData) {
  const td = document.createElement('td');
  td.textContent = teks;
  if (kelas) td.className = kelas;
  if (labelData) td.setAttribute('data-label', labelData);
  return td;
}

function renderKeranjang() {
  el.isiKeranjang.textContent = '';

  if (keranjang.length === 0) {
    const tr = document.createElement('tr');
    tr.className = 'kosong';
    const td = document.createElement('td');
    td.colSpan = 6;
    td.innerHTML = '<span class="kosong-ikon" aria-hidden="true">🛒</span>' +
      'Keranjang masih kosong. Tambahkan barang lewat form di samping.';
    tr.appendChild(td);
    el.isiKeranjang.appendChild(tr);
  } else {
    keranjang.forEach(function (item, indeks) {
      const tr = document.createElement('tr');
      tr.appendChild(buatSel(indeks + 1, 'col-no', 'No'));
      tr.appendChild(buatSel(item.nama, 'nama', 'Nama Barang'));
      tr.appendChild(buatSel(formatRupiah(item.harga), 'num', 'Harga Satuan'));
      tr.appendChild(buatSel(item.qty, 'num', 'Qty'));
      tr.appendChild(buatSel(formatRupiah(hitungSubtotal(item)), 'num sub', 'Subtotal'));

      const tdAksi = document.createElement('td');
      tdAksi.className = 'col-aksi';
      tdAksi.setAttribute('data-label', 'Aksi');
      const tombol = document.createElement('button');
      tombol.type = 'button';
      tombol.className = 'btn btn-hapus';
      tombol.textContent = 'Hapus';
      tombol.setAttribute('data-id', item.id);
      tombol.setAttribute('aria-label', 'Hapus ' + item.nama + ' dari keranjang');
      tdAksi.appendChild(tombol);
      tr.appendChild(tdAksi);

      el.isiKeranjang.appendChild(tr);
    });
  }

  const totalPcs = keranjang.reduce(function (n, item) { return n + item.qty; }, 0);
  el.infoKeranjang.textContent = keranjang.length + ' item · ' + totalPcs + ' pcs';
}

function renderRingkasan() {
  const total = hitungTotal(keranjang);
  const diskon = hitungDiskon(total, promoAktif);
  const totalAkhir = total - diskon.nominal;

  el.totalBelanja.textContent = formatRupiah(total);
  el.nominalDiskon.textContent = '− ' + formatRupiah(diskon.nominal);
  el.infoDiskon.textContent = diskon.keterangan;
  el.totalAkhir.textContent = formatRupiah(totalAkhir);
  return totalAkhir;
}

function setKembalian(jenis, label, nilai, catatan) {
  el.kotakKembalian.className = 'change is-' + jenis;
  el.labelKembalian.textContent = label;
  el.nilaiKembalian.textContent = nilai;
  el.catatanKembalian.textContent = catatan;
}

function renderPembayaran(totalAkhir) {
  const mentah = el.bayar.value;
  const uangBayar = keAngka(mentah);

  el.hintBayar.textContent = uangBayar !== null && uangBayar >= 0
    ? 'Diterima: ' + formatRupiah(uangBayar)
    : 'Masukkan uang yang diterima dari pembeli.';

  if (keranjang.length === 0) {
    setKembalian('idle', 'Kembalian', '—', 'Keranjang masih kosong.');
    return;
  }
  if (uangBayar === null) {
    setKembalian('idle', 'Kembalian', '—', 'Masukkan nominal uang bayar.');
    return;
  }
  if (uangBayar < 0) {
    setKembalian('bad', 'Uang bayar tidak valid', '—', 'Uang bayar tidak boleh negatif.');
    return;
  }

  const kembalian = hitungKembalian(uangBayar, totalAkhir);
  if (kembalian < 0) {
    setKembalian('bad', 'Kekurangan', formatRupiah(Math.abs(kembalian)),
      'Uang belum mencukupi.');
  } else if (kembalian === 0) {
    setKembalian('ok', 'Kembalian', formatRupiah(0), 'Uang pas, tidak ada kembalian.');
  } else {
    setKembalian('ok', 'Kembalian', formatRupiah(kembalian), 'Pembayaran mencukupi.');
  }
}

function renderSemua() {
  renderKeranjang();
  const totalAkhir = renderRingkasan();
  renderPembayaran(totalAkhir);
}

function tampilkanStatusForm(pesan, jenis) {
  el.statusForm.textContent = pesan;
  el.statusForm.className = 'status ' + (jenis || '');
  clearTimeout(timerStatus);
  if (pesan) {
    timerStatus = setTimeout(function () {
      el.statusForm.textContent = '';
      el.statusForm.className = 'status';
    }, 3500);
  }
}

function idBerikutnya() {
  return keranjang.reduce(function (maks, item) {
    return Math.max(maks, Number(item.id) || 0);
  }, 0) + 1;
}

/** Submit form: validasi dulu, baru tambah barang ke keranjang. */
function tambahBarang(event) {
  event.preventDefault();

  const fieldSalah = validateForm();
  if (fieldSalah !== null) {
    document.getElementById(fieldSalah).focus();
    tampilkanStatusForm('', '');
    return;   // barang TIDAK masuk keranjang
  }

  const barang = {
    id: idBerikutnya(),
    nama: document.getElementById('nama').value.trim(),
    harga: Number(document.getElementById('harga').value),
    qty: Number(document.getElementById('qty').value)
  };

  keranjang.push(barang);
  simpanKeranjang();
  renderSemua();

  el.form.reset();
  FIELD_FORM.forEach(function (field) { tampilkanError(field.id, ''); });
  tampilkanStatusForm('"' + barang.nama + '" ditambahkan ke keranjang.', 'ok');
  document.getElementById('nama').focus();
}

function hapusBarang(id) {
  keranjang = keranjang.filter(function (item) { return String(item.id) !== String(id); });
  simpanKeranjang();
  renderSemua();
}

function terapkanPromo() {
  const kode = el.kodePromo.value.trim().toUpperCase();
  el.statusPromo.className = 'status';

  if (kode === '') {
    promoAktif = false;
    el.statusPromo.textContent = '';
  } else if (kode === KODE_PROMO) {
    promoAktif = true;
    el.kodePromo.value = KODE_PROMO;
    el.statusPromo.textContent = 'Kode ' + KODE_PROMO + ' dipakai: diskon ' + PERSEN_DISKON + '%.';
    el.statusPromo.classList.add('ok');
  } else {
    promoAktif = false;
    el.statusPromo.textContent = 'Kode promo tidak dikenal.';
    el.statusPromo.classList.add('bad');
  }
  simpanPromo();
  renderSemua();
}

function isiNominalCepat(nilai) {
  if (nilai === 'pas') {
    const total = hitungTotal(keranjang);
    el.bayar.value = total - hitungDiskon(total, promoAktif).nominal;
  } else {
    el.bayar.value = nilai;
  }
  renderSemua();
}

function resetTransaksi() {
  if (keranjang.length > 0 && !window.confirm('Kosongkan keranjang dan mulai transaksi baru?')) {
    return;
  }
  keranjang = [];
  promoAktif = false;
  try {
    localStorage.removeItem(KUNCI_KERANJANG);
    localStorage.removeItem(KUNCI_PROMO);
  } catch (err) { /* abaikan */ }

  el.form.reset();
  FIELD_FORM.forEach(function (field) { tampilkanError(field.id, ''); });
  el.bayar.value = '';
  el.kodePromo.value = '';
  el.statusPromo.textContent = '';
  el.statusPromo.className = 'status';
  tampilkanStatusForm('', '');
  renderSemua();
  document.getElementById('nama').focus();
}

function init() {
  keranjang = muatKeranjang();
  promoAktif = muatPromo();
  if (promoAktif) {
    el.kodePromo.value = KODE_PROMO;
    el.statusPromo.textContent = 'Kode ' + KODE_PROMO + ' dipakai: diskon ' + PERSEN_DISKON + '%.';
    el.statusPromo.classList.add('ok');
  }

  el.form.addEventListener('submit', tambahBarang);

  FIELD_FORM.forEach(function (field) {
    document.getElementById(field.id).addEventListener('input', function () {
      if (this.classList.contains('invalid')) validasiField(field);
    });
  });

  el.isiKeranjang.addEventListener('click', function (event) {
    const tombol = event.target.closest('.btn-hapus');
    if (tombol) hapusBarang(tombol.getAttribute('data-id'));
  });

  el.btnPromo.addEventListener('click', terapkanPromo);
  el.kodePromo.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') { event.preventDefault(); terapkanPromo(); }
  });

  el.bayar.addEventListener('input', renderSemua);
  el.quickBayar.addEventListener('click', function (event) {
    const chip = event.target.closest('.chip');
    if (chip) isiNominalCepat(chip.getAttribute('data-nominal'));
  });

  el.btnReset.addEventListener('click', resetTransaksi);

  renderSemua();
}

document.addEventListener('DOMContentLoaded', init);