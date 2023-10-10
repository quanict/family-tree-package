<?php


namespace IctFamilyTree\Repositories;

use ICT\Core\Repositories\BaseRepository;
use ICT\Core\Facades\AutoLoad\Route;
use IctFamilyTree\Models;

class FamilyAdminRepository extends BaseRepository
{
    private array $models = [
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