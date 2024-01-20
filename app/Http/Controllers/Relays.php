<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Transformers\CurrentTransformers;

class Relays extends Controller
{
    public function showDistinctItems(Request $req){
        $column = $req->input('column');
        $tableID = $req->input('tableID');
        switch ($tableID){
            case "transTable":
                $items = CurrentTransformers::getDistinctItems($column, $tableID);
                return [$items];
            break;
            case "measuringTable":
                $items = CurrentTransformers::getDistinctItems($column);
                return [$items];
            break;
        }
    }
}
