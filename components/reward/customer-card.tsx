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

  return (
    <Image
      src={medalIcons[rank as keyof typeof medalIcons]}
      alt={`${rank} place medal`}
      width={30}
      height={30}
      className="w-6 h-6"
    />
  );
};

export default function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <div className="bg-white rounded-lg border-none p-4 shadow-none">
      {/* Header with Profile and Medal */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 w-full">
          <Image
            src={customer.profileIcon}
            alt="Profile"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div className=" w-full">
            <h3 className="font-semibold text-black text-base">{customer.name}</h3>
            <hr className="border-theme-gray mt-2 " />
            {/* Financial Info */}
            <div className="flex flex-row items-start gap-6 my-2">
              <div className="flex flex-col items-start gap-1 mt-2">
                <span className="text-xs sm:text-sm text-gray-600 font-medium">Spent:</span>
                <span className="font-semibold text-black text-xs sm:text-sm">#{customer.spent}</span>
              </div>

              <div className="flex flex-col items-start gap-1 mt-2">
                <span className="text-xs sm:text-sm text-gray-600 font-medium">Earned:</span>
                <div className="flex flex-row items-center gap-1">
                  <RewardIcon size={16} className="text-theme-dark-green" />
                  <span className="font-semibold text-black text-xs sm:text-sm">{customer.earned}</span>
                </div>
              </div>
            </div>
            <hr className="border-theme-gray mt-2 " />
            {/* Branch Info */}
            <div className="flex flex-row items-start gap-2 my-2">
              <Image src={customer.merchantIcon} alt="Branch" width={20} height={20} className="rounded-full" />
              <span className="text-xs sm:text-sm text-black break-words">{customer.branch}</span>
            </div>
          </div>
        </div>
        {getLoyaltyBadge(customer.loyaltyRank)}
      </div>

    </div>
  );
}
