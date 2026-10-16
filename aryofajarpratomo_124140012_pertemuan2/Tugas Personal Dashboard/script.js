'use strict';

const NAMA_PENGGUNA = 'Aryo';

const KEYS = {
  tasks: 'dashboard.tasks',
  schedule: 'dashboard.schedule',
  theme: 'dashboard.theme',
};

const API = {
  // Koordinat kampus ITERA, Lampung Selatan
  weather: 'https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current_weather=true&timezone=Asia%2FJakarta',
  quote: 'https://dummyjson.com/quotes/random',
  todos: 'https://jsonplaceholder.typicode.com/todos?_limit=5',
};

const NAMA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const URUTAN_HARI = [1, 2, 3, 4, 5, 6, 0]; // tampil Senin sampai Minggu

// Kode cuaca WMO dari Open-Meteo: [ikon, deskripsi]
const KODE_CUACA = {
  0: ['☀️', 'Cerah'], 1: ['🌤️', 'Cerah berawan'], 2: ['⛅', 'Berawan sebagian'], 3: ['☁️', 'Berawan'],
  45: ['🌫️', 'Berkabut'], 48: ['🌫️', 'Berkabut'],
  51: ['🌦️', 'Gerimis ringan'], 53: ['🌦️', 'Gerimis'], 55: ['🌦️', 'Gerimis lebat'],
  61: ['🌧️', 'Hujan ringan'], 63: ['🌧️', 'Hujan'], 65: ['🌧️', 'Hujan lebat'],
  80: ['🌦️', 'Hujan lokal'], 81: ['🌧️', 'Hujan lokal'], 82: ['🌧️', 'Hujan deras'],
  95: ['⛈️', 'Badai petir'], 96: ['⛈️', 'Badai petir'], 99: ['⛈️', 'Badai petir'],
};

// ---------- Helper (arrow functions) ----------
const $ = (selector, root = document) => root.querySelector(selector);
const pad = (n) => String(n).padStart(2, '0');
const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

const ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (value) => String(value).replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch]);

const toISODate = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const addDays = (n) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return toISODate(d);
};
const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};
const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

// Ubah selisih milidetik jadi teks "2 hari 4 jam 10 menit"
const formatCountdown = (ms) => {
  const totalMenit = Math.floor(Math.abs(ms) / 60000);
  const hari = Math.floor(totalMenit / 1440);
  const jam = Math.floor((totalMenit % 1440) / 60);
  const menit = totalMenit % 60;
  return [hari && `${hari} hari`, (hari || jam) && `${jam} jam`, `${menit} menit`].filter(Boolean).join(' ');
};

/* ==========================================================
   MODEL
   ========================================================== */

class TaskItem {
  constructor({ id = uid(), title, course, deadline, priority = 'sedang', done = false, createdAt = Date.now() }) {
    this.id = id;
    this.title = title;
    this.course = course;
    this.deadline = deadline; // format YYYY-MM-DD
    this.priority = priority; // rendah | sedang | tinggi
    this.done = done;
    this.createdAt = createdAt;
  }

  // Tenggat dianggap berakhir pada 23:59:59 di hari tersebut
  get dueDate() {
    return new Date(`${this.deadline}T23:59:59`);
  }

  get msLeft() {
    return this.dueDate - Date.now();
  }

  get isOverdue() {
    return !this.done && this.msLeft < 0;
  }

  // Selisih hari kalender dari hari ini (negatif = sudah lewat)
  get dayDiff() {
    return Math.round((new Date(`${this.deadline}T00:00:00`) - startOfToday()) / 86400000);
  }

  get dueLabel() {
    const diff = this.dayDiff;
    if (diff < 0) return `Terlambat ${-diff} hari`;
    if (diff === 0) return 'Hari ini';
    if (diff === 1) return 'Besok';
    return `${diff} hari lagi`;
  }

  // Salinan baru dengan perubahan (data tidak dimutasi)
  with(changes) {
    return new TaskItem({ ...this, ...changes });
  }

  static isValid(obj) {
    return Boolean(obj) && typeof obj.title === 'string' && typeof obj.course === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(obj.deadline);
  }
}

