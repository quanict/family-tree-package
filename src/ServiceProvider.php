<?php

namespace IctFamilyTree;

use QuhCore\Support\Provider\ServiceProviderConcern;

class ServiceProvider extends \Illuminate\Support\ServiceProvider
{
    use ServiceProviderConcern;

    /**
     * @throws \Exception
     */
    public function __construct($app)
    {
        parent::__construct($app);
        $this->setPackagePaths();

    }

    public function register()
    {
        $this->loadDotEnv();
        $this->registerViews();
        $this->registerConfig();
        $this->app->register(RouteProvider::class);
        $this->registerViews();
    }

}
