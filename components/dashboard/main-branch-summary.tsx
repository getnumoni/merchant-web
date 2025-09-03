import { getColorClass } from "@/lib/helper";
import { MainBranchSummaryProps } from "@/lib/types";



export default function MainBranchSummary({
  title = "Main Branch Summary",
  items = [
    {
      label: "Total Amount Collected",
      value: "₦40,000.50",
      color: "green"
    },
    {
      label: "Amount In Bank",
      value: "₦38,900.50",
      color: "red"
    },
    {
      label: "Fee's",
      value: "₦1,100.00",
      color: "gray"
    }
  ]
}: MainBranchSummaryProps) {


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
