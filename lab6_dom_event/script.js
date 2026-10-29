// ===== Latihan 1: Mengubah teks dengan DOM =====
const judul = document.getElementById("judul");
const pesan = document.getElementById("pesan");

judul.textContent = "Belajar JavaScript DOM";
pesan.textContent = "Konten berhasil diubah oleh JavaScript.";

// ===== Latihan 2: Event click =====
const tombol = document.getElementById("tombolAksi");

tombol.addEventListener("click", function () {
  pesan.textContent = "Tombol diklik pada " + new Date().toLocaleTimeString();
});

// ===== Latihan 3: Mengubah kelas dan gaya CSS =====
const tombolGaya = document.getElementById("tombolGaya");
const teksGaya = document.getElementById("teksGaya");

tombolGaya.addEventListener("click", function () {
  teksGaya.classList.toggle("highlight");
  teksGaya.classList.toggle("teks-besar");
});

// ===== Eksperimen 4: Sembunyikan / tampilkan paragraf =====
const tombolSembunyi = document.getElementById("tombolSembunyi");
const paragrafSembunyi = document.getElementById("paragrafSembunyi");

tombolSembunyi.addEventListener("click", function () {
  paragrafSembunyi.classList.toggle("tersembunyi");
});

// ===== Latihan 4: Event input dan penghitung karakter =====
const namaInput = document.getElementById("namaInput");
const jumlahKarakter = document.getElementById("jumlahKarakter");

namaInput.addEventListener("input", function () {
  jumlahKarakter.textContent = namaInput.value.length;
});

// ===== Latihan 5: Validasi form pendaftaran =====
const form = document.getElementById("formPendaftaran");
const pesanForm = document.getElementById("pesanForm");

function tampilkanPesan(elemen, teks, sukses) {
  elemen.textContent = teks;
  elemen.classList.toggle("pesan-sukses", sukses);
  elemen.classList.toggle("pesan-error", !sukses);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const usiaInput = document.getElementById("usia").value;
  const usia = Number(usiaInput);
  const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nama === "") {
    tampilkanPesan(pesanForm, "Nama wajib diisi.", false);
  } else if (nama.length < 3) {
    // Eksperimen 2: nama minimal tiga karakter
    tampilkanPesan(pesanForm, "Nama minimal terdiri dari 3 karakter.", false);
  } else if (!polaEmail.test(email)) {
    tampilkanPesan(pesanForm, "Masukkan email yang valid.", false);
  } else if (usiaInput === "" || !Number.isInteger(usia) || usia < 17 || usia > 100) {
    tampilkanPesan(pesanForm, "Usia harus berupa bilangan bulat 17–100.", false);
  } else {
    tampilkanPesan(pesanForm, "Validasi berhasil. Form siap diproses.", true);
    form.reset();
  }
});

// ===== Latihan 6: Daftar tugas + Eksperimen 1 (hapus item) =====
const inputTugas = document.getElementById("inputTugas");
const tambahTugas = document.getElementById("tambahTugas");
const daftarTugas = document.getElementById("daftarTugas");
const pesanTugas = document.getElementById("pesanTugas");

tambahTugas.addEventListener("click", function () {
  const teks = inputTugas.value.trim();

  if (teks === "") {
    tampilkanPesan(pesanTugas, "Tulis tugas terlebih dahulu.", false);
    return;
  }

  const item = document.createElement("li");
  const label = document.createElement("span");
  const selesai = document.createElement("button");
  const hapus = document.createElement("button");

  label.textContent = teks + " ";   // textContent: aman dari injeksi HTML

  selesai.type = "button";
  selesai.textContent = "Tandai selesai";
  selesai.addEventListener("click", function () {
    item.classList.toggle("selesai");
    selesai.textContent = item.classList.contains("selesai")
      ? "Batalkan selesai" : "Tandai selesai";
  });

  hapus.type = "button";
  hapus.className = "hapus";
  hapus.textContent = "Hapus";
  hapus.addEventListener("click", function () {
    item.remove();
    tampilkanPesan(pesanTugas, "Tugas dihapus.", true);
  });

  item.append(label, selesai, hapus);
  daftarTugas.appendChild(item);

  inputTugas.value = "";
  tampilkanPesan(pesanTugas, "Tugas ditambahkan.", true);
  inputTugas.focus();
});
