import { useEffect, useState, useRef } from "react"
import "./TeamSelection.css"
import { POKEMON_GENERATIONS } from "../../lib/utils/pokemogens"
import PokemonList from "./PokemonList/PokemonList"
import PokemonDetails from "./PokemonDetails/PokemonDetails"
import PokemonTeam from "./PokemonTeam/PokemonTeam"
import { PokemonItem } from "./PokemonList/PokemonListItem"
import { MAX_TRAINER_POKEMONS } from "../../config"

type TeamSelectionProps = {
    favouriteType: string
    team: PokemonItem[]
    validateRef: React.MutableRefObject<(() => boolean) | null>
    onAdd: (_:PokemonItem) => void
    onRemove: (i:number) => void
}

export default function TeamSelection({ favouriteType, team, validateRef, onAdd, onRemove }: TeamSelectionProps) {
    const [currentListTab, setCurrentListTab] = useState(0)
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonItem>()

    const detailsContainerRef = useRef<HTMLDivElement|null>(null)

    const [emptyTeamError, setEmptyTeamError] = useState("")

    const handleAddPokemon = () => {
        if (selectedPokemon !== undefined && team.length < MAX_TRAINER_POKEMONS)
            onAdd(selectedPokemon)
    }

    const handleSelectPokemon = (pokemon: PokemonItem) => {
        setSelectedPokemon(pokemon);
    }

    useEffect(()=>{
        detailsContainerRef.current?.scrollTo({top:0})
    },[selectedPokemon])

    useEffect(()=>{
        setEmptyTeamError("")
    },[team])

    const validate = () => {
        if(team.length === 0) {
            setEmptyTeamError("Add at least one Pokemon to your Team!")
            return false
        }
        return true
    }

    validateRef.current = validate

    return <div className="team-selection">

        <div className="list-details-row">

            <div className="pokemon-list">
                <div className="tab-container">
                    {POKEMON_GENERATIONS.map((gen, index) => (
                        <button key={gen.label}
                            className={gen.label === POKEMON_GENERATIONS[currentListTab].label ? "tab active" : "tab"}
                            onClick={() => setCurrentListTab(index)}
                        >{gen.label}</button>
                    ))}
                </div>
                <div className="list-container">
                    <PokemonList favouriteType={favouriteType} generation={POKEMON_GENERATIONS[currentListTab]} selectedPokemon={selectedPokemon} handleSelectPokemon={handleSelectPokemon} />
                </div>


            </div>

            <div className="details-container">
                {selectedPokemon !== undefined && <>
                    <PokemonDetails pokemon={selectedPokemon} ref={detailsContainerRef}/>
                    <button style={{ padding: "10px" }}
                        onClick={handleAddPokemon}
                        disabled={team.length === MAX_TRAINER_POKEMONS}>
                        Add to your team
                    </button></>}

            </div>

        </div>

        <div className="team-container">
            <PokemonTeam pokemons={team} onRemove={onRemove} onSelect={handleSelectPokemon}></PokemonTeam>

        </div>

        {emptyTeamError && <span className="error">{emptyTeamError}</span>}

    </div>
}