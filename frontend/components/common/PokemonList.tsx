"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import Image from "next/image";
import { Spinner } from "../ui/spinner";

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type Pokemon = {
  name: string;
  image: string;
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
  height: number;
  weight: number;
};

const PAGE_SIZE = 30;

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);

  //   fetching pokemon list
  const fetchPokemon = async (offset: number) => {
    setLoading(true);
    try {
      const response = await axios.get<PaginatedResponse<Pokemon>>(
        `http://127.0.0.1:8000/api/pokemons`,
        {
          params: {
            offset: offset,
            limit: PAGE_SIZE,
          },
        },
      );
      setCount(response.data.count);
      setPokemons((prev) =>
        reset ? response.data.results : [...prev, ...response.data.results],
      );
    } catch (err) {
    } finally {
      setLoading(false);
      setReset(false);
    }
  };
  //handle input on change when typing
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  //   search function for searching specific pokemon name
  const searchPokemon = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/pokemons/search",
        {
          name: search,
        },
      );
      setPokemons(res.data);
    } catch (err) {
    } finally {
      setReset(true);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextOffset = offset + 30;
    setOffset(nextOffset);
    fetchPokemon(nextOffset);
  };

  const handleReset = async () => {
    setReset(false);
    setPokemons([]);
    fetchPokemon(0);
  };

  //   Convert first letter of string to uppercase
  const upperCaseString = (stringValue: string) => {
    return stringValue[0].toLocaleUpperCase() + stringValue.substring(1);
  };

  useEffect(() => {
    fetchPokemon(offset);
  }, []);

  return (
    <>
      <div className="flex gap-3 sticky top-0 z-2 bg-white h-10 my-2">
        <Input
          type="text"
          placeholder="Pokemon name"
          value={search}
          onChange={handleOnChange}
        />
        <Button
          className="bg-yellow-500 cursor-pointer"
          onClick={() => searchPokemon()}
        >
          Search
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-6">
        {pokemons.length > 0
          ? pokemons.map((pokemon) => (
              <div
                key={pokemon.name}
                className="border p-5 rounded-md flex gap-2"
              >
                <div className="relative h-20 w-20">
                  <Image alt={pokemon.name} src={pokemon.image} fill={true} />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">
                    {upperCaseString(pokemon.name)}
                  </p>
                  <div className="flex gap-2">
                    {pokemon.types.map((type) => (
                      <div
                        key={type.slot}
                        className="bg-gray-200 p-1 rounded-md"
                      >
                        {upperCaseString(type.type.name)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
      {loading && (
        <div className="flex justify-center mt-12">
          <Spinner className="size-18" />
        </div>
      )}
      {!loading && (
        <div className="text-center my-3">
          {reset ? (
            <Button className="cursor-pointer" onClick={handleReset}>
              Reset
            </Button>
          ) : (
            offset < count && (
              <Button
                onClick={handleLoadMore}
                disabled={loading}
                className="cursor-pointer"
              >
                {loading ? "Loading..." : "Load more..."}
              </Button>
            )
          )}
        </div>
      )}
    </>
  );
};

export default PokemonList;
