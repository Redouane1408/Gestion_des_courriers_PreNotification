import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Check } from 'lucide-react';

interface Step {
  id: string;
  label: string;
}

interface StepNavigationProps {
  steps: Step[];
  currentStep: number;
  completedSteps: boolean[];
  onStepClick: (stepIndex: number) => void;
  progressPercentage: number;
}

export function StepNavigation({ 
  steps, 
  currentStep, 
  completedSteps, 
  onStepClick, 
  progressPercentage 
}: StepNavigationProps) {
  const getStepStatus = (stepIndex: number) => {
    if (completedSteps[stepIndex]) return 'completed';
    if (stepIndex === currentStep) return 'current';
    if (stepIndex < currentStep) return 'accessible';
    return 'disabled';
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700">Progression</h3>
        <span className="text-sm text-gray-500">
          Étape {currentStep + 1} sur {steps.length}
        </span>
      </div>
      
      <Progress value={progressPercentage} className="h-2" />
      
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isClickable = index <= currentStep || completedSteps[index];
          
          return (
            <div
              key={step.id}
              className={`flex flex-col items-center space-y-2 ${
                isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
              onClick={() => isClickable && onStepClick(index)}
            >
              <Badge 
                variant={status === 'completed' ? "default" : 
                        status === 'current' ? "secondary" : "outline"}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                  status === 'current' ? 'ring-2 ring-cyan-500 ring-offset-2' : ''
                }`}
              >
                {status === 'completed' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </Badge>
              <span className={`text-xs text-center max-w-20 ${
                status === 'current' ? 'font-medium text-cyan-600' :
                status === 'completed' ? 'text-cyan-600' :
                'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}