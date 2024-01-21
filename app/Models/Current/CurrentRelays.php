<?php

namespace App\Models\Current;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
