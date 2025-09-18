import { BranchFormData } from "@/lib/schemas/branch-schema";
import { UseFormTrigger } from "react-hook-form";

export const useBranchFormValidation = (trigger: UseFormTrigger<BranchFormData>) => {
  const getStepFields = (currentStep: number): (keyof BranchFormData)[] => {
    switch (currentStep) {
      case 1:
        return ['branchName', 'branchRegion', 'branchState', 'lga', 'description', 'phone', 'email'];
      case 2:
        return []; // No validation needed for map step
      case 3:
        // Only validate URL fields that have content
        const urlFields: (keyof BranchFormData)[] = ['website', 'linkedin', 'instagram', 'twitter', 'snapchat'];
        return urlFields;
      case 4:
        return ['managerName', 'managerPhone', 'managerEmail'];
      case 5:
        return ['bank', 'accountNumber', 'minPayment'];
      default:
        return [];
    }
  };

  const validateStep = async (currentStep: number, formValues: BranchFormData): Promise<boolean> => {
    const fieldsToValidate = getStepFields(currentStep);

    // For step 3, filter URL fields that have content
    if (currentStep === 3) {
      const urlFields: (keyof BranchFormData)[] = ['website', 'linkedin', 'instagram', 'twitter', 'snapchat'];
      const fieldsWithContent = urlFields.filter(field => {
        const value = formValues[field];
        return value && typeof value === 'string' && value.trim() !== '';
      });
      return await trigger(fieldsWithContent as (keyof BranchFormData)[]);
    }

    return await trigger(fieldsToValidate);
  };

  return {
    getStepFields,
    validateStep,
  };
};
