import { formatPhoneNumber } from "@/lib/phone-utils";
import { BranchFormData } from "@/lib/schemas/branch-schema";
import { CreateBranchPayload } from "@/lib/types/branch-api";
import { useBranchStore } from "@/stores/branch-store";
import { useCreateBranch } from "./mutation/useCreateBranch";

// Helper function to convert base64 to File
export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const useBranchFormSubmission = () => {
  const { formData, managerId } = useBranchStore();

  // console.log('user', user);
  const { handleCreateBranch, isPending, isSuccess, isError, error } = useCreateBranch();

  const createFormDataPayload = (data: BranchFormData): CreateBranchPayload => {
    // Use the actual form data, only fall back to store for images
    const completeData = {
      ...data,
      logo: data.logo || formData.logo,
      businessPhoto: data.businessPhoto || formData.businessPhoto,
      managerPhoto: data.managerPhoto || formData.managerPhoto,
    };

    // Create API payload
    const apiPayload: CreateBranchPayload = {
      name: completeData.branchName,
      state: completeData.branchState,
      region: completeData.branchRegion,
      lga: completeData.lga,
      openingTime: completeData.openingTime || '08:00',
      closingTime: completeData.closingTime || '17:00',
      description: completeData.description,
      phoneNumber: formatPhoneNumber(completeData.phone, 'compact-int'),
      emailAddress: completeData.email,
      address: completeData.address,
      managerId: managerId || '',
      bankCode: completeData.bank,
      bankAccountNumber: completeData.accountNumber,
      bankAccountName: completeData.bankAccountName || completeData.managerName, // Use verified account name, fallback to manager name
      minimumPaymentAmount: completeData.minPayment,
    };

    // Add optional fields
    if (completeData.latitude) {
      apiPayload.latitude = completeData.latitude.toString();
    }
    if (completeData.longitude) {
      apiPayload.longitude = completeData.longitude.toString();
    }
    if (completeData.website) {
      apiPayload.website = completeData.website;
    }
    if (completeData.whatsapp) {
      apiPayload.whatsApp = formatPhoneNumber(completeData.whatsapp, 'compact-int');
    }

    // Add files
    if (completeData.logo) {
      apiPayload.logo = base64ToFile(completeData.logo, 'logo.jpg');
    }

    if (completeData.businessPhotos && completeData.businessPhotos.length > 0) {
      apiPayload.images = completeData.businessPhotos.map((photo, index) =>
        base64ToFile(photo, `business-photo-${index}.jpg`)
      );
    }

    if (completeData.managerPhoto) {
      apiPayload.managerProfilePhoto = base64ToFile(completeData.managerPhoto, 'manager-photo.jpg');
    }

    return apiPayload;
  };

  const submitBranch = async (data: BranchFormData) => {
    console.log('🎉 FORM SUBMISSION SUCCESSFUL! 🎉');
    console.log('Form submission triggered with data:', data);

    const apiPayload = createFormDataPayload(data);

    // Use the mutation hook to submit the data
    handleCreateBranch(apiPayload);
  };

  return {
    submitBranch,
    createFormDataPayload,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
