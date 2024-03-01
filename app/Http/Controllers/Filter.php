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

class Filter extends Controller
{
    private function splitStringIntoWords($string) {
        preg_match_all('/\S+/', $string, $wordsArray);
        return $wordsArray[0] ?? [];
    }

    public function sendFilteredRelays(Request $req){
        $input = $req->input('values');

        $keysToSplit = [
            'substation', 'fider', 'year', 'relayType', 'relayRange', 'voltageRelayType', 'voltageType', 
            'device', 'deviceType', 'limit', 'nextVerification', 'transType', 'coil_05', 'coil_10p'           
        ];
    
        foreach ($keysToSplit as $key) {
            $input[$key] = $this->splitStringIntoWords($input[$key]);
        }
        
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
                        Log::info($equip);
                    }           
                }
            }
            else{
                CurrentRelays::getFilteredCurr($input['substation'], $input['fider'], $input['relayType'], $input['relayRange'], $input['year']);
                VoltageRelays::getFilteredVolt($input['substation'], $input['fider'], $input['voltageRelayType'], $input['voltageType'], $input['year']);
                CurrentTransformers::getFilteredTrans($input['substation'], $input['fider'], $input['transType'], $input['coil_05'], $input['coil_10p'], $input['year']);
                MeasuringInstruments::getFilteredMeasInsr($input['substation'], $input['fider'], $input['device'], $input['deviceType'], $input['limit'], $input['nextVerification'], $input['year']);
            }
        }
        else{ 
            if(count($input['relayType'])> 0 || count($input['relayRange']) > 0){
                CurrentRelays::getFilteredCurr($input['substation'], $input['fider'], $input['relayType'], $input['relayRange'], $input['year']);
            }
            if(count($input['voltageRelayType'])> 0 || count($input['voltageType'])> 0){
                VoltageRelays::getFilteredVolt($input['substation'], $input['fider'], $input['voltageRelayType'], $input['voltageType'], $input['year']);
            }
            if(count($input['transType']) > 0 || count($input['coil_05']) > 0 || count($input['coil_10p']) > 0){
                CurrentTransformers::getFilteredTrans($input['substation'], $input['fider'], $input['transType'], $input['coil_05'], $input['coil_10p'], $input['year']);
            }
            if(count($input['device']) >0 || count($input['deviceType']) > 0 || count($input['limit']) > 0 || count($input['nextVerification'])> 0){
                MeasuringInstruments::getFilteredMeasInsr($input['substation'], $input['fider'], $input['device'], $input['deviceType'], $input['limit'], $input['nextVerification'], $input['year']);
            }
        }
    }
}
