import { Skeleton } from "../ui/skeleton";

export default function PointDistributionChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="overflow-x-auto">
        <div className="h-[400px] min-w-[600px] relative">
          {/* Y-axis skeleton */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
            <Skeleton className="h-3 w-4" />
            <Skeleton className="h-3 w-4" />
            <Skeleton className="h-3 w-4" />
            <Skeleton className="h-3 w-4" />
            <Skeleton className="h-3 w-4" />
            <Skeleton className="h-3 w-4" />
          </div>

          {/* Chart area skeleton */}
          <div className="ml-8 relative h-full">
            {/* Grid lines skeleton */}
            <div className="absolute inset-0 min-w-full">
              {[0, 1, 2, 3, 4, 5].map((_, index) => (
                <div
                  key={index}
                  className="absolute w-full border-t border-gray-100"
                  style={{ bottom: `${(index / 5) * 100}%` }}
                />
              ))}
            </div>

            {/* Bars skeleton */}
            <div className="flex items-end justify-start gap-6 h-full px-2 min-w-max">
              {[0, 1, 2, 3, 4, 5].map((_, index) => {
                // Fixed heights to avoid hydration mismatch
                const heights = [120, 80, 200, 160, 100, 140];
                return (
                  <div key={index} className="flex flex-col items-center h-full">
                    {/* Value skeleton */}
                    <div className="mb-2">
                      <Skeleton className="h-4 w-12" />
                    </div>

                    {/* Bar skeleton */}
                    <div className="flex flex-col justify-end" style={{ height: '300px' }}>
                      <Skeleton
                        className="w-10 rounded-t-lg"
                        style={{ height: `${heights[index]}px` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
