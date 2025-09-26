import { Skeleton } from "../ui/skeleton";

interface TopPerformingBranchSkeletonProps {
  title?: string;
  subtitle?: string;
  maxHeight?: string;
}

export default function TopPerformingBranchSkeleton({
  title = "Rewards By Branch",
  subtitle = "Overview of points rewarded by top-performing branches.",
  maxHeight = "400px",
}: TopPerformingBranchSkeletonProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-none">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      {/* Skeleton list */}
      <div
        className="space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style={{ maxHeight }}
      >
        {[0, 1, 2, 3, 4, 5].map((_, index) => (
          <div key={index} className="flex items-center gap-3 p-2 rounded-lg">
            {/* Colored indicator skeleton */}
            <Skeleton className="w-1 h-8 rounded-full flex-shrink-0" />

            {/* Branch icon skeleton */}
            <div className="flex-shrink-0">
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>

            {/* Branch name skeleton */}
            <div className="flex-1 min-w-0">
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Value skeleton */}
            <div className="flex-shrink-0">
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
