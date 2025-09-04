"use client"

import { storeIcon } from "@/constant/icons";
import { BranchFormData, branchFormSchema } from "@/lib/schemas/branch-schema";
import { useBranchStore } from "@/stores/branch-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Form } from "../ui/form";
import Step1BranchInfo from "./steps/step-1-branch-info";
import Step2BranchLocation from "./steps/step-2-branch-location";
import Step3SocialMedia from "./steps/step-3-social-media";
import Step4BranchManager from "./steps/step-4-branch-manager";
import Step5CollectionAccount from "./steps/step-5-collection-account";

export default function AddBranch() {
  const {
    currentStep,
    formData,
    isOpen,
    nextStep,
    prevStep,
    setLogo,
    setBusinessPhotos,
    setManagerPhoto,
    closeDialog,

  } = useBranchStore();

  const form = useForm<BranchFormData>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: {
      logo: formData.logo || undefined,
      branchName: formData.branchName || '',
      branchRegion: formData.branchRegion || '',
      lga: formData.lga || '',
      openingTime: formData.openingTime || '',
      closingTime: formData.closingTime || '',
      description: formData.description || '',
      phone: formData.phone || '',
      email: formData.email || '',
      businessPhoto: formData.businessPhoto || undefined,
      businessPhotos: formData.businessPhotos || undefined,
      address: formData.address || '',
      city: formData.city || '',
      state: formData.state || '',
      zipCode: formData.zipCode || '',
      managerPhoto: formData.managerPhoto || undefined,
      managerName: formData.managerName || '',
      managerPhone: formData.managerPhone || '',
      managerEmail: formData.managerEmail || '',
      website: formData.website || '',
      whatsapp: formData.whatsapp || '',
      linkedin: formData.linkedin || '',
      instagram: formData.instagram || '',
      twitter: formData.twitter || '',
      snapchat: formData.snapchat || '',
      bank: formData.bank || '',
      accountNumber: formData.accountNumber || '',
      minPayment: formData.minPayment || '',
    },
  });

  const handleLogoChange = (base64: string | null) => {
    setLogo(base64);
    form.setValue('logo', base64 || undefined);
  };

  const handleBusinessPhotosChange = (base64Array: string[]) => {
    setBusinessPhotos(base64Array);
    form.setValue('businessPhotos', base64Array);
    // Also set the first photo as businessPhoto for backward compatibility
    form.setValue('businessPhoto', base64Array.length > 0 ? base64Array[0] : undefined);
  };

  const handleManagerPhotoChange = (base64: string | null) => {
    setManagerPhoto(base64);
    form.setValue('managerPhoto', base64 || undefined);
  };

  const handleNext = async () => {
    // Get current step fields to validate
    const getStepFields = () => {
      switch (currentStep) {
        case 1:
          return ['branchName', 'branchRegion', 'lga', 'description', 'phone', 'email'];
        case 2:
          return []; // No validation needed for map step
        case 3:
          // Only validate URL fields that have content
          const urlFields: (keyof BranchFormData)[] = ['website', 'linkedin', 'instagram', 'twitter', 'snapchat'];
          return urlFields.filter(field => {
            const value = form.getValues(field);
            return value && typeof value === 'string' && value.trim() !== '';
          });
        case 4:
          return ['managerName', 'managerPhone', 'managerEmail'];
        case 5:
          return ['bank', 'accountNumber', 'minPayment'];
        default:
          return [];
      }
    };

    // Validate only current step fields
    const fieldsToValidate = getStepFields();
    const isValid = await form.trigger(fieldsToValidate as (keyof BranchFormData)[]);

    if (isValid) {
      nextStep();
    }
  };

  const handlePrev = () => {
    prevStep();
  };

  const onError = (errors: FieldErrors<BranchFormData>) => {
    // console.log('❌ FORM VALIDATION ERRORS:', errors);
    // console.log('Form values:', form.getValues());

    // Show toast for validation errors
    const errorMessages = Object.values(errors).map((error) => error?.message).filter(Boolean);
    const errorMessage = errorMessages.length > 0 ? errorMessages[0] : 'Please fix the form errors';

    // Simple alert for now - you can replace with a proper toast library
    toast.error(`Validation Error: ${errorMessage}`);
  };

  const onSubmit = async (data: BranchFormData) => {
    // console.log('🎉 FORM SUBMISSION SUCCESSFUL! 🎉');
    // console.log('Form submission triggered with data:', data);
    // console.log('Store formData:', formData);

    // Merge form data with store data to ensure images are included
    const completeData = {
      ...data,
      logo: formData.logo || data.logo,
      businessPhoto: formData.businessPhoto || data.businessPhoto,
      managerPhoto: formData.managerPhoto || data.managerPhoto,
    };

    console.log('Complete data being submitted:', completeData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BranchInfo
            control={form.control}
            onLogoChange={handleLogoChange}
            onBusinessPhotosChange={handleBusinessPhotosChange}
          />
        );

      case 2:
        return (
          <Step2BranchLocation />
        );

      case 3:
        return (
          <Step3SocialMedia
            control={form.control}
          />
        );

      case 4:
        return (
          <Step4BranchManager
            control={form.control}
            onManagerPhotoChange={handleManagerPhotoChange}
          />
        );

      case 5:
        return (
          <Step5CollectionAccount
            control={form.control}
          />
        );

      default:
        return null;
    }
  };

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

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Add a new branch or location under your organization's structure.";
      case 2: return "Add a new branch or location under your organization's structure.";
      case 3: return "Add a new branch or location under your organization's structure.";
      case 4: return "Add a new branch or location under your organization's structure.";
      case 5: return "Add a new branch or location under your organization's structure.";
      default: return "Add a new branch or location under your organization's structure.";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0">
        {/* Fixed Header */}
        <DialogHeader className="flex-shrink-0 px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Image src={storeIcon} alt="store" width={50} height={50} />
            Branch Registration
          </DialogTitle>
          <DialogDescription>
            {getStepDescription()}
          </DialogDescription>
          <hr className="border-gray-100" />
        </DialogHeader>

        {/* Form with Scrollable Content */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="flex flex-col flex-1 min-h-0">
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
              {renderStepContent()}
            </div>

            {/* Fixed Footer */}
            <div className="flex-shrink-0 border-t px-6 py-4">

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center ">
                {/* Progress Indicator */}
                <div className="flex items-center gap-2 ">
                  <span className="text-sm font-medium">{getStepTitle()}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div
                        key={step}
                        className={`w-3 h-2 rounded-sm ${step <= currentStep ? 'bg-theme-dark-green' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrev}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </Button>
                  )}

                  <Button
                    type={currentStep === 5 ? 'submit' : 'button'}
                    onClick={currentStep === 5 ? () => {
                      console.log('🔥 SAVE BRANCH BUTTON CLICKED!');
                      console.log('Form errors:', form.formState.errors);
                      console.log('Form values:', form.getValues());
                      console.log('Form is valid:', form.formState.isValid);
                      console.log('Form is dirty:', form.formState.isDirty);
                    } : handleNext}
                    className="bg-theme-dark-green hover:bg-theme-green flex items-center gap-2 cursor-pointer"
                  >
                    {currentStep === 5 ? 'Save Branch' : 'Next'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}