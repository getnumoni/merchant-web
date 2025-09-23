'use client';

import { merchantSchema, type MerchantFormData } from '@/lib/schemas/merchant-schema';
import { FormErrors } from '@/lib/types/admin';
import { useState } from 'react';
import BusinessInformation from "./business-information";
import ContactInformation from "./contact-information";
import PayoutInformation from "./payout-information";
import ProfileUploadSection from "./profile-upload-section";

export default function AddMerchants() {
  const [formData, setFormData] = useState<Partial<MerchantFormData>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (imageUrl: string | null) => {
    setFormData(prev => ({ ...prev, profileImage: imageUrl || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = merchantSchema.parse(formData);

      // Log the payload to console
      console.log('Merchant Form Payload:', validatedData);

      // Here you would typically send the data to your API
      // await createMerchant(validatedData);

      // Reset form after successful submission
      setFormData({});
      alert('Merchant created successfully!');

    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'errors' in error) {
        const fieldErrors: FormErrors = {};
        const zodError = error as { errors: Array<{ path: string[]; message: string }> };
        zodError.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error('Validation error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100">
      {/* Profile Picture Section */}
      <ProfileUploadSection
        onImageChange={handleImageChange}
        imageUrl={formData.profileImage}
      />

      {/* Business Information Section */}
      <BusinessInformation
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      {/* Contact Information Section */}
      <ContactInformation
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      {/* Payout Information Section */}
      <PayoutInformation
        formData={formData}
        setFormData={setFormData}
        errors={errors}
      />

      {/* Submit Button */}
      <div className="p-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-theme-dark-green hover:bg-theme-dark-green/90 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating Merchant...' : 'Create Merchant'}
        </button>
      </div>
    </form>
  );
}