<?php

namespace IctFamilyTree\Services\Hooks;

use IctFamilyTree\Models\Human;
use Illuminate\Support\Facades\Route;

class HumanFormAfterUpdate
{
    public function dispatch()
    {
        $request = request();
        $id = $request->get('id');
        if( $id ){
            $human = Human::find($id);
        } else {
            $human = Human::latest()->first();;
        }

        if( $human ){
            $parent = $request->get('parent') ?? [0];
            if ($parent[0]) {
                $human->parent_id = $parent[0];
            }
            $human->save();
        }
    }
}