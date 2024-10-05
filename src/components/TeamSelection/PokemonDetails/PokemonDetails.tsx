import { useQuery } from "@apollo/client";
import { gql } from "../../../__generated__"
import "./PokemonDetails.css"
import { firstLetterUppercase } from "../../../lib/utils/utils";

const GET_POKEMON_DETAILS_QUERY = gql(`query GetPokemonDetails($pokemon: String = "pikachu") {
  pokemon_v2_pokemon(where: {name: {_ilike: $pokemon}}) {
    name
    pokemon_v2_pokemontypes {
      pokemon_v2_type {
        name
      }
    }
    id
    height
    weight
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
    pokemon_v2_pokemonabilities {
      pokemon_v2_ability {
        name
      }
    }
    pokemon_v2_pokemonforms {
      name
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

        <div className="title">
          <img src={pokemonData.pokemon_v2_pokemonsprites[0].sprites["front_default"]} className="sprite-image" />

          <img src={pokemonData.pokemon_v2_pokemonsprites[0].sprites["back_default"]} className="sprite-image" />
          <div>
            <h2 className="name">{`No.${pokemonData.id} ${firstLetterUppercase(pokemon)}`}</h2>
            Types: {pokemonData.pokemon_v2_pokemontypes.map(type => `${firstLetterUppercase(type.pokemon_v2_type?.name)} `)}
            <br></br>
          </div>


        </div>

        <h3 className="heading">Base Statistics</h3>
        <div className="stats">
          {pokemonData.pokemon_v2_pokemonstats.map(stat => (<>
            <div className="key">{firstLetterUppercase(stat.pokemon_v2_stat?.name)}</div>
            <div className="value">{stat.base_stat}</div>
          </>
          ))}
        </div>

        <h3 className="heading">Abilities</h3>
        <div className="abilities">
          {pokemonData.pokemon_v2_pokemonabilities.map(ability => (
            <div className="ability">{firstLetterUppercase(ability.pokemon_v2_ability?.name)}</div>)
          )}
        </div>

        <h3 className="heading">Moves</h3>
        <div className="moves">
          {pokemonData.pokemon_v2_pokemonmoves.map(move => (
            <div className="move">{firstLetterUppercase(move.pokemon_v2_move?.name)}</div>
          ))}

        </div>

        <h3 className="heading">Forms</h3>
        <ul className="forms">
          {pokemonData.pokemon_v2_pokemonforms.map(form => (
            <li>{firstLetterUppercase(form.name)}</li>
          ))}

        </ul>


      </div>
      <button style={{ padding: "10px" }}>Add to your team</button>
    </>
  }

}