class ScheduleItem {
  constructor({ id = uid(), course, day, start, end, room = '' }) {
    this.id = id;
    this.course = course;
    this.day = Number(day); // 0 = Minggu ... 6 = Sabtu
    this.start = start; // HH:MM
    this.end = end;
    this.room = room;
  }

  isNow(now = new Date()) {
    const sekarang = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    return this.day === now.getDay() && this.start <= sekarang && sekarang < this.end;
  }

  with(changes) {
    return new ScheduleItem({ ...this, ...changes });
  }

  static isValid(obj) {
    return Boolean(obj) && typeof obj.course === 'string' && /^\d{2}:\d{2}$/.test(obj.start) && /^\d{2}:\d{2}$/.test(obj.end);
  }
}

/* ==========================================================
   APLIKASI
   ========================================================== */

class DashboardApp {
  constructor() {
    this.dom = {
      tanggal: $('#tanggal'),
      sapaan: $('#sapaan'),
      kutipan: $('#kutipan'),
      jam: $('#jam'),
      tema: $('#btn-tema'),
      next: $('#tenggat-terdekat'),
      statistik: $('#statistik'),
      filter: $('#filter-tugas'),
      cari: $('#cari'),
      tugas: $('#daftar-tugas'),
      impor: $('#btn-impor'),
      cuaca: $('#cuaca'),
      hari: $('#hari-jadwal'),
      jadwal: $('#daftar-jadwal'),
      dlgTugas: $('#dlg-tugas'),
      formTugas: $('#form-tugas'),
      dlgJadwal: $('#dlg-jadwal'),
      formJadwal: $('#form-jadwal'),
      toast: $('#toast'),
    };

    this.state = {
      tasks: this.load(KEYS.tasks, TaskItem),
      schedule: this.load(KEYS.schedule, ScheduleItem),
      filter: 'semua',
      query: '',
      day: new Date().getDay(),
      theme: this.loadTheme(),
    };
    this.toastTimer = null;
  }

  // ---------- Penyimpanan (localStorage) ----------

  load(key, Model) {
    try {
      const raw = JSON.parse(localStorage.getItem(key));
      return Array.isArray(raw) ? raw.filter(Model.isValid).map((item) => new Model(item)) : [];
    } catch (error) {
      console.warn(`Data "${key}" tidak bisa dibaca, dimulai dari kosong.`, error);
      return [];
    }
  }

  save(key, items) {
    try {
      localStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
      this.showToast('Data gagal disimpan: penyimpanan browser penuh atau diblokir.');
    }
  }

