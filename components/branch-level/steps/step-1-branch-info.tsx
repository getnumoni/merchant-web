"use client"

import useGetAllRegions from "@/hooks/query/useGetAllRegions";
import useGetLga from "@/hooks/query/useGetLga";
import useGetStates from "@/hooks/query/useGetStates";
import { BranchFormData } from "@/lib/schemas/branch-schema";
import { useEffect, useState } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { FormImageUpload } from "../../ui/form-image-upload";
import { FormInputTopLabel } from "../../ui/form-input";
import { FormLogoUpload } from "../../ui/form-logo-upload";
import { FormPhoneInput } from "../../ui/form-phone-input";
import { FormSelectTopLabel } from "../../ui/form-select";
import { FormTextareaTopLabel } from "../../ui/form-textarea";

// Remove the hardcoded states - we'll use API data

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
  setValue: UseFormSetValue<BranchFormData>;
  onLogoChange: (base64: string | null) => void;
  onBusinessPhotosChange: (base64Array: string[]) => void;
}

export default function Step1BranchInfo({ control, setValue, onLogoChange, onBusinessPhotosChange }: Step1Props) {
  const { data: regionsData, isPending: regionsPending } = useGetAllRegions();

  // Watch the selected region and state
  const selectedRegion = useWatch({
    control,
    name: "branchRegion"
  });

  const selectedState = useWatch({
    control,
    name: "branchState"
  });

  // Fetch states based on selected region
  const { data: statesData, isPending: statesPending } = useGetStates({
    region: selectedRegion || ""
  });

  // Fetch LGAs based on selected state
  const { data: lgasData, isPending: lgasPending } = useGetLga({
    state: selectedState || ""
  });

  // Map the regions from API response to the expected format
  const regions = regionsData?.data?.data?.map((region: string) => ({
    value: region,
    label: region
  })) || [];

  // Map the states from API response to the expected format
  const states = statesData?.data?.data?.map((state: string) => ({
    value: state,
    label: state
  })) || [];

  // Map the LGAs from API response to the expected format
  const lgas = lgasData?.data?.data?.map((lga: string) => ({
    value: lga,
    label: lga
  })) || [];

  // console.log('regions', regions);
  // console.log('states', states);
  // console.log('lgas', lgas);

  // Watch the selected opening time
  const selectedOpeningTime = useWatch({
    control,
    name: "openingTime"
  });

  // Watch current values for form components
  const currentLogo = useWatch({
    control,
    name: "logo"
  });

  const currentBusinessPhotos = useWatch({
    control,
    name: "businessPhotos"
  });

  // Track if this is the initial load and if we have initial values
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasInitialValues, setHasInitialValues] = useState(false);

  // Debug: Watch state and LGA values
  const currentState = useWatch({
    control,
    name: "branchState"
  });

  const currentLga = useWatch({
    control,
    name: "lga"
  });

  // Check if we have initial values set
  useEffect(() => {
    if (currentState && currentLga && isInitialLoad) {
      setHasInitialValues(true);
    }
  }, [currentState, currentLga, isInitialLoad]);

  // Debug logging
  // useEffect(() => {
  //   console.log('🔍 Step1 Form Values:', {
  //     selectedRegion,
  //     selectedState,
  //     currentState,
  //     currentLga,
  //     isInitialLoad,
  //     hasInitialValues,
  //     allFormValues: control._formValues
  //   });
  // }, [selectedRegion, selectedState, currentState, currentLga, isInitialLoad, hasInitialValues, control._formValues]);

  // Reset state and LGA when region changes (but not on initial load or if we have initial values)
  useEffect(() => {
    if (selectedRegion && !isInitialLoad && !hasInitialValues) {
      // Reset state and LGA when region changes
      setValue("branchState", "");
      setValue("lga", "");
    }
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [selectedRegion, setValue, isInitialLoad, hasInitialValues]);

  // Reset LGA when state changes (but not on initial load or if we have initial values)
  useEffect(() => {
    if (selectedState && !isInitialLoad && !hasInitialValues) {
      // Reset LGA when state changes
      setValue("lga", "");
    }
  }, [selectedState, setValue, isInitialLoad, hasInitialValues]);

  // Filter closing time options based on opening time
  // const getClosingTimeOptions = () => {
  //   if (!selectedOpeningTime) {
  //     return timeOptions;
  //   }

  //   // Find the index of the selected opening time
  //   const openingTimeIndex = timeOptions.findIndex(option => option.value === selectedOpeningTime);

  //   // Return only times after the opening time
  //   return timeOptions.slice(openingTimeIndex + 1);
  // };





  return (
    <div className="space-y-2">
      {/* Logo Upload Section */}
      <FormLogoUpload
        onImageChange={onLogoChange}
        currentValue={currentLogo}
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

        <FormSelectTopLabel
          control={control}
          name="branchRegion"
          label="Branch Region"
          options={regions}
          placeholder={regionsPending ? "Loading regions..." : "Choose Region"}
          disabled={regionsPending}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormSelectTopLabel
            control={control}
            name="branchState"
            label="Branch State"
            options={states}
            placeholder={!selectedRegion ? "Select Region First" : statesPending ? "Loading states..." : "Choose State"}
            disabled={!selectedRegion || statesPending}
            required
          />

          <FormSelectTopLabel
            control={control}
            name="lga"
            label="LGA"
            options={lgas}
            placeholder={!selectedState ? "Select State First" : lgasPending ? "Loading LGAs..." : "Choose LGA"}
            disabled={!selectedState || lgasPending}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormSelectTopLabel
            control={control}
            name="openingTime"
            label="Branch Opening Time"
            options={timeOptions}
            placeholder="Choose Time"
            required
          />

          <FormSelectTopLabel
            control={control}
            name="closingTime"
            label="Branch Closing Time"
            options={timeOptions}
            placeholder={selectedOpeningTime ? "Choose Closing Time" : "Select Opening Time First"}
            disabled={!selectedOpeningTime}
            required
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
          currentValues={currentBusinessPhotos}
        />
      </div>
    </div>
  );
}
