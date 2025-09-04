import EmptyReward from "./empty-reward";
import RewardDashboard from "./reward-dashboard";

export default function Reward() {
  const isEmpty = false;
  return (
    <main>
      {isEmpty ? <EmptyReward /> : <RewardDashboard />}
    </main>
  )
}