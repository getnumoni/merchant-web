"use client"

import { BranchFormData } from "@/lib/schemas/branch-schema";
import { Upload, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Control } from "react-hook-form";
import { Button } from "../../ui/button";
import { FormInputTopLabel } from "../../ui/form-input";
import { FormPhoneInput } from "../../ui/form-phone-input";

interface Step4Props {
  control: Control<BranchFormData>;
  onManagerPhotoChange: (base64: string | null) => void;
}

export default function Step4BranchManager({ control, onManagerPhotoChange }: Step4Props) {
  const [managerPhotoPreview, setManagerPhotoPreview] = useState<string | null>(null);

  const handleManagerPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setManagerPhotoPreview(base64);
        onManagerPhotoChange(base64);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
          {managerPhotoPreview ? (
            <Image src={managerPhotoPreview} alt="Manager Photo" width={96} height={96} className="w-full h-full object-cover" />
          ) : (
            <User className="w-12 h-12 text-gray-400" />
          )}
        </div>
        <input
          type="file"
          id="manager-photo-upload"
          accept="image/*"
          onChange={handleManagerPhotoChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('manager-photo-upload')?.click()}
          className="mb-2"
        >
          <Upload className="w-4 h-4 mr-2" />
          Tap To Add Manager&apos;s Photo
        </Button>
        <p className="text-sm text-gray-500">Help Customers Easily Identify Branch Manager (Optional)</p>
      </div>

      <div className="space-y-4">
        <FormInputTopLabel
          control={control}
          name="managerName"
          label="Manager's Name"
          placeholder="E.G Joan Doe"
          required
        />

        <FormPhoneInput
          control={control}
          name="managerPhone"
          label="Phone Number"
          placeholder="08012345678"
          required
        />

        <FormInputTopLabel
          control={control}
          name="managerEmail"
          label="Email Address"
          type="email"
          placeholder="E.G Joanadoe@Gmail.Com"
          required
        />

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-xs text-green-800">
            After Saving Branch, Manager Will Get A Temporary Login Details Sent To Their Phone/Email.
            They Can Use This OTP To Log Into The NuMoni App And Manage Their Assigned Branch.
          </p>
        </div>
      </div>
    </div>
  );
}
