import { BranchFormData } from "@/lib/schemas/branch-schema";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";

interface BranchFormFooterProps {
  currentStep: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit?: (data?: BranchFormData) => void;
  isLastStep: boolean;
  isPending?: boolean;
}

export default function BranchFormFooter({
  currentStep,
  onPrev,
  onNext,
  onSubmit,
  isLastStep,
  isPending = false
}: BranchFormFooterProps) {
  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Branch Info";
      case 2: return "Branch Location";
      case 3: return "Social Media Links";
      case 4: return "Branch Manager";
      case 5: return "Collection Account";
      default: return "Branch Registration";
    }
  };

  return (
    <div className="flex-shrink-0 border-t px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Progress Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{getStepTitle()}</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-3 h-2 rounded-sm ${step <= currentStep ? 'bg-theme-dark-green' : 'bg-gray-200'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
          )}

          <Button
            disabled={isPending}
            type={isLastStep ? 'submit' : 'button'}
            onClick={isLastStep ? undefined : onNext}
            isLoading={isPending}
            loadingText="Saving..."
            className="bg-theme-dark-green hover:bg-theme-green flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastStep ? 'Save Branch' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}
