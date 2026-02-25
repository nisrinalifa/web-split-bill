@extends('layouts.app')

@section('content')

    <div class="mx-auto px-4 py-8 max-w-5xl">
        <a href="{{ route('home') }}" class="flex items-center text-slate-500 hover:text-blue-700 hover:font-semibold transition mb-4 group">
            <span class="material-icons-round mr-1 text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Kembali
        </a>
        
        <div>
            <h1 id="judulHalaman" class="font-bold text-3xl text-slate-800">Buat Split Bill</h1>
            <p class="text-slate-500">Bagi tagihan bersama dengan teman menjadi lebih mudah</p>
        </div>

        <div id="areaKodeRoom" class="hidden mx-auto mt-6">
            <div class="bg-indigo-50 border-2 border-indigo-100 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="text-center md:text-left">
                    <p class="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Kode Split Bill</p>
                    <h2 id="teksKodeRoom" class="text-3xl font-black text-indigo-600 tracking-tight">...</h2>
                </div>
                <div class="flex gap-2">
                    <button class="btn-copy bg-white text-indigo-600 px-4 py-2 rounded-xl font-bold border border-indigo-200 hover:bg-indigo-100 transition shadow-sm active:scale-95 flex items-center gap-2"
                        data-clipboard-target="#teksKodeRoom">
                        <span class="material-icons-round text-sm">content_copy</span> Salin
                    </button>
                    
                    <button id="btnShareStruk" class="hidden bg-white text-green-600 px-4 py-2 rounded-xl font-bold border border-green-200 hover:bg-green-100 transition shadow-sm active:scale-95 flex items-center gap-2">
                        <span class="material-icons-round">share</span> Bagikan
                    </button>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js"></script>

        <script>
            document.addEventListener('DOMContentLoaded', function() {
                // Inisialisasi ClipboardJS
                var clipboard = new ClipboardJS('.btn-copy');

                // Kalau Berhasil Salin
                clipboard.on('success', function(e) {
                    alert("✅ Kode Split Bill Tersalin: " + e.text);
                    e.clearSelection();
                });

                // Kalau Gagal
                clipboard.on('error', function(e) {
                    alert("❌ Gagal menyalin. Browser tidak support.");
                });

                console.log("Script Copy siap digunakan!");
            });
        </script>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div class="md:col-span-2 bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <label class="block text-sm font-semibold uppercase mb-2 text-slate-400">Judul Tagihan</label>
                <input type="text" id="inputJudul" class="w-full bg-slate-50 hover:border-blue-700 rounded-lg py-3 px-4 border border-transparent focus:ring-2 focus:ring-blue-500 outline-none text-lg font-medium transition" placeholder="Contoh: Makan Siang di Kantin">
            </div>
            <div class="bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-sm">
                <label class="block text-sm font-semibold mb-2 uppercase text-blue-400">Total Tagihan</label>
                <div class="flex items-center">
                    <span class="text-2xl font-bold text-blue-600 mr-2">Rp</span>
                    <input type="text" id="inputTotal" class="w-full bg-transparent border-none text-3xl font-bold text-blue-700 outline-none focus:ring-0 p-0" placeholder="0">
                </div>
            </div>
        </div>
    </div>

    <section class="max-w-5xl mx-auto px-4 mb-10">
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-slate-100 bg-slate-50/50">
                <div class="flex items-center gap-2">
                    <span class="material-icons-round text-slate-400">list_alt</span>
                    <h2 class="font-bold text-lg text-slate-700">Input Item Tagihan</h2>
                </div>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-12 gap-4 mb-6">
                    <div class="col-span-12 md:col-span-6">
                        <input type="text" id="inputNamaItem" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nama Item">
                    </div>
                    <div class="col-span-4 md:col-span-2">
                        <input type="number" id="inputQtyItem" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none text-center" value="1">
                    </div>
                    <div class="col-span-8 md:col-span-3">
                        <div class="relative">
                            <span class="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-slate-400">Rp</span>
                            <input type="text" id="inputHargaItem" class="w-full pl-10 bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0">
                        </div>
                    </div>
                    <div class="col-span-12 md:col-span-1">
                        <button id="btnTambahItem" class="w-full h-full bg-blue-600 text-white flex items-center justify-center rounded-lg hover:bg-blue-700 transition py-3 shadow-lg shadow-blue-100">
                            <span class="material-icons-round">add</span>
                        </button>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead>
                            <tr class="text-slate-400 text-xs font-bold uppercase border-b border-slate-100">
                                <th class="pb-4 px-2">Nama Item</th>
                                <th class="pb-4 px-2">Kuantitas</th>
                                <th class="pb-4 px-2 text-right">Harga Satuan</th>
                                <th class="pb-4 px-2 text-right">Total</th>
                                <th class="pb-4"></th>
                            </tr>
                        </thead>
                        <tbody id="tabelMenu" class="divide-y divide-slate-50">
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>

    <section class="mb-8 max-w-5xl mx-auto px-4 text-left">
        <h2 class="font-bold text-lg mb-4 flex items-center gap-2 text-slate-800">
            <span class="material-icons-round text-slate-400">call_split</span>
            Metode Pembagian
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label id="labelEqual" class="metode-card relative flex cursor-pointer rounded-xl border-2 border-blue-600 bg-blue-50/50 p-5 shadow-sm transition-all">
                <input checked id="radioEqual" class="sr-only" name="split-method" type="radio" value="equal"/>
                <div class="flex w-full items-start gap-4">
                    <div class="check-icon bg-blue-600 text-white rounded-full p-1 h-6 w-6 flex items-center justify-center">
                        <span class="material-icons-round text-sm">check</span>
                    </div>
                    <div>
                        <p class="font-bold text-slate-900">Bagi Rata</p>
                        <p class="text-sm text-slate-500">Tagihan dibagi rata.</p>
                    </div>
                </div>
            </label>
            
            <label id="labelCustom" class="metode-card relative flex cursor-pointer rounded-xl border-2 border-slate-200 bg-white p-5 shadow-sm transition-all">
                <input id="radioCustom" class="sr-only" name="split-method" type="radio" value="custom"/>
                <div class="flex w-full items-start gap-4">
                    <div class="check-icon border-2 border-slate-200 rounded-full h-6 w-6 flex items-center justify-center">
                        <span class="material-icons-round text-sm hidden">check</span>
                    </div>
                    <div>
                        <p class="font-bold text-slate-900">Custom / Itemized</p>
                        <p class="text-sm text-slate-500">Input nominal manual per orang.</p>
                    </div>
                </div>
            </label>
        </div>
    </section>

    <section class="max-w-5xl mx-auto px-4 mb-20">
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div class="flex items-center gap-2">
                    <span class="material-icons-round text-slate-400">group</span>
                    <h2 class="font-bold text-lg text-slate-800">Daftar Anggota</h2>
                </div>
            </div>

            <div class="p-6">
                <div class="grid grid-cols-12 gap-4 mb-6 pb-6 border-b border-slate-50">
                    <div class="col-span-12 md:col-span-6 text-left">
                        <label class="block text-sm font-semibold uppercase mb-2 text-slate-400">Nama</label>
                        <input type="text" id="inputNamaAnggota" class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Contoh: Budi">
                    </div>
                    <div class="col-span-12 md:col-span-5 text-left">
                        <label class="block text-sm font-semibold uppercase mb-2 text-slate-400">Harga</label>
                        <div class="relative">
                            <span class="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-slate-400">Rp</span>
                            <input type="text" id="inputBagianAnggota" class="w-full pl-10 bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50" placeholder="0" disabled>
                        </div>
                    </div>
                    <div class="col-span-12 md:col-span-1 flex items-end">
                        <button id="btnTambahAnggotaInner" class="w-full h-[50px] bg-blue-600 text-white flex items-center justify-center rounded-xl hover:bg-blue-700 transition">
                            <span class="material-icons-round">add</span>
                        </button>
                    </div>
                </div>

                <div id="containerAnggota" class="space-y-4"></div>

                <div id="checkBalance" class="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Terkumpul:</span>
                    <span id="totalTerbayar" class="font-bold text-red-600 text-lg">Rp 0</span>
                </div>
            </div>
        </div>
    </section>

    <div class="max-w-5xl mx-auto px-4 mt-8 mb-12">
        <div class="flex flex-col-reverse md:flex-row justify-end gap-4">
            <button id="btnBatal" onclick="window.location.href='{{ route('home') }}'" class="w-full md:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition">
                Batalkan
            </button>
            <button id="btnSimpan" class="w-full md:w-auto px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-xl shadow-blue-200 active:scale-95">
                Simpan Split Bill
            </button>
            <button id="btnUpdate" class="hidden w-full md:w-auto px-10 py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition shadow-xl shadow-emerald-200 active:scale-95">
                Update Perubahan
            </button>
        </div>
    </div>

@endsection

@push('scripts')
    <script src="{{ secure_asset('js/script.js') }}"></script>
@endpush