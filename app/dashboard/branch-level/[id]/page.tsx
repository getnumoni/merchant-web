"use client";

import AboutBranch from "@/components/branch-level/about-branch";
import BranchDetails from "@/components/branch-level/branch-details";
import TransactionHistory from "@/components/branch-level/transaction-history";
import useGetBranchById from "@/hooks/query/useGetBranchById";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  const { data, isPending, isError, error } = useGetBranchById({ branchId: id as string });


  const singleBranch = data?.data?.data;
  // console.log(singleBranch)
  const branchName = singleBranch?.name ?? "";
  const branchId = singleBranch?.id ?? "";
  const branchLogo = singleBranch?.logo ?? "";
  const branchStatus = singleBranch?.status ?? "";

  //loading state when data is being fetched

  if (isPending) {
    return <div>Loading...</div>;
  }

  //error state when data is not fetched
  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div>
      <BranchDetails
        branchName={branchName}
        branchId={branchId}
        branchLogo={branchLogo}
        branchStatus={branchStatus}
        branchData={singleBranch}
      />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TransactionHistory />
        <AboutBranch singleBranch={singleBranch} />
      </section>
    </div>
  );
}