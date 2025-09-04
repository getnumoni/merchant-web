import { rewardTableData, summaryData } from "@/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function RewardTable() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
      {/* Left Section - Reward Table */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Reward Table</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full min-w-[280px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-green-700">Min</th>
                <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-green-700">Max</th>
                <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-green-700">Reward%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rewardTableData.map((row, index) => (
                <tr
                  key={row.min}
                  className={cn(
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  )}
                >
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{row.min}</td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{row.max}</td>
                  <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">{row.reward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Section - Table Summary */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Table Summary</h2>
        <div className="space-y-3 sm:space-y-4">
          {summaryData.map((item) => (
            <div key={item.label} className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex-shrink-0">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={16}
                  height={16}
                  className="sm:w-5 sm:h-5 text-gray-400"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs sm:text-sm font-medium text-gray-700">{item.label}:</span>
                <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2 break-words">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}