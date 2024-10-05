import { useEffect, useState } from "react"
import "./TeamSelection.css"
import { PokemonGenerations } from "../../lib/utils/pokemogens"
import PokemonList from "./PokemonList/PokemonList"
import PokemonDetails from "./PokemonDetails/PokemonDetails"
import PokemonTeam from "./PokemonTeam/PokemonTeam"
import { PokemonItem } from "./PokemonList/PokemonListItem"

type TeamSelectionProps = {
    favouriteType: string
}

export default function TeamSelection({ favouriteType }: TeamSelectionProps) {
    const [currentListTab, setCurrentListTab] = useState(0)
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonItem>({
        name:"",
        spriteUrl:"",
        types:[]
    })
    const [pokemonTeam, setPokemonTeam] = useState<PokemonItem[]>([])

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
                <PokemonDetails pokemon={selectedPokemon} setPokemonTeam={setPokemonTeam}/>
            </div>

        </div>

        <div className="team-container">
            <PokemonTeam pokemons={pokemonTeam}></PokemonTeam>

        </div>

    </div>
}