import useGetRewardAnalysis from "@/hooks/query/useGetRewardAnalysis";
import useGetRewards from "@/hooks/query/useGetRewards";
import { AxiosError } from "@/lib/types";
import ErrorDisplay from "../common/error-display";
import {
  BudgetCapCard,
  CustomerPoolCard,
  TotalPointsBalanceCard,
  TotalPointsRewardedCard
} from "./cards";
import PointAnalytics from "./point-analytics";

export default function RewardDashboard() {

  const { data, isPending, error, isError, refetch } = useGetRewards({});

  const { data: rewardAnalysisData, isPending: isPendingRewardAnalysis, isError: isErrorRewardAnalysis, error: errorRewardAnalysis, refetch: refetchRewardAnalysis } = useGetRewardAnalysis();


  const analyticsData = rewardAnalysisData?.data?.data;

  const errorMessage = (error as AxiosError)?.response?.data?.message;

  const rewardTableData = data?.data[0];

  return (
    <main>
      {/* Error Display */}
      <ErrorDisplay
        error={errorMessage}
        isError={isError}
        onRetry={refetch}
        className="mb-4"
      />

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white rounded-2xl p-4">
        <BudgetCapCard
          rewardCap={rewardTableData?.rewardCap}
          isLoading={isPending}
        />

        <TotalPointsRewardedCard
          totalRewardCap={analyticsData?.totalRewardCap}
          isLoading={isPendingRewardAnalysis}
          isError={isErrorRewardAnalysis}
          errorMessage={errorRewardAnalysis?.message}
          onRetry={() => refetchRewardAnalysis()}
        />

        <TotalPointsBalanceCard
          availablePoints={analyticsData?.availablePoints}
          isLoading={isPendingRewardAnalysis}
          isError={isErrorRewardAnalysis}
          errorMessage={errorRewardAnalysis?.message}
          onRetry={() => refetchRewardAnalysis()}
        />

        <CustomerPoolCard
          totalLifetimeCustomers={analyticsData?.totalLifetimeCustomers}
          isLoading={isPendingRewardAnalysis}
          isError={isErrorRewardAnalysis}
          errorMessage={errorRewardAnalysis?.message}
          onRetry={() => refetchRewardAnalysis()}
        />
      </section>

      <PointAnalytics
        isPending={isPending}
        rewardTableData={rewardTableData}
        errorMessage={errorMessage}
        isError={isError}
        onRetry={refetch}
      />
    </main>
  )
}