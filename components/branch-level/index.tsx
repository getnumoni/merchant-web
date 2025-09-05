import Hero from "@/components/common/hero";
import BranchDashboard from "./branch-dashboard";
import EmptyBranch from "./empty-branch";

export default function BranchLevel() {

  const isBranch = false;
  return (
    <main>
      <Hero />
      {isBranch ? <EmptyBranch /> : <BranchDashboard />}
    </main>
  )
}