import useGetBranchSummary from "@/hooks/query/useGetBranchSummary";
import { formatCurrency, getColorClass, getCurrentDate, getYesterdayDate } from "@/lib/helper";
import { MainBranchSummaryProps } from "@/lib/types";
import MainBranchSummaryLoading from "./main-branch-summary-loading";



export default function MainBranchSummary({
  title = "Main Branch Summary"
}: MainBranchSummaryProps) {

  const fromDate = getYesterdayDate("dd-mm-yyyy") as string;
  const toDate = getCurrentDate("dd-mm-yyyy") as string;
  const { data, isPending, isError, error } = useGetBranchSummary({ fromDate, toDate });

  const branchSummaryData = data?.data;

  // Create items array from hook data
  const items = branchSummaryData ? [
    {
      label: "Total Amount Collected",
      value: formatCurrency(branchSummaryData.totalEarned || 0),
      color: "green" as const
    },
    {
      label: "Amount In Bank",
      value: formatCurrency(branchSummaryData.totalPayout || 0),
      color: "red" as const
    },
    {
      label: "Fee's",
      value: formatCurrency(branchSummaryData.totalFees || 0),
      color: "gray" as const
    }
  ] : [];

  if (isPending) {
    return <MainBranchSummaryLoading title={title} />;
  }

  if (isError) {
    return (
      <div className="shadow-none border-none p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="space-y-3 border border-gray-100 rounded-2xl p-4">
          <div className="text-center text-red-500 text-sm">
            Failed to load branch summary
          </div>
          <div className="text-center text-xs text-gray-500">
            {error?.message || "Something went wrong"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-none border-none p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3 border border-gray-100 rounded-2xl p-4">
        {items.map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-3">
              <div className={`w-1 h-8 ${getColorClass(item.color)} rounded-full`}></div>
              <div className="flex-1 flex justify-between items-center">
                <p className="text-xs text-gray-600">{item.label}</p>
                <p className="text-sm font-semibold text-gray-900">{item.value}</p>
              </div>
            </div>
            {index < items.length - 1 && <hr className="border-gray-50 mt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
}
