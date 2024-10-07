
import './App.css'
import Stepper, { Step } from './components/Stepper/Stepper';
import { useState, useRef } from 'react';
import TrainerDetails, { TrainerDetailsData } from './components/TrainerDetails/TrainerDetails';
import TeamSelection from './components/TeamSelection/TeamSelection';
import { PokemonItem } from './components/TeamSelection/PokemonList/PokemonListItem';
import OpponentTeam from './components/OpponentTeam/OpponentTeam';
import { Pokemon } from 'pokenode-ts';
import PokemonWizardSubmit from './components/WizardSubmit/PokemonWizardSubmit';


function App() {
    const [currentStep, setCurrentStep] = useState<number>(0)

    // trainer details state
    const [trainerData, setTrainerData] = useState<TrainerDetailsData>({ name: '', teamName: '', favType: '' })

    // pokemon team
    const [team, setTeam] = useState<PokemonItem[]>([])

    // opponent teeam
    const [opponentTeam, setOpponentTeam] = useState<Pokemon[]>([])

    // validation reference for each wizard step
    const validateRef = useRef<(() => boolean) | null>(null);

    // mock submit
    const [submitted, setSubmitted] = useState(false)

    const handleNameChange = (s: string) => {
        setTrainerData(prev => ({ ...prev, name: s }))
    };
    const handleTeamNameChange = (s: string) => {
        setTrainerData(prev => ({ ...prev, teamName: s }))
    }
    const handleFavTypeChange = (s: string) => {
        setTrainerData(prev => ({ ...prev, favType: s }))
    }

    const handleAddPokemonToTeam = (pokemon: PokemonItem) => {
        setTeam(prev => [...prev, pokemon])
    }
    const handleRemovePokemonFromTeam = (i: number) => {
        setTeam(prev => prev.filter((item, index) => index !== i))
    }

    const handleOpponentTeamChange = (team: Pokemon[]) => {
        setOpponentTeam(team)
    }

    const wizardSteps: Step[] = [
        {
            title: 'Trainer Details',
            content: <TrainerDetails
                details={trainerData} validateRef={validateRef}
                onNameChange={handleNameChange}
                onTeamNameChange={handleTeamNameChange}
                onFavTypeChange={handleFavTypeChange} />
        },
        {
            title: 'Team Selection',
            content: <TeamSelection favouriteType={trainerData.favType} team={team} validateRef={validateRef} onAdd={handleAddPokemonToTeam} onRemove={handleRemovePokemonFromTeam} />
        },

        {
            title: 'Opponent Team',
            content: <OpponentTeam trainerTeam={team} team={opponentTeam} onTeamChange={handleOpponentTeamChange} validateRef={validateRef} />
        },


    ]

    const handlePrevious = () => {

        setCurrentStep(prev => prev - 1);
    }

    const handleNext = () => {
        if (validateRef.current && validateRef.current())
            setCurrentStep(prev => prev + 1);

    }

    const handleFinish = () => {
        if (validateRef.current && validateRef.current())
            setSubmitted(true)
    }

    const handleRestart = () => {
        setTrainerData({ name: '', teamName: '', favType: '' })
        setTeam([])
        setOpponentTeam([])
        setCurrentStep(0)
        setSubmitted(false)
    }

    return (
        <div>
            <div>
                <h1 style={{ textAlign: "center" }}>
                    Pokemon Wizard
                </h1>
            </div>
            {
                submitted ? <>
                    <PokemonWizardSubmit />
                    <div className="wizard-buttons">
                        <button onClick={handleRestart}>Restart</button>
                    </div>
                </> :
                    <>
                        <Stepper steps={wizardSteps} active={currentStep} />
                        <div className="wizard-buttons">
                            <button onClick={handlePrevious} disabled={currentStep === 0}>Previous</button>
                            {currentStep < wizardSteps.length - 1 ? <button onClick={handleNext}>Next</button> : <button onClick={handleFinish}>Finish</button>}
                        </div>
                    </>
            }

        </div>
    )
}

export default App
