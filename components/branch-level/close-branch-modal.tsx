'use client';

import { branchCloseIcon } from "@/constant/icons";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";

interface CloseBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CloseBranchModal({ isOpen, onClose, onConfirm }: CloseBranchModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="text-center">

          <div className="flex justify-center my-6">
            <Image src={branchCloseIcon} alt="close-branch" width={40} height={40} />

          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
            Close Branch?
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-600 mt-2 text-center">
            This branch will be deactivated and removed from public view. Customers will no longer see or interact with it.
          </DialogDescription>
        </DialogHeader>

        <section className="flex flex-row gap-4 mt-6 w-full">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 bg-white border border-gray-200 text-black hover:bg-gray-50 px-6 py-6 rounded-lg font-medium shadow-none cursor-pointer"
          >
            Keep Branch Active
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-6 rounded-lg font-medium shadow-none cursor-pointer"
          >
            Close Branch
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
}