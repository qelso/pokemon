import PokemonListItem, { PokemonItem } from "./PokemonListItem"
import { gql } from "../../../__generated__";
import { Generation } from "../../../lib/utils/pokemogens";
import { useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import './PokemonList.css'

const FAV_TYPE_POKEMONS_QUERY = gql(/*Graph QL*/ `
query GetFavTypePokemons($favouriteType: String, $first: Int, $last: Int) {
    pokemon_v2_pokemon(where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}, id: {_gte: $first, _lte: $last}}, limit: 200, order_by: {id:asc}) {
      name
      id
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
      id
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
    selectedPokemon: PokemonItem | undefined
    handleSelectPokemon: (_:PokemonItem)=>void

}

export default function PokemonList({ favouriteType, generation, selectedPokemon, handleSelectPokemon }: PokemonListProps) {
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonSearchText(event.target.value)
        containerRef.current?.scrollTo({ top: 0 })
    }

    return <React.Fragment>
        <input type="text" onChange={handleChange} placeholder="Search a Pokemon..."></input>
        <div ref={containerRef} className="list" >
            {!favPokemonsQuery.loading && favPokemonsQuery.data?.pokemon_v2_pokemon
                .filter(pokemon => pokemon.name.startsWith(pokemonSearchText.toLowerCase()))
                .map((pokemon, index) => {
                    const pokemonItem: PokemonItem = {
                        name: pokemon.name,
                        spriteUrl: pokemon.pokemon_v2_pokemonsprites[0].sprites,
                        id: pokemon.id,
                        types: pokemon.pokemon_v2_pokemontypes.map(type => type.pokemon_v2_type!.name)

                    }
                    return <div key={pokemon.name} style={{ borderBottom: "1px solid #ccc" }}>
                        <PokemonListItem pokemon={pokemonItem} onClick={() => { handleSelectPokemon(pokemonItem) }} selected={selectedPokemon !== undefined && pokemon.name === selectedPokemon.name} />
                    </div>
                }
                )}

            {!pokemonsQuery.loading && pokemonsQuery.data?.pokemon_v2_pokemon
                .filter(pokemon => pokemon.name.startsWith(pokemonSearchText))
                .map((pokemon, index) => {
                    const pokemonItem: PokemonItem = {
                        name: pokemon.name,
                        spriteUrl: pokemon.pokemon_v2_pokemonsprites[0].sprites,
                        id: pokemon.id,
                        types: pokemon.pokemon_v2_pokemontypes.map(type => type.pokemon_v2_type!.name)

                    }
                    return <div key={pokemon.name} style={{ borderBottom: "1px solid #ccc" }}>
                        <PokemonListItem pokemon={pokemonItem} onClick={() => { handleSelectPokemon(pokemonItem) }} selected={selectedPokemon !== undefined && pokemon.name === selectedPokemon.name} />
                    </div>
                }
                )}
            {(favPokemonsQuery.error || pokemonsQuery.error) && <p className="error">There was a problem retrieving Pokemons</p>}
        </div>
    </React.Fragment>
}