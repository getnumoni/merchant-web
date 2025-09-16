'use client';

import useGetRewards from "@/hooks/query/useGetRewards";
import EmptyReward from "./empty-reward";
import LoadingSkeleton from "./loading-skeleton";
import RewardDashboard from "./reward-dashboard";

export default function Reward() {
  const { data, isPending, error, isError, refetch } = useGetRewards({ merchantId: "68c8341293944be0f81776d4" });

  console.log('data', data);

  // Show loading skeleton while data is being fetched
  if (isPending) {
    return <LoadingSkeleton />;
  }

  // Show error message if there's an error
  if (isError) {
    return (
      <main className="bg-white rounded-2xl p-6">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            {error?.message || "Failed to load rewards data. Please try again later."}
          </p>
          <button
            onClick={() => refetch()}
            className="bg-theme-dark-green hover:bg-theme-dark-green text-white rounded-lg px-6 py-3 font-medium"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // Check if data is empty or has no rewards
  const isEmpty = !data || (Array.isArray(data) && data.length === 0) || (data && !data.rewards);

  return (
    <main>
      {isEmpty ? <EmptyReward /> : <RewardDashboard />}
    </main>
  );
}