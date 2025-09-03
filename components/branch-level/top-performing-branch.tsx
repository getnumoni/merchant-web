import { sampleUserIcon } from "@/constant/images";
import { rewardsByBranchData } from "@/data/chart-data";
import { formatValue, getIndicatorColor } from "@/lib/helper";
import Image from "next/image";

interface TopPerformingBranchProps {
  title?: string;
  subtitle?: string;
  data?: typeof rewardsByBranchData;
  maxHeight?: string;
}

export default function TopPerformingBranch({
  title = "Rewards By Branch",
  subtitle = "Overview of points rewarded by top-performing branches.",
  data = rewardsByBranchData,
  maxHeight = "400px"
}: TopPerformingBranchProps) {

  return (
    <div className="bg-[#F3F4F6] rounded-2xl p-6 shadow-none ">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      {/* Scrollable List */}
      <div
        className="space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{ maxHeight }}
      >
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            {/* Colored indicator */}
            <div className={`w-1 h-8 ${getIndicatorColor(item.indicatorColor)} rounded-full flex-shrink-0`} />

            {/* Branch icon */}
            <div className="flex-shrink-0">
              <Image
                src={sampleUserIcon}
                alt={item.branchName}
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>

            {/* Branch name */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.branchName}
              </p>
            </div>

            {/* Value */}
            <div className="flex-shrink-0">
              <p className={`text-sm font-semibold ${item.value >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                {formatValue(item.value)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}