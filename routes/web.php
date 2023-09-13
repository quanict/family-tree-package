<?php
use Illuminate\Support\Facades\Route;

Route::get('',"DashboardController@index")->name("faTree.dashboard");
Route::get('tree1',"DashboardController@tree1")->name("faTree.tree1");