<?php

namespace App\Models\Voltage;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

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
    static public function findItemID($newItem){
        $item = self::where('relay_type', $newItem[0])->where('ac_dc', $newItem[1])->where('relay_voltage', $newItem[2])
        ->where('year', $newItem[3])->where('quantity', $newItem[4])->get();
        $length = count($item);
        Log::info($item->value('id'));
        return ($length===0 ? false : $item->value('id'));
    }
    static public function insertNewItem($newItem){
        $id = self::insertGetId(['relay_type' => $newItem[0], 'ac_dc' => $newItem[1], 'relay_voltage' => $newItem[2],
        'year' => $newItem[3],'quantity' => $newItem[4]]);
        return $id;
    }
}
