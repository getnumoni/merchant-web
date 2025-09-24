import { avatarIcon } from "@/constant/icons";
import { formatCurrency } from "@/lib/helper";
import { Transaction } from "@/lib/types";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface TransactionItemProps {
  transaction: Transaction;
  isLast: boolean;
}

export default function TransactionItem({ transaction, isLast }: TransactionItemProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 border border-gray-100 rounded-2xl ${!isLast ? 'mb-2' : ''}`}
    >
      {/* Left Side - Avatar and Details */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          {transaction.merchantImageURl ? (
            <Image src={transaction.merchantImageURl} alt="customer" width={20} height={20} className="rounded-full" />
          ) : (
            <Image src={avatarIcon} alt="avatar" width={20} height={20} />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{transaction.customername}</p>
          <p className="text-xs text-gray-500">{transaction.createdDt}</p>
        </div>
      </div>

      {/* Right Side - Amount and Status */}
      <div className="flex items-end gap-4">
        <div className="text-right min-w-0">
          <p className={`text-sm font-bold ${transaction.trnType === 'C' ? 'text-green-600' : 'text-red-600'}`}>
            {transaction.trnType === 'C' ? '+' : '-'} {formatCurrency(transaction.amount)}
          </p>
          <div className="flex flex-col gap-2 mt-1">
            {transaction.status && (
              <Badge className={`text-xs rounded-full ${transaction.status === 'SUCCESSFUL'
                ? 'text-green-600 bg-green-50 border-green-200'
                : 'text-gray-600 bg-gray-50 border-gray-200'
                }`}>
                {transaction.status}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
