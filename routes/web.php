<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('login');
})->name('login');


Route::get('/home', function () {
    return view('home');
})->name('home');

Route::get('/transaksi-split-bill', function () {
    return view('TransaksiSplitBill');
})->name('transaksiSplitBill');

Route::get('/detail', function () {
    return view('detail');
})->name('detail');
