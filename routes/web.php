<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Message;
use App\Http\Controllers\Relays;
use App\Http\Controllers\Filter;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

Route::delete('/del/smth', [Message::class, 'deleteObjectSF']);
Route::put('/changeObjectSF', [Message::class, 'changeObjectSF']);

Route::get('/', [Message::class, 'showSubstations']); 
Route::get('/{substation}', [Message::class, 'showFiders']);
Route::get('/{substation}/{fider}', [Message::class, 'showRelays']);
Route::get('/return/to/substations', [Message::class, 'backToSubstations']);

Route::get('show/item/names', [Relays::class, 'showDistinctItems']);
Route::post('postNewItem', [Relays::class, 'postNewItem']);
Route::delete('deleteItem', [Relays::class, 'deleteItem']);
Route::put('updateItem', [Relays::class, 'updateItem']);

Route::put('filter', [Filter::class, 'sendFilteredRelays']);