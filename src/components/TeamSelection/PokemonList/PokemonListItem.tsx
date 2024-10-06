import { firstLetterUppercase } from "../../../lib/utils/utils"
import "./PokemonListItem.css"

export type PokemonItem = {
    spriteUrl: string
    name: string
    id: number
    types: string[]
}

type PokemonListItemProps = {
    pokemon: PokemonItem
    selected: boolean
    onClick?: ()=>void
}

export default function PokemonListItem({ pokemon, selected, onClick }: PokemonListItemProps) {
    return <div className={`list-item-container ${selected ? "selected" : ""}`} onClick={onClick}>
        <img src={pokemon.spriteUrl} className="pokemon-sprite" />

        <div className="pokemon-name-container">
            <span className="pokemon-name">{firstLetterUppercase(pokemon.name)}</span>
        </div>

        <div className="types-container">
            {pokemon.types.map((name, index) => (
                <span key={index} className="type">
                    {firstLetterUppercase(name)}
                </span>
            ))}
        </div>
    </div>
}