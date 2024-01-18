<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Substation;
use Inertia\Inertia;

class Message extends Controller
{
    public function showSubstations(){
        $substations = Substation::getSubstations();
        return Inertia::render('Test', ['txt'=>$substations]);
    }
    public function backToSubstations(){
        $substations = Substation::getSubstations();
        return ['substations' => $substations, 'url' => "/"];
    }
    public function showFiders(Request $req, $substation){
        $fiders = Substation::getFiders($substation);

        return $req->hasHeader('X-Requested-With')
        ? ['fiders' => $fiders, 'url' => "/${substation}"]
        : Inertia::render('Test', ['txt' => $fiders]);
    }
    public function changeObjectSF(Request $req){
        $input = $req->input();
        if($input['substation']!=='Substation' && $input['itemToChange']!==NULL){
            $substationAndFider = Substation::getSubstationId($input['substation'], $input['itemToChange']);
            $substationAndFider->fider = $input['newItem'];
            $substationAndFider->save();

            $fiders = Substation::getFiders($input['substation']);
            return ['items' => $fiders];
        }
        if($input['substation']!=='Substation' && $input['itemToChange']===NULL){
            $item = new Substation;
            $item->substation = $input['substation'];
            $item->fider = $input['newItem'];
            $item->save();

            $fiders = Substation::getFiders($input['substation']);
            return ['items' => $fiders];
        }
        if($input['substation']==='Substation'){
            Substation::where('substation', $input['itemToChange'])->update(['substation' => $input['newItem']]);
            $substations = Substation::getSubstations();
            return ['items' => $substations];
        }
    }
    public function deleteObjectSF(Request $req){
        $input=$req->input();
        if($input['substation']!=='Substation'){
            $subs_and_fider = Substation::getSubstationId($input['substation'], $input['itemToDelete']);
            $relays = $subs_and_fider->getRelays();
            if($relays[0]->isEmpty()===false && $relays[1]->isEmpty()===false &&
                $relays[2]->isEmpty()===false && $relays[3]->isEmpty()===false){
                return ['items'=>'deletion prohoibited'];
            }
            else {
                $subs_and_fider->delete();
                $fiders = Substation::getFiders($input['substation']);
                return ['items' => $fiders];
            }
        }
        if($input['substation']==='Substation'){
            $fiders = Substation::getFiders($input['itemToDelete']);
            return (count($fiders)>0) ? ['items'=>'deletion prohoibited'] : ['items'=>'deletion approved'];
        }
    }
    public function showRelays(Request $req, $substation, $fider){
        $subs_and_fider = Substation::getSubstationId($substation, $fider);
        $relays = $subs_and_fider->getRelays();
        return Inertia::render('Relays', 
        ['currentRelays'=>$relays[0],'voltageRelays'=>$relays[1],
        'measuringInstruments'=>$relays[2],'currentTransformers'=>$relays[3],
        'substation'=>[$substation, $fider]]);
    }
}
