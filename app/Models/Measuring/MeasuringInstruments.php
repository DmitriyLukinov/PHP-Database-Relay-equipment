<?php

namespace App\Models\Measuring;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Substation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class MeasuringInstruments extends Model
{
    use HasFactory;
    protected $table = 'measuring_instruments';
    public $timestamps = false;

    private static function getItems($string){
        $items = self::select($string)->distinct()->get()->toArray();
        return array_map(fn($item)=>$item[$string], $items); 
    }

    static public function getDistinctItems($column){
        switch($column){
            case '0':
                $arr = self::getItems('device');
                return $arr;
            break; 
            case '1':
                $arr = self::getItems('device_type');
                return $arr;
            break;
            case '2':
                $arr = self::getItems('measurement_limit');
                return $arr;
            break;
        }
    }
    static public function findItemID($newItem){
        $item = self::where('device', $newItem[0])->where('device_type', $newItem[1])->where('measurement_limit', $newItem[2])
        ->where('year', $newItem[3])->where('quantity', $newItem[4])->where('next_verification', $newItem[5])->get();
        $length = count($item);
        return ($length===0 ? false : $item->value('id'));
    }
    static public function insertNewItem($newItem){
        $id = self::insertGetId(['device' => $newItem[0], 'device_type' => $newItem[1], 'measurement_limit' => $newItem[2],
        'year' => $newItem[3],'quantity' => $newItem[4], 'next_verification'=>$newItem[5]]);
        return $id;
    }
    static public function findTies($itemToDelete){
        $item = self::where('device', $itemToDelete[0])->where('device_type', $itemToDelete[1])->where('measurement_limit', $itemToDelete[2])
        ->where('year', $itemToDelete[3])->where('quantity', $itemToDelete[4])->where('next_verification', $itemToDelete[5])
        ->get();
        $ties = $item[0]->belongsToMany(Substation::class, 'substation_measuring_instruments', 'measuring_instrument_id', 'fider_id')
        ->get()->isEmpty();
        return $ties;
    }
    static public function deleteItem($itemID){
        self::where('id', $itemID)->delete();
    }
}
