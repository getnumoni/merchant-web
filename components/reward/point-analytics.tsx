"use client";
import { tabs } from "@/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { MusicPauseIcon } from "../common/icon-svg";
import AnalyticalTrend from "./analytical-trend";
import CustomersScore from "./customers-score";
import PointsAllocated from "./points-allocated";
import RewardTable from "./reward-table";

export default function PointAnalytics() {
  const [activeTab, setActiveTab] = useState("reward-table");

  return (
    <main className="bg-white rounded-2xl p-3 sm:p-4 md:p-6 my-4 sm:my-6 md:my-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6 gap-4">
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

        {/* Action Buttons - Mobile: Stack vertically, Desktop: Horizontal */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <button className="bg-white border border-gray-300 text-gray-700 px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm">
            <Image src="/assets/icons/details-icon.svg" alt="Edit" width={16} height={16} />
            <span className="hidden sm:inline">Edit Table</span>
            <span className="sm:hidden">Edit</span>
          </button>
          <button className="bg-theme-red-950 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm">
            <MusicPauseIcon className="w-4 h-4 text-white" />
            <span className="hidden sm:inline text-white font-semibold">Pause Reward</span>
            <span className="sm:hidden text-white font-semibold">Pause</span>
          </button>

        </div>
      </div>


      {/* Main Content Card */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 md:p-6">
        {activeTab === "reward-table" && (
          <RewardTable />
        )}

        {activeTab === "customers-score" && (
          <CustomersScore />
        )}

        {activeTab === "points-allocation" && (
          <PointsAllocated />
        )}

        {activeTab === "analytics-trends" && (
          <AnalyticalTrend />
        )}
      </div>
    </main>
  );
}