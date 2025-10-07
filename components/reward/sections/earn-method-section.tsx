"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface EarnMethodSectionProps {
  earnMethod: string;
  setEarnMethod: (value: string) => void;
}

export default function EarnMethodSection({ earnMethod, setEarnMethod }: EarnMethodSectionProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-900">
        How Will Customers Earn Points? <span className="text-red-500">*</span>
      </label>
      <RadioGroup value={earnMethod} onValueChange={setEarnMethod} className="mt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div
          className={`flex-1 flex items-start space-x-2 sm:space-x-3 border rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-200 min-h-[70px] sm:min-h-[80px] ${earnMethod === "percentage"
            ? "border-green-500"
            : "border-gray-300 hover:border-gray-400"
            }`}
          onClick={() => setEarnMethod("percentage")}
        >
          <div className="space-y-1 flex flex-row gap-2 w-full">
            <div className="flex-1">
              <label htmlFor="percentage" className={`text-sm font-medium cursor-pointer ${earnMethod === "percentage" ? "text-green-600" : "text-gray-900"
                }`}>
                Percentage Based
              </label>
              <p className="text-xs text-gray-600">Reward customers with a set % of their spend.</p>
            </div>
            <RadioGroupItem
              value="percentage"
              id="percentage"
              className={`mt-1 flex-shrink-0 ${earnMethod === "percentage"
                ? "border-green-500 data-[state=checked]:bg-green-500"
                : ""
                }`}
            />
          </div>
        </div>
        <div
          className={`flex-1 flex items-start space-x-2 sm:space-x-3 border rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-200 min-h-[70px] sm:min-h-[80px] ${earnMethod === "fixed"
            ? "border-green-500"
            : "border-gray-300 hover:border-gray-400"
            }`}
          onClick={() => setEarnMethod("fixed")}
        >
          <div className="space-y-1 flex flex-row gap-2 w-full">
            <div className="flex-1">
              <label htmlFor="fixed" className={`text-sm font-medium cursor-pointer ${earnMethod === "fixed" ? "text-green-600" : "text-gray-900"
                }`}>
                Fixed Points
              </label>
              <p className="text-xs text-gray-600">Give a fixed amount per purchase or category.</p>
            </div>
            <RadioGroupItem
              value="fixed"
              id="fixed"
              className={`mt-1 flex-shrink-0 ${earnMethod === "fixed"
                ? "border-green-500 data-[state=checked]:bg-green-500"
                : ""
                }`}
            />
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}
