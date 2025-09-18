"use client";

import Hero from "@/components/common/hero";
import useGetAllBranches from "@/hooks/query/useGetAllBranches";
import BranchDashboard from "./branch-dashboard";
import EmptyBranch from "./empty-branch";

export default function BranchLevel() {

  const { data, isPending } = useGetAllBranches();

  const branches = data?.data?.data;
  // console.log('Full API response:', data);
  // console.log('Branches data:', branches);

  const isBranch = branches?.length === 0;

  // Show loading state while data is being fetched
  if (isPending) {
    return (
      <main>
        <Hero />
        <div className="bg-white rounded-2xl p-4 my-4">
          <div className="text-center py-8">
            <p className="text-gray-500">Loading branches...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Hero />
      {isBranch ? <EmptyBranch /> : <BranchDashboard branches={branches} />}
    </main>
  )
}