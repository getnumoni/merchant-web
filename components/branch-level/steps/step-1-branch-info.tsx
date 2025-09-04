"use client"

import nigeriaData from "@/data/nigeria-state-and-lgas.json";
import { BranchFormData } from "@/lib/schemas/branch-schema";
import { useEffect, useState } from "react";
import { Control, useWatch } from "react-hook-form";
import { FormImageUpload } from "../../ui/form-image-upload";
import { FormInputTopLabel } from "../../ui/form-input";
import { FormLogoUpload } from "../../ui/form-logo-upload";
import { FormPhoneInput } from "../../ui/form-phone-input";
import { FormSelectTopLabel } from "../../ui/form-select";
import { FormTextareaTopLabel } from "../../ui/form-textarea";

// Generate states from Nigeria data
const states = nigeriaData.map(state => ({
  value: state.alias,
  label: state.state
}));

const timeOptions = [
  { value: "6:00 AM", label: "6:00 AM" },
  { value: "7:00 AM", label: "7:00 AM" },
  { value: "8:00 AM", label: "8:00 AM" },
  { value: "9:00 AM", label: "9:00 AM" },
  { value: "10:00 AM", label: "10:00 AM" },
  { value: "11:00 AM", label: "11:00 AM" },
  { value: "12:00 PM", label: "12:00 PM" },
  { value: "1:00 PM", label: "1:00 PM" },
  { value: "2:00 PM", label: "2:00 PM" },
  { value: "3:00 PM", label: "3:00 PM" },
  { value: "4:00 PM", label: "4:00 PM" },
  { value: "5:00 PM", label: "5:00 PM" },
  { value: "6:00 PM", label: "6:00 PM" },
  { value: "7:00 PM", label: "7:00 PM" },
  { value: "8:00 PM", label: "8:00 PM" },
  { value: "9:00 PM", label: "9:00 PM" },
  { value: "10:00 PM", label: "10:00 PM" }
];

interface Step1Props {
  control: Control<BranchFormData>;
  onLogoChange: (base64: string | null) => void;
  onBusinessPhotosChange: (base64Array: string[]) => void;
}

export default function Step1BranchInfo({ control, onLogoChange, onBusinessPhotosChange }: Step1Props) {
  const [lgas, setLgas] = useState<{ value: string; label: string }[]>([]);

  // Watch the selected state
  const selectedState = useWatch({
    control,
    name: "branchRegion"
  });

  // Watch the selected opening time
  const selectedOpeningTime = useWatch({
    control,
    name: "openingTime"
  });

  // Update LGAs when state changes
  useEffect(() => {
    if (selectedState) {
      const stateData = nigeriaData.find(state => state.alias === selectedState);
      if (stateData) {
        const stateLgas = stateData.lgas.map(lga => ({
          value: lga.toLowerCase().replace(/\s+/g, '-'),
          label: lga
        }));
        setLgas(stateLgas);
      }
    } else {
      setLgas([]);
    }
  }, [selectedState]);

  // Filter closing time options based on opening time
  const getClosingTimeOptions = () => {
    if (!selectedOpeningTime) {
      return timeOptions;
    }

    // Find the index of the selected opening time
    const openingTimeIndex = timeOptions.findIndex(option => option.value === selectedOpeningTime);

    // Return only times after the opening time
    return timeOptions.slice(openingTimeIndex + 1);
  };





  return (
    <div className="space-y-2">
      {/* Logo Upload Section */}
      <FormLogoUpload
        onImageChange={onLogoChange}
      />

      {/* Form Fields */}
      <div className="space-y-4">
        <FormInputTopLabel
          control={control}
          name="branchName"
          label="Branch Name"
          placeholder="E.G Chicken Republic Ikeja"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormSelectTopLabel
            control={control}
            name="branchRegion"
            label="Branch Region"
            options={states}
            placeholder="Choose State"
            required
          />

          <FormSelectTopLabel
            control={control}
            name="lga"
            label="LGA"
            options={lgas}
            placeholder={selectedState ? "Choose LGA" : "Select State First"}
            disabled={!selectedState}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormSelectTopLabel
            control={control}
            name="openingTime"
            label="Branch Opening Time (Optional)"
            options={timeOptions}
            placeholder="Choose Time"
          />

          <FormSelectTopLabel
            control={control}
            name="closingTime"
            label="Branch Closing Time (Optional)"
            options={getClosingTimeOptions()}
            placeholder={selectedOpeningTime ? "Choose Closing Time" : "Select Opening Time First"}
            disabled={!selectedOpeningTime}
          />
        </div>

        <FormTextareaTopLabel
          control={control}
          name="description"
          label="Branch Description"
          placeholder="Tell Customers What You Sell Or The Services You Offer."
          rows={4}
          required
        />

        <FormPhoneInput
          control={control}
          name="phone"
          label="Branch Phone Number"
          placeholder="08012345678"
          required
        />

        <FormInputTopLabel
          control={control}
          name="email"
          label="Business Email Address"
          type="email"
          placeholder="E.G Johndoe@Gmail.Com"
          required
        />

        <FormImageUpload
          label="Business Photos"
          description="Upload Pictures That Show Your Business — For Example, Your Store, Office, Or The Products You Sell. (1-5 photos)"
          onImageChange={() => { }} // Not used in multiple mode
          onImagesChange={(images: string[]) => {
            onBusinessPhotosChange(images);
          }}
          allowMultiple={true}
          maxImages={5}
          required
        />
      </div>
    </div>
  );
}
