<?php

namespace IctFamilyTree;

use Exception;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteProvider extends RouteServiceProvider
{
    protected $namespace = 'IctFamilyTree\Controllers';
    protected $route_path = __DIR__ . '/../routes/';

    /**
     * @throws Exception
     */
    public function map()
    {
        $path = realpath($this->route_path);

        if( !$path){
            throw new Exception("router dir is not exist");
        }
        $registrar = Route::middleware(['web']);

        $registrar->namespace($this->namespace);

        if( config('app.env') =="local" ){
            $registrar->prefix('family-tree');
        }

        $registrar->group("$path/web.php");
    }
}