<?php
use QuhCore\Facades\ICTRoute;
use Illuminate\Support\Facades\Route;

$naming = "faTreeAdmin";

Route::get('',function() use($naming) {
    return redirect()->route("$naming.human.dataTable");
})->name("$naming.dashboard");

ICTRoute::backend('human','HumanController', "$naming.human");