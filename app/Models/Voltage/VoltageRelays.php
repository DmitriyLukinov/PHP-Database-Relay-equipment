<?php

namespace App\Models\Voltage;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoltageRelays extends Model
{
    use HasFactory;
    protected $table = 'voltage_relay';
    public $timestamps = false;

    static public function getDistinctItems(){
        $items = self::select('relay_type')->distinct()->get()->toArray();
        $arr = array_map(fn($item)=>$item['relay_type'], $items); 
        return $arr;
    }
    
}
