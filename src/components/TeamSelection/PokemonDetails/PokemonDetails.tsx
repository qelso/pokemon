import { useQuery } from "@apollo/client";
import { gql } from "../../../__generated__"
import "./PokemonDetails.css"
import { firstLetterUppercase } from "../../../lib/utils/utils";

const GET_POKEMON_DETAILS_QUERY = gql(`query GetPokemonDetails($pokemon: String = "charmander") {
    pokemon_v2_pokemon(where: {name: {_eq: $pokemon}}) {
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      id
      height
      base_experience
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonmoves(limit: 4) {
        pokemon_v2_move {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
  `);

type PokemonDetailsProps = {
    pokemon: string
}


export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {

    let data, loading, error;
    if (pokemon) {
        const pokemonQuery = useQuery(GET_POKEMON_DETAILS_QUERY, {
            variables: {
                pokemon
            }
        })
        data = pokemonQuery.data;
        loading = pokemonQuery.loading;
        error = pokemonQuery.error;
    }

    if (error) return <p className="error">Error when retrieve pokemon data. Please retry</p>
    if (!loading && data && data.pokemon_v2_pokemon) {
        const pokemonData = data.pokemon_v2_pokemon[0];
        return <>
            <div className="details-card">

                <div className="header">
                    <img src={pokemonData.pokemon_v2_pokemonsprites[0].sprites["front_default"]} className="sprite-image" />

                    <img src={pokemonData.pokemon_v2_pokemonsprites[0].sprites["back_default"]} className="sprite-image" />
                    <div>
                        <h2 className="name">{`No.${pokemonData.id} ${firstLetterUppercase(pokemon)}`}</h2>
                        Types: {pokemonData.pokemon_v2_pokemontypes.map(type => `${firstLetterUppercase(type.pokemon_v2_type?.name)} `)}
                        <br></br>
                    </div>


                </div>

                <h3 className="header">Base Statistics</h3>
                <div className="stats">
                    {pokemonData.pokemon_v2_pokemonstats.map(stat => (<>
                        <div className="key">{firstLetterUppercase(stat.pokemon_v2_stat?.name)}</div>
                        <div className="value">{stat.base_stat}</div>
                    </>
                    ))}
                </div>

                <h3 className="header">Moves</h3>
                <div className="moves">
                    {pokemonData.pokemon_v2_pokemonmoves.map(move => (
                        <div className="move">{firstLetterUppercase(move.pokemon_v2_move?.name)}</div>
                    ))}

                </div>


            </div>
            <button>Add to your team</button>
        </>
    }

}