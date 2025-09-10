"use client";

import { RewardIcon } from "@/components/common/icon-svg";
import { Input } from "@/components/ui/input";
import { RewardCapSectionProps } from "@/lib/types";


export default function RewardCapSection({ rewardCap, setRewardCap }: RewardCapSectionProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-900">Reward Cap</label>
      <p className="text-xs text-gray-600">(Set The Maximum Points Your Brand Can Give Out Within A Period.)</p>
      <div className="relative">
        <Input
          type="number"
          placeholder="0"
          value={rewardCap}
          onChange={(e) => setRewardCap(e.target.value)}
          className="w-full pl-10 pr-3 py-6 focus:outline-none focus:ring-0 focus:border-none"
        />
        <RewardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-dark-green pointer-events-none h-4 w-4" />
      </div>
    </div>
  );
}
