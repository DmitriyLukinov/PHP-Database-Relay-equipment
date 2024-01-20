<?php

namespace App\Models\Measuring;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeasuringInstruments extends Model
{
    use HasFactory;
    protected $table = 'measuring_instruments';
    public $timestamps = false;

    static public function getDistinctItems($column, $tableID){
        if($column==='0'){
            $items = self::select('device')->distinct()->get()->toArray();
            $arr = array_map(fn($item)=>$item['type'], $items); 
            return $arr;
        }
    }
}
