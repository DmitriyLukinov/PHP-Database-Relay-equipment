<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Transformers\CurrentTransformers;
use App\Models\Measuring\MeasuringInstruments;
use App\Models\Voltage\VoltageRelays;
use App\Models\Current\CurrentRelays;
use App\Models\Substation;

class Relays extends Controller
{
    public function showDistinctItems(Request $req){
        $column = $req->input('column');
        $tableID = $req->input('tableID');
        switch ($tableID){
            case "currentTable":
                $items = CurrentRelays::getDistinctItems($column); 
            break;
            case "voltageTable":
                $items = VoltageRelays::getDistinctItems();  
            break;
            case "measuringTable":
                $items = MeasuringInstruments::getDistinctItems($column);
            break;
            case "transTable":
                $items = CurrentTransformers::getDistinctItems($column);
            break;
        }
        return [$items];
    }

    private function setNewTie($tableID, $subs_and_fider, $itemID){
        switch($tableID){
            case "currentTable":
                $subs_and_fider->getCurr()->attach($itemID);
                $currentRelays = $subs_and_fider->getCurrArray();
                return $currentRelays;
            break;
            case 'voltageTable':
                $subs_and_fider->getVolt()->attach($itemID);
                $voltageRelays = $subs_and_fider->getVoltArray();
                return $voltageRelays;
            break;
            case 'measuringTable':
                $subs_and_fider->getMeas()->attach($itemID);
                $measInstruments = $subs_and_fider->getMeasArray();
                return $measInstruments;
            break;
            case 'transTable':
                $subs_and_fider->getTrans()->attach($itemID);
                $transes = $subs_and_fider->getTransArray();
                return $transes;
            break;
        }
    }

    public function postNewItem(Request $req){
        $tableID =  $req->input('tableID');
        $substation = $req->input('substation');
        $newItem = $req->input('newItem');

        $subs_and_fider = Substation::getSubstationId($substation[0], $substation[1]);
        switch($tableID){
            case "currentTable":
                $itemID = CurrentRelays::findItemID($newItem);
                if($itemID!==false){
                    return $this->setNewTie($tableID, $subs_and_fider, $itemID);
                }
                else if($itemID===false){
                    $newItemID = CurrentRelays::insertNewItem($newItem);
                    return $this->setNewTie($tableID, $subs_and_fider, $newItemID);
                }
            break;
            case "voltageTable":
                $itemID = VoltageRelays::findItemID($newItem);
                if($itemID!==false){
                    return $this->setNewTie($tableID, $subs_and_fider, $itemID);
                }
                else{
                    $newItemID = VoltageRelays::insertNewItem($newItem);
                    return $this->setNewTie($tableID, $subs_and_fider, $newItemID);
                }
            break;
            case "measuringTable":
                $itemID = MeasuringInstruments::findItemID($newItem);
                if($itemID!==false){
                    return $this->setNewTie($tableID, $subs_and_fider, $itemID);
                }
                else{
                    $newItemID = MeasuringInstruments::insertNewItem($newItem);
                    return $this->setNewTie($tableID, $subs_and_fider, $newItemID);
                }
            break;
            case "transTable":
                $itemID = CurrentTransformers::findItemID($newItem);
                if($itemID!==false){
                    return $this->setNewTie($tableID, $subs_and_fider, $itemID);
                }
                else{
                    $newItemID = CurrentTransformers::insertNewItem($newItem);
                    return $this->setNewTie($tableID, $subs_and_fider, $newItemID);
                }
            break;
        }
    }
    public function updateItem(Request $req){
        $tableID =  $req->input('tableID');
        $substation = $req->input('substation');
        $newItem = $req->input('newItem');
        $oldItem = $req->input('oldItem');
        
        if($oldItem[0]!==NULL){
            $subs_and_fider = Substation::getSubstationId($substation[0], $substation[1]);
            switch($tableID){
                case "currentTable":
                    $oldItemID = CurrentRelays::findItemID($oldItem);
                    $subs_and_fider->getCurr()->detach($oldItemID);
                    $isEmpty = CurrentRelays::findTies($oldItem);
                    if($isEmpty){ CurrentRelays::deleteItem($oldItemID); }

                    $itemID = CurrentRelays::findItemID($newItem);
                    if($itemID!==false){ return $this->setNewTie($tableID, $subs_and_fider, $itemID); }
                    else {
                        $newItemID = CurrentRelays::insertNewItem($newItem);
                        return $this->setNewTie($tableID, $subs_and_fider, $newItemID);
                    }
                break;
                case "voltageTable": 
                    $oldItemID = VoltageRelays::findItemID($oldItem);
                    $subs_and_fider->getVolt()->detach($oldItemID);
                    $isEmpty = VoltageRelays::findTies($oldItem);
                    if($isEmpty) VoltageRelays::deleteItem($oldItemID); 

                    $itemID = VoltageRelays::findItemID($newItem);
                    if($itemID!==false) return $this->setNewTie($tableID, $subs_and_fider, $itemID); 
                    else {
                        $newItemID = VoltageRelays::insertNewItem($newItem);
                        return $this->setNewTie($tableID, $subs_and_fider, $newItemID);
                    }              
                break;
                case "measuringTable":
                    $oldItemID = MeasuringInstruments::findItemID($oldItem);
                    $subs_and_fider->getMeas()->detach($oldItemID);
                    $isEmpty = MeasuringInstruments::findTies($oldItem);
                    if($isEmpty) MeasuringInstruments::deleteItem($oldItemID); 

                    $itemID = MeasuringInstruments::findItemID($newItem);
                    if($itemID!==false) return $this->setNewTie($tableID, $subs_and_fider, $itemID); 
                    else {
                        $newItemID = MeasuringInstruments::insertNewItem($newItem);
                        return $this->setNewTie($tableID, $subs_and_fider, $newItemID);
                    } 
                break;
                case "transTable":
                    $oldItemID = CurrentTransformers::findItemID($oldItem);
                    $subs_and_fider->getTrans()->detach($oldItemID);
                    $isEmpty = CurrentTransformers::findTies($oldItem);
                    if($isEmpty) CurrentTransformers::deleteItem($oldItemID); 

                    $itemID = CurrentTransformers::findItemID($newItem);
                    if($itemID!==false) return $this->setNewTie($tableID, $subs_and_fider, $itemID); 
                    else {
                        $newItemID = CurrentTransformers::insertNewItem($newItem);
                        return $this->setNewTie($tableID, $subs_and_fider, $newItemID);
                    }  
                break;
            }
        }
    }

