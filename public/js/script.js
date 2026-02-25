console.log("JS terhubung & Siap Konek Firebase!");

// ==========================================
// 1. DEFINISI ELEMENT DOM
// ==========================================
const btnTambahItem = document.getElementById('btnTambahItem');
const inputNamaItem = document.getElementById('inputNamaItem');
const inputQtyItem = document.getElementById('inputQtyItem');
const inputHargaItem = document.getElementById('inputHargaItem');
const tabelMenu = document.getElementById('tabelMenu');
const inputTotal = document.getElementById('inputTotal');
const inputJudul = document.getElementById('inputJudul');

const radioEqual = document.getElementById('radioEqual');
const radioCustom = document.getElementById('radioCustom');
const labelEqual = document.getElementById('labelEqual');
const labelCustom = document.getElementById('labelCustom');

const inputNamaAnggota = document.getElementById('inputNamaAnggota');
const containerAnggota = document.getElementById('containerAnggota');
const btnTambahAnggota = document.getElementById('btnTambahAnggotaInner');
const inputBagianAnggota = document.getElementById('inputBagianAnggota'); 

// UI Mode Edit / Simpan
const areaKodeRoom = document.getElementById('areaKodeRoom');
const teksKodeRoom = document.getElementById('teksKodeRoom');
const btnSimpan = document.getElementById('btnSimpan'); // Tombol Create
const btnUpdate = document.getElementById('btnUpdate'); // Tombol Edit
const btnBatal = document.getElementById('btnBatal');   // Tombol Batal
const btnShare = document.getElementById('btnShareStruk');

// Variabel Global
let totalSemua = 0; 
let currentBillId = null; // Menyimpan ID saat mode edit

// ==========================================
// 2. FORMATTER & HELPER
// ==========================================

function formatRibuan(nominal) {
    return parseInt(nominal).toLocaleString('id-ID');
}

function cleanAngka(teks) {
    if (!teks) return 0;
    return parseInt(teks.toString().replace(/\D/g, "")) || 0;
}

// Pasang format live ke input harga
[inputHargaItem, inputTotal, inputBagianAnggota].forEach(el => {
    if(el) {
        el.addEventListener('input', function(e) {
            let clean = cleanAngka(e.target.value);
            if (clean === 0) e.target.value = "";
            else e.target.value = formatRibuan(clean);
            
            // Khusus input total utama
            if (e.target.id === 'inputTotal') {
                totalSemua = clean;
                hitungBagiRata();
            }
        });
    }
});

// ==========================================
// 3. LOGIKA UI (TAMBAH MENU & ANGGOTA)
// ==========================================

// Tambah Menu
if(btnTambahItem) {
    btnTambahItem.addEventListener('click', function() {
        const nama = inputNamaItem.value.trim();
        const qty = parseInt(inputQtyItem.value) || 1;
        const harga = cleanAngka(inputHargaItem.value);
        const totalItem = qty * harga;

        if (nama === '' || harga === 0) return alert("Isi menu dan harga dulu ya!");

        tambahBarisMenuKeHTML(nama, qty, harga, totalItem);
        
        // Update total utama
        totalSemua += totalItem;
        inputTotal.value = formatRibuan(totalSemua);

        // Reset Form kecil
        inputNamaItem.value = '';
        inputHargaItem.value = '';
        inputQtyItem.value = '1';
        inputNamaItem.focus();

        hitungBagiRata();
    });
}

// Helper: Biar bisa dipake pas Load Data Edit juga
function tambahBarisMenuKeHTML(nama, qty, harga, totalItem) {
    const barisBaru = `
        <tr class="hover:bg-slate-50 transition border-b border-slate-50 animate-in fade-in slide-in-from-right duration-300">
            <td class="py-4 px-2 font-semibold text-slate-700">${nama}</td>
            <td class="py-4 px-2 text-slate-500 text-left font-bold italic">x${qty}</td>
            <td class="py-4 px-2 text-right text-slate-500">${formatRibuan(harga)}</td>
            <td class="py-4 px-2 text-right font-black text-slate-800">${formatRibuan(totalItem)}</td>
            <td class="py-4 px-2 text-right">
                <button class="btn-hapus-item p-1 text-slate-300 hover:text-red-500 transition">
                    <span class="material-icons-round text-lg">delete_outline</span>
                </button>
            </td>
        </tr>`;
    tabelMenu.insertAdjacentHTML('beforeend', barisBaru);
}

