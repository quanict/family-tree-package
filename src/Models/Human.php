<?php

namespace IctFamilyTree\Models;

use QuhCore\Support\Nestedset\NodeTrait;

class Human extends _FamilyModel
{
    use NodeTrait;
    protected $fillable = ["name", 'code', "sex", "surname", "death_at", "alive", "_lft", "_rgt", "parent_id", ];


    public function getChildCountAttribute(){
        return $this->children()->count();
    }

    public function toArray(): array
    {
        $id = $this->getAttribute('id');
        $name = $this->getAttribute('name');
        $death = $this->getAttribute('death_at');
        $alive = $this->getAttribute('alive');
        $sex = $this->getAttribute('sex');
        $code = $this->getAttribute('code');
        return compact('id', 'name', 'code', 'sex', 'death', 'alive');
    }
}