<?php

namespace App\Models\Transformers;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class CurrentTransformers extends Model
{
    use HasFactory;
    protected $table = 'current_transformers';
    public $timestamps = false;

    static public function getDistinctItems(){
        $items = self::select('type')->distinct()->get()->toArray();
        $arr = array_map(fn($item)=>$item['type'], $items); 
        return $arr;
    }
}
