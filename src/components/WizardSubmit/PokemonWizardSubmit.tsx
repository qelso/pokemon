import { useEffect, useState } from "react"
import './PokemonWizardSubmit.css'

export default function PokemonWizardSubmit() {
    const [submitting, setSubmitting] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setSubmitting(false)
        }, 3000)
    }, [])
    return <div className="wizard-submit-container">
        <div className="wizard-submit-window">
            <span className="text">{submitting?"Submitting...":"Done!"}</span>
        </div>
    </div>
}