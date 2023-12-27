<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Message;
use Inertia\Inertia;
use App\Models\Substation;

Route::get('/', function () {
    $substations = Substation::getSubstations();
    return Inertia::render('Test', ['txt'=>$substations]); 
}); 

Route::get('/s', function(Request $req){
    $data = $req->input('sbst');
    $fiders = Substation::getFiders($data);

    if($req->ajax()==true){
        return response()->json(['data' => $fiders, 'url' => "/s?sbst=${data}"]);
    }
    else{
        Log::info('XMLHttpRequest');
        return Inertia::render('Test', ['txt'=>$fiders]); 
    }
});

//Route::inertia('/s', 'Auxi');