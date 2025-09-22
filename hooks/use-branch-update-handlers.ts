import { formatPhoneWithPlus234 } from "@/lib/phone-utils";
import { BranchFormData } from "@/lib/schemas/branch-schema";
import { useBranchStore } from "@/stores/branch-store";
import { useEffect } from "react";
import { FieldErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { toast } from "sonner";
import { useCreateBranchManager } from "./mutation/useCreateBranchManager";
import { useBranchFormValidation } from "./use-branch-form-validation";
import { useBranchUpdateSubmission } from "./use-branch-update-submission";

export const useBranchUpdateHandlers = (
  setValue: UseFormSetValue<BranchFormData>,
  trigger: UseFormTrigger<BranchFormData>,
  formValues: BranchFormData,
  branchId: string,
  isAccountVerified?: boolean
) => {
  const { nextStep, prevStep, setLogo, setBusinessPhotos, setManagerPhoto } = useBranchStore();
  const { submitBranchUpdate, isPending, isSuccess } = useBranchUpdateSubmission(branchId);
  const { validateStep } = useBranchFormValidation(trigger);
  const { handleCreateManager, isPending: isCreatingManager, isSuccess: isManagerCreated } = useCreateBranchManager();

  // Handle manager creation success - proceed to next step
  useEffect(() => {
    if (isManagerCreated) {
      nextStep();
    }
  }, [isManagerCreated, nextStep]);

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
    // For step 4, create manager first before proceeding
    if (currentStep === 4) {
      const isValid = await validateStep(currentStep, formValues);
      if (isValid) {
        // Create manager with form data
        const formattedPhone = formatPhoneWithPlus234(formValues.managerPhone);
        const managerPayload = {
          name: formValues.managerName || '',
          email: formValues.managerEmail || '',
          phone: formattedPhone || ''
        };

        handleCreateManager(managerPayload);
        return; // Don't proceed to next step yet, wait for manager creation
      }
      return;
    }

    // For step 5, also check account verification
    if (currentStep === 5 && !isAccountVerified) {
      toast.error("Please verify your bank account before proceeding");
      return;
    }

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
    console.log('Branch update form data being submitted:', data);
    await submitBranchUpdate(data);
  };

  return {
    handleLogoChange,
    handleBusinessPhotosChange,
    handleManagerPhotoChange,
    handleNext,
    handlePrev,
    onError,
    handleSubmit,
    isPending: isPending || isCreatingManager,
    isSuccess,
  };
};
