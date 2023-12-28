<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Substation;
use Inertia\Inertia;

class Message extends Controller
{
    public function showSubstations()
    {
        $substations = Substation::getSubstations();
        return Inertia::render('Test', ['txt'=>$substations]);
    }
    public function showFiders(Request $req)
    {
        $data = $req->input('sbst');
        $fiders = Substation::getFiders($data);

        if($req->hasHeader('X-Requested-With')==true){
            return ['data' => $fiders, 'url' => "/s?sbst=${data}"];
        }
        else{
            Log::info('XMLHttpRequest');
            return Inertia::render('Test', ['txt'=>$fiders]); 
        }
    }
}
