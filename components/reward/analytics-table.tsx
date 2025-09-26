import { sampleUserIcon } from "@/constant/images";
import { formatValue, getBarColor } from "@/lib/helper";
import { BranchAnalyticsData } from "@/lib/types";
import Image from "next/image";
import TopPerformingBranchSkeleton from "../branch-level/top-performing-branch-skeleton";
import ErrorDisplay from "../common/error-display";


interface AnalyticsTableProps {
  maxHeight?: string;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  data: BranchAnalyticsData[];
}
export default function AnalyticsTable({ maxHeight = "400px", isPending, isError, error, data }: AnalyticsTableProps) {
  if (isPending) {
    return <TopPerformingBranchSkeleton title="Rewards By Branch" subtitle="Overview of points rewarded by top-performing branches." maxHeight={maxHeight} />;
  }

  if (isError) {
    return <ErrorDisplay error={error?.message || "An error occurred"} />;
  }

  return (
    <div>
      <div
        className="space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{ maxHeight }}
      >
        <div
          className="space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          style={{ maxHeight }}
        >
          {data?.map((item: BranchAnalyticsData, index: number) => (
            <div key={item.branchId} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              {/* Colored indicator */}
              <div className={`w-1 h-8 ${getBarColor(index.toString())} rounded-full flex-shrink-0`} />

              {/* Branch icon */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={item.logo || sampleUserIcon}
                    alt={item.branchName}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Branch name */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.branchName}
                </p>
              </div>

              {/* Value */}
              <div className="flex-shrink-0">
                <p className="text-sm font-semibold text-green-600">
                  {formatValue(item.totalPointsIssued)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}