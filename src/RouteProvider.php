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

        $sitePrefix = "";
        if( config('app.env') =="local" ){
            $sitePrefix = "family-tree";

        }

        $registrar->prefix($sitePrefix);
        $registrar->group("$path/web.php");

        $web = clone $registrar;
        $web->prefix("{$sitePrefix}/admin");
        $web->namespace("IctFamilyTree\Controllers\Admin");
        $web->group($this->route_path.'/admin.php');
    }
}