<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Current\CurrentRelays;
use App\Models\Voltage\VoltageRelays;
use App\Models\Measuring\MeasuringInstruments;
use App\Models\Transformers\CurrentTransformers;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class Substation extends Model
{
    use HasFactory;
    protected $table = 'substation';
    public $timestamps = false;

    static public function getSubstations(){
        $substations = self::select('substation')->distinct()->get();
        $arr = [];
        foreach($substations as $a){
            $arr[]=$a['substation'];
        }
        return $arr;
    }

    static public function getFiders($substation){
        $fiders = self::select('fider')->where('substation', $substation)->get();
        $arr = [];
        foreach($fiders as $f){
            $arr[]=$f['fider'];
        }
        return $arr;
    }

    static public function getSubstationId($substation, $fider){
        $subs_and_fider = self::select('id')->where('substation',$substation)->where('fider',$fider)->get();
        return $subs_and_fider[0];
    }

    public function getRelays(){
        $currentRelays = $this->getCurrArray();
        $voltageRelays = $this->getVoltArray();
        $measuringInstruments = $this->getMeasArray();
        $currentTransformers = $this->getTransArray();
        
        return [$currentRelays, $voltageRelays, $measuringInstruments, $currentTransformers];
    }

    public function getCurr(): BelongsToMany{
        return $this->belongsToMany(CurrentRelays::class, 'substation_current_relay', 'fider_id', 'current_relay_id');
    }
    public function getCurrArray(){
        $currentRelays = $this->getCurr()
            ->get(['relay_type', 'ac_dc', 'relay_current', 'year', 'quantity'])
            ->toArray();
        return array_map(function($arr){array_pop($arr); return $arr;}, $currentRelays);
    }
    public function getVolt(): BelongsToMany{
        return $this->belongsToMany(VoltageRelays::class, 'substation_voltage_relay', 'fider_id', 'voltage_relay_id');
    }
    public function getVoltArray(){
        $voltageRelays = $this->getVolt()
           ->get(['relay_type', 'ac_dc', 'relay_voltage', 'year', 'quantity'])
           ->toArray();
        return array_map(function($arr){array_pop($arr); return $arr;}, $voltageRelays);
    }
    public function getMeas(): BelongsToMany{
        return $this->belongsToMany(MeasuringInstruments::class, 'substation_measuring_instruments', 'fider_id', 'measuring_instrument_id');
    }
    public function getMeasArray(){
        $measuringInstruments = $this->getMeas()
           ->get(['device', 'device_type', 'measurement_limit', 'year', 'quantity', 'next_verification'])
           ->toArray();
        return array_map(function($arr){array_pop($arr); return $arr;}, $measuringInstruments);
    }
    public function getTrans(): BelongsToMany{
        return $this->belongsToMany(CurrentTransformers::class, 'substation_current_transformers', 'fider_id', 'current_transformer_id');
    }
    public function getTransArray(){
        $currentTransformers = $this->getTrans()
            ->get(['type', 'coil_05', 'coil_10p', 'year', 'quantity'])
            ->toArray();
        return array_map(function($arr){array_pop($arr); return $arr;}, $currentTransformers);
    }
}
