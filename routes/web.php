<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Message;


Route::get('/', [Message::class, 'showSubstations']); 
Route::get('/s', [Message::class, 'showFiders']);

