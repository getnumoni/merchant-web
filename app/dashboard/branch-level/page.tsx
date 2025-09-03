import BranchLevel from "@/components/branch-level";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Branch Level',
  description: 'Branch Level',
}


export default function Page() {
  return <BranchLevel />
}