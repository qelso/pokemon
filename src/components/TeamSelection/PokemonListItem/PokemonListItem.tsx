import "./PokemonListItem.css"
type PokemonListItemProps = {
    spriteUrl: string
    name: string
    types: string[]
}

export default function PokemonListItem({ spriteUrl, name, types }: PokemonListItemProps) {
    return <div className="list-item-container">
        {/* Image on the left */}
        <img src={spriteUrl} className="list-item-image" />

        {/* Main label in the middle */}
        <div className="main-label-container">
            <span className="main-label">{name}</span>
        </div>

        {/* Additional labels on the right */}
        <div className="additional-labels-container">
            {types.map((name, index) => (
                <span key={index} className="additional-label">
                    {name}
                </span>
            ))}
        </div>
    </div>
}