// Hapus Item Menu
tabelMenu.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-hapus-item');
    if (btn) {
        const baris = btn.closest('tr');
        const nominalHapus = cleanAngka(baris.children[3].innerText);
        totalSemua -= nominalHapus;
        inputTotal.value = formatRibuan(totalSemua);
        baris.remove();
        hitungBagiRata();
    }
});

// Tambah Anggota
if(btnTambahAnggota) {
    btnTambahAnggota.addEventListener('click', function() {
        const nama = inputNamaAnggota.value.trim();
        const hargaManual = inputBagianAnggota ? cleanAngka(inputBagianAnggota.value) : 0;

        if (nama === '') return alert("Masukkan nama anggota terlebih dahulu");

        let angkaAwal = radioCustom.checked ? hargaManual : 0;
        tambahKartuAnggotaKeHTML(nama, angkaAwal);

        inputNamaAnggota.value = '';
        inputNamaAnggota.focus();
        hitungBagiRata();
    });
}

// Helper: Biar bisa dipake pas Load Data Edit juga
function tambahKartuAnggotaKeHTML(nama, nominal) {
    const kartuBaru = `
        <div class="card-anggota border border-slate-100 rounded-2xl shadow-sm bg-white p-4 transition-all hover:border-blue-100 animate-in slide-in-from-top-2 duration-300">
            <div class="flex items-center justify-between gap-4">
                <div class="flex-1 flex items-center gap-3 text-left">
                    <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                        ${nama.substring(0,2).toUpperCase()}
                    </div>
                    <input type="text" class="w-full font-bold text-slate-800 bg-transparent border-none focus:ring-0 p-0 outline-none text-sm" value="${nama}">
                </div>
                <div class="flex items-center gap-4">
                    <div class="text-right">
                        <span class="text-[8px] font-bold text-slate-400 uppercase block leading-none mb-1">Patungan</span>
                        <div class="flex items-center gap-1">
                            <span class="text-[10px] font-bold text-blue-600">Rp</span>
                            <input type="text" class="total-bagian-angka w-24 font-black text-blue-600 text-base bg-transparent border-none focus:ring-0 p-0 text-right outline-none" 
                                   value="${formatRibuan(nominal)}" ${radioEqual.checked ? 'readonly' : ''}>
                        </div>
                    </div>
                    <button class="btn-hapus-anggota p-1 text-slate-200 hover:text-red-500 transition">
                        <span class="material-icons-round text-lg">cancel</span>
                    </button>
                </div>
            </div>
        </div>`;
    containerAnggota.insertAdjacentHTML('afterbegin', kartuBaru);
}

// Hapus Anggota
containerAnggota.addEventListener('click', function(e) {
    if (e.target.closest('.btn-hapus-anggota')) {
        e.target.closest('.card-anggota').remove();
        hitungBagiRata();
    }
});

// Edit Nominal Anggota (Mode Custom)
containerAnggota.addEventListener('input', function(e) {
    if (e.target.classList.contains('total-bagian-angka')) {
        let clean = cleanAngka(e.target.value);
        e.target.value = (clean === 0) ? "" : formatRibuan(clean);
        hitungTotalBayarAnggota();
    }
});

// ==========================================
// 4. LOGIKA PERHITUNGAN (SPLIT BILL)
// ==========================================

function hitungBagiRata() {
    const totalTagihanReal = cleanAngka(inputTotal.value);
    const allInputsAnggota = document.querySelectorAll('.total-bagian-angka');
    const jumlahOrang = allInputsAnggota.length;

    if (radioEqual.checked) {
        if (jumlahOrang > 0 && totalTagihanReal > 0) {
            const hasilBagi = Math.round(totalTagihanReal / jumlahOrang);
            allInputsAnggota.forEach(input => {
                input.value = formatRibuan(hasilBagi);
                input.readOnly = true; 
                input.classList.remove('bg-blue-50');
            });
        } else {
            allInputsAnggota.forEach(input => input.value = "0");
        }
    }
    hitungTotalBayarAnggota();
}

