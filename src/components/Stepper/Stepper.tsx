import React from "react";
import './Stepper.css';

export type Step = {
    title: string
    content: React.ReactNode
}

type StepperProps = {
    steps: Step[];
    active: number;
}

function Stepper({ steps, active }: StepperProps) {

    return (
        <div className="stepper-container">
            <div className="stepper-header">
                {steps.map((step, index) => {
                    let selectedClass = ''
                    if(index < active) selectedClass = 'completed'
                    else if (index === active) selectedClass = 'current'
                    return (
                        <div className={`step ${selectedClass}`} key={step.title}>
                            <div className={`step-circle ${selectedClass}`}>{index + 1}</div>
                            <div
                                key={step.title}
                                className={`step-label ${selectedClass}`}
                            >
                                {step.title}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="stepper-content">
                {steps[active].content}
            </div>
        </div>
    );
};

export default Stepper;