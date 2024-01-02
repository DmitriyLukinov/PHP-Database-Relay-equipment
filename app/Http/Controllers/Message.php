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
    public function showFiders(Request $req, $substation)
    {
        $fiders = Substation::getFiders($substation);

        return $req->hasHeader('X-Requested-With')
        ? ['data' => $fiders, 'url' => "/${substation}"]
        : Inertia::render('Test', ['txt' => $fiders]);
    }
    public function showRelays(Request $req, $substation, $fider){
        $subs_and_fider = Substation::getSubstationId($substation, $fider);
        $relays = $subs_and_fider->getRelays()
        ->select('relay_type', 'ac_dc', 'relay_current', 'year', 'quantity')->get()->toArray();

        $relays = array_map(function($arr){
            array_pop($arr); 
            $arr=array_values($arr);
            return $arr;
        }, $relays);

        Log::info($relays);
    }
}
