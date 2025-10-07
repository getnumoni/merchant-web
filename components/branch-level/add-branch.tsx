"use client"

import { useGeneratePayOnUsToken } from "@/hooks/mutation/useGeneratePayOnUsToken";
import { useBranchFormHandlers } from "@/hooks/use-branch-form-handlers";
import { BranchFormData, branchFormSchema } from "@/lib/schemas/branch-schema";
import { getStepDescription } from "@/lib/step-utils";
import { useBranchStore } from "@/stores/branch-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent } from "../ui/dialog";
import { Form } from "../ui/form";
import BranchFormFooter from "./branch-form-footer";
import BranchFormHeader from "./branch-form-header";
import BranchStepContent from "./branch-step-content";

export default function AddBranch() {
  const { currentStep, formData, isOpen, closeDialog } = useBranchStore();
  // const { handleGenerateBankToken } = useGenerateBankToken();
  const { handleGeneratePayOnUsToken } = useGeneratePayOnUsToken();
  // const hasGeneratedToken = useRef(false);
  const hasGeneratedPayOnUsToken = useRef(false);
  const [isAccountVerified, setIsAccountVerified] = useState<boolean>(false);

  const form = useForm<BranchFormData>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: {
      logo: formData.logo || undefined,
      branchName: formData.branchName || '',
      branchRegion: formData.branchRegion || '',
      branchState: formData.branchState || '',
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
      latitude: formData.latitude || undefined,
      longitude: formData.longitude || undefined,
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
      bankAccountName: formData.bankAccountName || '',
      minPayment: formData.minPayment || '',
    },
  });

  const {
    handleLogoChange,
    handleBusinessPhotosChange,
    handleManagerPhotoChange,
    handleNext,
    handlePrev,
    onError,
    handleSubmit,
    isPending,
    isSuccess,
  } = useBranchFormHandlers(form.setValue, form.trigger, form.getValues(), isAccountVerified);

  // Generate bank token when modal opens (only once per modal session)
  useEffect(() => {
    if (isOpen && !hasGeneratedPayOnUsToken.current) {
      // No need to pass credentials - they're handled server-side
      // handleGenerateBankToken();
      handleGeneratePayOnUsToken();
      // hasGeneratedToken.current = true;
      hasGeneratedPayOnUsToken.current = true;
    }
  }, [isOpen, handleGeneratePayOnUsToken]);

  // Reset token generation flag when modal closes
  useEffect(() => {
    if (!isOpen) {
      // hasGeneratedToken.current = false;
      hasGeneratedPayOnUsToken.current = false;
    }
  }, [isOpen]);

  // Close modal when branch creation is successful
  useEffect(() => {
    if (isSuccess) {
      closeDialog();
    }
  }, [isSuccess, closeDialog]);


  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0">
        <BranchFormHeader
          title="Branch Registration"
          description={getStepDescription(currentStep)}
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit, onError)} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto px-6 py-4 min-h-0">
              <BranchStepContent
                currentStep={currentStep}
                control={form.control}
                setValue={form.setValue}
                onLogoChange={handleLogoChange}
                onBusinessPhotosChange={handleBusinessPhotosChange}
                onManagerPhotoChange={handleManagerPhotoChange}
                onAccountVerificationChange={setIsAccountVerified}
              />
            </div>

            <BranchFormFooter
              currentStep={currentStep}
              onPrev={handlePrev}
              onNext={() => handleNext(currentStep)}
              onSubmit={() => form.handleSubmit(handleSubmit, onError)()}
              isLastStep={currentStep === 5}
              isPending={isPending}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}