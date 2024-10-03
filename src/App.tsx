
import './App.css'
import Stepper, { Step } from './components/Stepper/Stepper';
import { useState, useRef } from 'react';
import TrainerDetails, { TrainerDetailsData } from './components/TrainerDetails/TrainerDetails';
import TeamSelection from './components/TeamSelection/TeamSelection';



function App() {
    const [currentStep, setCurrentStep] = useState<number>(0)

    // trainer details state
    const [trainerData, setTrainerData] = useState<TrainerDetailsData>({ name: '', teamName: '', favType: '' })

    // pokemon team
    const [team, setTeam] = useState([])

    const validateRef = useRef<(() => boolean) | null>(null);

    const wizardSteps: Step[] = [
        {
            title: 'Trainer Details',
            content: <TrainerDetails details={trainerData} setDetails={setTrainerData} validateRef={validateRef} />
        },
        {
            title: 'Team Selection',
            content: <TeamSelection favouriteType={trainerData.favType}/>
        },

        {
            title: 'Opponent Team',
            content: <div>Ciao 3</div>
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

    }

    return (
        <div>
            <div>
                <h1 style={{ textAlign: "center" }}>
                    Pokemon Wizard
                </h1>
            </div>
            <Stepper steps={wizardSteps} active={currentStep} />
            <div className="wizard-buttons">
                <button onClick={handlePrevious} disabled={currentStep === 0}>Previous</button>
                {currentStep < wizardSteps.length - 1 ? <button onClick={handleNext}>Next</button> : <button onClick={handleFinish}>Finish</button>}
            </div>
        </div>
    )
}

export default App
