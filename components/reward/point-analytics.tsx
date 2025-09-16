"use client";
import { tabs } from "@/data";
import { PointAnalyticsProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GiftIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ErrorDisplay from "../common/error-display";
import { MusicPauseIcon } from "../common/icon-svg";
import { Button } from "../ui/button";
import AnalyticalTrend from "./analytical-trend";
import PointsAllocated from "./points-allocated";
import RewardModal from "./reward-modal";
import RewardTable from "./reward-table";

export default function PointAnalytics({
  isPending,
  rewardTableData,
  errorMessage,
  isError,
  onRetry
}: PointAnalyticsProps) {
  const [activeTab, setActiveTab] = useState("reward-table");
  const [pauseModalOpen, setPauseModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePauseRewards = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to pause rewards
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Rewards paused successfully");
      setPauseModalOpen(false);
    } catch (error) {
      console.error("Failed to pause rewards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-white rounded-2xl p-3 sm:p-4 md:p-6 my-4 sm:my-6 md:my-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6 gap-4">
        <div className="flex flex-row gap-2 items-center">
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">Point Insights & Analytics</h1>

          {/* Tabs - Mobile: Full width, Desktop: Auto width */}
          <div className="flex flex-wrap items-center gap-2 lg:gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-theme-dark-green-700 text-theme-dark-green-700 bg-theme-lighter-green border font-semibold"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons - Mobile: Stack vertically, Desktop: Horizontal */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <button className="bg-white border border-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm">
            <Image src="/assets/icons/details-icon.svg" alt="Edit" width={16} height={16} />
            <span className="hidden sm:inline">Edit Table</span>
            <span className="sm:hidden">Edit</span>
          </button>
          <Button
            onClick={() => setPauseModalOpen(true)}
            className="bg-theme-red-950 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm hover:bg-theme-red"
          >
            <MusicPauseIcon className="w-4 h-4 text-white" />
            <span className="hidden sm:inline text-white font-semibold">Pause Reward</span>
            <span className="sm:hidden text-white font-semibold">Pause</span>
          </Button>

        </div>
      </div>


      {/* Error Display */}
      <ErrorDisplay
        error={errorMessage || undefined}
        isError={isError}
        onRetry={onRetry}
        className="mb-4"
      />

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl ">
        {activeTab === "reward-table" && (
          <RewardTable rewards={rewardTableData} isPending={isPending} />
        )}

        {/* {activeTab === "customers-score" && (
          <CustomersScore />
        )} */}

        {activeTab === "points-allocation" && (
          <PointsAllocated />
        )}

        {activeTab === "analytics-trends" && (
          <AnalyticalTrend />
        )}
      </div>

      {/* Pause Rewards Modal */}
      <RewardModal
        isOpen={pauseModalOpen}
        onClose={() => setPauseModalOpen(false)}
        onConfirm={handlePauseRewards}
        icon={<GiftIcon size={48} className="text-theme-red-950" />}
        iconColor="red"
        title="Pause Rewards?"
        description="Manually stop point allocations to customers until you're ready to resume. Customers will no longer earn points until you reactivate rewards."
        subDescription="Proceed?"
        primaryButtonText="Yes, Pause Rewards"
        secondaryButtonText="No, Keep Rewards"
        primaryButtonVariant="destructive"
        primaryButtonColor="#DC2626"
        secondaryButtonColor="#F3F4F6"
        isLoading={isLoading}
      />
    </main>
  );
}