"use client"

import { emptyBranchIcon } from "@/constant/icons";
import { useBranchStore } from "@/stores/branch-store";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import AddBranch from "./add-branch";

export default function EmptyBranch() {
  const { openDialog } = useBranchStore();

  return (
    <>
      <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-white rounded-2xl my-5">
        <div className="mb-6">
          <Image src={emptyBranchIcon} alt="empty-branch" width={200} height={200} className="mx-auto" />
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-3">
          No Sub-Branches Yet
        </h1>

        <p className="text-sm text-gray-600 mb-8 max-w-sm">
          You haven&apos;t added any sub-branches. Click the button below to create one and get started.
        </p>

        <Button
          onClick={openDialog}
          className="bg-theme-dark-green hover:bg-theme-green text-white rounded-lg p-6 flex items-center gap-2 shadow-sm max-w-md w-full cursor-pointer"
        >
          <Plus className="w-4 h-4 font-semibold" />
          Add Branch
        </Button>
      </div>

      <AddBranch />
    </>
  )
}