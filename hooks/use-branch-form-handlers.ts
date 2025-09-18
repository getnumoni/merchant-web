import { BranchFormData } from "@/lib/schemas/branch-schema";
import { useBranchStore } from "@/stores/branch-store";
import { FieldErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { toast } from "sonner";
import { useBranchFormSubmission } from "./use-branch-form-submission";
import { useBranchFormValidation } from "./use-branch-form-validation";

export const useBranchFormHandlers = (
  setValue: UseFormSetValue<BranchFormData>,
  trigger: UseFormTrigger<BranchFormData>,
  formValues: BranchFormData
) => {
  const { nextStep, prevStep, setLogo, setBusinessPhotos, setManagerPhoto } = useBranchStore();
  const { submitBranch, isPending, isSuccess } = useBranchFormSubmission();
  const { validateStep } = useBranchFormValidation(trigger);

  const handleLogoChange = (base64: string | null) => {
    setLogo(base64);
    setValue('logo', base64 || undefined);
  };

  const handleBusinessPhotosChange = (base64Array: string[]) => {
    setBusinessPhotos(base64Array);
    setValue('businessPhotos', base64Array);
    // Also set the first photo as businessPhoto for backward compatibility
    setValue('businessPhoto', base64Array.length > 0 ? base64Array[0] : undefined);
  };

  const handleManagerPhotoChange = (base64: string | null) => {
    setManagerPhoto(base64);
    setValue('managerPhoto', base64 || undefined);
  };

  const handleNext = async (currentStep: number) => {
    const isValid = await validateStep(currentStep, formValues);
    if (isValid) {
      nextStep();
    }
  };

  const handlePrev = () => {
    prevStep();
  };

  const onError = (errors: FieldErrors<BranchFormData>) => {
    // Show toast for validation errors
    const errorMessages = Object.values(errors).map((error) => error?.message).filter(Boolean);
    const errorMessage = errorMessages.length > 0 ? errorMessages[0] : 'Please fix the form errors';
    toast.error(`Validation Error: ${errorMessage}`);
  };

  const handleSubmit = async (data: BranchFormData) => {
    console.log('Form data being submitted:', data);
    await submitBranch(data);
  };

  return {
    handleLogoChange,
    handleBusinessPhotosChange,
    handleManagerPhotoChange,
    handleNext,
    handlePrev,
    onError,
    handleSubmit,
    isPending,
    isSuccess,
  };
};
