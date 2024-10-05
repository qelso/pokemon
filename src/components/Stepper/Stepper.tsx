import React, { useState } from "react";
import './Stepper.css';

export type Step = {
    title: string
    content: React.ReactNode
}

type StepperProps = {
    steps: Step[];
    active: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, active }) => {

    return (
        <div className="stepper-container">
            <div className="stepper-header">
                {steps.map((step, index) => {
                    const selectedClass = index <= active ? 'selected' : ''
                    return (
                        <div className='step'>
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