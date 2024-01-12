<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Message;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

Route::delete('/del/smth', [Message::class, 'deleteObjectSF']);
Route::put('/changeObjectSF', [Message::class, 'changeObjectSF']);

Route::get('/', [Message::class, 'showSubstations']); 
Route::get('/{substation}', [Message::class, 'showFiders']);
Route::get('/{substation}/{fider}', [Message::class, 'showRelays']);