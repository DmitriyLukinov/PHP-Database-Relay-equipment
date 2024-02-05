<?php

namespace App\Models\Current;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class CurrentRelays extends Model
{
    use HasFactory;
    protected $table = 'current_relay';
    public $timestamps = false;

    private static function getItems($string){
        $items = self::select($string)->distinct()->get()->toArray();
        return array_map(fn($item)=>$item[$string], $items); 
    }
    static public function getDistinctItems($column){
        switch($column){
            case '0':
                $arr = self::getItems('relay_type');
                return $arr;
            break; 
            case '2':
                $arr = self::getItems('relay_current');
                return $arr;
            break;
        }
    }
    static public function findItemID($newItem){
        $item = self::where('relay_type', $newItem[0])->where('ac_dc', $newItem[1])->where('relay_current', $newItem[2])
        ->where('year', $newItem[3])->where('quantity', $newItem[4])->get();
        $length = count($item);
        return ($length===0 ? false : $item->value('id'));
    }
    static public function insertNewItem($newItem){
        $id = self::insertGetId(['relay_type' => $newItem[0], 'ac_dc' => $newItem[1], 'relay_current' => $newItem[2],
        'year' => $newItem[3],'quantity' => $newItem[4]]);
        return $id;
    }
}
