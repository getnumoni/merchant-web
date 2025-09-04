"use client"

import { BranchFormData } from "@/lib/schemas/branch-schema";
import { Control, useWatch } from "react-hook-form";
import { FormInputTopLabel } from "../../ui/form-input";
import { FormSelectTopLabel } from "../../ui/form-select";

// Sample data for banks
const banks = [
  { value: "access-bank", label: "Access Bank" },
  { value: "first-bank", label: "First Bank" },
  { value: "gtbank", label: "GTBank" },
  { value: "zenith-bank", label: "Zenith Bank" },
  { value: "uba", label: "UBA" },
  { value: "fidelity-bank", label: "Fidelity Bank" }
];

interface Step5Props {
  control: Control<BranchFormData>;
}

export default function Step5CollectionAccount({ control }: Step5Props) {
  // Watch the branch name to display it in the instruction message
  const branchName = useWatch({
    control,
    name: "branchName"
  });

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <FormSelectTopLabel
          control={control}
          name="bank"
          label="Bank"
          options={banks}
          placeholder="Choose From Options"
          required
        />

        <FormInputTopLabel
          control={control}
          name="accountNumber"
          label="Account Number"
          placeholder="Enter Your 10 Digits Bank Account Number"
          required
        />

        <div className="space-y-2">
          <label className="mb-1 block text-sm font-medium text-[#838383]">
            Minimum Payment Amount <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 font-medium">₦</span>
            <input
              type="number"
              step="0.01"
              placeholder="0.0"
              className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-green focus:border-transparent text-sm"
              {...control.register("minPayment", { required: true })}
            />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            Branch Collection Account Name Must Match Branch Name &quot;{branchName || 'Your Branch Name'}&quot;.
          </p>
        </div>
      </div>
    </div>
  );
}