function hitungTotalBayarAnggota() {
    let totalTerbayar = 0;
    document.querySelectorAll('.total-bagian-angka').forEach(input => {
        totalTerbayar += cleanAngka(input.value);
    });

    const masterTotal = cleanAngka(inputTotal.value);
    const elTotal = document.getElementById('totalTerbayar');
    
    if(elTotal) {
        elTotal.innerText = "Rp " + formatRibuan(totalTerbayar);

        if (totalTerbayar === masterTotal && masterTotal > 0) {
            elTotal.className = "text-2xl font-extrabold text-green-600 transition-colors";
        } else {
            elTotal.className = "text-2xl font-extrabold text-red-600 transition-colors";
        }
    }
}

function updateMetodeUI() {
    const iconEq = labelEqual.querySelector('.check-icon');
    const iconCu = labelCustom.querySelector('.check-icon');

    if (radioEqual.checked) {
        // Style Equal Active
        labelEqual.className = "relative flex cursor-pointer rounded-2xl border-2 border-blue-600 bg-blue-50/50 p-5 transition-all";
        iconEq.innerHTML = '<span class="material-icons-round text-xs">check</span>';
        iconEq.className = "check-icon bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center";
        
        labelCustom.className = "relative flex cursor-pointer rounded-2xl border-2 border-slate-200 bg-white p-5 transition-all";
        iconCu.innerHTML = '';
        iconCu.className = "check-icon border-2 border-slate-200 rounded-full h-6 w-6";

        if(inputBagianAnggota) {
            inputBagianAnggota.disabled = true; 
            inputBagianAnggota.value = "";
        }
        
        hitungBagiRata();
    } else {
        // Style Custom Active
        labelCustom.className = "relative flex cursor-pointer rounded-2xl border-2 border-blue-600 bg-blue-50/50 p-5 transition-all";
        iconCu.innerHTML = '<span class="material-icons-round text-xs">check</span>';
        iconCu.className = "check-icon bg-blue-600 text-white rounded-full h-6 w-6 flex items-center justify-center";
        
        labelEqual.className = "relative flex cursor-pointer rounded-2xl border-2 border-slate-200 bg-white p-5 transition-all";
        iconEq.innerHTML = '';
        iconEq.className = "check-icon border-2 border-slate-200 rounded-full h-6 w-6";

        if(inputBagianAnggota) inputBagianAnggota.disabled = false;

        document.querySelectorAll('.total-bagian-angka').forEach(input => {
            input.readOnly = false;
            input.classList.add('bg-blue-50');
        });
    }
}

if(radioEqual) radioEqual.addEventListener('change', updateMetodeUI);
if(radioCustom) radioCustom.addEventListener('change', updateMetodeUI);


// ==========================================
// 5. FIREBASE LOGIC (CREATE & UPDATE)
// ==========================================

// Helper: Mengambil semua data form jadi Object Rapih
function kumpulkanDataDariForm() {
    // 1. Ambil Header
    const judul = document.getElementById('inputJudul').value || "Tanpa Judul";
    const total = cleanAngka(document.getElementById('inputTotal').value);
    
    // Safety check kalau elemen radio ada
    let metode = 'equal';
    if(document.querySelector('input[name="split-method"]:checked')) {
        metode = document.querySelector('input[name="split-method"]:checked').value;
    }

    // 2. Ambil Menu (Looping tr di tabel)
    const listMenu = [];
    document.querySelectorAll('#tabelMenu tr').forEach(row => {
        listMenu.push({
            namaItem: row.children[0].innerText,
            qty: parseInt(row.children[1].innerText.replace('x', '')),
            harga: cleanAngka(row.children[2].innerText)
        });
    });

    // 3. Ambil Anggota (Looping card anggota)
    const listAnggota = [];
    document.querySelectorAll('.card-anggota').forEach(card => {
        listAnggota.push({
            namaOrang: card.querySelector('input[type="text"]').value,
            bayar: cleanAngka(card.querySelector('.total-bagian-angka').value)
        });
    });

    return { 
        judulTagihan: judul, 
        totalSemua: total, 
        metodeBayar: metode, 
        daftarMenu: listMenu, 
        daftarAnggota: listAnggota 
    };
}

