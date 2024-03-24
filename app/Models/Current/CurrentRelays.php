<?php

namespace App\Models\Current;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Substation;
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
    static public function findTies($itemToDelete){
        $item = self::where('relay_type', $itemToDelete[0])->where('ac_dc', $itemToDelete[1])->where('relay_current', $itemToDelete[2])
        ->where('year', $itemToDelete[3])->where('quantity', $itemToDelete[4])->get();
        $ties = $item[0]->belongsToMany(Substation::class, 'substation_current_relay', 'current_relay_id', 'fider_id')
        ->get()->isEmpty();
        return $ties;
    }
    static public function deleteItem($itemID){
        self::where('id', $itemID)->delete();
    }

    // для фильтра
    static private function getFilteredRelays($relayType, $relayRange, $year){
        $currentRelays = self::select();
        count($relayType)> 0 ? $currentRelays->whereIn('relay_type', $relayType) : null;
        if (count($relayRange) > 0) {
            $whereRawConditions = [];
            foreach ($relayRange as $value) {
                $whereRawConditions[] = 'ABS(relay_current - ' . $value . ') < 0.001';
            }
            $currentRelays->whereRaw(implode(' OR ', $whereRawConditions));
            //$currentRelays->whereRaw('ABS(relay_current - 0.05) < 0.001 OR ABS(relay_current - 30) < 0.001');
        }
        count($year)> 0 ? $currentRelays->whereIn('year', $year) : null;
        return $currentRelays;
    }

    static private function getSubstFider($id, $substation, $fider){
        $obj = $id->belongsToMany(Substation::class, 'substation_current_relay', 'current_relay_id', 'fider_id');
        count($substation)> 0 ? $obj->whereIn('substation', $substation) : null;
        count($fider)> 0 ? $obj->whereIn('fider', $fider) : null;
        $ob = $obj->get(['substation', 'fider'])->toArray();
        $ob = array_map(function($arr){array_pop($arr); return $arr;}, $ob);
        return $ob;
    }
    static public function getFilteredCurr($substation, $fider, $relayType, $relayRange, $year){
        $currArr = [];
        $currentRelays = self::getFilteredRelays($relayType, $relayRange, $year);
        $copy = clone $currentRelays;
        $IDs = $copy->select('id')->get();

        foreach($IDs as $id){
            $copyCurrentRelays = clone $currentRelays;
            $obj = self::getSubstFider($id, $substation, $fider);
            $copyCurrentRelays = $copyCurrentRelays->get()->toArray();

            foreach($copyCurrentRelays as $relay){
                if($relay['id']===$id->id) {
                    array_shift($relay);
                    
                    foreach($obj as $ob){
                        $o = array_merge($ob, $relay);
                        array_push($currArr, $o);
                    }
                }
            }
        }

        return $currArr;
    }
}
