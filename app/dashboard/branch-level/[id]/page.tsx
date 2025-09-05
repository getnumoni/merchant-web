"use client";

import BranchDetails from "@/components/branch-level/branch-details";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>Branch Details-  {id}</h1>
      <BranchDetails />
    </div>
  );
}