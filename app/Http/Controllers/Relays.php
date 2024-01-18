<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Transformers\CurrentTransformers;

class Relays extends Controller
{
    public function showDistinctItems(){
        $items = CurrentTransformers::getDistinctItems();
        return [$items];
    }
}
