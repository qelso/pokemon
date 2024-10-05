import PokemonListItem, { PokemonItem } from '../PokemonList/PokemonListItem'
import PokemonMember from './PokemonMember'
import './PokemonTeam.css'
type PokemonTeamProps = {
    pokemons: PokemonItem[]
}

const MAX_POKEMONS = 7

export default function PokemonTeam({ pokemons }: PokemonTeamProps) {

    return <>
        <h3>Your Team</h3>
        {pokemons.length < 1 ? <span>
            No Pokemons added.
        </span> :
            <div className="pokemon-team-grid">
                {pokemons.map((pokemon,index) => (
                    <div className="grid-item" key={`${pokemon.name}${index}`}>
                        <PokemonListItem pokemon={pokemon} selected={false} onClick={() => { }} />
                    </div>))}
            </div>}
    </>

}