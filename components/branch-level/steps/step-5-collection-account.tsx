"use client"

import { useVerifyBank } from "@/hooks/mutation/useVerifyBank";
import useGetAllBanks from "@/hooks/query/useGetAllBanks";
import { BranchFormData } from "@/lib/schemas/branch-schema";
import { useEffect, useRef, useState } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { FormInputTopLabel } from "../../ui/form-input";
import { FormSelectTopLabel } from "../../ui/form-select";

interface Step5Props {
  control: Control<BranchFormData>;
  setValue: UseFormSetValue<BranchFormData>;
  onAccountVerificationChange?: (isValid: boolean) => void;
}

export default function Step5CollectionAccount({ control, setValue, onAccountVerificationChange }: Step5Props) {
  const { data, isPending } = useGetAllBanks();
  const { handleVerifyBank, isPending: isVerifying, isSuccess: isVerified, accountName } = useVerifyBank();

  // State for account verification
  const [isAccountValid, setIsAccountValid] = useState<boolean>(false);
  const hasVerified = useRef<string>(""); // Track what we've already verified
  const verificationTimeout = useRef<NodeJS.Timeout | null>(null);

  // Transform API data to options format (using code as value, name as label)
  const bankOptions = data?.data?.map((bank: { name: string; code: string }) => ({
    value: bank.code,
    label: bank.name
  })) || [];

  // console.log("banks", data);

  // Watch form values
  const branchName = useWatch({
    control,
    name: "branchName"
  });

  const selectedBank = useWatch({
    control,
    name: "bank"
  });

  const accountNumber = useWatch({
    control,
    name: "accountNumber"
  });

  // Verify account when both bank and account number are provided
  useEffect(() => {
    // Clear any existing timeout
    if (verificationTimeout.current) {
      clearTimeout(verificationTimeout.current);
    }

    if (selectedBank && accountNumber && accountNumber.length >= 10) {
      const verificationKey = `${selectedBank}-${accountNumber}`;

      // Only verify if we haven't already verified this combination
      if (hasVerified.current !== verificationKey && !isVerifying) {
        // Add a small delay to prevent rapid API calls while typing
        verificationTimeout.current = setTimeout(() => {
          const verifyPayload = {
            bankCode: selectedBank,
            accountNumber: accountNumber
          };

          hasVerified.current = verificationKey;
          handleVerifyBank(verifyPayload);
        }, 500); // 500ms delay
      }
    } else {
      // Reset verification state when requirements aren't met
      setIsAccountValid(false);
      hasVerified.current = "";
    }

    // Cleanup timeout on unmount
    return () => {
      if (verificationTimeout.current) {
        clearTimeout(verificationTimeout.current);
      }
    };
  }, [selectedBank, accountNumber, handleVerifyBank, isVerifying]);

  // Handle verification success
  useEffect(() => {
    if (isVerified && accountName) {
      setIsAccountValid(true);
      // Save the verified account name to the form
      setValue("bankAccountName", accountName);
      onAccountVerificationChange?.(true);
    } else if (!isVerifying && accountNumber && accountNumber.length >= 10) {
      setIsAccountValid(false);
      // Clear the account name if verification fails
      setValue("bankAccountName", "");
      onAccountVerificationChange?.(false);
    }
  }, [isVerified, accountName, isVerifying, accountNumber, setValue, onAccountVerificationChange]);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <FormSelectTopLabel
          control={control}
          name="bank"
          disabled={isPending}
          label="Bank"
          options={bankOptions}
          placeholder={isPending ? "Loading banks..." : "Choose From Options"}
          required
        />

        <FormInputTopLabel
          control={control}
          name="accountNumber"
          label="Account Number"
          placeholder="Enter Your 10 Digits Bank Account Number"
          required
        />

        {/* Account Verification Status */}
        {accountNumber && accountNumber.length >= 10 && (
          <div className="space-y-2">
            {isVerifying && (
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">Verifying account...</span>
              </div>
            )}

            {isAccountValid && accountName && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-800">Account Verified</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Account Name: <span className="font-semibold">{accountName}</span>
                </p>
              </div>
            )}

            {!isVerifying && !isAccountValid && accountNumber && accountNumber.length >= 10 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-red-800">Account Verification Failed</span>
                </div>
                <p className="text-sm text-red-700 mt-1">
                  Please check your account number and try again.
                </p>
              </div>
            )}
          </div>
        )}

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
