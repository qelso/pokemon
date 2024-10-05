import PokemonListItem from "./PokemonListItem"
import { gql } from "../../../__generated__";
import { Generation } from "../../../lib/utils/pokemogens";
import { useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import './PokemonList.css'

const FAV_TYPE_POKEMONS_QUERY = gql(/*Graph QL*/ `
query GetFavTypePokemons($favouriteType: String, $first: Int, $last: Int) {
    pokemon_v2_pokemon(where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}, id: {_gte: $first, _lte: $last}}, limit: 200, order_by: {id:asc}) {
      name
      pokemon_v2_pokemonsprites {
        sprites(path: "front_default")
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
  
`)

const NOT_FAV_TYPE_POKEMONS_QUERY = gql(` query getNonFavTypePokemons($favouriteType: String, $first: Int, $last: Int) {
    pokemon_v2_pokemon(where: {_not: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}, id: {_gte: $first, _lte: $last}}, limit: 200, order_by: {id:asc}) {
      name
      pokemon_v2_pokemonsprites {
        sprites(path: "front_default")
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`)

type PokemonListProps = {
    favouriteType: string
    generation: Generation
    selectedPokemon: string
    setSelectedPokemon: React.Dispatch<React.SetStateAction<string>>

}

export default function PokemonList({ favouriteType, generation, selectedPokemon, setSelectedPokemon }: PokemonListProps) {
    //const [offset, setOffset] = useState(0);
    //const [pokemonEnd, setPokemonEnd] = useState(false)
    const [pokemonSearchText, setPokemonSearchText] = useState("")

    const favPokemonsQuery = useQuery(FAV_TYPE_POKEMONS_QUERY, {
        variables: {
            favouriteType, first: generation.first, last: generation.last
        }
    })
    const pokemonsQuery = useQuery(NOT_FAV_TYPE_POKEMONS_QUERY, {
        variables: {
            favouriteType, first: generation.first, last: generation.last
        }
    })

    const firstSelect = useRef(false)

    const containerRef = useRef<HTMLDivElement | null>(null)
    /*
        useEffect(() => {
            const handleScroll = () => {
                const container = containerRef.current;
                if (container && container.scrollHeight - container.scrollTop === container.clientHeight) {
                    setOffset(prev => prev + 10)
                }
            };
    
            const container = containerRef.current;
            if (container) {
                container.addEventListener("scroll", handleScroll);
            }
    
            return () => {
                if (container) {
                    container.removeEventListener("scroll", handleScroll);
                }
            };
        }, []);
    
        useEffect(() => {
            if (offset !== 0 && !pokemonEnd) {
    
                favPokemonsQuery.fetchMore({
                    variables: {
                        offset: offset
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return prev;
                        if (!fetchMoreResult.pokemon_v2_pokemon) {
                            setPokemonEnd(true);
                            return prev;
                        }
                        console.log('fetching more', fetchMoreResult.pokemon_v2_pokemon)
                        return Object.assign({}, prev, {
                            pokemon_v2_pokemon: [...prev.pokemon_v2_pokemon, ...fetchMoreResult.pokemon_v2_pokemon]
                        })
                    }
                })
            }
        }, [offset])
        */

    useEffect(()=>{
        if(!favPokemonsQuery.loading && favPokemonsQuery.data && favPokemonsQuery.data.pokemon_v2_pokemon.length>0 && !firstSelect.current) {
            firstSelect.current = true;
            setSelectedPokemon(favPokemonsQuery.data.pokemon_v2_pokemon[0].name);
        }
        else if(!pokemonsQuery.loading && pokemonsQuery.data && pokemonsQuery.data.pokemon_v2_pokemon.length>0 && !firstSelect.current) {
            firstSelect.current = true;
            setSelectedPokemon(pokemonsQuery.data.pokemon_v2_pokemon[0].name);
        }
    },[favPokemonsQuery.loading])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonSearchText(event.target.value)
        containerRef.current?.scrollTo({top:0})
    }

    return <React.Fragment>
        <input type="text" onChange={handleChange} placeholder="Search a Pokemon..."></input>
        <div ref={containerRef} className="list" >
            {!favPokemonsQuery.loading && favPokemonsQuery.data?.pokemon_v2_pokemon
                .filter(pokemon => pokemon.name.startsWith(pokemonSearchText.toLowerCase()))
                .map((pokemon, index) =>
                    <PokemonListItem key={pokemon.name} name={pokemon.name} spriteUrl={pokemon.pokemon_v2_pokemonsprites[0].sprites} types={pokemon.pokemon_v2_pokemontypes.map(type => type.pokemon_v2_type!.name)} onClick={()=>{setSelectedPokemon(pokemon.name)}} selected={pokemon.name === selectedPokemon}/>
                )}

            {!pokemonsQuery.loading && pokemonsQuery.data?.pokemon_v2_pokemon
                .filter(pokemon => pokemon.name.startsWith(pokemonSearchText))
                .map((pokemon, index) =>

                    <PokemonListItem key={pokemon.name} name={pokemon.name} spriteUrl={pokemon.pokemon_v2_pokemonsprites[0].sprites} types={pokemon.pokemon_v2_pokemontypes.map(type => type.pokemon_v2_type!.name)} onClick={()=>{setSelectedPokemon(pokemon.name)}} selected={pokemon.name === selectedPokemon}/>

                )}
            {(favPokemonsQuery.error || pokemonsQuery.error) && <p className="error">There was a problem retrieving Pokemons</p>}
        </div>
    </React.Fragment>
}