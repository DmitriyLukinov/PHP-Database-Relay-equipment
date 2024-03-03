<?php

namespace App\Models\Transformers;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Substation;
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
            $coil_10P = self::select('coil_10p')->distinct()->get()->toArray();
            $coil_05 = array_map(fn($i)=>$i=$i['coil_05'], $coil_05);
            $coil_10P = array_map(fn($i)=>$i=$i['coil_10p'], $coil_10P);
            $merge = array_merge($coil_05, $coil_10P);
            $unique = array_unique($merge);
            sort($unique);
            return $unique;
        }
    }
    static public function findItemID($newItem){
        $item = self::where('type', $newItem[0])->where('coil_05', $newItem[1])->where('coil_10p', $newItem[2])
        ->where('year', $newItem[3])->where('quantity', $newItem[4])->get();
        $length = count($item);
        return ($length===0 ? false : $item->value('id'));
    }
    static public function insertNewItem($newItem){
        $id = self::insertGetId(['type' => $newItem[0], 'coil_05' => $newItem[1], 'coil_10p' => $newItem[2],
        'year' => $newItem[3],'quantity' => $newItem[4]]);
        return $id;
    }
    static public function findTies($itemToDelete){
        $item = self::where('type', $itemToDelete[0])->where('coil_05', $itemToDelete[1])->where('coil_10p', $itemToDelete[2])
        ->where('year', $itemToDelete[3])->where('quantity', $itemToDelete[4])->get();
        $ties = $item[0]->belongsToMany(Substation::class, 'substation_current_transformers', 'current_transformer_id', 'fider_id')
        ->get()->isEmpty();
        return $ties;
    }
    static public function deleteItem($itemID){
        self::where('id', $itemID)->delete();
    }

    // для фильтра
    static private function getFilteredTranses($transType, $coil_05, $coil_10p, $year){
        $transes = self::select();
        count($transType)> 0 ? $transes->whereIn('type', $transType) : null;
        count($coil_05)> 0 ? $transes->whereIn('coil_05', $coil_05) : null;
        count($coil_10p)> 0 ? $transes->whereIn('coil_10p', $coil_10p) : null;
        count($year)> 0 ? $transes->whereIn('year', $year) : null;
        return $transes;
    }
    static private function getSubstFider($id, $substation, $fider){
        $obj = $id->belongsToMany(Substation::class, 'substation_current_transformers', 'current_transformer_id', 'fider_id');
        count($substation)> 0 ? $obj->whereIn('substation', $substation) : null;
        count($fider)> 0 ? $obj->whereIn('fider', $fider) : null;
        $ob = $obj->get(['substation', 'fider'])->toArray();
        $ob = array_map(function($arr){array_pop($arr); return $arr;}, $ob);
        return $ob;
    }
    static public function getFilteredTrans($substation, $fider, $transType, $coil_05, $coil_10p, $year){
        $transArr = [];
        $currentTranses = self::getFilteredTranses($transType, $coil_05, $coil_10p, $year);
        $IDs = $currentTranses->select('id')->get();
        foreach($IDs as $id){
            $copyCurrentTranses = clone $currentTranses;
            $obj = self::getSubstFider($id, $substation, $fider);
            $curr = $copyCurrentTranses->select('type', 'coil_05', 'coil_10p', 'year', 'quantity')->where('id', $id->id)->get()->toArray();                  
            foreach($obj as $ob){
                $ob = array_merge($ob, $curr[0]);
                array_push($transArr, $ob);
            }
        }
        return $transArr;
    }
}
