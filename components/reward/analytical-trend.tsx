import useGetBranchAnalysis from "@/hooks/query/useGetBranchAnalysis";
import PointDistributionChart from "../branch-level/point-distribution-chart";
import EmptyState from "../common/empty-state";
import AnalyticsTable from "./analytics-table";

export default function AnalyticalTrend() {
  const { data, isPending, isError, error } = useGetBranchAnalysis();


  const branchAnalysisData = data?.data?.data;
  const isEmpty = branchAnalysisData?.length === 0;
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {isEmpty ? <EmptyState title="No data yet" description="No customer has interacted with your point hence no data is available." /> :
          <PointDistributionChart isPending={isPending} isError={isError} error={error} data={branchAnalysisData} />
        }

        <div className="bg-theme-gray-600 rounded-xl p-3">
          <h2 className="text-base sm:text-lg font-semibold text-black">Reward By Branch</h2>
          <p className="text-sm sm:text-sm text-gray-600">Overview of points rewarded by top-performing branches.</p>

          <div className="bg-white rounded-2xl p-6 my-3">
            {
              isEmpty ? <EmptyState title="No data yet" description="No customer has interacted with your brand yet. No points have been earned, claimed, or rewarded." /> :
                <AnalyticsTable isPending={isPending} isError={isError} error={error} data={branchAnalysisData} />
            }

          </div>
        </div>
      </div>
    </div>
  );
}