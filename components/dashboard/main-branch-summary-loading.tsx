import { Skeleton } from "../ui/skeleton";

interface MainBranchSummaryLoadingProps {
  title?: string;
}

export default function MainBranchSummaryLoading({
  title = "Main Branch Summary"
}: MainBranchSummaryLoadingProps) {
  return (
    <div className="shadow-none border-none p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3 border border-gray-100 rounded-2xl p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-1 h-8 rounded-full" />
            <div className="flex-1 flex justify-between items-center">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <hr className="border-gray-50" />
          <div className="flex items-center gap-3">
            <Skeleton className="w-1 h-8 rounded-full" />
            <div className="flex-1 flex justify-between items-center">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <hr className="border-gray-50" />
          <div className="flex items-center gap-3">
            <Skeleton className="w-1 h-8 rounded-full" />
            <div className="flex-1 flex justify-between items-center">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
