<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Akun - SplitBill</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
    <style>body{font-family:'Inter',sans-serif}</style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col items-center justify-center px-4">

    <div class="w-full max-w-md">

        <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
            <form id="formRegister" class="space-y-5">
                <div>
                    <h2 class="text-2xl font-bold text-slate-800 mb-2">Daftar Akun</h2>
                    <p class="text-m text-slate-600">Mulai kelola pengeluaran bareng teman.</p>
                </div>
                <div>
                    <label class="block text-sm font-bold text-slate-700 mb-1">Email</label>
                    <input id="regEmail" type="email" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="email@contoh.com" required>
                </div>
                <div>
                    <label class="block text-sm font-bold text-slate-700 mb-1">Password</label>
                    <input id="regPassword" type="password" class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Minimal 6 karakter" required>
                </div>
                
                <button id="btnSubmit" type="submit" class="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                    Daftar
                </button>
            </form>

            <p class="mt-6 text-center text-sm text-slate-500">
                Sudah punya akun? <a href="index.html" class="font-bold text-blue-600 hover:underline">Login</a>
            </p>
        </div>
    </div>

    {{-- <script type="module" src="auth.js"></script> --}}

</body>
</html>