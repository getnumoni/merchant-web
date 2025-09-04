"use client"

import { BranchFormData } from "@/lib/schemas/branch-schema";
import { Control, useWatch } from "react-hook-form";
import { FormInputTopLabel } from "../../ui/form-input";

interface Step3Props {
  control: Control<BranchFormData>;
}

export default function Step3SocialMedia({ control }: Step3Props) {
  // Watch social media fields for real-time validation
  const website = useWatch({ control, name: "website" });
  const linkedin = useWatch({ control, name: "linkedin" });
  const instagram = useWatch({ control, name: "instagram" });
  const twitter = useWatch({ control, name: "twitter" });
  const snapchat = useWatch({ control, name: "snapchat" });

  // URL validation function
  const isValidUrl = (url: string): boolean => {
    if (!url || url.trim() === '') return true; // Empty is valid (optional field)
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Check if user has started typing in any URL field and if it's invalid
  const hasInvalidUrl = (website && !isValidUrl(website)) ||
    (linkedin && !isValidUrl(linkedin)) ||
    (instagram && !isValidUrl(instagram)) ||
    (twitter && !isValidUrl(twitter)) ||
    (snapchat && !isValidUrl(snapchat));

  return (
    <div className="space-y-4">
      {hasInvalidUrl && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800">
            ⚠️ Please fix invalid URLs before proceeding to the next step.
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <FormInputTopLabel
            control={control}
            name="website"
            label="Website"
            placeholder="E.G Www.Myhome.Com"
          />
          {website && !isValidUrl(website) && (
            <p className="text-sm text-red-600">Invalid website URL</p>
          )}
        </div>

        <div className="space-y-2">
          <FormInputTopLabel
            control={control}
            name="whatsapp"
            label="Whatsapp"
            placeholder="08012345678"
          />
        </div>

        <div className="space-y-2">
          <FormInputTopLabel
            control={control}
            name="linkedin"
            label="LinkedIn"
            placeholder="Enter LinkedIn Profile Link"
          />
          {linkedin && !isValidUrl(linkedin) && (
            <p className="text-sm text-red-600">Invalid LinkedIn URL</p>
          )}
        </div>

        <div className="space-y-2">
          <FormInputTopLabel
            control={control}
            name="instagram"
            label="Instagram"
            placeholder="Enter Instagram Profile Link"
          />
          {instagram && !isValidUrl(instagram) && (
            <p className="text-sm text-red-600">Invalid Instagram URL</p>
          )}
        </div>

        <div className="space-y-2">
          <FormInputTopLabel
            control={control}
            name="twitter"
            label="Twitter/X"
            placeholder="Enter X Profile"
          />
          {twitter && !isValidUrl(twitter) && (
            <p className="text-sm text-red-600">Invalid Twitter URL</p>
          )}
        </div>

        <div className="space-y-2">
          <FormInputTopLabel
            control={control}
            name="snapchat"
            label="Snapchat"
            placeholder="Enter Snapchat Profile Link"
          />
          {snapchat && !isValidUrl(snapchat) && (
            <p className="text-sm text-red-600">Invalid Snapchat URL</p>
          )}
        </div>
      </div>
    </div>
  );
}
