import { branchCloseIcon, editIcon, star, verifyIcon } from "@/constant/icons";
import { sampleUserIcon } from "@/constant/images";
import Image from "next/image";
import { Button } from "../ui/button";

export default function BranchDetails() {
  return (
    <div>
      <section className="bg-white rounded-2xl p-3 sm:p-4 my-4">
        <div className="bg-theme-gray rounded-2xl p-3 sm:p-4 flex flex-col lg:flex-row lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Image
              src={sampleUserIcon}
              alt="branch-logo"
              width={80}
              height={80}
              className="rounded-full w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-row sm:items-center gap-1 sm:gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Chicken Republic Ikeja</h3>
                <Image src={verifyIcon} alt="verify-icon" width={16} height={16} className="flex-shrink-0" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Merchant ID: <span className="text-theme-dark-green font-medium">#nu225577</span>
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
            <Button className="bg-white border border-gray-200 text-black shadow-none hover:bg-transparent cursor-pointer px-3 sm:px-4 py-3 sm:py-5 text-xs sm:text-sm flex items-center justify-center gap-2">
              <Image src={branchCloseIcon} alt="branch-close-icon" width={16} height={16} />
              <span className="hidden sm:inline">Close Branch</span>
              <span className="sm:hidden">Close</span>
            </Button>
            <Button className="bg-black border border-gray-200 text-white shadow-none hover:bg-black cursor-pointer px-3 sm:px-4 py-3 sm:py-5 text-xs sm:text-sm flex items-center justify-center gap-2">
              <Image src={editIcon} alt="edit-icon" width={16} height={16} />
              <span className="hidden sm:inline">Edit Details</span>
              <span className="sm:hidden">Edit</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}