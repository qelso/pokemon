import React, { useEffect, useState } from "react"
import './TrainerDetails.css'
import {  useQuery } from "@apollo/client";
import { gql } from "../../__generated__";

export type TrainerDetailsData = {
    name: string
    teamName: string
    favType: string
}

type TrainerDetailsProps = {
    details: TrainerDetailsData,
    setDetails: React.Dispatch<React.SetStateAction<TrainerDetailsData>>
    validateRef: React.MutableRefObject<(() => boolean) | null>
}

const POKEMON_TYPES_QUERY = gql(/*Graph QL*/ `
query PokemonTypes {
    pokemon_v2_type {
      name
    }
  }`);

export default function TrainerDetails({ details, setDetails, validateRef }: TrainerDetailsProps) {

    const [types, setTypes] = useState<Record<'name' | 'url', string>[]>([]);

    const [nameError, setNameError] = useState<string>('');
    const [teamNameError, setTeamNameError] = useState<string>('');
    const [favTypeError, setFavTypeError] = useState<string>('');

    const { data, loading, error } = useQuery(POKEMON_TYPES_QUERY);

    useEffect(() => {
        console.log(data);
    }, [data])

    /*useEffect(() => {
        const api = new PokemonClient();
        api.listTypes()
            .then(({ results }) => {
                setTypes(results);
            })
            .catch(e => console.error(e))
    }, [])*/

    const validateName = () => {
        if (!details.name) {
            setNameError("Name can't be empty");
            return false
        }
        return true
    }

    const validateTeamName = () => {
        if (!details.teamName) {
            setTeamNameError("Team name can't be empty");
            return false
        }
        return true
    }

    const validateFavType = () => {
        if(!details.favType) {
            setFavTypeError("Select a favourite type!")
            return false
        }
        return true
    }

    const validate = () => {
        const nameValidation = validateName();
        const teamNameValidation = validateTeamName();
        const favTypeValidation = validateFavType();
        return nameValidation && teamNameValidation && favTypeValidation;
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails(prev => ({ ...prev, name: e.target.value }))
        setNameError("")
    };
    const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails(prev => ({ ...prev, teamName: e.target.value }))
        setTeamNameError("")
    }
    const handleFavTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDetails(prev => ({ ...prev, favType: e.target.value }))
        setFavTypeError("")
    }

    validateRef.current = validate;

    return (
        <form className="trainerForm">
            <div>
                <label htmlFor="trainerName">Trainer name:</label>
                <input type="text" name="trainerName" value={details.name} onChange={handleNameChange}></input>
                {nameError && <p className="error">{nameError}</p>}
            </div>

            <div>
                <label htmlFor="teamName">Team name:</label>
                <input type="text" name="teamName" value={details.teamName} onChange={handleTeamNameChange}></input>
                {teamNameError && <p className="error">{teamNameError}</p>}
            </div>

            <div>
                <label htmlFor="favType">Favourite Pokemon Type:</label>
                <select name="favType" value={details.favType} onChange={handleFavTypeChange} required>
                    <option key={'empty'} value={''}></option>
                    {!loading && data?.pokemon_v2_type.map(type =>
                        <option key={type.name} value={type.name}>{`${type.name.charAt(0).toUpperCase()}${type.name.slice(1)}`}</option>)
                    }
                </select>
                {favTypeError && <p className="error">{favTypeError}</p>}
                {error && <p className="error">There was a problem retrieving Pokemon Types</p>}
            </div>
        </form>
    )
}
