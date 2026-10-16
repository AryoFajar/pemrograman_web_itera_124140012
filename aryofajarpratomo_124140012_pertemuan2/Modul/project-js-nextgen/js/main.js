import {
  demoVariables,
  demoArrowFunctions,
  demoTemplateLiterals,
  demoDestructuring,
  demoSpreadRest,
  demoDefaultParams,
  demoClasses,
  demoObjectLiterals,
  demoArrayMethods,
  demoAdvancedArrays,
  demoPromises,
  demoAsyncAwait,
} from './app.js';
import { latihanDestructuring, latihanClasses, latihanArray, latihanAsync } from './latihan.js';

const output = document.getElementById('output');
const runBtn = document.getElementById('runBtn');
const latihanBtn = document.getElementById('latihanBtn');
const clearBtn = document.getElementById('clearBtn');

/** Menampilkan satu kartu hasil. `content` bisa teks atau objek (ditampilkan sebagai JSON). */
function addOutput(title, subtitle, content, isError = false) {
  const item = document.createElement('article');
  item.className = `output-item${isError ? ' error' : ''}`;

  const h3 = document.createElement('h3');
  h3.textContent = title;

  const sub = document.createElement('p');
  sub.className = 'subtitle';
  sub.textContent = subtitle;

  const pre = document.createElement('pre');
  pre.className = 'result';
  pre.textContent = typeof content === 'string' ? content : JSON.stringify(content, null, 2);

  item.append(h3, sub, pre);
  output.append(item);
}

/** Menjalankan satu demo (sinkron maupun async) dan menampilkan hasilnya/error. */
async function tampilkan(nomor, judul, keterangan, fungsi) {
  try {
    addOutput(`${nomor}. ${judul}`, keterangan, await fungsi());
  } catch (error) {
    addOutput(`${nomor}. ${judul}`, keterangan, `${error.name}: ${error.message}`, true);
  }
}

async function jalankan(tombol, daftarDemo) {
  tombol.disabled = true;
  output.replaceChildren();
  for (const [nomor, judul, keterangan, fungsi] of daftarDemo) {
    await tampilkan(nomor, judul, keterangan, fungsi);
  }
  tombol.disabled = false;
}

const semuaDemo = [
  [1, 'Let & Const', 'var vs let vs const, TDZ', demoVariables],
  [2, 'Arrow Functions', 'Sintaks ringkas dan this leksikal', demoArrowFunctions],
  [3, 'Template Literals', 'Interpolasi, multi-baris, ekspresi', demoTemplateLiterals],
  [4, 'Destructuring', 'Objek, array, nested, default, rename', demoDestructuring],
  [5, 'Spread & Rest', 'Salin, gabung, dan tampung argumen', demoSpreadRest],
  [6, 'Default Parameters', 'Nilai bawaan parameter fungsi', demoDefaultParams],
  [7, 'Classes', 'Class, getter/setter, static, extends', demoClasses],
  [8, 'Enhanced Object Literals', 'Shorthand dan computed property', demoObjectLiterals],
  [9, 'Modern Array Methods', 'map, filter, find, reduce, some, every', demoArrayMethods],
  [10, 'Advanced Array', 'Array.from, of, flat, flatMap, includes', demoAdvancedArrays],
  [11, 'Promises', 'Chaining, all, race, allSettled', demoPromises],
  [12, 'Async/Await', 'Berurutan vs paralel, try/catch', demoAsyncAwait],
];

const semuaLatihan = [
  [1, 'Latihan Destructuring & Spread/Rest', 'Nested 3 level, rest statistik, merge objek, for...of', latihanDestructuring],
  [2, 'Latihan Classes & Object Literals', 'Product, DigitalProduct, PhysicalProduct, computed key', latihanClasses],
  [3, 'Latihan Array Methods', 'groupBy, rata-rata, flat, filter-map-reduce', latihanArray],
  [4, 'Latihan Async', 'Gabung data, retry exponential backoff, pagination', latihanAsync],
];

runBtn.addEventListener('click', () => jalankan(runBtn, semuaDemo));
latihanBtn.addEventListener('click', () => jalankan(latihanBtn, semuaLatihan));
clearBtn.addEventListener('click', () => {
  output.replaceChildren();
  const p = document.createElement('p');
  p.className = 'text-slate-500 italic';
  p.textContent = 'Output dibersihkan.';
  output.append(p);
});
