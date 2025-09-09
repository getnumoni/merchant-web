'use client';

import { activeBranchIcon } from "@/constant/icons";
import { ActiveBranchModalProps } from "@/lib/types";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";



export default function ActiveBranchModal({ isOpen, onClose, onConfirm }: ActiveBranchModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-center">

          <div className="flex justify-center my-6">
            <Image src={activeBranchIcon} alt="activate-branch" width={30} height={30} />

          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
            Activate Branch?
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-600 mt-2 text-center w-full sm:w-8/12 mx-auto">
            Reopen this branch and make it visible to customers again.
          </DialogDescription>
        </DialogHeader>

        <section className="flex flex-row gap-4 mt-6 w-full sm:w-6/12 mx-auto">

          <Button
            onClick={onConfirm}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-6 rounded-lg font-medium shadow-none cursor-pointer"
          >
            Activate Branch
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
}