  loadTheme() {
    try {
      const saved = localStorage.getItem(KEYS.theme);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (error) { /* abaikan, pakai preferensi sistem */ }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Semua perubahan state lewat satu pintu supaya array tidak dimutasi
  setState(changes) {
    this.state = { ...this.state, ...changes };
    if ('tasks' in changes) this.save(KEYS.tasks, this.state.tasks);
    if ('schedule' in changes) this.save(KEYS.schedule, this.state.schedule);
  }

  // ---------- Operasi data: tugas ----------

  addTask(data) {
    const task = new TaskItem(data);
    this.setState({ tasks: [...this.state.tasks, task] });
  }

  updateTask(id, changes) {
    this.setState({ tasks: this.state.tasks.map((t) => (t.id === id ? t.with(changes) : t)) });
  }

  removeTask(id) {
    this.setState({ tasks: this.state.tasks.filter((t) => t.id !== id) });
  }

  // ---------- Operasi data: jadwal ----------

  addClass(data) {
    this.setState({ schedule: [...this.state.schedule, new ScheduleItem(data)] });
  }

  updateClass(id, changes) {
    this.setState({ schedule: this.state.schedule.map((s) => (s.id === id ? s.with(changes) : s)) });
  }

  removeClass(id) {
    this.setState({ schedule: this.state.schedule.filter((s) => s.id !== id) });
  }

  // ---------- Operasi asinkron (async/await + fetch) ----------

  async fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Server membalas ${response.status}`);
    return response.json();
  }

  async loadWeather() {
    this.dom.cuaca.innerHTML = '<p class="muted">Memuat cuaca…</p>';
    try {
      const { current_weather: now } = await this.fetchJSON(API.weather);
      const [icon, desc] = KODE_CUACA[now.weathercode] ?? ['🌡️', 'Kondisi tidak diketahui'];
      const sekarang = new Date();
      const jam = `${pad(sekarang.getHours())}:${pad(sekarang.getMinutes())}`;
      this.dom.cuaca.innerHTML = `
        <div class="weather">
          <div class="weather__icon" aria-hidden="true">${icon}</div>
          <div>
            <div class="weather__temp">${Math.round(now.temperature)}°C</div>
            <div class="weather__desc">${esc(desc)}</div>
          </div>
        </div>
        <p class="weather__meta">Angin ${Math.round(now.windspeed)} km/jam · diperbarui ${jam}</p>`;
    } catch (error) {
      this.dom.cuaca.innerHTML = `
        <p class="muted">Cuaca belum bisa dimuat. Periksa koneksi internet lalu coba lagi.</p>
        <button class="btn btn--ghost btn--sm retry" type="button" data-retry="weather">Muat ulang cuaca</button>`;
    }
  }

  async loadQuote() {
    try {
      const { quote, author } = await this.fetchJSON(API.quote);
      this.dom.kutipan.innerHTML = `
        <p class="quote__text">“${esc(quote)}”</p>
        <cite class="quote__by">${esc(author)}</cite>`;
    } catch (error) {
      this.dom.kutipan.innerHTML = '<p class="quote__text">Kerjakan satu hal kecil sekarang, lalu lanjut ke berikutnya.</p>';
    }
  }

  // Isi daftar tugas dari JSONPlaceholder sebagai contoh data awal
  async importSampleTasks() {
    this.dom.impor.disabled = true;
    try {
      const todos = await this.fetchJSON(API.todos);
      const sudahAda = new Set(this.state.tasks.map((t) => t.title));
      const baru = todos
        .filter(({ title }) => !sudahAda.has(title))
        .map(({ title, completed }, i) => new TaskItem({ title, course: 'Contoh (API)', deadline: addDays(i + 1), done: completed }));

      if (baru.length === 0) {
        this.showToast('Contoh tugas sudah pernah diimpor.');
      } else {
        this.setState({ tasks: [...this.state.tasks, ...baru] });
        this.renderAll();
        this.showToast(`${baru.length} contoh tugas diimpor.`);
      }
    } catch (error) {
      this.showToast('Impor gagal. Periksa koneksi internet lalu coba lagi.');
    } finally {
      this.dom.impor.disabled = false;
    }
  }

  // ---------- Turunan data ----------

  visibleTasks() {
    const { tasks, filter, query } = this.state;
    const q = query.trim().toLowerCase();
    return tasks
      .filter((t) => (filter === 'aktif' ? !t.done : filter === 'selesai' ? t.done : true))
      .filter((t) => !q || `${t.title} ${t.course}`.toLowerCase().includes(q))
      .sort((a, b) => Number(a.done) - Number(b.done) || a.dueDate - b.dueDate);
  }

  nextTask() {
    return this.state.tasks.filter((t) => !t.done).sort((a, b) => a.dueDate - b.dueDate)[0];
  }

  // ---------- Render (template literals) ----------

  renderAll() {
    this.renderHeader();
    this.renderNext();
    this.renderStats();
    this.renderTasks();
    this.renderDays();
    this.renderSchedule();
  }

  renderHeader() {
    const now = new Date();
    const h = now.getHours();
    const salam = h < 11 ? 'pagi' : h < 15 ? 'siang' : h < 18 ? 'sore' : 'malam';
    this.dom.sapaan.textContent = `Selamat ${salam}, ${NAMA_PENGGUNA}`;
    this.dom.tanggal.textContent = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    this.dom.tema.textContent = this.state.theme === 'dark' ? 'Mode terang' : 'Mode gelap';
    this.dom.tema.setAttribute('aria-pressed', String(this.state.theme === 'dark'));
  }

  renderClock() {
    const now = new Date();
    this.dom.jam.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }

  renderNext() {
    const task = this.nextTask();
    const box = this.dom.next;
    if (!task) {
      box.className = 'next next--empty';
      box.innerHTML = '<span class="next__label">Tidak ada tenggat yang menunggu.</span>';
      return;
    }
    const late = task.msLeft < 0;
    box.className = `next${late ? ' next--late' : ''}`;
    box.innerHTML = `
      <span class="next__label">${late ? 'Sudah lewat tenggat:' : 'Tenggat terdekat:'}</span>
      <span class="next__title">${esc(task.title)}</span>
      <span class="next__when">${late ? 'Terlambat' : 'Sisa'} ${formatCountdown(task.msLeft)}</span>`;
  }

  renderStats() {
    const { tasks } = this.state;
    const total = tasks.length;
    const selesai = tasks.filter((t) => t.done).length;
    const telat = tasks.filter((t) => t.isOverdue).length;
    const persen = total ? Math.round((selesai / total) * 100) : 0;
    this.dom.statistik.innerHTML = `
      <div class="stat"><div class="stat__n">${total}</div><div class="stat__l">Total tugas</div></div>
      <div class="stat"><div class="stat__n">${selesai}</div><div class="stat__l">Selesai (${persen}%)</div></div>
      <div class="stat stat--late"><div class="stat__n">${telat}</div><div class="stat__l">Terlambat</div></div>
      <div class="bar" role="progressbar" aria-label="Progres tugas selesai" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${persen}">
        <div class="bar__fill" style="width:${persen}%"></div>
      </div>`;
  }

  taskTemplate(task) {
    const { id, title, course, deadline, priority, done, isOverdue, dayDiff, dueLabel } = task;
    let dueClass = ''; // let: nilainya berubah sesuai kondisi tenggat
    if (isOverdue) dueClass = 'is-late';
    else if (!done && dayDiff <= 1) dueClass = 'is-soon';
    return `
      <li class="task${done ? ' is-done' : ''}" data-id="${esc(id)}" data-priority="${esc(priority)}">
        <input type="checkbox" ${done ? 'checked' : ''} data-act="toggle" aria-label="Tandai selesai: ${esc(title)}">
        <span class="task__title">${esc(title)}</span>
        <div class="task__act">
          <button class="iconbtn" type="button" data-act="edit" aria-label="Ubah tugas ${esc(title)}">Ubah</button>
          <button class="iconbtn iconbtn--del" type="button" data-act="delete" aria-label="Hapus tugas ${esc(title)}">Hapus</button>
        </div>
        <div class="task__meta">
          <span>${esc(course)}</span>
          <span>Tenggat ${formatDate(deadline)}</span>
          <span class="task__due ${dueClass}">${done ? 'Selesai' : dueLabel}</span>
          <span>Prioritas ${esc(priority)}</span>
        </div>
      </li>`;
  }

  renderTasks() {
    const list = this.visibleTasks();
    if (list.length) {
      this.dom.tugas.innerHTML = list.map((t) => this.taskTemplate(t)).join('');
      return;
    }
    const pesan = this.state.tasks.length
      ? 'Tidak ada tugas yang cocok dengan filter atau pencarian ini.'
      : 'Belum ada tugas. Klik “Tambah tugas”, atau impor contoh dari API untuk mencoba.';
    this.dom.tugas.innerHTML = `<li class="empty">${pesan}</li>`;
  }

  renderDays() {
    const hariIni = new Date().getDay();
    this.dom.hari.innerHTML = URUTAN_HARI.map((d) => {
      const kelas = ['day', d === this.state.day && 'is-active', d === hariIni && 'is-today'].filter(Boolean).join(' ');
      return `<button type="button" class="${kelas}" data-day="${d}" aria-pressed="${d === this.state.day}">${NAMA_HARI[d].slice(0, 3)}</button>`;
    }).join('');
  }

  renderSchedule() {
    const items = this.state.schedule
      .filter((s) => s.day === this.state.day)
      .sort((a, b) => a.start.localeCompare(b.start));

    if (!items.length) {
      this.dom.jadwal.innerHTML = `<li class="empty">Tidak ada kuliah pada hari ${NAMA_HARI[this.state.day]}.</li>`;
      return;
    }
    this.dom.jadwal.innerHTML = items.map((item) => {
      const { id, course, start, end, room } = item;
      return `
      <li class="slot${item.isNow() ? ' is-now' : ''}" data-id="${esc(id)}">
        <div class="slot__time">${start}<span>${end}</span></div>
        <div>
          <div class="slot__name">${esc(course)}</div>
          <div class="slot__room">${room ? `Ruang ${esc(room)}` : 'Ruang belum diisi'}</div>
        </div>
        <div class="slot__act">
          <button class="iconbtn" type="button" data-act="edit" aria-label="Ubah jadwal ${esc(course)}">Ubah</button>
          <button class="iconbtn iconbtn--del" type="button" data-act="delete" aria-label="Hapus jadwal ${esc(course)}">Hapus</button>
        </div>
      </li>`;
    }).join('');
  }

  showToast(message) {
    const el = this.dom.toast;
    el.textContent = message;
    el.classList.add('is-show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => el.classList.remove('is-show'), 2800);
  }

  // ---------- Tema ----------

  applyTheme() {
    document.documentElement.dataset.theme = this.state.theme;
  }

  toggleTheme() {
    const theme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setState({ theme });
    try { localStorage.setItem(KEYS.theme, theme); } catch (error) { /* tidak fatal */ }
    this.applyTheme();
    this.renderHeader();
  }

  // ---------- Form & validasi ----------

  validateTask({ title, course, deadline }) {
    const errors = {};
    if (title.trim().length < 3) errors.title = 'Judul minimal 3 karakter.';
    if (course.trim().length < 2) errors.course = 'Isi nama mata kuliah.';
    if (!deadline) errors.deadline = 'Pilih tanggal tenggat.';
    return errors;
  }

  validateClass({ course, start, end }) {
    const errors = {};
    if (course.trim().length < 2) errors.course = 'Isi nama mata kuliah.';
    if (!start) errors.start = 'Isi jam mulai.';
    if (!end) errors.end = 'Isi jam selesai.';
    else if (start && end <= start) errors.end = 'Jam selesai harus setelah jam mulai.';
    return errors;
  }

  showErrors(form, errors) {
    form.querySelectorAll('[data-err]').forEach((el) => {
      const message = errors[el.dataset.err] ?? '';
      el.textContent = message;
      el.closest('.field').classList.toggle('has-error', Boolean(message));
    });
  }

  fillForm(form, values) {
    form.reset();
    Object.entries(values).forEach(([name, value]) => {
      if (form.elements[name]) form.elements[name].value = value;
    });
  }

  openTaskDialog(task) {
    const { formTugas: form, dlgTugas: dialog } = this.dom;
    this.showErrors(form, {});
    this.fillForm(form, task ? { ...task } : { id: '', priority: 'sedang', deadline: addDays(1) });
    $('#dlg-tugas-judul').textContent = task ? 'Ubah tugas' : 'Tambah tugas';
    dialog.showModal();
    form.elements.title.focus();
  }

  openClassDialog(item) {
    const { formJadwal: form, dlgJadwal: dialog } = this.dom;
    this.showErrors(form, {});
    this.fillForm(form, item ? { ...item } : { id: '', day: this.state.day, start: '08:00', end: '09:40' });
    $('#dlg-jadwal-judul').textContent = item ? 'Ubah jadwal' : 'Tambah jadwal';
    dialog.showModal();
    form.elements.course.focus();
  }

  submitTask(event) {
    event.preventDefault();
    const form = this.dom.formTugas;
    const { id, title, course, deadline, priority } = Object.fromEntries(new FormData(form));
    const errors = this.validateTask({ title, course, deadline });
    this.showErrors(form, errors);
    if (Object.keys(errors).length) return;

    const data = { title: title.trim(), course: course.trim(), deadline, priority };
    if (id) {
      this.updateTask(id, data);
      this.showToast('Tugas diperbarui.');
    } else {
      this.addTask(data);
      this.showToast('Tugas ditambahkan.');
    }
    this.dom.dlgTugas.close();
    this.renderAll();
  }

  submitClass(event) {
    event.preventDefault();
    const form = this.dom.formJadwal;
    const { id, course, day, room, start, end } = Object.fromEntries(new FormData(form));
    const errors = this.validateClass({ course, start, end });
    this.showErrors(form, errors);
    if (Object.keys(errors).length) return;

    const data = { course: course.trim(), day: Number(day), room: room.trim(), start, end };
    if (id) {
      this.updateClass(id, data);
      this.showToast('Jadwal diperbarui.');
    } else {
      this.addClass(data);
      this.showToast('Jadwal ditambahkan.');
    }
    this.setState({ day: data.day }); // tampilkan hari yang baru diubah
    this.dom.dlgJadwal.close();
    this.renderAll();
  }

  // ---------- Event ----------

  bindEvents() {
    const { dom } = this;

    dom.tema.addEventListener('click', () => this.toggleTheme());
    $('#btn-tambah-tugas').addEventListener('click', () => this.openTaskDialog());
    $('#btn-tambah-jadwal').addEventListener('click', () => this.openClassDialog());
    dom.impor.addEventListener('click', () => this.importSampleTasks());

    dom.formTugas.addEventListener('submit', (e) => this.submitTask(e));
    dom.formJadwal.addEventListener('submit', (e) => this.submitClass(e));
    document.querySelectorAll('[data-tutup]').forEach((btn) =>
      btn.addEventListener('click', () => btn.closest('dialog').close()));

    dom.filter.addEventListener('click', ({ target }) => {
      const btn = target.closest('[data-filter]');
      if (!btn) return;
      this.setState({ filter: btn.dataset.filter });
      dom.filter.querySelectorAll('.seg__btn').forEach((b) => b.classList.toggle('is-active', b === btn));
      this.renderTasks();
    });

    dom.cari.addEventListener('input', ({ target }) => {
      this.setState({ query: target.value });
      this.renderTasks();
    });

    // Daftar tugas: satu listener untuk semua baris (event delegation)
    dom.tugas.addEventListener('click', ({ target }) => {
      const btn = target.closest('[data-act]');
      const row = target.closest('.task');
      if (!btn || !row) return;
      const task = this.state.tasks.find((t) => t.id === row.dataset.id);
      if (!task) return;
      if (btn.dataset.act === 'edit') this.openTaskDialog(task);
      if (btn.dataset.act === 'delete' && confirm(`Hapus tugas "${task.title}"?`)) {
        this.removeTask(task.id);
        this.renderAll();
        this.showToast('Tugas dihapus.');
      }
    });

    dom.tugas.addEventListener('change', ({ target }) => {
      if (target.dataset.act !== 'toggle') return;
      this.updateTask(target.closest('.task').dataset.id, { done: target.checked });
      this.renderAll();
    });

    dom.hari.addEventListener('click', ({ target }) => {
      const btn = target.closest('[data-day]');
      if (!btn) return;
      this.setState({ day: Number(btn.dataset.day) });
      this.renderDays();
      this.renderSchedule();
    });

    dom.jadwal.addEventListener('click', ({ target }) => {
      const btn = target.closest('[data-act]');
      const row = target.closest('.slot');
      if (!btn || !row) return;
      const item = this.state.schedule.find((s) => s.id === row.dataset.id);
      if (!item) return;
      if (btn.dataset.act === 'edit') this.openClassDialog(item);
      if (btn.dataset.act === 'delete' && confirm(`Hapus jadwal "${item.course}"?`)) {
        this.removeClass(item.id);
        this.renderSchedule();
        this.showToast('Jadwal dihapus.');
      }
    });

    dom.cuaca.addEventListener('click', ({ target }) => {
      if (target.dataset.retry === 'weather') this.loadWeather();
    });
  }

  // ---------- Mulai ----------

  init() {
    this.applyTheme();
    this.bindEvents();
    this.renderAll();
    this.renderClock();

    // Jam diperbarui tiap detik; hitung mundur dan label hari tiap menit
    setInterval(() => {
      this.renderClock();
      if (new Date().getSeconds() === 0) {
        this.renderHeader();
        this.renderNext();
        this.renderStats();
        this.renderTasks();
        this.renderSchedule();
      }
    }, 1000);

    // Dua permintaan jaringan berjalan bersamaan, tidak saling menunggu
    Promise.allSettled([this.loadWeather(), this.loadQuote()]);
  }
}

document.addEventListener('DOMContentLoaded', () => new DashboardApp().init());