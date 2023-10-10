<?php


namespace IctFamilyTree\Services;

class HumanService extends FamilyAdminService
{
    public function getOptions(){
        $builder = $this->repository->query();
        return $builder->get();
    }
}