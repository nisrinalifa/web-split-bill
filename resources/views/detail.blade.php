<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rincian Tagihan - Split Bill</title>
    
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Round">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; }</style>

    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
    
    <script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js"></script>
</head>
<body class="bg-slate-50 min-h-screen">

    <div class="max-w-xl mx-auto px-4 py-8">
        
        <a href="/home" class="inline-flex items-center text-slate-500 hover:text-blue-600 mb-6 font-bold text-sm transition">
            <span class="material-icons-round mr-1">arrow_back</span> Kembali
        </a>

        <div id="loading" class="text-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-slate-500">Sedang mengambil data tagihan...</p>
        </div>

        <div id="errorState" class="hidden text-center py-20">
            <span class="material-icons-round text-6xl text-red-300 mb-4">error_outline</span>
            <h2 class="text-xl font-bold text-slate-800">Data Tidak Ditemukan!</h2>
            <p class="text-slate-500 mt-2">Mungkin link salah atau data sudah dihapus.</p>
            <a href="/transaksi-split-bill" class="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-blue-200">
                Buat Tagihan Baru
            </a>
        </div>

        <div id="kontenUtama" class="hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 mb-6 text-center relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-600"></div>
                
                <h1 id="judulBill" class="font-bold text-2xl text-slate-800 mb-2 mt-2">...</h1>
                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Tagihan</p>
                <div class="text-5xl font-black text-slate-800 tracking-tight" id="totalBill">Rp 0</div>
                
                <div id="badgeMetode" class="mt-4 inline-block bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-indigo-100">
                    ...
                </div>
            </div>

            <div class="flex items-center justify-between mb-4 px-1">
                <h2 class="font-bold text-lg text-slate-800">Daftar Patungan</h2>
                <span class="text-xs font-semibold text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-200">
                    <span id="jumlahOrang">0</span> Orang
                </span>
            </div>
            
            <div id="listAnggota" class="space-y-3 mb-8">
                </div>

            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <button onclick="toggleMenu()" class="w-full bg-slate-50 px-5 py-4 border-b border-slate-100 flex justify-between items-center hover:bg-slate-100 transition">
                    <h3 class="font-bold text-slate-600 text-sm flex items-center gap-2">
                        <span class="material-icons-round text-base">receipt_long</span> Rincian Pesanan
                    </h3>
                    <span class="material-icons-round text-slate-400" id="iconChevron">expand_more</span>
                </button>
                <div id="listMenu" class="hidden p-5 space-y-3 text-sm bg-white">
                    </div>
            </div>

            <div class="grid grid-cols-2 gap-3 mt-8">
                <button id="btnCopyLink" 
                    data-clipboard-text="" 
                    class="btn-copy bg-white text-slate-700 py-3 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition active:scale-95 flex justify-center items-center gap-2">
                    <span class="material-icons-round text-sm">link</span>
                    Salin Link
                </button>

                <button id="btnDownload" onclick="downloadStruk()" 
                    class="bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition flex justify-center items-center gap-2">
                    <span class="material-icons-round text-sm">download</span>
                    Download Struk
                </button>
            </div>
            
            <p class="text-center text-slate-400 text-xs mt-8 pb-8">
                Nisrina &copy; 2026
            </p>

        </div>
    </div>

    <script src="{{ secure_asset('js/firebase-config.js') }}"></script> 
    <script src="{{ secure_asset('js/detail.js') }}"></script>
</body>
</html>