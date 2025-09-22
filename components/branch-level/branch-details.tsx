'use client';

import { branchCloseIcon, editIcon, star, verifyIcon } from "@/constant/icons";
import useChangeBranchStatus from "@/hooks/mutation/useChangeBranchStatus";
import { BranchData } from "@/lib/types/branch-api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ActiveBranchModal from "./active-branch-modal";
import CloseBranchModal from "./close-branch-modal";
import UpdateBranch from "./update-branch";



export default function BranchDetails({ branchName, branchId, branchLogo, branchStatus, branchData }: {
  branchName: string,
  branchId: string,
  branchLogo: string,
  branchStatus: string,
  branchData?: BranchData | null
}) {
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isActiveModalOpen, setIsActiveModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const { handleChangeBranchStatus, isPending, isSuccess } = useChangeBranchStatus();

  const isBranchClosed = branchStatus === "INACTIVE";

  // Close modals on success
  useEffect(() => {
    if (isSuccess) {
      setIsCloseModalOpen(false);
      setIsActiveModalOpen(false);
    }
  }, [isSuccess]);

  const handleEditBranch = () => {
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };



  const handleCloseBranch = () => {
    setIsCloseModalOpen(true);
  };

  const handleConfirmClose = () => {
    const payload = {
      branchId: branchId,
      status: "INACTIVE"
    };

    handleChangeBranchStatus(payload);
  };

  const handleCancelClose = () => {
    setIsCloseModalOpen(false);
  };

  const handleActivateBranch = () => {
    setIsActiveModalOpen(true);
  };

  const handleConfirmActivate = () => {
    const payload = {
      branchId: branchId,
      status: "ACTIVE"
    };

    handleChangeBranchStatus(payload);
  };

  const handleCancelActivate = () => {
    setIsActiveModalOpen(false);
  };

  return (
    <div>
      <section className="bg-white rounded-2xl p-3 sm:p-4 my-4">
        <div className="bg-theme-gray rounded-2xl p-3 sm:p-4 flex flex-col lg:flex-row lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            {/* Merchant Logo */}
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={branchLogo}
                alt={`${branchName} logo`}
                width={50}
                height={50}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-row sm:items-center gap-1 sm:gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{branchName}</h3>
                <Image src={verifyIcon} alt="verify-icon" width={16} height={16} className="flex-shrink-0" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Merchant ID: <span className="text-theme-dark-green font-medium">{branchId}</span>
              </p>
              <hr className="border-gray-100 my-2 sm:my-3" />
              <div className="flex flex-row sm:items-center gap-2">
                <p className="text-xs sm:text-sm text-gray-600">Sub Branch</p>
                <div className="flex items-center gap-2">
                  <Image src={star} alt="star-icon" width={16} height={16} />
                  <p className="text-xs sm:text-sm text-gray-600">4.5</p>
                  <p className="text-xs sm:text-sm text-gray-600">278 Reviews</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 lg:gap-2">
            {!isBranchClosed && (
              <Button
                onClick={handleCloseBranch}
                className="bg-white border border-gray-200 text-black shadow-none hover:bg-transparent cursor-pointer px-3 sm:px-4 py-3 sm:py-5 text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <Image src={branchCloseIcon} alt="branch-close-icon" width={16} height={16} />
                <span className="hidden sm:inline">Close Branch</span>
                <span className="sm:hidden">Close</span>
              </Button>
            )}
            <Button
              onClick={handleEditBranch}
              className="bg-black border border-gray-200 text-white shadow-none hover:bg-black cursor-pointer px-3 sm:px-4 py-3 sm:py-5 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <Image src={editIcon} alt="edit-icon" width={16} height={16} />
              <span className="hidden sm:inline">Edit Details</span>
              <span className="sm:hidden">Edit</span>
            </Button>
            {isBranchClosed && (
              <Button
                onClick={handleActivateBranch}
                className="bg-green-600 hover:bg-green-700 text-white shadow-none cursor-pointer px-3 sm:px-4 py-3 sm:py-5 text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <span className="hidden sm:inline">Activate Branch</span>
                <span className="sm:hidden">Activate</span>
              </Button>
            )}
          </div>
        </div>
      </section>

      <CloseBranchModal
        isOpen={isCloseModalOpen}
        onClose={handleCancelClose}
        onConfirm={handleConfirmClose}
        isLoading={isPending}
      />

      <ActiveBranchModal
        isOpen={isActiveModalOpen}
        onClose={handleCancelActivate}
        onConfirm={handleConfirmActivate}
        isLoading={isPending}
      />

      <UpdateBranch
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        branchData={branchData || null}
      />
    </div>
  );
}