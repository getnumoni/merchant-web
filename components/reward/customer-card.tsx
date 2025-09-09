import Image from "next/image";

interface Customer {
  id: number;
  name: string;
  spent: string;
  earned: string;
  branch: string;
  loyaltyRank: number | null;
  profileIcon: string;
}

interface CustomerCardProps {
  customer: Customer;
}

const getLoyaltyBadge = (rank: number | null) => {
  if (!rank) return null;

  const badgeColors = {
    1: "bg-green-500",
    2: "bg-orange-500",
    3: "bg-gray-500"
  };

  return (
    <div className={`w-8 h-8 rounded-full ${badgeColors[rank as keyof typeof badgeColors]} flex items-center justify-center text-white font-bold text-sm`}>
      {rank}
    </div>
  );
};

export default function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <div className="bg-white rounded-lg border-none p-3 sm:p-4 shadow-none">
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src={customer.profileIcon}
            alt="Profile"
            width={32}
            height={32}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          />
          {getLoyaltyBadge(customer.loyaltyRank)}
        </div>
      </div>
      <h3 className="font-semibold text-black text-sm sm:text-base mb-2 sm:mb-3 truncate">{customer.name}</h3>
      <div className="space-y-1 sm:space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-gray-600">Spent:</span>
          <span className="font-semibold text-black text-xs sm:text-sm">#{customer.spent}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-gray-600">Earned:</span>
          <span className="font-semibold text-black text-xs sm:text-sm">{customer.earned}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-xs sm:text-sm text-gray-600 flex-shrink-0">Branch:</span>
          <span className="text-xs sm:text-sm text-black break-words">{customer.branch}</span>
        </div>
      </div>
    </div>
  );
}
