'use client';

import useGetRewards from "@/hooks/query/useGetRewards";
import EmptyReward from "./empty-reward";
import LoadingSkeleton from "./loading-skeleton";
import RewardDashboard from "./reward-dashboard";

export default function Reward() {
  const { data, isPending } = useGetRewards({});

  console.log('rewards data:', data);

  // Show loading skeleton while data is being fetched
  if (isPending) {
    return <LoadingSkeleton />;
  }

  // Check if data is empty or has no rewards
  const isEmpty = !data?.data || data.data.length === 0;

  return (
    <main>
      {isEmpty ? <EmptyReward /> : <RewardDashboard />}
    </main>
  );
}