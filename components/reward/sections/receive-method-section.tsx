"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ReceiveMethodSectionProps } from "@/lib/types";


export default function ReceiveMethodSection({ receiveMethod, setReceiveMethod }: ReceiveMethodSectionProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-900">
        Choose How Customers Are Rewarded <span className="text-red-500">*</span>
      </label>
      <RadioGroup value={receiveMethod} onValueChange={setReceiveMethod} className="mt-2 flex flex-row gap-4">
        <div
          className={`flex-1 flex items-start space-x-3 border rounded-lg p-4 cursor-pointer transition-all duration-200 min-h-[80px] ${receiveMethod === "instantly"
            ? "border-green-500"
            : "border-gray-300 hover:border-gray-400"
            }`}
          onClick={() => setReceiveMethod("instantly")}
        >
          <div className="space-y-1 flex flex-row gap-2 w-full">
            <div className="flex-1">
              <label htmlFor="instantly" className={`text-sm font-medium cursor-pointer ${receiveMethod === "instantly" ? "text-green-600" : "text-gray-900"
                }`}>
                Instantly
              </label>
              <p className="text-xs text-gray-600">Customers earn points immediately after each purchase.</p>
            </div>
            <RadioGroupItem
              value="instantly"
              id="instantly"
              className={`mt-1 flex-shrink-0 ${receiveMethod === "instantly"
                ? "border-green-500 data-[state=checked]:bg-green-500"
                : ""
                }`}
            />
          </div>
        </div>
        <div
          className={`flex-1 flex items-start space-x-3 border rounded-lg p-4 cursor-pointer transition-all duration-200 min-h-[80px] ${receiveMethod === "later"
            ? "border-green-500"
            : "border-gray-300 hover:border-gray-400"
            }`}
          onClick={() => setReceiveMethod("later")}
        >
          <div className="space-y-1 flex flex-row gap-2 w-full">
            <div className="flex-1">
              <label htmlFor="later" className={`text-sm font-medium cursor-pointer ${receiveMethod === "later" ? "text-green-600" : "text-gray-900"
                }`}>
                Later
              </label>
              <p className="text-xs text-gray-600">Points are collected and claimed once they hit a spend milestone.</p>
            </div>
            <RadioGroupItem
              value="later"
              id="later"
              className={`mt-1 flex-shrink-0 ${receiveMethod === "later"
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
