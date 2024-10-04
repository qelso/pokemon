import "./PokemonListItem.css"
type PokemonListItemProps = {
    spriteUrl: string
    name: string
    types: string[]
    onClick?: ()=>void
}

export default function PokemonListItem({ spriteUrl, name, types, onClick }: PokemonListItemProps) {
    return <div className="list-item-container" onClick={onClick}>
        <img src={spriteUrl} className="list-item-image" />

        <div className="main-label-container">
            <span className="main-label">{`${name.charAt(0).toUpperCase()}${name.slice(1)}`}</span>
        </div>

        <div className="additional-labels-container">
            {types.map((name, index) => (
                <span key={index} className="additional-label">
                    {`${name.charAt(0).toUpperCase()}${name.slice(1)}`}
                </span>
            ))}
        </div>
    </div>
}