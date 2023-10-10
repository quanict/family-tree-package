<?php

namespace IctFamilyTree\Controllers\Admin;

use IctFamilyTree\Services;
use ICT\WebPage\Facades\Meta;

class HumanController extends _AdminController
{
    protected string $formView = "IctFamilyTree::pages.human-backend";
    protected $dispatchesEvents = [
        'on-form-edit'=> Services\Hooks\HumanBackendForm::class,
        'after-update'=> Services\Hooks\HumanFormAfterUpdate::class,
    ];
    public function __construct(
        public Services\HumanService $humanService
    )
    {
        parent::__construct();
        Meta::addBreadcrumb('faTreeAdmin.human.dataTable', 'Humans');
    }

}