<?php

namespace IctFamilyTree\Controllers\Admin;
use QuhCore\Controllers\BackendController;
use QuhCore\Exceptions\AutoLoadInstanceException;
use QuhCore\Facades\AutoLoad\Route;
use IctFamilyTree\Services\FamilyAdminService;

class _AdminController extends BackendController
{
    public function __construct($repository=null)
    {
        $this->initial();
        if( !$repository && $this->service){
            $repository = $this->service->getRepository();
        }
        parent::__construct($repository);
    }

    private function initial(){
        try{
            if( !isset($this->service)){
                //$this->service = Controller::getService();
                try{
                    $this->service = Route::getService();
                } catch (AutoLoadInstanceException $e){
                    $this->service = resolve(FamilyAdminService::class);
                }
            }
        } catch (AutoLoadInstanceException $e){
            dd($e);
        }
//        WebPage::addMenuBuilder('backend', config("PmaConfig.menu.backend"));
//        Meta::setFavicon("/minh/img/7890168.png");
//        Meta::setLogo("/minh/img/7890168.png" , ['height'=>40]);
    }
}