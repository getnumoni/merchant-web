'use client';

import useGetRewards from "@/hooks/query/useGetRewards";
import EmptyReward from "./empty-reward";
import LoadingSkeleton from "./loading-skeleton";
import RewardDashboard from "./reward-dashboard";

export default function Reward() {
  const { data, isPending } = useGetRewards({});

  const rewards = data?.data[0];


  // console.log('data', rewards);

  // Show loading skeleton while data is being fetched
  if (isPending) {
    return <LoadingSkeleton />;
  }



  // Check if data is empty or has no rewards
  const isEmpty = !data || rewards?.length === 0;

  return (
    <main>
      {isEmpty ? <EmptyReward /> : <RewardDashboard />}
    </main>
  );
}