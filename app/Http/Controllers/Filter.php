<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Current\CurrentRelays;
use App\Models\Voltage\VoltageRelays;
use App\Models\Measuring\MeasuringInstruments;
use App\Models\Transformers\CurrentTransformers;
use App\Models\Substation;
use Inertia\Inertia;

class Filter extends Controller
{
    private function splitStringIntoWords($string) {
        preg_match_all('/\S+/', $string, $wordsArray);
        return $wordsArray[0] ?? [];
    }

    public function sendFilteredRelays(Request $req){
        $input = $req->all();

        $keysToSplit = ['substation', 'fider', 'year', 'relayType', 'relayRange', 'voltageRelayType', 'voltageType', 
        'device', 'deviceType', 'limit', 'nextVerification', 'transType', 'coil_05', 'coil_10p'];
    
        foreach ($keysToSplit as $key) {$input[$key] = $this->splitStringIntoWords($input[$key]);}

        $currentRelays = [];
        $voltageRelays = [];
        $measInstruments = [];
        $currentTranses = [];
        
        $SFs = Substation::getSubstationsFiders();
        if (count($input['relayType']) === 0 && count($input['relayRange']) === 0 && count($input['voltageRelayType']) === 0 &&
            count($input['voltageType']) === 0 && count($input['device']) === 0 && count($input['deviceType']) === 0 &&
            count($input['limit']) === 0 && count($input['nextVerification']) === 0 && count($input['transType']) === 0 &&
            count($input['coil_05']) === 0 && count($input['coil_10p']) === 0 ){ 

            if(count($input['year'])===0){
                count($input['substation'])>0 ? $SFs->whereIn('substation', $input['substation']) : null;
                count($input['fider'])>0 ? $SFs->whereIn('fider', $input['fider']) : null; 
                $IDs = $SFs->select('id')->get();   
                foreach($IDs as $id){
                    $copy = clone $SFs;
                    $subFid = $copy->select('substation', 'fider')->where('id', $id->id)->get()->toArray();
                    $equipment = $id->getCurrArray();
                    foreach($equipment as $equip){
                        $equip = array_merge($subFid[0], $equip);
                        array_push($currentRelays, $equip);
                    }
                    $equipment = $id->getVoltArray();
                    foreach($equipment as $equip){
                        $equip = array_merge($subFid[0], $equip);
                        array_push($voltageRelays, $equip);
                    }   
                    $equipment = $id->getMeasArray();
                    foreach($equipment as $equip){
                        $equip = array_merge($subFid[0], $equip);
                        array_push($measInstruments, $equip);
                    }  
                    $equipment = $id->getTransArray();
                    foreach($equipment as $equip){
                        $equip = array_merge($subFid[0], $equip);
                        array_push($currentTranses, $equip);
                    }        
                }
            }
            else{
                $currentRelays = CurrentRelays::getFilteredCurr($input['substation'], $input['fider'], $input['relayType'], $input['relayRange'], $input['year']);
                $voltageRelays = VoltageRelays::getFilteredVolt($input['substation'], $input['fider'], $input['voltageRelayType'], $input['voltageType'], $input['year']);
                $measInstruments = MeasuringInstruments::getFilteredMeasInsr($input['substation'], $input['fider'], $input['device'], $input['deviceType'], $input['limit'], $input['nextVerification'], $input['year']);
                $currentTranses = CurrentTransformers::getFilteredTrans($input['substation'], $input['fider'], $input['transType'], $input['coil_05'], $input['coil_10p'], $input['year']);
            }
        }
        else{ 
            if(count($input['relayType'])> 0 || count($input['relayRange']) > 0){
                $currentRelays = CurrentRelays::getFilteredCurr($input['substation'], $input['fider'], $input['relayType'], $input['relayRange'], $input['year']);
            }
            if(count($input['voltageRelayType'])> 0 || count($input['voltageType'])> 0){
                $voltageRelays = VoltageRelays::getFilteredVolt($input['substation'], $input['fider'], $input['voltageRelayType'], $input['voltageType'], $input['year']);
            }
            if(count($input['device']) >0 || count($input['deviceType']) > 0 || count($input['limit']) > 0 || count($input['nextVerification'])> 0){
                $measInstruments = MeasuringInstruments::getFilteredMeasInsr($input['substation'], $input['fider'], $input['device'], $input['deviceType'], $input['limit'], $input['nextVerification'], $input['year']);
            }
            if(count($input['transType']) > 0 || count($input['coil_05']) > 0 || count($input['coil_10p']) > 0){
                $currentTranses = CurrentTransformers::getFilteredTrans($input['substation'], $input['fider'], $input['transType'], $input['coil_05'], $input['coil_10p'], $input['year']);
            }
        }
        return Inertia::render('FilteredRelays', [
            'currentRelays'=>$currentRelays, 
            'voltageRelays'=>$voltageRelays,
            'measInstruments'=>$measInstruments,
            'currentTranses'=>$currentTranses,
        ]);
    }
}
