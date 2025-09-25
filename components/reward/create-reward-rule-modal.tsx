"use client";

import { giftIcon } from "@/constant/icons";
import { useCreateRewards } from "@/hooks/mutation/useCreateRewards";
import { getAuthCookies } from "@/lib/cookies-utils";
import { getDistributionType, getRewardType } from "@/lib/helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import DateSection from "./sections/date-section";
import EarnMethodSection from "./sections/earn-method-section";
import ExpirationSection from "./sections/expiration-section";
import MilestoneTargetSection from "./sections/milestone-target-section";
import ReceiveMethodSection from "./sections/receive-method-section";
import RewardCapSection from "./sections/reward-cap-section";
import RewardRulesSection from "./sections/reward-rules-section";

interface CreateRewardRuleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateRewardRuleModal({ open, onOpenChange }: CreateRewardRuleModalProps) {
  //get merchant id from cookies
  const { userId } = getAuthCookies();

  // console.log("userId", userId);
  const merchantId = userId as string;
  const [earnMethod, setEarnMethod] = useState<string>("");
  const [rewardCap, setRewardCap] = useState<string>("");
  const [milestoneTarget, setMilestoneTarget] = useState<string>("");
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

  // Mutation hook
  const { handleCreateRewards, isPending, isSuccess } = useCreateRewards();

  // Check if all required fields are filled
  const isFormValid = earnMethod && receiveMethod && startDate && rewardRules.length > 0 && rewardCap && (receiveMethod === "instantly" || milestoneTarget);

  const handleSave = () => {
    // Map form values to API enum values

    // Prepare payload according to CreateRewardsPayload type
    const payload = {
      merchantId: merchantId, // Replace with actual merchant ID from context/store
      rewardType: getRewardType(earnMethod),
      rules: rewardRules.map(rule => ({
        minSpend: parseFloat(rule.min) || 0,
        maxSpend: parseFloat(rule.max) || 0,
        rewardValue: parseFloat(rule.percentage) || 0
      })),
      rewardCap: parseFloat(rewardCap) || 0,
      distributionType: getDistributionType(receiveMethod),
      milestoneTarget: receiveMethod === "instantly" ? 1 : (parseInt(milestoneTarget) || 0),
      pointExpirationDays: parseInt(pointExpiration) || 0,
      status: "ACTIVE", // Using uppercase as per API example
      startDate: startDate || null,
      endDate: endDate || null
    };

    console.log("=== REWARD RULE PAYLOAD ===");
    console.log("Payload:", payload);
    console.log("=============================");

    // Call the mutation hook
    handleCreateRewards(payload);
  };

  // Auto-set milestone target to 1 when receiveMethod is "instantly"
  useEffect(() => {
    if (receiveMethod === "instantly") {
      setMilestoneTarget("1");
    }
  }, [receiveMethod]);

  useEffect(() => {
    if (isSuccess) {
      onOpenChange(false);
    }
  }, [isSuccess, onOpenChange]);

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

          {receiveMethod === "later" && (
            <MilestoneTargetSection
              milestoneTarget={milestoneTarget}
              setMilestoneTarget={setMilestoneTarget}
            />
          )}

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
              disabled={!isFormValid || isPending}
              className={`px-4 py-2 text-sm ${isFormValid && !isPending
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              isLoading={isPending}
              loadingText="Saving..."
            >
              Save & Apply
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}