import { useEffect, useState } from "react"
import { Pokemon, PokemonClient } from "pokenode-ts"
import "./TeamSelection.css"
import { useQuery, QueryResult } from "@apollo/client"
import { gql } from "../../__generated__"
import { GetFavTypePokemonsQuery, GetNonFavTypePokemonsQuery, InputMaybe, Scalars, Exact } from "../../__generated__/graphql"
import PokemonListItem from "./PokemonListItem/PokemonListItem"

const FAV_TYPE_POKEMONS_QUERY = gql(/*Graph QL*/ `
query GetFavTypePokemons($favouriteType: String = "grass", $first: Int, $last: Int) {
    pokemon_v2_pokemon(where: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}, id: {_gte: $first, _lte: $last}}, limit: 200) {
      name
      height
      base_experience
      id
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
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
    pokemon_v2_pokemon(where: {_not: {pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: $favouriteType}}}}, id: {_gte: $first, _lte: $last}}, limit: 200) {
      name
      height
      base_experience
      id
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
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

type TeamSelectionProps = {
    favouriteType: string
}

type Generation = {
    label: string,
    first: number,
    last: number,
    favPokemonsQuery: QueryResult<GetFavTypePokemonsQuery, Exact<{
        favouriteType?: InputMaybe<Scalars["String"]["input"]>;
        first?: InputMaybe<Scalars["Int"]["input"]>;
        last?: InputMaybe<Scalars["Int"]["input"]>;
    }>>,
    pokemonsQuery: QueryResult<GetFavTypePokemonsQuery, Exact<{
        favouriteType?: InputMaybe<Scalars["String"]["input"]>;
        first?: InputMaybe<Scalars["Int"]["input"]>;
        last?: InputMaybe<Scalars["Int"]["input"]>;
    }>>
}

export default function TeamSelection({ favouriteType }: TeamSelectionProps) {

    // query all generations
    const gens: Generation[] = [
        {
            label: "Gen1",
            first: 1,
            last: 151,
            favPokemonsQuery: useQuery(FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 1, last: 151 }
            }),
            pokemonsQuery: useQuery(NOT_FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 1, last: 151 }
            })

        },
        {
            label: "Gen2",
            first: 152,
            last: 251,
            favPokemonsQuery: useQuery(FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 152, last: 251 }
            }),
            pokemonsQuery: useQuery(NOT_FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 152, last: 251 }
            })
        },
        {
            label: "Gen3",
            first: 252,
            last: 386,
            favPokemonsQuery: useQuery(FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 252, last: 386 }
            }),
            pokemonsQuery: useQuery(NOT_FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 252, last: 386 }
            })
        },
        {
            label: "Gen4",
            first: 387,
            last: 493,
            favPokemonsQuery: useQuery(FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 387, last: 493 }
            }),
            pokemonsQuery: useQuery(NOT_FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 387, last: 493 }
            })
        },
        {
            label: "Gen5",
            first: 494,
            last: 649,
            favPokemonsQuery: useQuery(FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 494, last: 694 }
            }),
            pokemonsQuery: useQuery(NOT_FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 494, last: 694 }
            })
        },
        {
            label: "Gen6",
            first: 650,
            last: 721,
            favPokemonsQuery: useQuery(FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 650, last: 721 }
            }),
            pokemonsQuery: useQuery(NOT_FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 650, last: 721 }
            })
        },
        {
            label: "Gen7",
            first: 722,
            last: 809,
            favPokemonsQuery: useQuery(FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 722, last: 809 }
            }),
            pokemonsQuery: useQuery(NOT_FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 722, last: 809 }
            })
        },
        {
            label: "Gen8",
            first: 810,
            last: 905,
            favPokemonsQuery: useQuery(FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 810, last: 905 }
            }),
            pokemonsQuery: useQuery(NOT_FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 810, last: 905 }
            })
        },
        {
            label: "Gen9",
            first: 906,
            last: 1015,
            favPokemonsQuery: useQuery(FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 906, last: 1015 }
            }),
            pokemonsQuery: useQuery(NOT_FAV_TYPE_POKEMONS_QUERY, {
                variables: { favouriteType, first: 906, last: 1015 }
            })
        }

    ];

    const [currentListTab, setCurrentListTab] = useState(0)

    //for testing
    useEffect(()=>{
        console.log(gens[currentListTab].favPokemonsQuery.data)
        console.log(gens[currentListTab].pokemonsQuery.data)
    },[currentListTab])

    const [selectedPokemons, setSelectedPokemons] = useState()

    return <div className="team-selection">

        <div className="pokemon-list">
            <div className="tab-container">
                {gens.map((gen, index) => (
                    <button key={gen.label}
                        className={gen.label === gens[currentListTab].label ? "tab active" : "tab"}
                        onClick={() => setCurrentListTab(index)}
                    >{gen.label}</button>
                ))}
            </div>
            <div className="list-container">
                {!gens[currentListTab].favPokemonsQuery.loading && gens[currentListTab].favPokemonsQuery.data?.pokemon_v2_pokemon.map((pokemon, index) =>
                    <PokemonListItem name={pokemon.name} spriteUrl={pokemon.pokemon_v2_pokemonsprites[0].sprites} types={pokemon.pokemon_v2_pokemontypes.map(type=>type.pokemon_v2_type!.name)} />
                )}
                {!gens[currentListTab].pokemonsQuery.loading && gens[currentListTab].pokemonsQuery.data?.pokemon_v2_pokemon.map((pokemon,index) =>

                    <PokemonListItem name={pokemon.name} spriteUrl={pokemon.pokemon_v2_pokemonsprites[0].sprites} types={pokemon.pokemon_v2_pokemontypes.map(type=>type.pokemon_v2_type!.name)} />

                )}
            </div>
                
            {(gens[currentListTab].favPokemonsQuery.error || gens[currentListTab].pokemonsQuery.error) && <p className="error">There was a problem retrieving Pokemons</p>}

        </div>

        <div className="pokemon-team">
            <ul>
                --
            </ul>
        </div>

    </div>
}