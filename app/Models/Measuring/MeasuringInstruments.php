<?php

namespace App\Models\Measuring;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}