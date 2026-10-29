// ===== Selector elemen =====
const form = document.getElementById("formWorkshop");
const inputNama = document.getElementById("nama");
const inputEmail = document.getElementById("email");
const pilihSesi = document.getElementById("sesi");
const inputCatatan = document.getElementById("catatan");
const jumlahCatatan = document.getElementById("jumlahCatatan");
const infoSesi = document.getElementById("infoSesi");
const pesanForm = document.getElementById("pesanForm");

const errNama = document.getElementById("errNama");
const errEmail = document.getElementById("errEmail");
const errSesi = document.getElementById("errSesi");

const rNama = document.getElementById("rNama");
const rEmail = document.getElementById("rEmail");
const rSesi = document.getElementById("rSesi");
const rCatatan = document.getElementById("rCatatan");

const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const detailSesi = {
  html: "Sabtu 09.00-11.00, Lab 1. Membangun halaman statis.",
  js: "Sabtu 13.00-15.00, Lab 2. Membawa laptop wajib.",
  deploy: "Minggu 09.00-11.00, Lab 1. Memerlukan akun GitHub."
};

// ===== Fungsi bantu =====
function setError(input, elemenError, teks) {
  elemenError.textContent = teks;
  input.setAttribute("aria-invalid", teks ? "true" : "false");
}

function setStatus(teks, jenis) {
  pesanForm.textContent = teks;
  pesanForm.className = "status " + (jenis || "");
}

function teksSesiTerpilih() {
  return pilihSesi.value === "" ? "-" : pilihSesi.options[pilihSesi.selectedIndex].text;
}

// ===== Fungsi 1: ringkasan langsung (event input / change) =====
function perbaruiRingkasan() {
  rNama.textContent = inputNama.value.trim() || "-";
  rEmail.textContent = inputEmail.value.trim() || "-";
  rSesi.textContent = teksSesiTerpilih();
  rCatatan.textContent = inputCatatan.value.trim() || "-";
}

[inputNama, inputEmail, inputCatatan].forEach(function (el) {
  el.addEventListener("input", perbaruiRingkasan);
});

// ===== Fungsi 2: penghitung karakter catatan =====
inputCatatan.addEventListener("input", function () {
  jumlahCatatan.textContent = inputCatatan.value.length;
});

// ===== Fungsi 3: detail sesi saat dropdown berubah (event change) =====
pilihSesi.addEventListener("change", function () {
  infoSesi.textContent = detailSesi[pilihSesi.value] || "";
  if (pilihSesi.value !== "") setError(pilihSesi, errSesi, "");
  perbaruiRingkasan();
});

// ===== Fungsi 4: validasi saat submit =====
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = inputNama.value.trim();
  const email = inputEmail.value.trim();
  const sesi = pilihSesi.value;
  let valid = true;

  // Bersihkan error lama
  setError(inputNama, errNama, "");
  setError(inputEmail, errEmail, "");
  setError(pilihSesi, errSesi, "");
  setStatus("", "");

  if (nama === "") {
    setError(inputNama, errNama, "Nama wajib diisi.");
    valid = false;
  } else if (nama.length < 3) {
    setError(inputNama, errNama, "Nama minimal terdiri dari 3 karakter.");
    valid = false;
  }

  if (email === "") {
    setError(inputEmail, errEmail, "Email wajib diisi.");
    valid = false;
  } else if (!polaEmail.test(email)) {
    setError(inputEmail, errEmail, "Format email belum benar, contoh: nama@kampus.ac.id.");
    valid = false;
  }

  if (sesi === "") {
    setError(pilihSesi, errSesi, "Pilih salah satu sesi workshop.");
    valid = false;
  }

  if (!valid) {
    setStatus("Pendaftaran belum berhasil. Periksa isian yang bertanda merah.", "gagal");
    const pertama = form.querySelector('[aria-invalid="true"]');
    if (pertama) pertama.focus();
    return;
  }

  setStatus("Terima kasih, " + nama + ". Pendaftaran untuk " + teksSesiTerpilih() + " berhasil.", "sukses");
  // Ringkasan tetap menampilkan data yang baru didaftarkan.
});

// ===== Fungsi 5: tombol hapus isian (event reset) =====
form.addEventListener("reset", function () {
  [inputNama, inputEmail, pilihSesi].forEach(function (el) { el.removeAttribute("aria-invalid"); });
  errNama.textContent = "";
  errEmail.textContent = "";
  errSesi.textContent = "";
  infoSesi.textContent = "";
  jumlahCatatan.textContent = "0";
  setStatus("", "");
  // reset dijalankan sebelum nilai dikosongkan, jadi ringkasan diperbarui setelahnya
  setTimeout(perbaruiRingkasan, 0);
});
