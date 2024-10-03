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
                {steps.map((step, index) => (
                    <div
                        key={step.title}
                        className={`step-item`}
                    >
                        {step.title}
                    </div>
                ))}
            </div>
            <div className="stepper-content">
                {steps[active].content}
            </div>
        </div>
    );
};

export default Stepper;