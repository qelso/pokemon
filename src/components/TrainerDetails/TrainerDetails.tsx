import React, { useState } from "react"
import './TrainerDetails.css'
import {  useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import { firstLetterUppercase } from "../../lib/utils/utils";

export type TrainerDetailsData = {
    name: string
    teamName: string
    favType: string
}

type TrainerDetailsProps = {
    details: TrainerDetailsData,
    onNameChange: (_:string)=>void,
    onTeamNameChange: (_:string)=>void,
    onFavTypeChange: (_:string)=>void,
    validateRef: React.MutableRefObject<(() => boolean) | null>
}

const POKEMON_TYPES_QUERY = gql(/*Graph QL*/ `
query PokemonTypes {
    pokemon_v2_type {
      name
    }
  }`);

export default function TrainerDetails({ details, onNameChange, onTeamNameChange, onFavTypeChange, validateRef }: TrainerDetailsProps) {

    const [nameError, setNameError] = useState<string>('');
    const [teamNameError, setTeamNameError] = useState<string>('');
    const [favTypeError, setFavTypeError] = useState<string>('');

    const { data, loading, error } = useQuery(POKEMON_TYPES_QUERY);

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



    validateRef.current = validate;

    return (
        <form className="trainerForm">
            <div>
                <label htmlFor="trainerName">Trainer name:</label>
                <input type="text" name="trainerName" value={details.name} onChange={(e)=>{
                    onNameChange(e.target.value)
                    setNameError("")
                }}></input>
                {nameError && <p className="error">{nameError}</p>}
            </div>

            <div>
                <label htmlFor="teamName">Team name:</label>
                <input type="text" name="teamName" value={details.teamName} onChange={(e)=>{
                    onTeamNameChange(e.target.value)
                    setTeamNameError("")
                }}></input>
                {teamNameError && <p className="error">{teamNameError}</p>}
            </div>

            <div>
                <label htmlFor="favType">Favourite Pokemon Type:</label>
                <select name="favType" value={details.favType} onChange={(e)=>{
                    onFavTypeChange(e.target.value)
                    setFavTypeError("")
                }} required>
                    <option key={'empty'} value={''}></option>
                    {!loading && data?.pokemon_v2_type.map(type =>
                        <option key={type.name} value={type.name}>{firstLetterUppercase(type.name)}</option>)
                    }
                </select>
                {favTypeError && <p className="error">{favTypeError}</p>}
                {error && <p className="error">There was a problem retrieving Pokemon Types</p>}
            </div>
        </form>
    )
}
