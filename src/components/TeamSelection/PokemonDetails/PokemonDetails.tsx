import "./PokemonDetails.css"
import { firstLetterUppercase } from "../../../lib/utils/utils";
import React, { useEffect, useRef, useState } from "react";
import { PokemonItem } from "../PokemonList/PokemonListItem";
import { Pokemon, PokemonClient } from "pokenode-ts";

type PokemonDetailsProps = {
  pokemon: PokemonItem
}

const PokemonDetails = React.forwardRef<HTMLDivElement, PokemonDetailsProps>(({ pokemon }, ref) => {

  const [pokemonDet, setPokemonDet] = useState<Pokemon>()
  const [pokemonErr, setPokemonErr] = useState<string>("")

  useEffect(() => {
    const api = new PokemonClient();
    api.getPokemonByName(pokemon.name)
      .then((result) => {
        setPokemonDet(result)
      })
      .catch(e => {
        console.log(e)
        setPokemonErr(`There was a problem retrieving pokemon details. Please Retry`)
      })
  }, [pokemon])

  if (pokemonErr) return <p className="error">{pokemonErr}</p>
  if (pokemonDet) {
    return <>
      <div className="details-card" ref={ref}>

        <div className="title">
          <img src={pokemonDet.sprites.front_default || ""} className="sprite-image" />

          <img src={pokemonDet.sprites.back_default || ""} className="sprite-image" />
          <div className="labels">
            <h2 className="name">{`No.${pokemonDet.id} ${firstLetterUppercase(pokemonDet.name)}`}</h2>
            <span>Types: {pokemonDet.types.map(type => `${firstLetterUppercase(type.type.name)} `)}</span>
          </div>


        </div>

        <h3 className="heading">Base Statistics</h3>
        <div className="stats">
          {pokemonDet.stats.map(stat => (<React.Fragment key={stat.stat.name}>
            <div className="key">{firstLetterUppercase(stat.stat.name)}</div>
            <div className="value">{stat.base_stat}</div>
          </React.Fragment>
          ))}
        </div>

        <h3 className="heading">Abilities</h3>
        <div className="abilities">
          {pokemonDet.abilities.map((ability, index) => (
            <div className="ability" key={`${ability.ability.name}${index}`}>{firstLetterUppercase(ability.ability.name)}</div>)
          )}
        </div>

        <h3 className="heading">Moves</h3>
        <div className="moves">
          {pokemonDet.moves.slice(0, 4).map((move, index) => (
            <div className="move" key={`${move.move.name}${index}`}>{firstLetterUppercase(move.move.name)}</div>
          ))}

        </div>

        <h3 className="heading">Forms</h3>
        <ul className="forms">
          {pokemonDet.forms.map(form => (
            <li key={form.name}>{firstLetterUppercase(form.name)}</li>
          ))}

        </ul>

      </div>
    </>
  }

})

export default PokemonDetails;
