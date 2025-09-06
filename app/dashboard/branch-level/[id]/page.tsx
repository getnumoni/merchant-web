"use client";

import AboutBranch from "@/components/branch-level/about-branch";
import BranchDetails from "@/components/branch-level/branch-details";
import TransactionHistory from "@/components/branch-level/transaction-history";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>Branch Details-  {id}</h1>
      <BranchDetails />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TransactionHistory />
        <AboutBranch />
      </section>
    </div>
  );
}