'use client';

import { MetricCard } from "@/components/common/metric-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ErrorState } from "@/components/ui/error-state";
import { Skeleton } from "@/components/ui/skeleton";
import useGetPaymentHistory from "@/hooks/query/useGetPaymentHistory";
import { formatValue } from "@/lib/helper";
import { ChevronDown, Gift, Star, Store, TrendingDown, Users, Wallet } from "lucide-react";
import { useState } from "react";

type DateRangeOption = 'Today' | 'Yesterday' | 'This Week' | 'This Month' | 'Last Month' | 'All Time';

// Helper function to format date as dd-mm-yyyy
const formatDateDDMMYYYY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Helper function to get date range based on option
const getDateRange = (option: DateRangeOption): { fromDate: string; toDate: string } => {
  const today = new Date();
  const currentDate = formatDateDDMMYYYY(today);

  switch (option) {
    case 'Today':
      return {
        fromDate: currentDate,
        toDate: currentDate,
      };

    case 'Yesterday': {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        fromDate: formatDateDDMMYYYY(yesterday),
        toDate: currentDate,
      };
    }

    case 'This Week': {
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return {
        fromDate: formatDateDDMMYYYY(sevenDaysAgo),
        toDate: currentDate,
      };
    }

    case 'This Month': {
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      return {
        fromDate: formatDateDDMMYYYY(firstDayOfMonth),
        toDate: currentDate,
      };
    }

    case 'Last Month': {
      const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      return {
        fromDate: formatDateDDMMYYYY(firstDayOfLastMonth),
        toDate: currentDate,
      };
    }

    case 'All Time':
      return {
        fromDate: currentDate,
        toDate: currentDate,
      };

    default:
      return {
        fromDate: currentDate,
        toDate: currentDate,
      };
  }
};

export default function TransactionSummary() {
  const [selectedRange, setSelectedRange] = useState<DateRangeOption>('Today');
  const dateRange = getDateRange(selectedRange);

  const { data, isPending, isError, error, refetch } = useGetPaymentHistory({
    fromDate: dateRange.fromDate,
    toDate: dateRange.toDate,
  });

  const paymentHistoryData = data?.data?.data ?? {};

  const handleDateRangeChange = (option: DateRangeOption) => {
    setSelectedRange(option);
  };

  // Loading skeleton
  if (isPending) {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 my-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-gray-100">
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-8 w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <ErrorState title="Error loading payment history" message={error?.message || "Failed to load payment history data. Please try again."} onRetry={refetch} />
    );
  }

  const metrics = [
    {
      title: 'Total Count',
      value: formatValue(paymentHistoryData?.salesCount ?? 0),
      changeType: 'positive' as const,
      icon: <Users className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#E3EAFD]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Total Sales',
      value: formatValue(paymentHistoryData?.totalSales ?? 0),
      changeType: 'positive' as const,
      icon: <Store className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#DFFDDB]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Pending Payout',
      value: formatValue(paymentHistoryData?.payOutPending ?? 0),
      changeType: 'positive' as const,
      icon: <Wallet className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#E3EAFD]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Settled Payout',
      value: formatValue(paymentHistoryData?.payOut ?? 0),
      changeType: 'positive' as const,
      icon: <Star className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#FFFBDA]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Points Redeemed',
      value: formatValue(0), // Not available in the API response
      changeType: 'positive' as const,
      icon: <Gift className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#FFFBDA]',
      iconBgColor: 'bg-black'
    },
    {
      title: 'Commission',
      value: formatValue(paymentHistoryData?.serviceFees ?? 0),
      changeType: 'positive' as const,
      icon: <TrendingDown className="h-6 w-6 text-gray-200" />,
      bgColor: 'bg-[#DFFDDB]',
      iconBgColor: 'bg-black'
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h2 className="text-lg font-semibold text-gray-900">Transaction Summary</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="shadow-none">
            <Button variant="outline" className="gap-2">
              {selectedRange}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem onClick={() => handleDateRangeChange('Today')}>
              Today
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDateRangeChange('Yesterday')}>
              Yesterday
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDateRangeChange('This Week')}>
              This Week
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDateRangeChange('This Month')}>
              This Month
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDateRangeChange('Last Month')}>
              Last Month
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDateRangeChange('All Time')}>
              All Time
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 my-5">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value.toString()}
            changeType={metric.changeType}
            icon={metric.icon}
            bgColor={metric.bgColor}
            iconBgColor={metric.iconBgColor}
          />
        ))}
      </div>
    </div>
  );
}