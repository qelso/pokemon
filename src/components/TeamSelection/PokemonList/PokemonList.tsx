import PokemonListItem, { PokemonItem } from "./PokemonListItem"
import { gql } from "../../../__generated__";
import { Generation } from "../../../lib/utils/pokemogens";
import { useQuery } from "@apollo/client";
import React, { useRef, useState } from "react";
import './PokemonList.css'

const FAV_TYPE_POKEMONS_QUERY = gql(/*Graph QL*/ `
query GetFavTypePokemons($favouriteType: String = "dark", $first: Int = 1, $last: Int = 151) {
    pokemon_v2_pokemonspecies(order_by: {id: asc}, where: { pokemon_v2_pokemons: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}} ,id: {_gte: $first, _lte: $last}}, limit: 200) {
      id
      name
      pokemon_v2_pokemons(where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}) {
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
  }
  
`)

const NOT_FAV_TYPE_POKEMONS_QUERY = gql(` query GetNonFavTypePokemons($favouriteType: String = "grass", $first: Int = 1, $last: Int = 151, $_eq: String = "grass") {
  pokemon_v2_pokemonspecies(order_by: {id: asc}, where: {pokemon_v2_pokemons: {_not: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}}, id: {_gte: $first, _lte: $last}}, limit: 200) {
    id
    name
    pokemon_v2_pokemons(where: {_not: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}}) {
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
}

`)

type PokemonListProps = {
  favouriteType: string
  generation: Generation
  selectedPokemon: PokemonItem | undefined
  handleSelectPokemon: (_: PokemonItem) => void

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonSearchText(event.target.value.toLowerCase())
    containerRef.current?.scrollTo({ top: 0 })
  }

  return <React.Fragment>
    <input type="text" onChange={handleChange} placeholder="Search a Pokemon..."></input>
    <div ref={containerRef} className="list" data-testid="pokemon-list">
      {!favPokemonsQuery.loading && favPokemonsQuery.data?.pokemon_v2_pokemonspecies
        .filter(specie => specie.name.startsWith(pokemonSearchText))
        .map((specie) => {
          const unpackedPokemons = specie.pokemon_v2_pokemons.map(pokemon => {
            const pokemonItem: PokemonItem = {
              name: pokemon.name,
              spriteUrl: pokemon.pokemon_v2_pokemonsprites[0].sprites,
              id: pokemon.id,
              types: pokemon.pokemon_v2_pokemontypes.map(type => type.pokemon_v2_type!.name)

            }
            return <div key={pokemon.name} style={{ borderBottom: "1px solid #ccc" }}>
            <PokemonListItem pokemon={pokemonItem} onClick={() => { handleSelectPokemon(pokemonItem) }} selected={selectedPokemon !== undefined && pokemon.name === selectedPokemon.name} />
          </div>
          })

          return unpackedPokemons.map(pokemonElement => pokemonElement)
        }
        )}

      {!pokemonsQuery.loading && pokemonsQuery.data?.pokemon_v2_pokemonspecies
        .filter(specie => specie.name.startsWith(pokemonSearchText))
        .map((specie) => {
          const unpackedPokemons = specie.pokemon_v2_pokemons.map(pokemon => {
            const pokemonItem: PokemonItem = {
              name: pokemon.name,
              spriteUrl: pokemon.pokemon_v2_pokemonsprites[0].sprites,
              id: pokemon.id,
              types: pokemon.pokemon_v2_pokemontypes.map(type => type.pokemon_v2_type!.name)

            }
            return <div key={pokemon.name} style={{ borderBottom: "1px solid #ccc" }}>
            <PokemonListItem pokemon={pokemonItem} onClick={() => { handleSelectPokemon(pokemonItem) }} selected={selectedPokemon !== undefined && pokemon.name === selectedPokemon.name} />
          </div>
          })

          return unpackedPokemons.map(pokemonElement => pokemonElement)
        }
        )}
      {(favPokemonsQuery.error || pokemonsQuery.error) && <p className="error">There was a problem retrieving Pokemons</p>}
    </div>
  </React.Fragment>
}