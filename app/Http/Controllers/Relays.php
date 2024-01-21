<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Transformers\CurrentTransformers;
use App\Models\Measuring\MeasuringInstruments;
use App\Models\Voltage\VoltageRelays;
use App\Models\Current\CurrentRelays;

class Relays extends Controller
{
    public function showDistinctItems(Request $req){
        $column = $req->input('column');
        $tableID = $req->input('tableID');
        switch ($tableID){
            case "currentTable":
                $items = CurrentRelays::getDistinctItems($column); 
            break;
            case "voltageTable":
                $items = VoltageRelays::getDistinctItems();  
            break;
            case "measuringTable":
                $items = MeasuringInstruments::getDistinctItems($column);
            break;
            case "transTable":
                $items = CurrentTransformers::getDistinctItems($column);
            break;
        }
        return [$items];
    }
}
