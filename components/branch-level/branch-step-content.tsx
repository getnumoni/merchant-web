import { BranchFormData } from "@/lib/schemas/branch-schema";
import { Control, UseFormSetValue } from "react-hook-form";
import Step1BranchInfo from "./steps/step-1-branch-info";
import Step2BranchLocation from "./steps/step-2-branch-location";
import Step3SocialMedia from "./steps/step-3-social-media";
import Step4BranchManager from "./steps/step-4-branch-manager";
import Step5CollectionAccount from "./steps/step-5-collection-account";

interface BranchStepContentProps {
  currentStep: number;
  control: Control<BranchFormData>;
  setValue: UseFormSetValue<BranchFormData>;
  onLogoChange: (base64: string | null) => void;
  onBusinessPhotosChange: (base64Array: string[]) => void;
  onManagerPhotoChange: (base64: string | null) => void;
  onAccountVerificationChange?: (isValid: boolean) => void;
}

export default function BranchStepContent({
  currentStep,
  control,
  setValue,
  onLogoChange,
  onBusinessPhotosChange,
  onManagerPhotoChange,
  onAccountVerificationChange,
}: BranchStepContentProps) {
  switch (currentStep) {
    case 1:
      return (
        <Step1BranchInfo
          control={control}
          setValue={setValue}
          onLogoChange={onLogoChange}
          onBusinessPhotosChange={onBusinessPhotosChange}
        />
      );

    case 2:
      return <Step2BranchLocation />;

    case 3:
      return <Step3SocialMedia control={control} />;

    case 4:
      return (
        <Step4BranchManager
          control={control}
          onManagerPhotoChange={onManagerPhotoChange}
        />
      );

    case 5:
      return <Step5CollectionAccount control={control} setValue={setValue} onAccountVerificationChange={onAccountVerificationChange} />;

    default:
      return null;
  }
}
