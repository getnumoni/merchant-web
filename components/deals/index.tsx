'use client';

import EmptyState from "@/components/common/empty-state";
import useGetAllDeals from "@/hooks/query/useGetAllDeals";
import { Button } from "../ui/button";
import LoadingSpinner from "../ui/loading-spinner";

export default function Deals() {
  const { data, isPending } = useGetAllDeals();

  if (isPending) {
    return <LoadingSpinner message="Loading deals..." />;
  }

  const dealsData = data?.data?.data;
  console.log(dealsData);

  // Check if there's no data
  if (!dealsData || dealsData.totalRows === 0 || dealsData.pageData?.length === 0) {
    return (
      <main>
        <Button
          className="bg-theme-dark-green hover:bg-theme-green text-white rounded-lg p-6 flex items-center gap-2 shadow-sm cursor-pointer"
        >
          + Add Deal
        </Button>
        <EmptyState
          title="No Deals Available"
          description="There are currently no deals and promotions available. Check back later for exciting offers!"
        />
      </main>
    );
  }

  return <div>Deals</div>;
}