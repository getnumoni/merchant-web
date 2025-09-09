"use client"

import { pointDistributionData } from "@/data/chart-data";
import { formatValue, getBarColor, getRingColor } from "@/lib/helper";
import Image from "next/image";

interface PointDistributionChartProps {
  data?: typeof pointDistributionData;
}

export default function PointDistributionChart({
  data = pointDistributionData,
}: PointDistributionChartProps) {
  const maxValue = Math.max(...data.map(item => Math.abs(item.value)));
  const maxHeight = 350; // Maximum height for bars in pixels (adjusted to match TopPerformingBranch)

  return (
    <div className="bg-white rounded-2xl p-6 ">
      {/* Custom Chart Container */}
      <div className="relative" style={{ height: '510px' }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
          <span>20,000</span>
          <span>15,000</span>
          <span>10,000</span>
          <span>5,000</span>
          <span>0</span>
        </div>

        {/* Chart Area */}
        <div className="ml-8 relative overflow-x-auto h-full">
          {/* Grid lines */}
          <div className="absolute inset-0 min-w-full">
            {[0, 5000, 10000, 15000, 20000].map((value, index) => (
              <div
                key={index}
                className="absolute w-full border-t border-gray-100"
                style={{ bottom: `${(value / 20000) * 100}%` }}
              />
            ))}
          </div>

          {/* Bars with Icons */}
          <div className="flex items-end justify-start gap-4 h-full px-2 min-w-max">
            {data.map((item) => {
              const height = (Math.abs(item.value) / maxValue) * maxHeight;
              return (
                <div key={item.id} className="flex flex-col items-center">
                  {/* Profile Icon with colored ring */}
                  <div className={`relative mb-2 ${getRingColor(item.iconRingColor)} ring-2 rounded-full p-1`}>
                    <Image
                      src="/assets/icons/profile-icon.svg"
                      alt={item.label}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </div>

                  {/* Value */}
                  <div className="text-xs font-medium text-gray-900 mb-2">
                    {formatValue(item.value)}
                  </div>

                  {/* Bar */}
                  <div
                    className={`w-8 ${getBarColor(item.barColor)} rounded-t-full`}
                    style={{ height: `${height}px` }}
                  />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}