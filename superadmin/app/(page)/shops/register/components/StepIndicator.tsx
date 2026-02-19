'use client';

import { RegistrationStep } from './types';

interface StepIndicatorProps {
  currentStep: RegistrationStep;
  onStepClick: (step: RegistrationStep) => void;
  completedSteps: Set<RegistrationStep>;
}

const steps: { id: RegistrationStep; label: string; icon: string }[] = [
  { id: 'manager', label: 'Shop Manager', icon: '👤' },
  { id: 'shop', label: 'Shop Details', icon: '🏪' },
  { id: 'review', label: 'Review', icon: '✅' },
];

export default function StepIndicator({ currentStep, onStepClick, completedSteps }: StepIndicatorProps) {
  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="flex items-center justify-center">
      {steps.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isCompleted = completedSteps.has(step.id);
        const isPast = idx < currentIndex;

        return (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => {
                if (isCompleted || isPast) onStepClick(step.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  : isCompleted || isPast
                  ? 'bg-green-50 text-green-700 hover:bg-green-100 cursor-pointer'
                  : 'bg-gray-100 text-gray-400 cursor-default'
              }`}
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold border-2 border-current">
                {isCompleted || isPast ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  idx + 1
                )}
              </span>
              <span className="font-medium text-sm hidden sm:inline">{step.label}</span>
            </button>

            {idx < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-2 transition-colors ${
                idx < currentIndex ? 'bg-green-400' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
