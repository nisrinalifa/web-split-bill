// Format Rupiah Helper
const formatRupiah = (angka) => new Intl.NumberFormat('id-ID').format(angka);

// URL buat pindah halaman kalau diklik (Sesuaikan dengan Route Laravel kamu)
const URL_TRANSAKSI = '/transaksi-split-bill'; 

document.addEventListener('DOMContentLoaded', function() {
    const tabel = document.getElementById('listRiwayat');

    // 1. Tampilkan Loading Dulu
    tabel.innerHTML = `
        <tr>
            <td colspan="3" class="text-center py-8">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p class="mt-2 text-slate-500 text-sm font-semibold">Lagi narik data...</p>
            </td>
        </tr>`;

    // 2. Tunggu Firebase Auth Siap
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Kalau login, ambil data punya dia
            ambilDataFirestore(user.uid);
        } else {
            // Kalau belum login
            tabel.innerHTML = `<tr><td colspan="3" class="text-center py-8">Silakan Login Dulu</td></tr>`;
        }
    });
});

function ambilDataFirestore(uid) {
    const db = firebase.firestore();
    const tabel = document.getElementById('listRiwayat');

    // QUERY FIREBASE (Udah pakai onSnapshot buat Real-time!)
    db.collection("bills")
      .where("uid", "==", uid)      
      .orderBy("dibuatPada", "desc") 
      .onSnapshot((querySnapshot) => { // <-- Ini bagian yang berubah
          
          let grandTotalPengeluaran = 0;
          
          if (querySnapshot.empty) {
              tabel.innerHTML = `
                  <tr>
                      <td colspan="3" class="text-center py-8 text-slate-400">
                          <span class="material-icons-round text-4xl mb-2">receipt_long</span>
                          <p>Belum ada tagihan nih.</p>
                      </td>
                  </tr>`;

              const elemenTotal = document.getElementById('totalPengeluaran');
              if(elemenTotal) elemenTotal.innerText = "Rp 0";
              return;
          }

          tabel.innerHTML = '';

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;

            const judul = data.judulTagihan || "Tanpa Judul";
            const total = data.totalSemua || 0;
            const metode = data.metodeBayar === 'equal' ? 'Bagi Rata' : 'Manual';

            grandTotalPengeluaran += parseInt(total) || 0;
              
            const barisBaru = `
            <tr class="hover:bg-slate-50/50 transition-colors group cursor-pointer border-b border-slate-50 last:border-none" 
                onclick="location.href='${URL_TRANSAKSI}?id=${id}'">
                
                <td class="px-6 py-5">
                    <div class="pointer-events-none"> <p class="text-[16px] font-bold text-slate-800 text-sm">${judul}</p>
                        <p class="text-[14px] text-slate-400 mt-0.5 font-mono">#${id}</p>
                    </div>
                </td>
                <td class="px-6 py-5">
                    <p class="text-sm font-black text-slate-800">Rp ${formatRupiah(total)}</p>
                    <span class="inline-block px-2 py-0.5 rounded-md text-[12px] font-bold uppercase tracking-wider ${metode === 'Bagi Rata' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}">
                        ${metode}
                    </span>
                </td>
                
                <td class="px-6 py-5 text-right">
                    <div class="flex justify-end items-center gap-2">
                        <button onclick="hapusTagihanHome('${id}', event)" title="Hapus Tagihan" 
                            class="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:bg-red-100 hover:text-red-600 transition-colors z-10">
                            <span class="material-icons-round text-lg">delete</span>
                        </button>
                        
                        <div class="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all pointer-events-none">
                            <span class="material-icons-round text-slate-300 group-hover:text-blue-600 text-lg">chevron_right</span>
                        </div>
                    </div>
                </td>
            </tr>
            `;

              tabel.innerHTML += barisBaru;
          });

          // Menampilkan Total Pengeluaran
          const elemenTotal = document.getElementById('totalPengeluaran');
          if (elemenTotal) {
              elemenTotal.innerText = 'Rp ' + formatRupiah(grandTotalPengeluaran);
          }

      // <-- Perhatikan bagian ini! catch() diganti jadi koma dan function error
      }, (error) => { 
          console.error("Error ambil data:", error);
          tabel.innerHTML = `<tr><td colspan="3" class="text-center text-red-500">Gagal ambil data: ${error.message}</td></tr>`;
          
          if(error.message.includes("index")) {
              console.log("⚠️ KLIK LINK DI CONSOLE BUAT BIKIN INDEX FIREBASE ⚠️");
          }
      });
}

// Logika Cari Bill (Search Box di Home)
function cariBill() {
    const kode = document.getElementById('inputCariKode').value.trim();
    if (!kode) return alert("Isi kodenya dulu dong!");
    window.location.href = `${URL_TRANSAKSI}?id=${kode}`;
};

// Fungsi untuk hapus tagihan dari halaman Home
function hapusTagihanHome(idBill, event) {
    // PENTING: Mencegah efek klik tembus ke baris tabel (biar gak redirect ke halaman detail)
    event.stopPropagation(); 

    const konfirmasi = confirm("Yakin ingin menghapus tagihan ini secara permanen? Data tidak akan bisa kembali lagi.");
    
    if (konfirmasi) {
        // Hapus dari Firestore
        firebase.firestore().collection("bills").doc(idBill).delete()
            .then(() => {
                // Nggak perlu nulis alert atau refresh halaman!
                console.log("Sukses dihapus.");
            })
            .catch((error) => {
                console.error("Gagal hapus:", error);
                alert("Waduh, gagal hapus tagihan: " + error.message);
            });
    }
};