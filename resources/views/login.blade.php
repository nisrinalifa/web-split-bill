<!DOCTYPE html>
<html lang="id" class="h-full bg-white">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Masuk - SplitBill</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="h-full">
    <div class="flex min-h-full">
        <div class="relative hidden w-0 flex-1 lg:block">
            <div class="absolute inset-0 h-full w-full bg-slate-50 flex items-center justify-center p-20">
                <div class="max-w-xl text-left">
                    <div class="mb-8 p-4 bg-white rounded-3xl inline-block shadow-xl shadow-slate-200/50">
                        <span class="text-5xl">💸</span>
                    </div>
                    <h1 class="text-5xl font-black tracking-tight text-slate-900 leading-tight">
                        Bagi tagihan <br>
                        <span class="text-indigo-600">tanpa drama.</span>
                    </h1>
                    <p class="mt-6 text-xl leading-8 text-slate-600">
                        Catat dan bagi pengeluaran bersama otomatis semudah satu klik.
                    </p>
                </div>
            </div>
        </div>

        <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <div class="flex items-center gap-3">
                        <div class="h-10 w-10 flex items-center justify-center">
                            <img src="/img/logo.png" alt="Logo" class="h-full w-auto object-contain">
                        </div>
                        
                        <p class="text-xl font-bold tracking-tight text-indigo-700">Split Bill</p>
                    </div>
                    <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                    {{-- <p class="mt-2 text-sm leading-6 text-gray-500">
                        Belum punya akun?
                        <button onclick="prosesDaftar()" class="font-semibold text-blue-600 hover:text-blue-500">Daftar akun baru gratis</button>
                    </p> --}}
                </div>

                <div class="mt-10">
                    <div>
                        <form onsubmit="return false;" class="space-y-6">
                            <div>
                                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                <div class="mt-2">
                                    <input id="email" name="email" type="email" autocomplete="email" required 
                                        class="block w-full rounded-lg border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 transition">
                                </div>
                            </div>

                            <div>
                                <div class="flex items-center justify-between">
                                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                    {{-- <div class="text-sm">
                                        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Lupa password?</a>
                                    </div> --}}
                                </div>
                                <div class="mt-2">
                                    <input id="password" name="password" type="password" autocomplete="current-password" required 
                                        class="block w-full rounded-lg border-0 px-2 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 transition">
                                </div>
                            </div>

                            <div class="justify-between text-center">
                                <button onclick="prosesLogin()" id="btnLogin" type="submit" 
                                    class="flex w-full justify-center rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition active:scale-[0.98]">
                                    Masuk
                                </button>
                                <p class="m-4 text-sm leading-6 text-slate-800">
                                    Belum punya akun? Klik <span class="font-bold">Daftar Akun</span> dibawah
                                    {{-- <button onclick="prosesDaftar()" class="font-semibold text-indigo-600 hover:text-blue-500">Daftar akun baru gratis</button> --}}
                                </p>
                                <button onclick="prosesDaftar()" id="btnLogin" type="submit" 
                                    class="flex w-full justify-center rounded-lg bg-white px-3 py-2.5 text-sm font-semibold leading-6 text-slate-900 border border-slate-500 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition active:scale-[0.98]">
                                    Daftar Akun
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        
    </div>

    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>
    <script src="{{ secure_asset('js/firebase-config.js') }}"></script>
    <script src="{{ secure_asset('js/auth.js') }}"></script>
</body>
</html>