    public function deleteItem(Request $req){
        $substation = $req->input('substation');
        $tableID = $req->input('tableID');
        $itemToDelete = $req->input('itemToDelete');

        $subs_and_fider = Substation::getSubstationId($substation[0], $substation[1]);
        switch($tableID){
            case "currentTable":
                $itemID = CurrentRelays::findItemID($itemToDelete);
                $subs_and_fider->getCurr()->detach($itemID);
                $isEmpty = CurrentRelays::findTies($itemToDelete);
                if($isEmpty){ CurrentRelays::deleteItem($itemID); }
                return $subs_and_fider->getCurrArray();
            break;
            case "voltageTable":
                $itemID = VoltageRelays::findItemID($itemToDelete);
                $subs_and_fider->getVolt()->detach($itemID);
                $isEmpty = VoltageRelays::findTies($itemToDelete);
                if($isEmpty){ VoltageRelays::deleteItem($itemID); }
                return $subs_and_fider->getVoltArray();
            break;
            case "measuringTable":
                $itemID = MeasuringInstruments::findItemID($itemToDelete);
                $subs_and_fider->getMeas()->detach($itemID);
                $isEmpty = MeasuringInstruments::findTies($itemToDelete);
                if($isEmpty){ MeasuringInstruments::deleteItem($itemID); }
                return $subs_and_fider->getMeasArray();
            break;
            case "transTable":
                $itemID = CurrentTransformers::findItemID($itemToDelete);
                $subs_and_fider->getTrans()->detach($itemID);
                $isEmpty = CurrentTransformers::findTies($itemToDelete);
                if($isEmpty){ CurrentTransformers::deleteItem($itemID); }
                return $subs_and_fider->getTransArray();
            break;
        }
    }
}
