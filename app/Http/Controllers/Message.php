<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class Message extends Controller
{
    public function print(Request $request )
    {
        $input = $request->input();
        Log::info($input);
    }
}
