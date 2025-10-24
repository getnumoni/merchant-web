import { firstMedalIcon, secondMedalIcon, thirdMedalIcon } from "@/constant/icons";
import { CustomerCardProps } from "@/lib/types";
import Image from "next/image";
import { RewardIcon } from "../common/icon-svg";

const getLoyaltyBadge = (rank: number | null) => {
  if (!rank) return null;

  const medalIcons = {
    1: firstMedalIcon,
    2: secondMedalIcon,
    3: thirdMedalIcon
  };

  // Use medal icon for ranks 1-3, fallback to number for others
  if (rank <= 3) {
    return (
      <Image
        src={medalIcons[rank as keyof typeof medalIcons]}
        alt={`${rank} place medal`}
        width={30}
        height={30}
        className="w-6 h-6"
      />
    );
  }

  // For ranks 4 and above, show number
  return (
    <div className="w-6 h-6 flex items-center justify-center">
      <span className="text-lg font-bold text-yellow-500">#{rank}</span>
    </div>
  );
};

export default function CustomerCard({ customer, rank }: CustomerCardProps) {
  return (
    <div className="bg-white rounded-lg border-none p-4 shadow-none">
      {/* Header with Profile and Medal */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 w-full">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-600">
              {customer.customerName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className=" w-full">
            <h3 className="font-semibold text-black text-base">{customer.customerName?.split(' ')[0]}</h3>
            <p className="text-xs text-gray-500">ID: {customer.customerId}</p>
            <hr className="border-theme-gray mt-2 " />
            {/* Financial Info */}
            <div className="flex flex-row items-start gap-6 ">
              <div className="flex flex-col items-start gap-1 mt-2">
                <span className="text-xs sm:text-sm text-gray-600 font-medium">Transactions:</span>
                <span className="font-semibold text-black text-xs sm:text-sm">{customer.totalTransactions}</span>
              </div>

              <div className="flex flex-col items-start gap-1 mt-2">
                <span className="text-xs sm:text-sm text-gray-600 font-medium">Spent:</span>
                <div className="flex flex-row items-center gap-1">
                  <RewardIcon size={16} className="text-theme-dark-green" />
                  <span className="font-semibold text-black text-xs sm:text-sm">₦{customer.totalSpent.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <hr className="border-theme-gray mt-2 " />
            {/* Branch Info */}
            <div className="flex flex-row items-start gap-2 my-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">B</span>
              </div>
              <span className="text-xs sm:text-sm text-black break-words">{customer.mostShoppedBranch}</span>
            </div>
          </div>
        </div>
        {getLoyaltyBadge(rank || null)}
      </div>

    </div>
  );
}
