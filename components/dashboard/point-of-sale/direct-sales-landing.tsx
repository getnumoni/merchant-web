import { MetricCard } from "@/components/common/metric-card";
import { ErrorState } from "@/components/ui/error-state";
import useGetPosTransactionStatistics from "@/hooks/query/useGetPosTransactionStatistics";
import { formatCurrency } from "@/lib/helper";
import { ShoppingCart } from "lucide-react";
import TransactionSummaryLoading from "../transaction/components/transaction-summary-loading";
import DirectSalesTable from "./direct-sales-table";

interface DirectSalesLandingProps {
  posId: string;
  merchantId: string;
}

interface SalesData {
  periodAmount: number;
  totalAmount: number;
  periodCount: number;
  totalCount: number;
}

export default function DirectSalesLanding({ posId, merchantId }: DirectSalesLandingProps) {
  const { data, isPending, isError, error, refetch } = useGetPosTransactionStatistics({
    posId,
    // merchantId: merchantId,
  });

  if (isPending) {
    return (
      <section className="px-8 py-6">
        <TransactionSummaryLoading />
      </section>
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="Error loading sales statistics"
        message={error?.message || "Failed to load sales data. Please try again."}
        onRetry={refetch}
      />
    );
  }

  const statisticsData = data?.data as { sales: SalesData } | undefined;

  if (!statisticsData?.sales) {
    return (
      <div className="bg-white rounded-2xl p-6 m-8">
        <p className="text-gray-500">No sales data available</p>
      </div>
    );
  }

  const salesData = statisticsData.sales;

  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Sales Amount"
          value={formatCurrency(salesData.totalAmount)}
          icon={<ShoppingCart className="h-6 w-6 text-gray-200" />}
          bgColor="bg-[#DFFDDB]"
          iconBgColor="bg-black"
        />
        <MetricCard
          title="Period Sales Amount"
          value={formatCurrency(salesData.periodAmount)}
          icon={<ShoppingCart className="h-6 w-6 text-gray-200" />}
          bgColor="bg-[#E3EAFD]"
          iconBgColor="bg-black"
        />
        <MetricCard
          title="Total Sales Count"
          value={salesData.totalCount.toLocaleString()}
          icon={<ShoppingCart className="h-6 w-6 text-gray-200" />}
          bgColor="bg-[#FFFBDA]"
          iconBgColor="bg-black"
        />
        <MetricCard
          title="Period Sales Count"
          value={salesData.periodCount.toLocaleString()}
          icon={<ShoppingCart className="h-6 w-6 text-gray-200" />}
          bgColor="bg-[#FFE5E5]"
          iconBgColor="bg-black"
        />
      </div>

      <DirectSalesTable posId={posId} merchantId={merchantId} />
    </section>
  );
}