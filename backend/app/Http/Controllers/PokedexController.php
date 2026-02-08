<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokedexController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $queryParams = $request->query();
        $offset = $queryParams["offset"];
        $limit = $queryParams["limit"];
        $response = Http::get("https://pokeapi.co/api/v2/pokemon/?offset=$offset&limit=$limit");

        $data = $response->json();

        $finalData = [];

        // foreach($data['results'] as $pokemon)
        // {
        //     $res = Http::get($pokemon['url'])->json();
        //     array_push($finalData, (object)[
        //         "name"=>$res['name'],
        //         "image"=>$res['sprites']['other']['official-artwork']['front_default'],
        //         "types"=>$res['types'],
        //         "height"=>$res['height'],
        //         "weight"=>$res['weight']
        //     ]);
        // }
        $responses = Http::pool(fn ($pool)=>
            collect($data['results'])->map(
                fn($pokemon) => $pool->get($pokemon['url'])
            )->toArray()
        );

        $finalData = collect($responses)->map(fn ($res) => [
            "name"=>$res['name'],
                "image"=>$res['sprites']['other']['official-artwork']['front_default'],
                "types"=>$res['types'],
                "height"=>$res['height'],
                "weight"=>$res['weight']
        ])->values();

        $data['results'] = $finalData;

        return $data;
    }

    public function search(Request $request)
    {
        $name = $request->name;
        $return_data = [];

        $response = Http::get("https://pokeapi.co/api/v2/pokemon/$name");

        $data = $response->json();

        array_push($return_data,
            (object)[
            "name"=>$data['name'],
                "image"=>$data['sprites']['other']['official-artwork']['front_default'],
                "types"=>$data['types'],
                "height"=>$data['height'],
                "weight"=>$data['weight']
        ]
        );

        return $return_data;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
