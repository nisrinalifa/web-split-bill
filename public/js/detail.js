// 1. Format Rupiah
        const formatRupiah = (angka) => {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
        };

        // 2. Ambil ID
        const params = new URLSearchParams(window.location.search);
        const billId = params.get('id');

        // Elemen UI
        const loading = document.getElementById('loading');
        const konten = document.getElementById('kontenUtama');
        const errorView = document.getElementById('errorState');
        const btnCopy = document.getElementById('btnCopyLink');

        // Variabel untuk WA
        let dataTagihan = null;

        document.addEventListener('DOMContentLoaded', async () => {
            if (!billId) return showError();

            // Set link buat tombol copy sekarang juga
            btnCopy.setAttribute('data-clipboard-text', window.location.href);

            // Inisialisasi ClipboardJS (Langsung jalan!)
            var clipboard = new ClipboardJS('.btn-copy');
            clipboard.on('success', function(e) {
                alert("✅ Link berhasil disalin!");
                e.clearSelection();
            });

            // Ambil Data Firebase
            const db = firebase.firestore();
            
            try {
                // Kodingan baru (Real-time Magic! 🪄)
                db.collection("bills").doc(billId).onSnapshot((doc) => {
                    if (doc.exists) {
                        dataTagihan = doc.data();
                        renderData(dataTagihan); // Otomatis ngerender ulang layar kalau data di database berubah
                    } else {
                        showError();
                    }
                });

            } catch (err) {
                console.error(err);
                showError();
            }
        });

        function showError() {
            loading.style.display = 'none';
            errorView.classList.remove('hidden');
        }

        function renderData(data) {
            // Header
            document.getElementById('judulBill').innerText = data.judulTagihan;
            document.getElementById('totalBill').innerText = formatRupiah(data.totalSemua);
            
            const badge = document.getElementById('badgeMetode');
            if (data.metodeBayar === 'equal') {
                badge.innerText = 'Bagi Rata';
                badge.className = "mt-4 inline-block bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-100";
            } else {
                badge.innerText = 'Custom (Itemized)';
                badge.className = "mt-4 inline-block bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-purple-100";
            }

            // Anggota
            const containerAnggota = document.getElementById('listAnggota');
            const listAnggota = data.daftarAnggota || [];
            document.getElementById('jumlahOrang').innerText = listAnggota.length;
            
            containerAnggota.innerHTML = '';
            listAnggota.forEach(orang => {
                // Generate Avatar Warna-Warni
                const colors = ['bg-red-100 text-red-600', 'bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-yellow-100 text-yellow-600', 'bg-purple-100 text-purple-600'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                containerAnggota.innerHTML += `
                <div class="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full ${randomColor} flex items-center justify-center font-bold text-sm shadow-inner">
                            ${orang.namaOrang.substring(0,2).toUpperCase()}
                        </div>
                        <span class="font-bold text-slate-700">${orang.namaOrang}</span>
                    </div>
                    <div class="font-black text-slate-800 text-lg">${formatRupiah(orang.bayar)}</div>
                </div>`;
            });

            // Menu
            const containerMenu = document.getElementById('listMenu');
            const listMenu = data.daftarMenu || [];
            
            containerMenu.innerHTML = '';
            listMenu.forEach(item => {
                containerMenu.innerHTML += `
                <div class="flex justify-between py-2 border-b border-dashed border-slate-100 last:border-0">
                    <div class="text-slate-600 text-sm">
                        <span class="font-bold mr-2 text-slate-400 bg-slate-100 px-1.5 rounded text-xs">x${item.qty}</span> ${item.namaItem}
                    </div>
                    <div class="text-slate-500 font-semibold text-sm">
                        ${formatRupiah(item.qty * item.harga)}
                    </div>
                </div>`;
            });

            // Tampilkan Konten
            loading.style.display = 'none';
            konten.classList.remove('hidden');
        }

        // Fitur Toggle Menu (Accordion)
        function toggleMenu() {
            const menu = document.getElementById('listMenu');
            const icon = document.getElementById('iconChevron');
            menu.classList.toggle('hidden');
            if (menu.classList.contains('hidden')) {
                icon.innerText = "expand_more";
            } else {
                icon.innerText = "expand_less";
            }
        }

        // Fitur Share ke WhatsApp
        function shareToWA() {
            if (!dataTagihan) return;

            let text = `*Tagihan: ${dataTagihan.judulTagihan}*\n`;
            text += `Total: ${formatRupiah(dataTagihan.totalSemua)}\n\n`;
            text += `*Rincian Bayar:*\n`;
            
            dataTagihan.daftarAnggota.forEach(orang => {
                text += `👤 ${orang.namaOrang}: ${formatRupiah(orang.bayar)}\n`;
            });

            text += `\nLink Detail:\n${window.location.href}`;
            
            // Encode text biar aman di URL
            const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        };

        function downloadStruk() {
            const btn = document.getElementById('btnDownload');
            const teksAsli = btn.innerHTML; 
            
            btn.innerHTML = `<span class="material-icons-round text-sm animate-spin">sync</span> Memproses...`;
            
            const areaStruk = document.getElementById('kontenUtama'); 

            if (!areaStruk) {
                alert("Waduh, area struk tidak ditemukan!");
                btn.innerHTML = teksAsli;
                return;
            }

            // Nama file otomatis
            let namaFile = "Struk-Split-Bill.png";
            if (typeof dataTagihan !== 'undefined' && dataTagihan && dataTagihan.judulTagihan) {
                namaFile = `Struk-${dataTagihan.judulTagihan.replace(/\s+/g, '-')}.png`;
            }

            // Proses jepret pakai htmlToImage
            htmlToImage.toPng(areaStruk, { backgroundColor: '#f8fafc' })
                .then(function (dataUrl) {
                    let link = document.createElement('a');
                    link.download = namaFile;
                    link.href = dataUrl;
                    link.click();
                    
                    btn.innerHTML = teksAsli; // Balikin tombol
                })
                .catch(function (error) {
                    console.error("Gagal memotret struk:", error);
                    alert("Gagal memproses gambar! Cek Console.");
                    btn.innerHTML = teksAsli;
                });
        }