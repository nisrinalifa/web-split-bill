<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        // Jika aplikasi berjalan di mode production (seperti di Railway), paksa semua asset jadi HTTPS
        if (env('APP_ENV') === 'production') {
            URL::forceScheme('https');
        }
    }
}
