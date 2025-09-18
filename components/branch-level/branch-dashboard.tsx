import { Branch } from "@/lib/types";
import BranchSummaryGrid from "./branch-summary-grid";

interface BranchDashboardProps {
  branches?: Branch[];
}

export default function BranchDashboard({ branches }: BranchDashboardProps) {
  // console.log('branches', branches);

  return (
    <div className="bg-white rounded-2xl p-4 my-4">
      <BranchSummaryGrid branches={branches} />
    </div>
  )
}