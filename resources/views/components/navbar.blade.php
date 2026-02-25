<header class="sticky top-0 z-50 bg-white border-b border-slate-100">
    <nav class="mx-auto max-w-6xl flex items-center py-3 px-6 lg:px-8">
        
        <div class="flex flex-1 items-center">
            <a href="{{ route('home') }}" class="flex items-center gap-2">
                <img src="/img/logo.png" alt="Logo" class="h-8 w-auto" />
                <span class="text-lg font-bold tracking-tight text-indigo-700">Split Bill</span>
            </a>
        </div>

        <div class="flex items-center gap-x-2">
            {{-- <a href="{{ route('home') }}" 
               class="text-sm font-semibold py-1.5 px-4 rounded-lg transition
               {{ request()->routeIs('home') ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100' }}">
               Home
            </a> --}}

            <a href="{{ route('login') }}" 
               class="text-sm font-semibold py-1.5 px-4 rounded-lg transition
               {{ request()->routeIs('login') ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100' }}">
               Log in
            </a>
        </div>

    </nav>
</header>