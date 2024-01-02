<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\CurrentRelay;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class Substation extends Model
{
    use HasFactory;
    protected $table = 'substation';

    static public function getSubstations()
    {
        $substations = self::select('substation')->distinct()->get();
        $arr = [];
        foreach($substations as $a){
            $arr[]=$a['substation'];
        }
        return $arr;
    }

    static public function getFiders($substation)
    {
        $fiders = self::select('fider')->where('substation', $substation)->get();
        $arr = [];
        foreach($fiders as $f){
            $arr[]=$f['fider'];
        }
        return $arr;
    }

    static public function getSubstationId($substation, $fider)
    {
        $id = self::select('id')->where('substation',$substation)->where('fider',$fider)->get()->pluck('id');
        $subs_and_fider = self::find($id[0]);
        return $subs_and_fider;
    }

    public function getRelays(): BelongsToMany
    {
        return $this->belongsToMany(
            CurrentRelay::class, 'substation_current_relay', 'fider_id', 'current_relay_id'
        );
    }
}
