<?php

namespace IctFamilyTree\Controllers;

use IctFamilyTree\Models\Human;
use Illuminate\Http\Request;
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

    public function getData(Request $request)
    {
        //Human::fixTree();
        $test = Human::get()->toFlatTree()->toJson();
        dd($test);
    }

    public function getNested()
    {
        $humans = Human::get()->toTree();

//        $traverse = function ($categories, $prefix = '-') use (&$traverse) {
//            foreach ($categories as $category) {
//                echo PHP_EOL . $prefix . ' ' . $category->name;
//
//                $traverse($category->children, $prefix . '-');
//            }
//        };
//
//        $traverse($nodes);

        return view("IctFamilyTree::pages.treeView", compact('humans'));
    }
}