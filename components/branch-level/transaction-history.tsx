import { avatarIcon, filterIcon } from "@/constant/icons";
import { transactionData } from "@/data";
import Image from "next/image";
import { Badge } from "../ui/badge";

export default function TransactionHistory() {
  return (
    <main className="bg-white rounded-2xl p-6 my-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Transactions <br /> & Payment History</h1>
        <button className="bg-theme-gray border border-gray-100 text-black p-3 flex items-center gap-2 shadow-none hover:bg-gray-100 cursor-pointer rounded-full">
          <Image src={filterIcon} alt="filter-icon" width={20} height={20} />
        </button>
      </div>

      {/* Today's Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s Summary</h2>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-start">
              <p className="text-sm text-gray-600 mb-2">Total Cash In</p>
              <p className="text-2xl font-bold text-green-600">#40,000.50</p>
            </div>
            <div className="text-start">
              <p className="text-sm text-gray-600 mb-2">Total Cash Out</p>
              <p className="text-2xl font-bold text-red-600">#38,900.50</p>
            </div>
            <div className="text-start">
              <p className="text-sm text-gray-600 mb-2">Fee&apos;s</p>
              <p className="text-2xl font-bold text-gray-900">#1,100.00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Transactions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s Transactions</h2>
        <div className="bg-white rounded-2xl  max-h-[750px] overflow-y-auto">
          {transactionData.map((transaction, index) => (
            <div
              key={transaction.id}
              className={`flex items-center justify-between p-4 border border-gray-100 rounded-2xl ${index !== transactionData.length - 1 ? 'mb-2' : ''}`}
            >
              {/* Left Side - Avatar and Details */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Image src={avatarIcon} alt="avatar" width={20} height={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{transaction.name}</p>
                  <p className="text-xs text-gray-500">{transaction.date} - {transaction.time}</p>
                </div>
              </div>

              {/* Right Side - Amount and Status */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">+₦{transaction.amount}</p>
                  <Badge className="text-xs text-blue-600 hover:text-blue-800 transition-colors bg-transparent border-gray-100 rounded-full">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}