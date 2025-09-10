"use client";

import { giftIcon } from "@/constant/icons";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import DateSection from "./sections/date-section";
import EarnMethodSection from "./sections/earn-method-section";
import ExpirationSection from "./sections/expiration-section";
import ReceiveMethodSection from "./sections/receive-method-section";
import RewardCapSection from "./sections/reward-cap-section";
import RewardRulesSection from "./sections/reward-rules-section";

interface CreateRewardRuleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateRewardRuleModal({ open, onOpenChange }: CreateRewardRuleModalProps) {
  const [earnMethod, setEarnMethod] = useState<string>("");
  const [rewardCap, setRewardCap] = useState<string>("");
  const [receiveMethod, setReceiveMethod] = useState<string>("");
  const [pointExpiration, setPointExpiration] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Reward rules state
  const [minSpending, setMinSpending] = useState<string>("");
  const [maxSpending, setMaxSpending] = useState<string>("");
  const [rewardPercentage, setRewardPercentage] = useState<string>("");
  const [rewardRules, setRewardRules] = useState<Array<{ min: string, max: string, percentage: string }>>([]);
  const [showTable, setShowTable] = useState<boolean>(false);

  // Check if all required fields are filled
  const isFormValid = earnMethod && receiveMethod && startDate && rewardRules.length > 0;

  const handleSave = () => {
    const formData = {
      earnMethod,
      rewardCap,
      receiveMethod,
      pointExpiration,
      startDate,
      endDate,
      rewardRules
    };

    console.log("=== REWARD RULE FORM DATA ===");
    console.log("Earn Method:", earnMethod);
    console.log("Reward Cap:", rewardCap);
    console.log("Receive Method:", receiveMethod);
    console.log("Point Expiration:", pointExpiration);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Reward Rules:", rewardRules);
    console.log("Full Form Data:", formData);
    console.log("=============================");

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header - Static */}
        <DialogHeader className="flex-shrink-0 pb-4">
          <div className="flex items-center gap-3">
            <Image src={giftIcon} alt="Gift" width={45} height={45} />
            <div>
              <DialogTitle className="text-xl font-semibold">Set Reward Rules</DialogTitle>
              <DialogDescription className="text-xs text-gray-600">
                Define your reward table parameters and rules. Once saved, they will apply across all branches.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          <EarnMethodSection
            earnMethod={earnMethod}
            setEarnMethod={setEarnMethod}
          />

          <RewardRulesSection
            earnMethod={earnMethod}
            minSpending={minSpending}
            setMinSpending={setMinSpending}
            maxSpending={maxSpending}
            setMaxSpending={setMaxSpending}
            rewardPercentage={rewardPercentage}
            setRewardPercentage={setRewardPercentage}
            rewardRules={rewardRules}
            setRewardRules={setRewardRules}
            showTable={showTable}
            setShowTable={setShowTable}
          />

          <RewardCapSection
            rewardCap={rewardCap}
            setRewardCap={setRewardCap}
          />

          <ReceiveMethodSection
            receiveMethod={receiveMethod}
            setReceiveMethod={setReceiveMethod}
          />

          <ExpirationSection
            pointExpiration={pointExpiration}
            setPointExpiration={setPointExpiration}
          />

          <DateSection
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </div>

        {/* Footer - Static */}
        <DialogFooter className="flex-shrink-0 pt-4 border-t">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-gray-500 font-semibold">You Can Change This Configurations On Setting Page</p>
            <Button
              onClick={handleSave}
              disabled={!isFormValid}
              className={`px-4 py-2 text-sm ${isFormValid
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Save & Apply
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}