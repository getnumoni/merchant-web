// API payload type for creating a branch
export interface CreateBranchPayload {
  name: string;
  state: string;
  region: string;
  lga: string;
  openingTime: string;
  closingTime: string;
  description: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
  managerId: string;
  latitude?: string;
  longitude?: string;
  website?: string;
  whatsApp?: string;
  bankCode: string;
  bankAccountNumber: string;
  bankAccountName: string;
  minimumPaymentAmount: string;
  logo?: File;
  images?: File[];
  managerProfilePhoto?: File;
}

// API response type for branch creation
export interface CreateBranchResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    state: string;
    region: string;
    lga: string;
    // Add other response fields as needed
  };
}

// Error response type
export interface BranchApiError {
  response?: {
    data?: {
      message: string;
      errors?: Record<string, string[]>;
    };
  };
  message?: string;
}
