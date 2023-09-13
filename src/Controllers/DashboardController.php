<?php

namespace IctFamilyTree\Controllers;

use Illuminate\Routing\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        dd("go to dashboard");
    }

    public function tree1()
    {
        return view("IctFamilyTree::pages.tree1");
    }
}