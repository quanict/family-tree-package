<?php

namespace IctFamilyTree\Services;

use ICT\Core\Exceptions\AutoLoadInstanceException;
use ICT\Core\Facades\AutoLoad\Route;
use ICT\Core\Services\BackendService;
use ICT\Core\Services\Traits\DatatableColumnMethods;
use ICT\DataTables\DataTables;
use IctFamilyTree\Models\Human;
use IctFamilyTree\Repositories\FamilyAdminRepository;

class FamilyAdminService extends BackendService
{
    use DatatableColumnMethods;

    public function __construct()
    {
        parent::__construct();
        $this->initial();
    }

    private function initial(){
        try{
            $this->repository = Route::getRepository();
        } catch (AutoLoadInstanceException $e){
            $this->repository = resolve(FamilyAdminRepository::class);
        } catch (\Exception $e){
            dd($e);
        }
    }


    public function getDatatableJson(){
        /**
         * @var \Illuminate\Database\Eloquent\Builder $builder
         */
        $builder = $this->repository->newQuery();
        $builder->orderBy("id",'ASC');

        $datatable = DataTables::of($builder);

        if( $builder->getModel() instanceof Human ){
            $datatable->getColumnsSearchable(['name']);
            $datatable->setModelAttributes(['child_count']);
        }


        return $datatable->toJson();
    }
}