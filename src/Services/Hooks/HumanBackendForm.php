<?php

namespace IctFamilyTree\Services\Hooks;

use Illuminate\Support\Facades\Route;
use ICT\WebPage\Facades\Meta;

class HumanBackendForm
{
    public function dispatch()
    {
        /**
         * @var \Ict\Input\Services\BackendForm $form;

         */
        $humanService = Route::current()->getController()->humanService;
        $form = backendForm();
        $form->setParentOptions($humanService->getOptions());


        $children = $form->model->children()->get();
        view()->share(compact('children'));

        if( $form->model->id ){
            Meta::addBreadcrumb(route("faTreeAdmin.human.edit", ['id'=>$form->model->id]), "edit");
        } else {
            Meta::addBreadcrumb(route("faTreeAdmin.human.create"), "create");
        }

    }
}