// --- FUNGSI CREATE (SIMPAN BARU) ---
function simpanKeFirebase() {
    console.log("Menyimpan ke Firebase...");
    
    const user = firebase.auth().currentUser;
    if (!user) {
        alert("Sesi habis, silakan login ulang.");
        window.location.href = "/";
        return;
    }

    const data = kumpulkanDataDariForm();
    
    // Tambah data pelengkap
    data.uid = user.uid;
    data.dibuatPada = firebase.firestore.FieldValue.serverTimestamp();

    if(data.daftarAnggota.length === 0) {
        return alert("Belum ada anggota yang patungan nih!");
    }

    const db = firebase.firestore();
    btnSimpan.innerText = "Menyimpan...";
    btnSimpan.disabled = true;

    db.collection("bills").add(data)
    .then((docRef) => {
        alert("Berhasil disimpan!");
        window.location.href = "/home";
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Gagal: " + error.message);
        btnSimpan.innerText = "Simpan Tagihan";
        btnSimpan.disabled = false;
    });
}

// ==========================================
// 1. LOGIKA SAAT HALAMAN PERTAMA KALI DIBUKA
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Tangkap parameter ID dari URL
    const urlParams = new URLSearchParams(window.location.search);
    currentBillId = urlParams.get('id'); 

    // Tangkap elemen HTML-nya
    const judulHalaman = document.getElementById('judulHalaman'); // Sesuaikan ID
    const btnSubmit = document.getElementById('btnUpdate'); // Sesuaikan ID

    // Ubah teks berdasarkan keberadaan ID (Mode Buat vs Mode Edit)
    if (currentBillId) {
        if (judulHalaman) judulHalaman.innerText = "Edit Split Bill";
        if (btnSubmit) btnSubmit.innerText = "Update Perubahan";
    } else {
        if (judulHalaman) judulHalaman.innerText = "Buat Split Bill Baru";
        if (btnSubmit) btnSubmit.innerText = "Buat Tagihan";
    }

    // ... (Panggil fungsi ambilDataFirestore atau onSnapshot kamu di sini) ...
});


// ==========================================
// 2. FUNGSI UPDATE (EDIT DATA LAMA)
// ==========================================
function updateKeFirebase() {
    if (!currentBillId) return alert("Error: ID Tagihan hilang!");

    const user = firebase.auth().currentUser;
    if (!user) return alert("Login dulu!");

    const data = kumpulkanDataDariForm();
    data.diupdatePada = firebase.firestore.FieldValue.serverTimestamp();

    const db = firebase.firestore();
    const btnUpdate = document.getElementById('btnUpdate'); // Pastikan tombol ditangkap
    
    // Efek loading di tombol
    btnUpdate.innerText = "Mengupdate...";
    btnUpdate.disabled = true;

    db.collection("bills").doc(currentBillId).update(data)
    .then(() => {
        // Tampilkan pesan sukses sebentar
        console.log("Perubahan berhasil disimpan!");
        
        // 🔴 RELOAD DIHAPUS BIAR EFEK REAL-TIME TERASA! 🔴
        
        // Kembalikan tombol ke mode normal setelah sukses
        btnUpdate.innerText = "Update Perubahan";
        btnUpdate.disabled = false;
    })
    .catch((error) => {
        console.error("Error update:", error);
        alert("Gagal update: " + error.message);
        btnUpdate.innerText = "Update Perubahan";
        btnUpdate.disabled = false;
    });
}


// ==========================================
// 6. FITUR LOAD DATA (EDIT MODE)
// ==========================================

// Cek URL saat halaman dibuka
document.addEventListener('DOMContentLoaded', async () => {
    // Jalankan logika UI awal
    updateMetodeUI();

    // Cek apakah ada ?id=... di URL
    const params = new URLSearchParams(window.location.search);
    const idEdit = params.get('id');

    // Tunggu sebentar biar Firebase connect dulu (safety)
    setTimeout(() => {
        if (idEdit) {
            console.log("Mode Edit Aktif. ID:", idEdit);
            loadDataUntukEdit(idEdit);
        }
    }, 1000);
});

