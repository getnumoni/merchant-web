"use client";

import { formatCurrency, getStatusColor, getStatusText } from "@/lib/helper";
import { BranchSummaryData } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface BranchSummaryCardProps {
  data: BranchSummaryData;
}

export default function BranchSummaryCard({ data }: BranchSummaryCardProps) {
  const { merchantName, merchantId, merchantLogo, status, todayTransactions } = data;



  return (
    <div
      className="bg-[#FAFAFA] rounded-2xl shadow-none border border-gray-100 p-6 duration-200 cursor-pointer  transition-all"
    >
      {/* Merchant Information Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          {/* Merchant Logo */}
          <Image
            src={merchantLogo}
            alt={`${merchantName} logo`}
            width={50}
            height={50}
            className="rounded-full"

          />

          {/* Merchant Details */}
          <div>
            <Link href={`/dashboard/branch-level/${data.id}`}>
              <h3 className="sm:text-lg text-base font-semibold text-gray-900 mb-1 hover:text-theme-dark-green">
                {merchantName}
              </h3>
            </Link>
            <p className="text-sm text-gray-600">
              Merchant ID: <span className="text-green-600 font-medium">{merchantId}</span>
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
          {getStatusText(status)}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-4"></div>

      <div className="bg-white rounded-2xl p-4">
        {/* Transaction Summary Header */}
        <div className="mb-4">
          <h4 className="text-base font-semibold text-gray-900">
            Todays Transaction&apos;s Summary
          </h4>
        </div>

        {/* Transaction Details */}
        <div className="space-y-3">
          {/* Allocated Budget */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-6 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Allocated Budget</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {formatCurrency(todayTransactions.allocatedBudget)}
            </span>
          </div>

          {/* Amount Spent */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-6 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Amount Spent</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {formatCurrency(todayTransactions.amountSpent)}
            </span>
          </div>

          {/* Fees */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Fees</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {formatCurrency(todayTransactions.fees)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}