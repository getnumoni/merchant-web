'use client';

import { pointsTabs } from "@/data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import PointsDistributed from "./points-distributed";
import PointsRedeemed from "./points-redeemed";

export default function Points() {
  const [activeTab, setActiveTab] = useState<"points-distributed" | "points-redeemed">("points-distributed");

  return (
    <main>
      <div className="flex flex-wrap items-center gap-2 lg:gap-2">
        {pointsTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "points-distributed" | "points-redeemed")}
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
      {activeTab === "points-distributed" && <PointsDistributed />}
      {activeTab === "points-redeemed" && <PointsRedeemed />}

    </main>
  )
}