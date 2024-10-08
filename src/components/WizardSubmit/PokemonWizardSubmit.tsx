import { useEffect, useState } from "react"
import './PokemonWizardSubmit.css'

type SubmitProps = {
    onSubmit: ()=>void
}
export default function PokemonWizardSubmit({onSubmit}:SubmitProps) {
    const [submitting, setSubmitting] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setSubmitting(false)
            onSubmit()
        }, 3000)
    }, [])
    return <div className="wizard-submit-container">
        <div className="wizard-submit-window">
            <span className="text">{submitting?"Submitting...":"Done!"}</span>
        </div>
    </div>
}