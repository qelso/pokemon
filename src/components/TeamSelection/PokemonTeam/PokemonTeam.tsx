import React from 'react'
import { MAX_TRAINER_POKEMONS } from '../../../config'
import PokemonListItem, { PokemonItem } from '../PokemonList/PokemonListItem'
import './PokemonTeam.css'
type PokemonTeamProps = {
    pokemons: (PokemonItem)[]
    onRemove: (_:number) => void
    onSelect: (_:PokemonItem) => void
}

export default function PokemonTeam({ pokemons, onRemove, onSelect }: PokemonTeamProps) {

    const gridItems: (PokemonItem | null)[] = [...pokemons, ...Array(MAX_TRAINER_POKEMONS - pokemons.length).fill(null)]

    return <>
        <h3>Your Team</h3>
        <div className="pokemon-team-grid">
            {gridItems.map((pokemon, index) => (
                <div className={`grid-item ${pokemon ? "" : "empty"}`} key={`${pokemon ? pokemon.name : "empty"}${index}`}>
                    {pokemon ? <React.Fragment>
                        <button className='delete-button' onClick={()=>onRemove(index)}>x</button>
                        <PokemonListItem pokemon={pokemon} selected={false} onClick={() => onSelect(pokemon)} />
                    </React.Fragment> : "Empty"}
                </div>))}
        </div>
    </>

}