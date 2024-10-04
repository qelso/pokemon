import { useEffect, useState } from "react"
import "./TeamSelection.css"
import { PokemonGenerations } from "../../lib/utils/pokemogens"
import PokemonList from "./PokemonList/PokemonList"



type TeamSelectionProps = {
    favouriteType: string
}



export default function TeamSelection({ favouriteType }: TeamSelectionProps) {
    const [currentListTab, setCurrentListTab] = useState(0)
    const [selectedPokemons, setSelectedPokemons] = useState()

    return <div className="team-selection">

        <div className="pokemon-list">
            <div className="tab-container">
                {PokemonGenerations.map((gen, index) => (
                    <button key={gen.label}
                        className={gen.label === PokemonGenerations[currentListTab].label ? "tab active" : "tab"}
                        onClick={() => setCurrentListTab(index)}
                    >{gen.label}</button>
                ))}
            </div>
                <PokemonList favouriteType={favouriteType} generation={PokemonGenerations[currentListTab]}/>
                

        </div>

        <div className="pokemon-team">
            <ul>
                <li>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                <li>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                <li>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                <li>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
                <li>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>
            </ul>
        </div>

    </div>
}