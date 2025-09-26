import { branchIcon, peopleIcon, rewardIcon } from "@/constant/icons";
import { BrandSummaryProps } from "@/lib/types";
import Image from "next/image";

export default function BrandSummary({
  title = "Brand Summary",
  subtitle = "Get quick insight on your brand and operations.",
  onboardedBranches = 0,
  availableBrandPoints = "#16,217.90",
  totalCustomers = "54,9181"
}: BrandSummaryProps) {


  return (
    <div className="shadow-none border-none p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-600 mb-4">
        {subtitle}
      </p>
      <div className="space-y-3 border border-gray-100 rounded-2xl p-3">
        {/* onboarded branches */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={branchIcon} alt="branch-icon" width={16} height={16} />
            <p className="text-xs text-gray-600">Onboarded Branches</p>
          </div>
          <p className="text-sm font-semibold text-gray-900">{onboardedBranches}</p>
        </div>
        <hr className="border-gray-50" />
        {/* Available Brand points */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={rewardIcon} alt="reward-icon" width={16} height={16} />
            <p className="text-xs text-gray-600">Available Brand Points</p>
          </div>
          <p className="text-sm font-semibold text-gray-900">{availableBrandPoints}</p>
        </div>
        <hr className="border-gray-50" />
        {/* Total customers */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={peopleIcon} alt="people-icon" width={16} height={16} />
            <p className="text-xs text-gray-600">Total Customers</p>
          </div>
          <p className="text-sm font-semibold text-gray-900">{totalCustomers}</p>
        </div>
      </div>
    </div>
  );
}
