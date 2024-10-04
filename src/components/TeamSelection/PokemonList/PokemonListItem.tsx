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
        <img src={spriteUrl} className="list-item-image" />

        <div className="main-label-container">
            <span className="main-label">{firstLetterUppercase(name)}</span>
        </div>

        <div className="additional-labels-container">
            {types.map((name, index) => (
                <span key={index} className="additional-label">
                    {firstLetterUppercase(name)}
                </span>
            ))}
        </div>
    </div>
}