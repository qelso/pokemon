import { firstLetterUppercase } from "../../../lib/utils/utils"
import "./PokemonListItem.css"
type PokemonListItemProps = {
    spriteUrl: string
    name: string
    types: string[]
    selected: boolean
    onClick?: ()=>void
}

export default function PokemonListItem({ spriteUrl, name, types, selected, onClick }: PokemonListItemProps) {
    return <div className={`list-item-container ${selected ? "selected" : ""}`} onClick={onClick}>
        <img src={spriteUrl} className="pokemon-sprite" />

        <div className="pokemon-name-container">
            <span className="pokemon-name">{firstLetterUppercase(name)}</span>
        </div>

        <div className="types-container">
            {types.map((name, index) => (
                <span key={index} className="type">
                    {firstLetterUppercase(name)}
                </span>
            ))}
        </div>
    </div>
}