@extends('layouts.app')

@section('content')

    <div class="mb-10 text-center sm:text-left">
        <h2 class="text-3xl font-black text-slate-800 mb-2 tracking-tight">Mau patungan apa hari ini?</h2>
        <p class="text-slate-500 text-lg">Kelola pengeluaran bareng teman jadi lebih mudah.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        
        <a href="{{ route('transaksiSplitBill') }}" 
           class="group relative overflow-hidden p-8 rounded-2xl bg-indigo-600 text-white shadow-xl hover:-translate-y-1 transition-all duration-300 block">
            <div class="relative z-10">
                <div class="size-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                    <span class="material-icons-round text-3xl">add</span>
                </div>
                <h3 class="text-2xl font-bold mb-2">Buat Split Bill Baru</h3>
                <p class="text-white/80 text-sm">Input item belanjaan dan bagi tagihannya bersama teman.</p>
            </div>
        </a>

        <div class="group relative overflow-hidden p-8 rounded-2xl bg-white border-2 border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-lg transition-all duration-300">
            <div class="relative z-10">
                <div class="size-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                    <span class="material-icons-round text-3xl text-indigo-600">search</span>
                </div>
                <h3 class="text-2xl font-bold mb-2 text-slate-800">Cari Split Bill</h3>
                <p class="text-sm">Cari split bill dan edit tagihan bersama teman.</p>

                <div class="mt-4 flex gap-2">
                    <input type="text" id="inputCariKode" placeholder="Masukkan Kode Split Bill..." class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-blue-100">
                    <button onclick="cariBill()" class="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-black transition">Cari</button>
                </div>
            </div>
        </div>
    </div>

    <div class="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <p class="text-sm font-medium text-slate-500 mb-1">Total Pengeluaran</p>
            <h4 id="totalPengeluaran" class="text-2xl font-black text-slate-800">Rp 0</h4>
        </div>
    </div>

    <section>
        <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-800">Daftar Split Bill</h3>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <table class="w-full text-left">
                <tbody class="divide-y divide-slate-100" id="listRiwayat">
                    <tr>
                        <td class="p-8 text-center text-slate-400">Sedang memuat data...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

@endsection

@push('scripts')
    <script src="{{ asset('js/home.js') }}"></script>
@endpush