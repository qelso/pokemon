import { useEffect, useState, useRef } from "react"
import "./TeamSelection.css"
import { PokemonGenerations } from "../../lib/utils/pokemogens"
import PokemonList from "./PokemonList/PokemonList"
import PokemonDetails from "./PokemonDetails/PokemonDetails"
import PokemonTeam from "./PokemonTeam/PokemonTeam"
import { PokemonItem } from "./PokemonList/PokemonListItem"
import { MAX_TRAINER_POKEMONS } from "../../config"
import { Pokemon } from "pokenode-ts"

type TeamSelectionProps = {
    favouriteType: string
}

export default function TeamSelection({ favouriteType }: TeamSelectionProps) {
    const [currentListTab, setCurrentListTab] = useState(0)
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonItem>()
    const [pokemonTeam, setPokemonTeam] = useState<(PokemonItem)[]>([])

    const detailsContainerRef = useRef<HTMLDivElement|null>(null)

    const [maxPokemonsError, setMaxPokemonsError] = useState(false)

    const handleAddPokemon = () => {
        if (selectedPokemon !== undefined && pokemonTeam.length < MAX_TRAINER_POKEMONS)
            setPokemonTeam(prev => [...prev, selectedPokemon])
    }

    const handleSelectPokemon = (pokemon: PokemonItem) => {
        setSelectedPokemon(pokemon);
    }

    const handleRemovePokemon = (i: number) => {
        console.log("deleting", i)
        setPokemonTeam(prev => prev.filter((item, index) => index !== i
       ))
    }

    useEffect(()=>{
        detailsContainerRef.current?.scrollTo({top:0})
        console.log("scrolling")
        console.log(detailsContainerRef)
    },[selectedPokemon])

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
                    <PokemonList favouriteType={favouriteType} generation={PokemonGenerations[currentListTab]} selectedPokemon={selectedPokemon} handleSelectPokemon={handleSelectPokemon} />
                </div>


            </div>

            <div className="details-container">
                {selectedPokemon !== undefined && <>
                    <PokemonDetails pokemon={selectedPokemon} ref={detailsContainerRef}/>
                    <button style={{ padding: "10px" }}
                        onClick={handleAddPokemon}
                        disabled={pokemonTeam.length === MAX_TRAINER_POKEMONS}>
                        Add to your team
                    </button></>}

            </div>

        </div>

        <div className="team-container">
            <PokemonTeam pokemons={pokemonTeam} onRemove={handleRemovePokemon} onSelect={handleSelectPokemon}></PokemonTeam>

        </div>

    </div>
}