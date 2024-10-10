import { PokemonItem } from "../TeamSelection/PokemonList/PokemonListItem"
import { POKEMON_GENERATIONS } from "../../lib/utils/pokemogens"
import { MAX_OPPONENT_POKEMONS } from "../../config"
import React, { useState, useEffect } from "react"
import { Pokemon, PokemonClient } from "pokenode-ts"
import './OpponentTeam.css'
import { firstLetterUppercase } from "../../lib/utils/utils"

type OpponentTeamProps = {
    trainerTeam: PokemonItem[]
    team: Pokemon[]
    onTeamChange: (_: Pokemon[]) => void
    validateRef: React.MutableRefObject<(() => boolean) | null>
}

export default function OpponentTeam({ trainerTeam, team, onTeamChange, validateRef }: OpponentTeamProps) {

    const [teamError, setTeamError] = useState("")
    const [generating, setGenerating] = useState(true)

    const getAvailableGenerations = () => POKEMON_GENERATIONS.filter((gen) => {
        for (let i = 0; i < trainerTeam.length; i++) {
            if (trainerTeam[i].id >= gen.first && trainerTeam[i].id <= gen.last)
                return false
        }
        return true
    })

    const getRandomNum = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const availableGens = getAvailableGenerations()

    const validate = () => {
        if (generating) {
            setTeamError("Wait for opponent team to be generated!")
            return false
        }
        return true
    }

    validateRef.current = validate


    const generateTeam = async () => {
        let opponentTeam: Pokemon[] = []
        const api = new PokemonClient()

        for (let i = 0; i < MAX_OPPONENT_POKEMONS; i++) {
            const gen = getRandomNum(0, availableGens.length - 1)
            const speciesId = getRandomNum(availableGens[gen].first, availableGens[gen].last)
            try {
                //const pokemon = await api.getPokemonById(speciesId)
                //opponentTeam.push(pokemon)
                const species = await api.getPokemonSpeciesById(speciesId)
                let pokemonId = 0
                if (species.varieties.length > 1)
                    pokemonId = getRandomNum(0, species.varieties.length - 1)

                const pokemon = await api.getPokemonByName(species.varieties[pokemonId].pokemon.name)
                opponentTeam.push(pokemon)

            }
            catch (e) {
                setTeamError("Error when generating opponent team, please retry.")
                console.log(e)
            }
        }

        setGenerating(false)
        setTeamError("")
        onTeamChange(opponentTeam)
    }

    useEffect(() => { generateTeam() }, [trainerTeam])

    return <div className="opponent-team-container">
        <h3>Your Opponent Team</h3>

        {generating ? <span>Generating opponent team...</span> : <div className="opponent-team-cards">
            {team.map((pokemon, index) => {
                return <div key={`${pokemon.id}${index}`} className="card">
                    <img className="sprite" src={pokemon.sprites.front_default || ""}></img>
                    <p>{firstLetterUppercase(pokemon.name)}</p>
                    <span>Types: {pokemon.types.map(type => `${firstLetterUppercase(type.type.name)} `)}</span>
                    <div className="stats">
                        {pokemon.stats.map(stat => <React.Fragment key={stat.stat.name}>
                            <div className="key">
                                {firstLetterUppercase(stat.stat.name)}
                            </div>
                            <div className="value">
                                {stat.base_stat}
                            </div>
                        </React.Fragment>)}
                    </div>
                    {!pokemon.is_default && <p>Specie: {firstLetterUppercase(pokemon.species.name)}</p>}
                </div>
            })}

        </div>}
        {teamError && <p className="error">{teamError}</p>}
        {!generating && <button onClick={() => {
            setGenerating(true)
            generateTeam()
        }}>Generate New Team</button>}

    </div>

}