import { MerchantFormData } from '@/lib/schemas/merchant-schema';

export interface FormData {
  [key: string]: string | undefined;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormComponentProps {
  formData: Partial<MerchantFormData>;
  setFormData: (data: Partial<MerchantFormData> | ((prev: Partial<MerchantFormData>) => Partial<MerchantFormData>)) => void;
  errors: FormErrors;
}

export interface DropdownState {
  [key: string]: boolean;
}

export interface ProfileUploadProps {
  onImageChange: (imageUrl: string | null) => void;
  imageUrl?: string | null;
}
