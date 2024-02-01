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

    static public function getDistinctItems($column){
        if($column==='0'){        
            $items = self::select('type')->distinct()->get()->toArray();
            $arr = array_map(fn($item)=>$item['type'], $items); 
            return $arr;
        }
        if($column==='1' || $column==='2'){
            $coil_05 = self::select('coil_05')->distinct()->get()->toArray();
            $coil_10P = self::select('coil_10P')->distinct()->get()->toArray();
            $coil_05 = array_map(fn($i)=>$i=$i['coil_05'], $coil_05);
            $coil_10P = array_map(fn($i)=>$i=$i['coil_10P'], $coil_10P);
            $merge = array_merge($coil_05, $coil_10P);
            $unique = array_unique($merge);
            sort($unique);
            return $unique;
        }
    }
}
