<?php

use App\Http\Controllers\PokedexController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/pokemons',[PokedexController::class,'index']);
Route::post('/pokemons/search',[PokedexController::class,'search']);