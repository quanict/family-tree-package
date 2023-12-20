<?php


namespace IctFamilyTree\Repositories;

use QuhCore\Repositories\BaseRepository;
use QuhCore\Facades\AutoLoad\Route;
use IctFamilyTree\Models;

class FamilyAdminRepository extends BaseRepository
{
    protected array $models = [
        'human'=> Models\Human::class
    ];
    public function __construct($model = '')
    {
        $this->initModel();
        parent::__construct($this->model);
    }

    private function initModel(){
        $name = Route::getName();

        if( array_key_exists($name, $this->models)){
            $this->model = resolve($this->models[$name]);
        }
    }
}