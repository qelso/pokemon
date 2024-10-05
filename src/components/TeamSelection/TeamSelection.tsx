import { useEffect, useState } from "react"
import "./TeamSelection.css"
import { PokemonGenerations } from "../../lib/utils/pokemogens"
import PokemonList from "./PokemonList/PokemonList"
import PokemonDetails from "./PokemonDetails/PokemonDetails"

type TeamSelectionProps = {
    favouriteType: string
}

export default function TeamSelection({ favouriteType }: TeamSelectionProps) {
    const [currentListTab, setCurrentListTab] = useState(0)
    const [selectedPokemon, setSelectedPokemon] = useState("")

    return <div className="team-selection">

        <div className="list-details-row">

            <div className="pokemon-list">
                <div className="tab-container">
                    {PokemonGenerations.map((gen, index) => (
                        <button key={gen.label}
                            className={gen.label === PokemonGenerations[currentListTab].label ? "tab active" : "tab"}
                            onClick={() => setCurrentListTab(index)}
                        >{gen.label}</button>
                    ))}
                </div>
                <div className="list-container">
                    <PokemonList favouriteType={favouriteType} generation={PokemonGenerations[currentListTab]} selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
                </div>


            </div>

            <div className="details-container">
                <PokemonDetails pokemon={selectedPokemon} />
            </div>

        </div>

        <div className="pokemon-team">
            <h3>Your Team</h3>
            <div className="team-container">

            </div>
            

        </div>

    </div>
}