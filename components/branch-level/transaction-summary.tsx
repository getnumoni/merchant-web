import { formatCurrency } from "@/lib/helper";
import { singleBranchDetails } from "@/lib/types";

interface TransactionSummaryProps {
  singleBranch: singleBranchDetails;
}

export default function TransactionSummary({ singleBranch }: TransactionSummaryProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s Summary</h2>
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-start">
            <p className="text-sm text-gray-600 mb-2">Total Cash In</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(singleBranch?.totalAmountRecieved || 0)}</p>
          </div>
          <div className="text-start">
            <p className="text-sm text-gray-600 mb-2">Total Cash Out</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(singleBranch?.totalPayout || 0)}</p>
          </div>
          <div className="text-start">
            <p className="text-sm text-gray-600 mb-2">Fee&apos;s</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(singleBranch?.fees || 0)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