// Load data dari Firestore & Isi ke Form
async function loadDataUntukEdit(id) {
    const db = firebase.firestore();
    
    // Ganti Tampilan jadi Mode Edit
    masukModeEditUI(id); 
    document.getElementById('inputJudul').value = "Mengambil data...";

    try {
        const doc = await db.collection("bills").doc(id).get();
        
        if (!doc.exists) {
            throw new Error("Data tidak ditemukan!");
        }

        const data = doc.data();

        // 1. ISI FORM UTAMA
        document.getElementById('inputJudul').value = data.judulTagihan;
        
        totalSemua = data.totalSemua;
        document.getElementById('inputTotal').value = formatRibuan(totalSemua);

        // 2. SETTING METODE BAYAR
        if (data.metodeBayar === 'custom') {
            radioCustom.checked = true;
            updateMetodeUI(); // Panggil fungsi UI manual
        } else {
            radioEqual.checked = true;
            updateMetodeUI();
        }

        // 3. ISI TABEL MENU
        tabelMenu.innerHTML = ''; // Bersihkan dulu
        if(data.daftarMenu) {
            data.daftarMenu.forEach(item => {
                const subtotal = item.qty * item.harga;
                tambahBarisMenuKeHTML(item.namaItem, item.qty, item.harga, subtotal);
            });
        }

        // 4. ISI ANGGOTA
        containerAnggota.innerHTML = ''; // Bersihkan dulu
        if(data.daftarAnggota) {
            data.daftarAnggota.forEach(orang => {
                tambahKartuAnggotaKeHTML(orang.namaOrang, orang.bayar);
            });
        }

        // Hitung ulang biar angka total di bawah pas
        hitungTotalBayarAnggota();

    } catch (err) {
        console.error(err);
        alert("Gagal memuat data: " + err.message);
        window.location.href = '/home';
    }
}

// Fungsi Mengubah Tampilan Tombol (Simpan -> Update)
function masukModeEditUI(id) {
    currentBillId = id;

    // Munculin Info ID
    if(areaKodeRoom) {
        areaKodeRoom.classList.remove('hidden');
        if(teksKodeRoom) teksKodeRoom.innerText = id;
    }

    // Tukar Tombol Simpan jadi Update
    if(btnSimpan) btnSimpan.classList.add('hidden');
    if(btnUpdate) btnUpdate.classList.remove('hidden');
    if(btnShare) {
        btnShare.classList.remove('hidden');
        // Arahkan ke halaman detail blade
        btnShare.onclick = function() { window.location.href = `/detail?id=${id}`; };
    }

    // Ubah Tombol Batal
    if(btnBatal) {
        btnBatal.innerText = "Batal Edit";
        btnBatal.onclick = function() { window.location.href = '/home'; }; 
    }
}

// window.copyKode = function() {
//     const kode = document.getElementById('teksKodeRoom').innerText;
    
//     // Ini BAKAL JALAN di http://127.0.0.1:8000
//     navigator.clipboard.writeText(kode).then(() => {
//         alert("Berhasil disalin!");
//     });
// }

///////////////////////////////////

// 1. Inisialisasi Library
// var clipboard = new ClipboardJS('.btn-copy');

// // 2. Kasih Feedback kalau Berhasil (Opsional tapi Bagus)
// clipboard.on('success', function(e) {
//     alert("Kode berhasil disalin: " + e.text);
//     e.clearSelection(); // Hilangkan blok biru setelah nyalin
// });

// // 3. Kasih Feedback kalau Gagal
// clipboard.on('error', function(e) {
//     alert("Gagal menyalin, coba manual ya.");
// });

///////////////////////////////////////////

// ==========================================
// 7. EVENT LISTENER AKHIR
// ==========================================

// Pasang event ke tombol Simpan & Update
if (btnSimpan) btnSimpan.addEventListener('click', simpanKeFirebase);
if (btnUpdate) btnUpdate.addEventListener('click', updateKeFirebase);