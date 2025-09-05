"use client";

import { branchSummaryData } from "@/data/branch-summary-data";
import BranchSummaryCard from "./branch-summary-card";

export default function BranchSummaryGrid() {
  return (
    <div className="space-y-6">
      {/* <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Branch Summary</h2>
        <p className="text-sm text-gray-600">
          {branchSummaryData.length} branches found
        </p>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {branchSummaryData.map((branch) => (
          <BranchSummaryCard key={branch.id} data={branch} />
        ))}
      </div>
    </div>
  );
}
