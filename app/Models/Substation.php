<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Current\CurrentRelay;
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
        $id = self::select('id')->where('substation',$substation)->where('fider',$fider)->get()->pluck('id');
        $subs_and_fider = self::find($id[0]);
        return $subs_and_fider;
    }

    public function getRelays(){
        $currentRelays = $this->belongsToMany(
            CurrentRelay::class, 'substation_current_relay', 'fider_id', 'current_relay_id'
        )->get(['relay_type', 'ac_dc', 'relay_current', 'year', 'quantity']);
        
        $voltageRelays = $this->belongsToMany(
            VoltageRelays::class, 'substation_voltage_relay', 'fider_id', 'voltage_relay_id'
        )->get(['relay_type', 'ac_dc', 'relay_voltage', 'year', 'quantity']);

        $measuringInstruments = $this->belongsToMany(
            MeasuringInstruments::class, 'substation_measuring_instruments', 'fider_id', 'measuring_instrument_id'
        )->get(['device', 'device_type', 'measurement_limit', 'year', 'quantity', 'next_verification']);

        $currentTransformers = $this->belongsToMany(
            CurrentTransformers::class, 'substation_current_transformers', 'fider_id', 'current_transformer_id'
        )->get(['type', 'coil_05', 'coil_10P', 'year', 'quantity']);
        
        return [$currentRelays, $voltageRelays, $measuringInstruments, $currentTransformers];
    }
}
